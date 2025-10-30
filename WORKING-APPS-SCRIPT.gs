// FINAL WORKING VERSION - Copy this EXACTLY into Google Apps Script
// Make sure SHARED_API_KEY matches your .env file

const SHARED_API_KEY = 'vrtw0cvrv3673cg45234787heijGDEWYne9143jfnshjeu66dgfytfitxws';

function doPost(e) {
  try {
    // Log for debugging (view in Apps Script editor: View > Logs)
    console.log('Received request');
    console.log('e:', e);
    
    // Check if e is defined
    if (!e) {
      console.log('ERROR: Event object is undefined');
      return _json({ ok: false, error: 'Invalid request - no event data' }, 400);
    }
    
    console.log('e.parameter:', e.parameter);
    console.log('e.postData:', e.postData);
    
    // Parse incoming data based on Content-Type
    let body;
    
    // Method 1: URL-encoded form data (e.parameter.json)
    if (e.parameter && e.parameter.json) {
      console.log('Parsing URL-encoded JSON');
      body = JSON.parse(e.parameter.json);
    }
    // Method 2: Raw JSON (e.postData.contents)
    else if (e.postData && e.postData.contents) {
      console.log('Parsing raw JSON');
      body = JSON.parse(e.postData.contents);
    }
    // No data found
    else {
      console.log('ERROR: No data found in request');
      return _json({ ok: false, error: 'No body received' }, 400);
    }
    
    console.log('Parsed body:', body);
    
    // Verify API key
    if (!body.key || body.key !== SHARED_API_KEY) {
      console.log('ERROR: Invalid API key');
      return _json({ ok: false, error: 'Unauthorized' }, 401);
    }

    // Get or create sheet
    const sheetName = (body.sheet || 'Apply').toString();
    console.log('Using sheet:', sheetName);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      console.log('Creating new sheet:', sheetName);
      sheet = ss.insertSheet(sheetName);
    }

    // Flatten the data
    const nowIso = new Date().toISOString();
    const payload = {
      timestamp: nowIso,
      form: body.form || '',
      role: body.role || '',
      ...Object(body.data || {})
    };

    console.log('Flattened payload:', payload);

    // Ensure headers exist
    const existingHeaders = sheet.getLastRow() > 0 
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] 
      : [];
    const keys = Object.keys(payload);
    const headers = Array.from(new Set([...(existingHeaders || []), ...keys])).filter(Boolean);
    
    if (headers.length === 0) {
      headers.push('timestamp');
    }
    
    // Write headers to row 1
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Build row data in header order
    const row = headers.map((h) => (payload[h] == null ? '' : String(payload[h])));
    console.log('Appending row:', row);
    
    // Append the row
    sheet.appendRow(row);

    console.log('SUCCESS: Data saved');
    return _json({ ok: true, message: 'Saved to ' + sheetName });
    
  } catch (err) {
    console.log('ERROR:', err);
    return _json({ 
      ok: false, 
      error: String(err), 
      stack: err.stack 
    }, 500);
  }
}

function doGet(e) {
  // Handle GET requests for testing
  console.log('Received GET request');
  console.log('e:', e);
  return _json({ ok: true, message: 'GET request received', e: e }, 200);
}

function _json(obj, code) {
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}

