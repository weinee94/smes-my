const form = document.querySelector("#briefForm");
const businessContext = document.querySelector("#businessContext");
const businessType = document.querySelector("#businessType");
const replyLanguage = document.querySelector("#replyLanguage");
const customerInput = document.querySelector("#customerInput");
const briefStatus = document.querySelector("#briefStatus");
const clearBrief = document.querySelector("#clearBrief");

const outputIds = {
  readiness: "readinessOutput",
  summary: "summaryOutput",
  questions: "questionsOutput",
  reply: "replyOutput",
  actions: "actionsOutput",
};

const categoryProfiles = {
  packaging: {
    label: "Packaging / printing",
    keywords: ["paper bag", "packaging", "box", "carton", "sticker", "label", "mailer", "print logo", "袋", "包装", "纸箱"],
    required: [
      ["product", "Packaging type / product"],
      ["quantity", "Quantity"],
      ["customization", "Logo, artwork, size, colour, or material"],
      ["location", "Delivery location"],
      ["timeline", "Deadline"],
    ],
    questions: [
      "What size and material do you prefer?",
      "Do you already have logo/artwork ready for printing?",
      "Do you need delivery, pickup, or courier arrangement?",
    ],
  },
  fnb: {
    label: "F&B / catering / cake",
    keywords: ["catering", "cake", "food", "lunch", "dinner", "pax", "halal", "buffet", "menu", "餐", "蛋糕"],
    required: [
      ["product", "Food / menu request"],
      ["quantity", "Number of pax or items"],
      ["location", "Delivery / event location"],
      ["timeline", "Event date and time"],
      ["budget", "Budget per pax or total budget"],
    ],
    questions: [
      "Any halal, vegetarian, spicy level, or allergy requirements?",
      "Do you need delivery only, setup, or full catering service?",
      "What time should the food arrive?",
    ],
  },
  beauty: {
    label: "Beauty / wellness service",
    keywords: ["facial", "makeup", "spa", "hair", "nail", "massage", "beauty", "salon", "bridal", "美容"],
    required: [
      ["product", "Service needed"],
      ["quantity", "Number of people / sessions"],
      ["location", "Branch or service location"],
      ["timeline", "Preferred date and time"],
    ],
    questions: [
      "Is this for one person, a group, event, or regular package?",
      "Any preferred therapist, stylist, or package type?",
      "Should we recommend the fastest slot or the best-value package?",
    ],
  },
  home: {
    label: "Home / repair / on-site service",
    keywords: ["repair", "plumber", "electric", "aircond", "cleaning", "renovation", "leak", "install", "维修", "清洁"],
    required: [
      ["product", "Problem / service needed"],
      ["location", "Service address area"],
      ["timeline", "Preferred appointment time"],
    ],
    questions: [
      "Can you send photos or a short video of the issue?",
      "Is this for condo, landed house, shoplot, or office?",
      "Is parking, lift access, or site access available?",
    ],
  },
  professional: {
    label: "Accounting / secretary / professional service",
    keywords: ["account", "tax", "audit", "payroll", "secretary", "ssm", "lhdn", "bookkeeping", "会计", "报税"],
    required: [
      ["product", "Service needed"],
      ["company", "Company status / entity type"],
      ["timeline", "Deadline or urgency"],
      ["scope", "Monthly or one-off scope"],
    ],
    questions: [
      "Is your company already registered with SSM?",
      "Do you need monthly support or one-time cleanup / filing?",
      "Roughly how many invoices, receipts, or staff are involved?",
    ],
  },
  digital: {
    label: "Website / marketing / design",
    keywords: ["website", "landing page", "ecommerce", "ads", "seo", "marketing", "logo", "design", "facebook ad", "网站", "广告"],
    required: [
      ["product", "Project type"],
      ["scope", "Pages, features, or campaign scope"],
      ["timeline", "Launch deadline"],
      ["budget", "Budget range"],
    ],
    questions: [
      "Do you already have content, photos, logo, and product details?",
      "Do you need only setup, or also monthly maintenance / campaign management?",
      "Can you share 1-2 examples of websites or ads you like?",
    ],
  },
  retail: {
    label: "Retail / ecommerce order",
    keywords: ["order", "stock", "wholesale", "cod", "delivery", "shopee", "lazada", "sku", "批发"],
    required: [
      ["product", "Product requested"],
      ["quantity", "Quantity / variant"],
      ["location", "Delivery location"],
      ["budget", "Budget or target price"],
    ],
    questions: [
      "Which colour, size, model, or variant do you need?",
      "Do you need invoice, bulk pricing, or repeat order arrangement?",
      "Is delivery urgent or flexible?",
    ],
  },
  general: {
    label: "General enquiry",
    keywords: [],
    required: [
      ["product", "Product or service requested"],
      ["quantity", "Quantity or scope"],
      ["location", "Location"],
      ["timeline", "Timeline"],
      ["budget", "Budget"],
    ],
    questions: [
      "What exact product, package, or service do you want us to check?",
      "Do you have any special requirement, deadline, or budget range?",
      "What is the best contact name and WhatsApp number for follow-up?",
    ],
  },
};

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

