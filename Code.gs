/* ============================================
   GOOGLE APPS SCRIPT - SpesaTracker Backend
   
   SETUP:
   1. Crea un Google Sheet con foglio "Spese" e "Dettaglio Articoli"
   2. Intestazioni riga 1 Spese: Receipt ID | Data | Persona | Categoria | Descrizione | Importo Totale | Negozio | Note | Link Ricevuta
   3. Intestazioni riga 1 Dettaglio Articoli: Item ID | Receipt ID | Nome Articolo | Categoria Articolo | Quantità | Prezzo Unitario | Prezzo Totale
   4. Estensioni > Apps Script > incolla questo codice
   5. Deploy > Nuova distribuzione > App web
   6. Esegui come: Me, Accesso: Chiunque
   7. Copia l'URL e incollalo nelle impostazioni dell'app
   ============================================ */

const SHEET_NAME = 'Spese';
const ITEMS_SHEET_NAME = 'Dettaglio Articoli';
const QUOTES_SHEET_NAME = 'Preventivi';
const SPREADSHEET_ID = '1koeAMVShobVrNNsCIeakrL2T7PoVjsUOPcA2Q_4Q76k'; // ID fornito dall'utente

function getSheet() {
  let ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Receipt ID', 'Data', 'Persona', 'Categoria', 'Descrizione',
      'Importo Totale', 'Negozio', 'Note', 'Link Ricevuta'
    ]);
  }
  return sheet;
}

function getItemsSheet() {
  let ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  
  let sheet = ss.getSheetByName(ITEMS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(ITEMS_SHEET_NAME);
    sheet.appendRow([
      'Item ID', 'Receipt ID', 'Nome Articolo', 'Categoria Articolo',
      'Quantità', 'Prezzo Unitario', 'Prezzo Totale'
    ]);
  }
  return sheet;
}

function getQuotesSheet() {
  let ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  let sheet = ss.getSheetByName(QUOTES_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(QUOTES_SHEET_NAME);
    sheet.appendRow([
      'ID',
      'Titolo',
      'Area',
      'Stato',
      'Budget',
      'Data Target',
      'Note',
      'Preventivi JSON',
      'Creato il',
      'Aggiornato il',
    ]);
  }
  return sheet;
}

function doGet(e) {
  const action = e.parameter.action || 'getAll';
  
  if (action === 'getAll') {
    const sheet = getSheet();
    const itemsSheet = getItemsSheet();

    const data = sheet.getDataRange().getValues();
    data.shift(); // Remove header row
    
    const itemsData = itemsSheet.getDataRange().getValues();
    itemsData.shift(); // Remove header row

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data, itemsData }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'getQuotes') {
    const sheet = getQuotesSheet();
    const data = sheet.getDataRange().getValues();
    data.shift();

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getSheet();
    const itemsSheet = getItemsSheet();
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
        payload.receiptLink || '',
      ]);

      const items = typeof payload.items === 'string' ? JSON.parse(payload.items) : payload.items;
      if (items && Array.isArray(items)) {
        items.forEach(item => {
          itemsSheet.appendRow([
            item.id,
            payload.id,
            item.name || '',
            item.category || '',
            item.quantity || 1,
            item.price || 0,
            item.totalPrice || 0
          ]);
        });
      }
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
            payload.notes || '', payload.receiptLink || '',
          ]]);
          break;
        }
      }

      // Delete old items
      const itemsData = itemsSheet.getDataRange().getValues();
      for (let i = itemsData.length - 1; i >= 1; i--) {
        if (itemsData[i][1] === payload.id) {
          itemsSheet.deleteRow(i + 1);
        }
      }

      // Add new items
      const items = typeof payload.items === 'string' ? JSON.parse(payload.items) : payload.items;
      if (items && Array.isArray(items)) {
        items.forEach(item => {
          itemsSheet.appendRow([
            item.id,
            payload.id,
            item.name || '',
            item.category || '',
            item.quantity || 1,
            item.price || 0,
            item.totalPrice || 0
          ]);
        });
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

      // Delete associated items
      const itemsData = itemsSheet.getDataRange().getValues();
      for (let i = itemsData.length - 1; i >= 1; i--) {
        if (itemsData[i][1] === payload.id) {
          itemsSheet.deleteRow(i + 1);
        }
      }

      return jsonResponse({ success: true });
    }

    if (action === 'quoteNeedAdd') {
      const quotesSheet = getQuotesSheet();
      quotesSheet.appendRow(quoteNeedRow(payload));
      return jsonResponse({ success: true });
    }

    if (action === 'quoteNeedUpdate') {
      const quotesSheet = getQuotesSheet();
      const data = quotesSheet.getDataRange().getValues();
      let updated = false;
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === payload.id) {
          quotesSheet.getRange(i + 1, 1, 1, 10).setValues([quoteNeedRow(payload)]);
          updated = true;
          break;
        }
      }
      if (!updated) quotesSheet.appendRow(quoteNeedRow(payload));
      return jsonResponse({ success: true });
    }

    if (action === 'quoteNeedDelete') {
      const quotesSheet = getQuotesSheet();
      const data = quotesSheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (data[i][0] === payload.id) {
          quotesSheet.deleteRow(i + 1);
          break;
        }
      }
      return jsonResponse({ success: true });
    }
    
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function quoteNeedRow(payload) {
  return [
    payload.id,
    payload.title || '',
    payload.area || 'casa',
    payload.status || 'valutazione',
    payload.budget || 0,
    payload.targetDate || '',
    payload.notes || '',
    payload.quotes || '[]',
    payload.createdAt || new Date().toISOString(),
    payload.updatedAt || new Date().toISOString(),
  ];
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
