const QUOTE_REQUESTS_SHEET = "Quote Requests";
const PROVIDER_LISTINGS_SHEET = "Provider Listings";
const OTHER_SUBMISSIONS_SHEET = "Other Submissions";
const NOTIFY_EMAIL = "hello@smes.com.my";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = e.parameter || {};
    const target = getSubmissionTarget_(data.form_type);
    const sheet = getSheet_(target.name, target.headers);
    const row = target.buildRow(data);

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

function getSubmissionTarget_(formType) {
  if (formType === "quote_request") {
    return {
      name: QUOTE_REQUESTS_SHEET,
      headers: [
        "Timestamp",
        "Service Needed",
        "Location",
        "Contact",
        "Budget / Urgency",
        "Subject",
        "Page URL",
        "User Agent",
      ],
      buildRow: (data) => [
        new Date(),
        data.service || "",
        data.location || "",
        data.contact || "",
        data.budget || "",
        data._subject || "",
        data.page_url || "",
        data.user_agent || "",
      ],
    };
  }

  if (formType === "provider_listing") {
    return {
      name: PROVIDER_LISTINGS_SHEET,
      headers: [
        "Timestamp",
        "Company",
        "Main Service",
        "Contact",
        "Subject",
        "Page URL",
        "User Agent",
      ],
      buildRow: (data) => [
        new Date(),
        data.company || "",
        data.main_service || "",
        data.contact || "",
        data._subject || "",
        data.page_url || "",
        data.user_agent || "",
      ],
    };
  }

  return {
    name: OTHER_SUBMISSIONS_SHEET,
    headers: [
      "Timestamp",
      "Form Type",
      "Service Needed",
      "Location",
      "Company",
      "Main Service",
      "Contact",
      "Budget / Urgency",
      "Subject",
      "Page URL",
      "User Agent",
    ],
    buildRow: (data) => [
      new Date(),
      data.form_type || "",
      data.service || "",
      data.location || "",
      data.company || "",
      data.main_service || "",
      data.contact || "",
      data.budget || "",
      data._subject || "",
      data.page_url || "",
      data.user_agent || "",
    ],
  };
}

function getSheet_(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
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