function includesAny(text, words) {
  const lower = text.toLowerCase();
  return words.some((word) => lower.includes(word.toLowerCase()));
}

function detectCategory(text) {
  if (businessType.value !== "auto") return businessType.value;

  const scores = Object.entries(categoryProfiles).map(([key, profile]) => {
    const score = profile.keywords.filter((word) => text.toLowerCase().includes(word.toLowerCase())).length;
    return { key, score };
  });

  scores.sort((a, b) => b.score - a.score);
  return scores[0].score > 0 ? scores[0].key : "general";
}

function findLocation(text) {
  const lower = text.toLowerCase();
  return locationKeywords.find((location) => lower.includes(location.toLowerCase())) || "";
}

function findBudget(text) {
  const match = text.match(
    /\b(?:rm|myr)\s?\d[\d,.]*(?:k)?(?:\s?(?:-|to|until)\s?(?:rm|myr)?\s?\d[\d,.]*(?:k)?)?|\b\d[\d,.]*\s?(?:per pax|\/pax|budget|预算)\b/i,
  );
  return match ? match[0].toUpperCase() : "";
}

function findQuantity(text) {
  const match = text.match(
    /\b\d{1,6}\s?(?:(?:custom|printed|plain|small|medium|large|paper|plastic|food|office)\s?){0,5}(?:pcs|pieces|units?|boxes|sets?|pax|people|kg|cartons?|bags?|staff|pages?)\b/i,
  );
  return match ? match[0] : "";
}

function findTimeline(text) {
  const lower = text.toLowerCase();
  const match = text.match(
    /\b(?:today|tomorrow|tonight|next\s+\w+|this\s+\w+|before\s+(?:next\s+)?\w+|by\s+(?:next\s+)?\w+|\d{1,2}\s?(?:am|pm)|\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?)\b/i,
  );

  if (match) return match[0];
  if (lower.includes("urgent") || lower.includes("asap")) return "Urgent / ASAP";
  if (lower.includes("week")) return "This week / next week";
  if (lower.includes("month")) return "This month";
  return "";
}

function findContact(text) {
  const phoneMatch = text.match(/(?:\+?6?01)[0-9 -]{7,12}/);
  if (phoneMatch) return phoneMatch[0];
  if (includesAny(text, ["whatsapp", "call me", "pm me", "dm me"])) return "Customer prefers WhatsApp / direct reply";
  return "";
}

function findProduct(text, profile) {
  const lower = text.toLowerCase();
  const keyword = profile.keywords.find((word) => lower.includes(word.toLowerCase()));
  if (keyword) return keyword;

  const needMatch = text.match(/\b(?:need|want|looking for|quote for|do you do|can you do)\s+([^?.!,]{3,80})/i);
  return needMatch ? needMatch[1].trim() : "";
}

