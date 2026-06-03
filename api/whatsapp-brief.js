const MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(payload));
}

function getOutputText(apiResponse) {
  if (typeof apiResponse.output_text === "string") {
    return apiResponse.output_text;
  }

  const textParts = [];
  for (const item of apiResponse.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) {
        textParts.push(content.text);
      }
    }
  }
  return textParts.join("\n");
}

function safeParseJson(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  }
}

function normalizeBrief(brief) {
  const fallback = "Not provided by the AI response.";
  return {
    readiness: brief.readiness || fallback,
    summary: brief.summary || fallback,
    questions: brief.questions || fallback,
    reply: brief.reply || fallback,
    actions: brief.actions || fallback,
  };
}

function buildPrompt({ businessContext, businessType, replyLanguage, customerInput }) {
  return [
    "You are a practical sales assistant for Malaysian SME owners who receive messy customer enquiries through WhatsApp, Facebook ads, and voice-note transcriptions.",
    "",
    "Your job is not to write generic customer service copy. Help the business owner decide whether they can quote now, what is missing, and what to send back on WhatsApp.",
    "",
    "Return strict JSON only with these exact string fields:",
    '{ "readiness": "...", "summary": "...", "questions": "...", "reply": "...", "actions": "..." }',
    "",
    "Rules:",
    "- The output must be concise and useful for a busy SME owner.",
    "- The readiness field must say whether the enquiry is Ready to quote, Almost ready, Needs details, or Too vague, and why.",
    "- The summary field must structure the customer need, quantity/scope, location, timeline, budget, and special requirements when available.",
    "- The questions field must ask only the most important missing details before quoting. Avoid long questionnaires.",
    "- The reply field must be directly copyable into WhatsApp. Keep it friendly, clear, and sales-oriented.",
    "- The actions field must tell the business owner what to do next.",
    "- Use Malaysian SME context. Keep RM, WhatsApp, delivery, halal, SSM, and local city details when relevant.",
    "- If the customer input is too vague, do not invent details. Ask for the minimum needed to move forward.",
    "- Match the requested reply language. For mixed language, use simple English plus natural Chinese phrases.",
    "",
    `Business / offer: ${businessContext || "Not provided"}`,
    `Enquiry type hint: ${businessType || "auto"}`,
    `Reply language: ${replyLanguage || "english"}`,
    "",
    "Customer enquiry:",
    customerInput,
  ].join("\n");
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    return sendJson(response, 405, { error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return sendJson(response, 503, {
      error: "OPENAI_API_KEY is not configured. Add it in Vercel Environment Variables to enable AI generation.",
    });
  }

  try {
    const body = request.body || {};
    const customerInput = String(body.customerInput || "").trim();
    const configuredAccessCode = String(process.env.BRIEF_TOOL_ACCESS_CODE || "").trim();
    const submittedAccessCode = String(body.accessCode || "").trim();

    if (!customerInput) {
      return sendJson(response, 400, { error: "Customer enquiry is required." });
    }

    if (!configuredAccessCode) {
      return sendJson(response, 503, {
        error: "Private AI mode is disabled. Set BRIEF_TOOL_ACCESS_CODE in Vercel to enable owner-only testing.",
      });
    }

    if (submittedAccessCode !== configuredAccessCode) {
      return sendJson(response, 403, { error: "Invalid access code for private AI mode." });
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        input: buildPrompt({
          businessContext: String(body.businessContext || "").trim(),
          businessType: String(body.businessType || "auto").trim(),
          replyLanguage: String(body.replyLanguage || "english").trim(),
          customerInput,
        }),
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      return sendJson(response, openaiResponse.status, {
        error: data.error?.message || "OpenAI API request failed.",
      });
    }

    const parsed = safeParseJson(getOutputText(data));
    if (!parsed) {
      return sendJson(response, 502, { error: "AI response was not valid JSON." });
    }

    return sendJson(response, 200, normalizeBrief(parsed));
  } catch (error) {
    return sendJson(response, 500, { error: "Unable to generate brief. Please try again." });
  }
};
