const SHEET_NAME = "Leads";
const NOTIFY_EMAIL = "hello@smes.com.my";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getLeadSheet_();
    const data = e.parameter || {};
    const row = [
      new Date(),
      data.form_type || "",
      data.service || "",
      data.location || "",
      data.company || "",
      data.main_service || "",
      data.contact || "",
      data._subject || "",
      data.page_url || "",
      data.user_agent || "",
    ];

    sheet.appendRow(row);
    notify_(data);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.message }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getLeadSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Form Type",
      "Service Needed",
      "Location",
      "Company",
      "Main Service",
      "Contact",
      "Subject",
      "Page URL",
      "User Agent",
    ]);
  }

  return sheet;
}

function notify_(data) {
  if (!NOTIFY_EMAIL) return;

  const subject = data._subject || "New smes.my lead";
  const body = [
    "New smes.my submission",
    "",
    `Form type: ${data.form_type || ""}`,
    `Service needed: ${data.service || ""}`,
    `Location: ${data.location || ""}`,
    `Company: ${data.company || ""}`,
    `Main service: ${data.main_service || ""}`,
    `Contact: ${data.contact || ""}`,
    `Page URL: ${data.page_url || ""}`,
  ].join("\n");

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function doGet() {
  return ContentService.createTextOutput("smes.my lead endpoint is running.");
}