function findScope(text) {
  const matches = [];
  if (includesAny(text, ["logo", "artwork", "design", "print"])) matches.push("Design / logo / printing mentioned");
  if (includesAny(text, ["delivery", "deliver", "courier", "shipping"])) matches.push("Delivery mentioned");
  if (includesAny(text, ["monthly", "retainer", "maintenance"])) matches.push("Monthly / ongoing scope mentioned");
  if (includesAny(text, ["form", "whatsapp button", "ecommerce", "payment", "booking"])) matches.push("Website features mentioned");
  return matches.join("; ");
}

function findCompany(text) {
  if (includesAny(text, ["sdn bhd", "enterprise", "sole prop", "ssm"])) return "Company/entity mentioned";
  return "";
}

function findCustomization(text) {
  const items = [];
  if (includesAny(text, ["logo", "artwork", "print", "sticker", "label"])) items.push("Logo/artwork/printing");
  if (includesAny(text, ["size", "small", "medium", "large"])) items.push("Size");
  if (includesAny(text, ["colour", "color", "black", "white", "kraft"])) items.push("Colour/material");
  return items.join(", ");
}

function buildDetails(text, profile) {
  return {
    business: normalizeText(businessContext.value),
    language: replyLanguage.value,
    category: profile.label,
    product: findProduct(text, profile),
    quantity: findQuantity(text),
    location: findLocation(text),
    timeline: findTimeline(text),
    budget: findBudget(text),
    contact: findContact(text),
    customization: findCustomization(text),
    scope: findScope(text),
    company: findCompany(text),
  };
}

function fieldValue(details, field) {
  return details[field] || "";
}

function missingRequired(details, profile) {
  return profile.required.filter(([field]) => !fieldValue(details, field));
}

function quoteReadiness(details, profile, missing) {
  const total = profile.required.length;
  const known = total - missing.length;
  const score = Math.round((known / total) * 100);
  const hasCore = Boolean(details.product || details.scope);

  if (!hasCore) {
    return {
      label: "Too vague",
      text: "Too vague to quote. First confirm what product/service the customer actually wants.",
      score,
    };
  }

  if (missing.length === 0) {
    return {
      label: "Ready to quote",
      text: "Enough basic details to prepare a quote or package option. Ask only optional details that affect price.",
      score,
    };
  }

  if (missing.length <= 1) {
    return {
      label: "Almost ready",
      text: "Almost ready to quote. Ask the remaining missing detail, then prepare price/options.",
      score,
    };
  }

  if (missing.length <= 3) {
    return {
      label: "Need a few details",
      text: "Can reply now, but do not quote final price yet. Ask the missing details first.",
      score,
    };
  }

  return {
    label: "Not ready",
    text: "Not enough detail for a useful quote. Send a short clarification message before pricing.",
    score,
  };
}

function buildQuestions(details, profile, missing) {
  const missingQuestions = missing.map(([, label]) => `Please confirm: ${label}.`);
  const profileQuestions = profile.questions.filter((question) => {
    const lower = question.toLowerCase();
    if (details.location && lower.includes("delivery")) return false;
    if (details.timeline && (lower.includes("time") || lower.includes("urgent"))) return false;
    if (details.customization && lower.includes("logo")) return false;
    return true;
  });

  return [...missingQuestions, ...profileQuestions].slice(0, 5);
}

function line(label, value) {
  return `${label}: ${value || "Not confirmed yet"}`;
}

function buildSummary(cleanInput, details) {
  return [
    line("Detected enquiry type", details.category),
    line("Customer wants", details.product),
    line("Quantity / scope", details.quantity || details.scope),
    line("Location", details.location),
    line("Timeline / urgency", details.timeline),
    line("Budget / target price", details.budget),
    line("Special requirements", details.customization || details.scope),
    line("Contact clue", details.contact),
    "",
    `Original message: ${cleanInput}`,
  ].join("\n");
}

function questionLines(questions) {
  return questions.map((question, index) => `${index + 1}. ${question}`).join("\n");
}

