### Connect forms to Google Sheets (no server required)

Use a Google Apps Script Web App as a tiny webhook that appends submissions into your spreadsheet. The frontend is already wired to POST JSON to this endpoint.

1) Create a Google Sheet with two tabs named `Apply` and `Innovation` (or change via env).

2) In the Sheet, Extensions → Apps Script → replace the code with the script below and save.

```javascript
// Set a strong key and paste the same value into VITE_API_KEY in your env
const SHARED_API_KEY = 'CHANGE_ME_STRONG_RANDOM_STRING';

function doPost(e) {
  try {
    // Handle both URL-encoded (e.parameter.json) and raw JSON (e.postData.contents)
    let body;
    if (e.parameter && e.parameter.json) {
      body = JSON.parse(e.parameter.json);
    } else if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    } else {
      return _json({ ok: false, error: 'No body' }, 400);
    }
    
    if (!body || body.key !== SHARED_API_KEY) {
      return _json({ ok: false, error: 'Unauthorized' }, 401);
    }

    const sheetName = (body.sheet || 'Apply').toString();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    // Flatten payload
    const nowIso = new Date().toISOString();
    const payload = {
      timestamp: nowIso,
      form: body.form || '',
      role: body.role || '',
      ...Object(body.data || {})
    };

    // Ensure headers
    const existingHeaders = sheet.getLastRow() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    const keys = Object.keys(payload);
    const headers = Array.from(new Set([...(existingHeaders || []), ...keys])).filter(Boolean);
    if (headers.length === 0) headers.push('timestamp');
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Build row in header order
    const row = headers.map((h) => (payload[h] == null ? '' : String(payload[h])));
    sheet.appendRow(row);

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) }, 500);
  }
}

function _json(obj, code) {
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  if (code) {
    // Apps Script web apps always respond 200, so we include ok/error in JSON
  }
  return out;
}
```

3) Deploy → Manage deployments → New deployment → Type: Web app
   - Execute as: Me
   - Who has access: Anyone with the link
   - Copy the Web app URL

4) In your project, copy `env.sample` to a new `.env` (or `.env.local`) and set:

```bash
VITE_APPS_SCRIPT_URL=<paste the Web app URL>
VITE_API_KEY=<same SHARED_API_KEY as in the script>
VITE_SHEETS_TAB_APPLY=Apply
VITE_SHEETS_TAB_INNOVATION=Innovation
```

5) Restart dev server so Vite picks up env. Submissions from `Apply` and `SubmitInnovation` will append to the corresponding tabs.

Notes
- The OAuth client id/secret are not needed with this approach; Apps Script runs with your Google account and writes directly to the sheet.
- If you prefer OAuth from the browser, we can swap to Google Identity Services and the Sheets API with a Spreadsheet ID. That requires enabling APIs and CORS restrictions.

