const form = document.querySelector("#briefForm");
const businessContext = document.querySelector("#businessContext");
const replyLanguage = document.querySelector("#replyLanguage");
const customerInput = document.querySelector("#customerInput");
const briefStatus = document.querySelector("#briefStatus");
const clearBrief = document.querySelector("#clearBrief");

const outputIds = {
  summary: "summaryOutput",
  questions: "questionsOutput",
  reply: "replyOutput",
  actions: "actionsOutput",
};

const serviceKeywords = [
  ["packaging", "Packaging / product supplies"],
  ["paper bag", "Custom paper bags"],
  ["box", "Boxes / cartons"],
  ["sticker", "Stickers / labels"],
  ["label", "Stickers / labels"],
  ["cake", "Cake / bakery order"],
  ["catering", "Catering order"],
  ["website", "Website / digital service"],
  ["ads", "Digital marketing"],
  ["account", "Accounting service"],
  ["payroll", "Payroll service"],
  ["secretary", "Company secretary service"],
  ["logo", "Design / printing requirement"],
];

const locationKeywords = [
  "Kuala Lumpur",
  "KL",
  "Selangor",
  "Petaling Jaya",
  "PJ",
  "Subang",
  "Shah Alam",
  "Puchong",
  "Penang",
  "Johor Bahru",
  "JB",
  "Melaka",
  "Ipoh",
  "Seremban",
  "Kota Kinabalu",
  "Kuching",
];

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function findFirstMatch(text, patterns) {
  const lower = text.toLowerCase();
  const match = patterns.find(([keyword]) => lower.includes(keyword));
  return match ? match[1] : "";
}

function findLocation(text) {
  const lower = text.toLowerCase();
  return locationKeywords.find((location) => lower.includes(location.toLowerCase())) || "";
}

function findBudget(text) {
  const budgetMatch = text.match(/\b(?:rm|myr)\s?\d[\d,.]*(?:k)?(?:\s?-\s?(?:rm|myr)?\s?\d[\d,.]*(?:k)?)?/i);
  return budgetMatch ? budgetMatch[0].toUpperCase() : "";
}

function findQuantity(text) {
  const quantityMatch = text.match(
    /\b\d{1,6}\s?(?:(?:custom|printed|plain|small|medium|large|paper|plastic|food)\s?){0,4}(?:pcs|pieces|units?|boxes|sets?|pax|people|kg|cartons?|bags?)\b/i,
  );
  return quantityMatch ? quantityMatch[0] : "";
}

function findTimeline(text) {
  const lower = text.toLowerCase();
  const timelineMatch = text.match(
    /\b(?:today|tomorrow|next\s+\w+|this\s+\w+|before\s+(?:next\s+)?\w+|by\s+(?:next\s+)?\w+|\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?)\b/i,
  );

  if (timelineMatch) return timelineMatch[0];
  if (lower.includes("urgent") || lower.includes("asap")) return "Urgent / ASAP";
  if (lower.includes("week")) return "This week / next week";
  if (lower.includes("month")) return "This month";
  return "";
}

function buildQuestions(details) {
  const questions = [];

  if (!details.service) questions.push("What product or service does the customer need?");
  if (!details.quantity) questions.push("What quantity, package size, or service scope should be quoted?");
  if (!details.location) questions.push("Where is the customer located, and is delivery or on-site service needed?");
  if (!details.timeline) questions.push("When does the customer need this completed or delivered?");
  if (!details.budget) questions.push("Does the customer have a budget range or target price?");

  questions.push("Do they need any special requirements such as logo, size, colour, material, language, or documents?");
  questions.push("What is the best contact name and WhatsApp number for follow-up?");

  return questions;
}

function line(label, value) {
  return `${label}: ${value || "Not confirmed yet"}`;
}