function buildReply(details, questions, readiness) {
  const business = details.business ? ` (${details.business})` : "";
  const askLines = questions.slice(0, 4).map((question, index) => `${index + 1}. ${question.replace("Please confirm: ", "")}`);
  const needLine = [
    details.product || details.category,
    details.quantity,
    details.location ? `area: ${details.location}` : "",
    details.timeline ? `needed: ${details.timeline}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  if (details.language === "mixed") {
    return [
      `Hi, thanks for your enquiry${business}. 我先帮你确认资料，这样报价会比较准确。`,
      "",
      `我看到你的需求大概是: ${needLine || "需要先确认产品/服务和数量"}.`,
      readiness.label === "Ready to quote" || readiness.label === "Almost ready"
        ? "资料基本够了，我再确认以下会影响价格的细节:"
        : "Before I quote, can you confirm these details?",
      ...askLines,
      "",
      "确认后我可以给你合适的 option、price range 和下一步安排。",
    ].join("\n");
  }

  if (details.language === "bm") {
    return [
      `Hi, thanks for your enquiry${business}. I can check this for you.`,
      "",
      `From your message, the request looks like: ${needLine || "product/service still needs confirmation"}.`,
      readiness.label === "Ready to quote" || readiness.label === "Almost ready"
        ? "Details are mostly enough. Boleh confirm this final detail?"
        : "Before I quote, boleh confirm these details?",
      ...askLines,
      "",
      "Once confirmed, I can advise the suitable option, estimated price range, and next step.",
    ].join("\n");
  }

  return [
    `Hi, thanks for your enquiry${business}. I can help check this for you.`,
    "",
    `From your message, I understand the request is: ${needLine || "product/service still needs confirmation"}.`,
    readiness.label === "Ready to quote" || readiness.label === "Almost ready"
      ? "I have most of the details. Could you confirm this final detail before I prepare the quote?"
      : "Before I quote, could you confirm these details?",
    ...askLines,
    "",
    "After that, I can share the suitable option, estimated price range, and next step.",
  ].join("\n");
}

function buildActions(readiness, missing) {
  const actions = [];

  if (readiness.label === "Ready to quote") {
    actions.push("Prepare a quote, price range, or 2-3 package options. Ask optional details only if they affect price.");
  } else if (readiness.label === "Almost ready") {
    actions.push("Ask the remaining required detail, then prepare a price range or 2-3 package options.");
  } else {
    actions.push("Send the suggested reply first. Do not give final pricing until the missing details are confirmed.");
  }

  if (missing.length) {
    actions.push(`Track missing info: ${missing.map(([, label]) => label).join(", ")}.`);
  }

  actions.push("Save this lead with category, location, budget, deadline, and follow-up status.");
  actions.push("If the customer replies with enough detail, send quote/options in the next message.");

  return actions.map((action, index) => `${index + 1}. ${action}`).join("\n");
}

function generateBrief(rawInput) {
  const cleanInput = normalizeText(rawInput);
  const categoryKey = detectCategory(cleanInput);
  const profile = categoryProfiles[categoryKey] || categoryProfiles.general;
  const details = buildDetails(cleanInput, profile);
  const missing = missingRequired(details, profile);
  const readiness = quoteReadiness(details, profile, missing);
  const questions = buildQuestions(details, profile, missing);

  return {
    readiness: [
      `${readiness.label} (${readiness.score}%)`,
      readiness.text,
      missing.length ? `Missing: ${missing.map(([, label]) => label).join(", ")}` : "Missing: None obvious from this message.",
    ].join("\n"),
    summary: buildSummary(cleanInput, details),
    questions: questionLines(questions),
    reply: buildReply(details, questions, readiness),
    actions: buildActions(readiness, missing),
  };
}

function setOutput(result) {
  Object.entries(outputIds).forEach(([key, id]) => {
    document.querySelector(`#${id}`).textContent = result[key];
  });
}

function resetOutput() {
  setOutput({
    readiness: "Paste a customer enquiry and click Generate brief.",
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
          "报价准备度",
          document.querySelector(`#${outputIds.readiness}`).textContent.trim(),
          "",
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
  briefStatus.textContent = "Brief generated. Check quote readiness before replying.";
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

document.querySelectorAll("[data-example]").forEach((button) => {
  button.addEventListener("click", () => {
    customerInput.value = button.dataset.example;
    customerInput.focus();
  });
});
