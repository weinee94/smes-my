/* global SpreadsheetApp, LockService, ContentService, CacheService, Utilities, MailApp */
// Deploy only to the existing SMEs.MY lead web app. Older records are untouched.
const SCRIPT_VERSION = "2026-09-16 money-v1";
const LEAD_SHEET_ID = "1PIxhw0LVdEjQJa5nTdXzcM10aQsYUV7UeQU9aSOfShE";
const NOTIFY_EMAIL = "weineetan@smes.com.my";
const HEADERS = ["Created at", "Lead ID", "Service", "Location", "Business type", "Contact", "Request", "Consent version", "Consent at", "Page", "Source", "UTM source", "UTM medium", "UTM campaign", "Referrer", "Status", "Provider", "Next action", "Follow-up date", "Outcome", "Fee agreed (MYR)", "Fee received (MYR)", "Notification", "Updated at"];

function validateLead_(data) {
  const services = ["Accounting services", "Company secretary", "Not sure - accounting or company secretary"];
  if (data.form_type !== "quote_request" || !services.includes(data.service)) return "unsupported_service";
  if (data.website) return "invalid_request";
  if (data.consent !== "yes" || data.consent_version !== "2026-09-16") return "consent_required";
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(data.request_id || "")) return "invalid_reference";
  const contact = String(data.contact || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && !/^\+?[\d ()-]{8,24}$/.test(contact)) return "invalid_contact";
  for (const [field, min, max] of [["location",2,120],["contact",8,160],["details",10,3000]]) {
    const value = String(data[field] || "").trim();
    if (value.length < min || value.length > max) return "invalid_" + field;
  }
  if (/https?:\/\/|<\/?[a-z][^>]*>/i.test(data.details)) return "plain_text_required";
  const elapsed = Date.now() - Number(data.started_at);
  if (!Number.isFinite(elapsed) || elapsed < 1500) return "invalid_request";
  return "";
}

function safeCell_(value) {
  const text = String(value || "").trim();
  return /^[=+@-]/.test(text) ? "'" + text : text;
}

function doPost(e) {
  const data = e && e.parameter || {};
  const error = validateLead_(data);
  if (error) return json_({ ok: false, error });
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json_({ ok: false, error: "busy_retry" });
  let savedId = "";
  try {
    const book = SpreadsheetApp.openById(LEAD_SHEET_ID);
    let sheet = book.getSheetByName("Service Leads v1");
    if (!sheet) {
      sheet = book.insertSheet("Service Leads v1");
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#d1fae5");
      sheet.getRange(2, 16, sheet.getMaxRows() - 1, 1).setDataValidation(
        SpreadsheetApp.newDataValidation().requireValueInList(["new", "needs_info", "qualified", "introduced", "quoted", "won", "lost", "no_match", "spam", "test"], true).setAllowInvalid(false).build()
      );
    }
    const leadId = "SME-" + data.request_id.toLowerCase();
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const found = sheet.getRange(2, 2, lastRow - 1, 1).createTextFinder(leadId).matchEntireCell(true).findNext();
      if (found) return json_({ ok: true, saved: true, lead_id: leadId, duplicate: true, version: SCRIPT_VERSION });
    }
    // This is abuse friction, not proof of identity. Operators still qualify leads.
    const cache = CacheService.getScriptCache();
    const key = Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(data.contact).trim().toLowerCase()));
    const count = Number(cache.get(key) || 0);
    if (count >= 3) return json_({ ok: false, error: "rate_limited" });
    const now = new Date();
    const cell = (field, max) => safeCell_(String(data[field] || "").slice(0, max || 120));
    sheet.appendRow([now, leadId, cell("service"), cell("location"), cell("business_type"), cell("contact",160), cell("details",3000), data.consent_version, now, cell("page_url",250), cell("source"), cell("utm_source"), cell("utm_medium"), cell("utm_campaign"), cell("referrer",250), "new", "", "Review scope and provider availability", "", "", "", "", "pending", now]);
    SpreadsheetApp.flush();
    savedId = leadId;
    const row = sheet.getLastRow();
    cache.put(key, String(count + 1), 3600);
    try {
      // Keep contact and request details inside the restricted spreadsheet.
      MailApp.sendEmail(NOTIFY_EMAIL, "SMEs.MY new lead " + leadId,
        "A new service request has been saved.\nReference: " + leadId + "\nReview and update status: https://docs.google.com/spreadsheets/d/" + LEAD_SHEET_ID + "/edit#gid=" + sheet.getSheetId());
      sheet.getRange(row, 23).setValue("sent");
    } catch {
      sheet.getRange(row, 23).setValue("failed — check Apps Script executions; lead is saved");
    }
    return json_({ ok: true, saved: true, lead_id: leadId, version: SCRIPT_VERSION });
  } catch {
    // Never ask the visitor to resubmit an already persisted lead.
    return savedId ? json_({ ok: true, saved: true, lead_id: savedId, version: SCRIPT_VERSION }) : json_({ ok: false, error: "save_failed" });
  } finally {
    lock.releaseLock();
  }
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_({ ok: true, version: SCRIPT_VERSION });
}
