/* ============================================
   GOOGLE APPS SCRIPT - SpesaTracker Backend
   
   SETUP:
   1. Crea un Google Sheet con foglio "Spese"
   2. Intestazioni riga 1: ID | Data | Persona | Categoria | Descrizione | Importo | Negozio | Note | Items
   3. Estensioni > Apps Script > incolla questo codice
   4. Deploy > Nuova distribuzione > App web
   5. Esegui come: Me, Accesso: Chiunque
   6. Copia l'URL e incollalo nelle impostazioni dell'app
   ============================================ */

const SHEET_NAME = 'Spese';

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function doGet(e) {
  const action = e.parameter.action || 'getAll';
  
  if (action === 'getAll') {
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    data.shift(); // Remove header row
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getSheet();
    const action = payload.action;
    
    if (action === 'add') {
      sheet.appendRow([
        payload.id,
        payload.date,
        payload.person,
        payload.category,
        payload.description || '',
        payload.amount,
        payload.store || '',
        payload.notes || '',
        payload.items || '[]',
      ]);
      return jsonResponse({ success: true });
    }
    
    if (action === 'update') {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === payload.id) {
          sheet.getRange(i + 1, 1, 1, 9).setValues([[
            payload.id, payload.date, payload.person,
            payload.category, payload.description || '',
            payload.amount, payload.store || '',
            payload.notes || '', payload.items || '[]',
          ]]);
          break;
        }
      }
      return jsonResponse({ success: true });
    }
    
    if (action === 'delete') {
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (data[i][0] === payload.id) {
          sheet.deleteRow(i + 1);
          break;
        }
      }
      return jsonResponse({ success: true });
    }
    
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}