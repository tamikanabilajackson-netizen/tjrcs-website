/**
 * Paste this into the Google Sheet's Apps Script editor
 * (Extensions > Apps Script), then deploy it as a Web App.
 * See README.md for full step-by-step instructions.
 */

const SHEET_NAME = 'Submissions';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    sheet.appendRow([
      new Date(),
      data.source || '',
      data.name || '',
      data.email || '',
      data.category || '',
      data.message || '',
      data.referral || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Source (which form)',
      'Name',
      'Email',
      'Category',
      'Message',
      'Referral (how they heard)',
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}