function buildReply(details, questions) {
  const business = details.business || "our team";
  const topQuestions = questions.slice(0, 4);

  if (details.language === "mixed") {
    return [
      "Hi, thanks for your enquiry. 我先帮你整理一下需求，方便我们给你更准确的回复。",
      "",
      `目前看到的需求: ${details.service || "还需要确认服务/产品"}${details.quantity ? `, ${details.quantity}` : ""}${details.timeline ? `, needed ${details.timeline}` : ""}.`,
      `We are ${business}, so we can check this for you.`,
      "",
      "Before I quote, can you confirm:",
      ...topQuestions.map((question, index) => `${index + 1}. ${question}`),
      "",
      "Once I have these details, I can advise the suitable option, estimated price range, and next step.",
    ].join("\n");
  }

  if (details.language === "bm") {
    return [
      "Hi, thanks for your enquiry. We can help check this for you.",
      "",
      `From your message, the request seems to be: ${details.service || "service/product to confirm"}${details.quantity ? `, ${details.quantity}` : ""}${details.location ? `, location ${details.location}` : ""}.`,
      "",
      "Before we quote, boleh confirm these details?",
      ...topQuestions.map((question, index) => `${index + 1}. ${question}`),
      "",
      "After that, we can share the suitable option, estimated pricing, and next step.",
    ].join("\n");
  }

  return [
    "Hi, thanks for your enquiry. I can help check this and give you a clearer reply.",
    "",
    `From your message, I understand you may need: ${details.service || "service/product to confirm"}${details.quantity ? `, ${details.quantity}` : ""}${details.timeline ? `, needed ${details.timeline}` : ""}.`,
    business ? `For context, we are ${business}.` : "",
    "",
    "Before I quote, could you confirm:",
    ...topQuestions.map((question, index) => `${index + 1}. ${question}`),
    "",
    "Once confirmed, I can advise the suitable option, estimated price range, and next step.",
  ]
    .filter(Boolean)
    .join("\n");
}

function generateBrief(rawInput) {
  const cleanInput = normalizeText(rawInput);
  const details = {
    business: normalizeText(businessContext.value),
    language: replyLanguage.value,
    service: findFirstMatch(cleanInput, serviceKeywords),
    quantity: findQuantity(cleanInput),
    location: findLocation(cleanInput),
    timeline: findTimeline(cleanInput),
    budget: findBudget(cleanInput),
  };

  const questions = buildQuestions(details);
  const summary = [
    line("Original enquiry", cleanInput),
    line("Likely product / service", details.service),
    line("Quantity / scope", details.quantity),
    line("Location", details.location),
    line("Timeline / urgency", details.timeline),
    line("Budget", details.budget),
  ];

  const actions = [
    "Copy the suggested reply and send it to the customer on WhatsApp.",
    "Wait for the missing details before giving a final quote.",
    "Save the customer need, location, budget, and deadline in your sales tracker.",
    "If the request is urgent, follow up within the same business day.",
  ];

  return {
    summary: summary.join("\n"),
    questions: questions.map((question, index) => `${index + 1}. ${question}`).join("\n"),
    reply: buildReply(details, questions),
    actions: actions.map((action, index) => `${index + 1}. ${action}`).join("\n"),
  };
}

function setOutput(result) {
  Object.entries(outputIds).forEach(([key, id]) => {
    document.querySelector(`#${id}`).textContent = result[key];
  });
}

function resetOutput() {
  setOutput({
    summary: "Paste a customer enquiry and click Generate brief.",
    questions: "Missing details will appear here.",
    reply: "A WhatsApp-ready reply will appear here.",
    actions: "Follow-up actions will appear here.",
  });
}

async function copyTextFrom(targetId, button) {
  const text =
    targetId === "allOutput"
      ? [
          "客户需求摘要",
          document.querySelector(`#${outputIds.summary}`).textContent.trim(),
          "",
          "需要确认的问题",
          document.querySelector(`#${outputIds.questions}`).textContent.trim(),
          "",
          "建议回复",
          document.querySelector(`#${outputIds.reply}`).textContent.trim(),
          "",
          "下一步行动",
          document.querySelector(`#${outputIds.actions}`).textContent.trim(),
        ].join("\n")
      : document.querySelector(`#${targetId}`).textContent.trim();

  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    const original = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  } catch (error) {
    briefStatus.className = "form-status error";
    briefStatus.textContent = "Copy failed. Please select the text and copy manually.";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = customerInput.value.trim();

  if (!input) {
    briefStatus.className = "form-status error";
    briefStatus.textContent = "Please paste the customer enquiry first.";
    return;
  }

  setOutput(generateBrief(input));
  briefStatus.className = "form-status success";
  briefStatus.textContent = "Brief generated. You can copy each section or copy all.";
});

clearBrief.addEventListener("click", () => {
  form.reset();
  resetOutput();
  briefStatus.className = "form-status";
  briefStatus.textContent = "";
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", () => {
    copyTextFrom(button.dataset.copyTarget, button);
  });
});
