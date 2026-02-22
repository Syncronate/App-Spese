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
const GEMINI_API_KEY = 'INSERISCI_QUI_LA_TUA_CHIAVE_GEMINI'; // Se non l'hai già fatto nelle impostazioni online
const PROMPT = "Analizza questo scontrino e restituisci SOLO un oggetto JSON con questi campi: {store: string, date: YYYY-MM-DD, total: number, items: [{name: string, price: number, category: string}]}. Usa le categorie: frutta_verdura, carne_pesce, latticini, pane_cereali, bevande, casa_pulizia, ristorante, trasporti, igiene, abbigliamento, tecnologia, altro.";

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

    if (action === 'scan') {
      const result = scanReceipt(payload.image);
      return jsonResponse({ success: true, analysis: result });
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

function scanReceipt(base64Image) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const payload = {
    contents: [{
      parts: [
        { text: PROMPT },
        {
          inline_data: {
            mime_type: "image/jpeg",
            data: base64Image
          }
        }
      ]
    }],
    generationConfig: {
      response_mime_type: "application/json"
    }
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const text = response.getContentText();
    const result = JSON.parse(text);
    
    if (result.candidates && result.candidates[0].content.parts[0].text) {
      let jsonStr = result.candidates[0].content.parts[0].text;
      // Remove markdown code blocks if present
      jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonStr);
    }
    return { error: "Formato risposta Gemini non valido", raw: text };
  } catch (e) {
    return { error: "Eccezione Apps Script: " + e.message };
  }
}