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
const SPREADSHEET_ID = '1koeAMVShobVrNNsCIeakrL2T7PoVjsUOPcA2Q_4Q76k'; // ID fornito dall'utente
const PROMPT = "Analizza questo scontrino e restituisci SOLO un oggetto JSON con questi campi: {store: string, date: YYYY-MM-DD, total: number, items: [{name: string, price: number, category: string}]}. Usa le categorie: frutta_verdura, carne_pesce, latticini, pane_cereali, bevande, casa_pulizia, ristorante, trasporti, igiene, abbigliamento, tecnologia, altro.";

function getApiKey() {
  // 1. Prova a prenderla dalle proprietà del progetto (consigliato)
  const key = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (key && key !== 'INSERISCI_QUI_LA_TUA_CHIAVE_GEMINI') return key;
  
  // 2. Ritorna la costante hardcoded (come fallback)
  return 'INSERISCI_QUI_LA_TUA_CHIAVE_GEMINI'; 
}

function getSheet() {
  let ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    // Se non esiste, prendi il primo foglio disponibile
    sheet = ss.getSheets()[0];
  }
  return sheet;
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
  const apiKey = getApiKey();
  if (apiKey === 'INSERISCI_QUI_LA_TUA_CHIAVE_GEMINI') {
    return { error: "API Key mancante in Code.gs. Inseriscila nella variabile GEMINI_API_KEY o nelle Proprietà del Progetto." };
  }
  
  // Usiamo gemini-1.5-flash-8b che è più leggero e ha limiti di quota più generosi nel piano gratuito
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-8b:generateContent?key=${apiKey}`;
  
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
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const text = response.getContentText();
    const result = JSON.parse(text);
    
    if (response.getResponseCode() !== 200) {
      return { 
        error: "Errore Gemini API (" + response.getResponseCode() + ")", 
        details: result.error?.message || "Errore sconosciuto",
        keyUsed: apiKey.substring(0, 4) + "****"
      };
    }
    
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