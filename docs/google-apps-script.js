const NOTIFY_EMAIL = "hello@smes.com.my";
const SCRIPT_VERSION = "2026-05-28 complete-loop-v3";

const FORM_CONFIG = {
  quote_request: {
    sheet: "Quote Requests",
    headers: ["Timestamp", "Service Needed", "Location", "Business Type", "Contact", "Budget / Urgency", "Extra Details", "Lead Status", "Matched Providers", "Subject", "Page URL", "User Agent"],
    fields: ["service", "location", "business_type", "contact", "budget", "details", "lead_status", "matched_providers", "_subject", "page_url", "user_agent"],
  },
  provider_listing: {
    sheet: "Provider Listings",
    headers: ["Timestamp", "Company", "Main Service", "Location", "Website / Profile", "Languages", "Contact", "Service Scope", "Review Status", "Subject", "Page URL", "User Agent"],
    fields: ["company", "main_service", "location", "website", "languages", "contact", "details", "review_status", "_subject", "page_url", "user_agent"],
  },
  other: {
    sheet: "Other Submissions",
    headers: ["Timestamp", "Form Type", "Service Needed", "Location", "Business Type", "Company", "Main Service", "Website / Profile", "Languages", "Contact", "Budget / Urgency", "Extra Details", "Subject", "Page URL", "User Agent"],
    fields: ["form_type", "service", "location", "business_type", "company", "main_service", "website", "languages", "contact", "budget", "details", "_subject", "page_url", "user_agent"],
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
    `Service needed: ${data.service || ""}`,
    `Location: ${data.location || ""}`,
    `Business type: ${data.business_type || ""}`,
    `Company: ${data.company || ""}`,
    `Main service: ${data.main_service || ""}`,
    `Website / profile: ${data.website || ""}`,
    `Languages: ${data.languages || ""}`,
    `Contact: ${data.contact || ""}`,
    `Budget / urgency: ${data.budget || ""}`,
    `Details: ${data.details || ""}`,
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
