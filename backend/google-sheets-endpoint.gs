/**
 * Salary Check: save each submission as a row in a Google Sheet.
 *
 * Setup (5 minutes, no server needed):
 * 1. Create a Google Sheet. Rename the first tab to "Submissions".
 * 2. Extensions > Apps Script. Delete the sample code and paste this whole file. Save.
 * 3. Deploy > New deployment > type "Web app".
 *      Execute as: Me
 *      Who has access: Anyone
 *    Click Deploy, approve the permissions, and copy the Web app URL (ends in /exec).
 * 4. In index.html, set:  const SUBMIT_ENDPOINT = "<that URL>";
 *
 * The page sends one JSON object per submission (as text/plain, which avoids a CORS preflight
 * that Apps Script can't answer). Columns are created on the first submission.
 */
const COLUMNS = ["at", "role", "yrs", "company", "companyMatched", "empType", "city", "edu",
  "college", "collegeTier", "fixedPay", "benchmark", "rangeLow", "rangeHigh"];

function doPost(e) {
  try {
    const rec = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActive().getSheetByName("Submissions")
      || SpreadsheetApp.getActive().insertSheet("Submissions");
    if (sheet.getLastRow() === 0) sheet.appendRow(["received"].concat(COLUMNS));
    const row = COLUMNS.map(function (k) {
      const v = rec[k];
      if (k === "at" && v) return new Date(v);
      if (v === undefined || v === null) return "";
      if (typeof v === "number") return v;
      const s = String(v).slice(0, 200);
      return /^[=+\-@]/.test(s) ? "'" + s : s;   // stop typed text from running as a spreadsheet formula
    });
    sheet.appendRow([new Date()].concat(row));
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error");
  }
}
