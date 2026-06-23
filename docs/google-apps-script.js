const NOTIFY_EMAIL = "hello@smes.com.my";
const SCRIPT_VERSION = "2026-06-23 provider-claim-v4";

const FORM_CONFIG = {
  quote_request: {
    sheet: "Quote Requests",
    headers: ["Timestamp", "Service Needed", "Location", "Business Type", "Contact", "Budget / Urgency", "Extra Details", "Lead Status", "Matched Providers", "Subject", "Page URL", "User Agent"],
    fields: ["service", "location", "business_type", "contact", "budget", "details", "lead_status", "matched_providers", "_subject", "page_url", "user_agent"],
  },
  provider_listing: {
    sheet: "Provider Listings",
    headers: ["Timestamp", "Claim Intent", "Company", "Main Service", "Location", "Website / Profile", "Entity / Registration Type", "Languages", "Contact", "Service Scope", "Industry Proof Details", "Review Status", "Subject", "Page URL", "User Agent"],
    fields: ["claim_intent", "company", "main_service", "location", "website", "entity_type", "languages", "contact", "details", "proof_details", "review_status", "_subject", "page_url", "user_agent"],
  },
  other: {
    sheet: "Other Submissions",
    headers: ["Timestamp", "Form Type", "Claim Intent", "Service Needed", "Location", "Business Type", "Company", "Main Service", "Website / Profile", "Entity / Registration Type", "Languages", "Contact", "Budget / Urgency", "Extra Details", "Industry Proof Details", "Subject", "Page URL", "User Agent"],
    fields: ["form_type", "claim_intent", "service", "location", "business_type", "company", "main_service", "website", "entity_type", "languages", "contact", "budget", "details", "proof_details", "_subject", "page_url", "user_agent"],
  },
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = e.parameter || {};
    const config = FORM_CONFIG[data.form_type] || FORM_CONFIG.other;
    const sheet = getSheet_(config.sheet, config.headers);
    if (data.form_type === "quote_request" && !data.lead_status) data.lead_status = "new";
    if (data.form_type === "provider_listing" && !data.review_status) data.review_status = "new";
    const row = [new Date()].concat(config.fields.map((field) => data[field] || ""));

    sheet.appendRow(row);
    notify_(data);

    return json_({ ok: true, version: SCRIPT_VERSION, sheet: config.sheet });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) sheet = spreadsheet.insertSheet(sheetName);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);

  return sheet;
}

function notify_(data) {
  if (!NOTIFY_EMAIL) return;

  const body = [
    "New smes.my submission",
    "",
    `Form type: ${data.form_type || ""}`,
    `Claim intent: ${data.claim_intent || ""}`,
    `Service needed: ${data.service || ""}`,
    `Location: ${data.location || ""}`,
    `Business type: ${data.business_type || ""}`,
    `Company: ${data.company || ""}`,
    `Main service: ${data.main_service || ""}`,
    `Website / profile: ${data.website || ""}`,
    `Entity / registration type: ${data.entity_type || ""}`,
    `Languages: ${data.languages || ""}`,
    `Contact: ${data.contact || ""}`,
    `Budget / urgency: ${data.budget || ""}`,
    `Details: ${data.details || ""}`,
    `Industry proof details: ${data.proof_details || ""}`,
    `Page URL: ${data.page_url || ""}`,
  ].join("\n");

  MailApp.sendEmail(NOTIFY_EMAIL, data._subject || "New smes.my lead", body);
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(`smes.my lead endpoint is running: ${SCRIPT_VERSION}`);
}
