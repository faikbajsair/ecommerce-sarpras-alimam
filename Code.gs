/**
 * =========================================================================
 * GOOGLE APPS SCRIPT BACKEND REST API
 * Project: E-Commerce & Pengadaan SARPRAS (White-Label & CMS Ready)
 * Architecture: MVC Web App Backend / Google Spreadsheet Database
 * =========================================================================
 */

// Configuration Constants
const CONFIG = {
  FOLDER_NAME: 'E-Commerce Al-Imam Files',
  SHEETS: {
    USERS: 'Users',
    RAPBS: 'RAPBS_Poin',
    STOCK: 'Stock_Inventory',
    ORDERS: 'Orders',
    LOGS: 'Transactions_Log',
    SETTINGS: 'Settings'
  }
};

/**
 * HTTP GET Router
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'getCatalog';
    const unitId = (e && e.parameter && e.parameter.unit_id) ? e.parameter.unit_id : '';

    const ss = SpreadsheetApp.getActiveSpreadsheet() || initDatabase();

    switch (action) {
      case 'getCatalog':
        return createJsonResponse({ status: 'success', data: getCatalogData(ss) });
      
      case 'getRAPBS':
        return createJsonResponse({ status: 'success', data: getRAPBSData(ss, unitId) });
      
      case 'getOrders':
        return createJsonResponse({ status: 'success', data: getOrdersData(ss, unitId) });
      
      case 'getTransactions':
        return createJsonResponse({ status: 'success', data: getTransactionsData(ss, unitId) });
        
      case 'getLowStockAlerts':
        return createJsonResponse({ status: 'success', data: getLowStockAlerts(ss) });

      case 'getSettings':
        return createJsonResponse({ status: 'success', data: getSettingsData(ss) });

      case 'initDatabase':
        initDatabase();
        return createJsonResponse({ status: 'success', message: 'Database sheets initialized with seed data successfully!' });

      default:
        return createJsonResponse({
          status: 'success',
          message: 'E-Commerce SARPRAS REST API is online.',
          version: '2.0.0 (White-Label Ready)',
          available_actions: ['getCatalog', 'getRAPBS', 'getOrders', 'getTransactions', 'getLowStockAlerts', 'getSettings', 'initDatabase']
        });
    }
  } catch (err) {
    return createJsonResponse({ status: 'error', message: err.toString() });
  }
}

/**
 * HTTP POST Router
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);

    let payload = {};
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    const action = payload.action;
    const ss = SpreadsheetApp.getActiveSpreadsheet() || initDatabase();

    switch (action) {
      case 'login':
        return createJsonResponse(handleLogin(ss, payload));

      case 'createOrder':
        return createJsonResponse(handleCreateOrder(ss, payload));

      case 'approveOrder':
        return createJsonResponse(handleApproveOrder(ss, payload));

      case 'rejectOrder':
        return createJsonResponse(handleRejectOrder(ss, payload));

      case 'restockInventory':
        return createJsonResponse(handleRestockInventory(ss, payload));

      case 'saveSettings':
        return createJsonResponse(handleSaveSettings(ss, payload));

      case 'uploadFile':
        return createJsonResponse(handleFileUpload(payload));

      case 'initDatabase':
        initDatabase();
        return createJsonResponse({ status: 'success', message: 'Database initialized successfully!' });

      default:
        return createJsonResponse({ status: 'error', message: 'Invalid or missing action in POST payload.' });
    }
  } catch (err) {
    return createJsonResponse({ status: 'error', message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

// =========================================================================
// HANDLERS & CORE BUSINESS LOGIC
// =========================================================================

function handleLogin(ss, payload) {
  const username = payload.username;
  const sheet = ss.getSheetByName(CONFIG.SHEETS.USERS);
  const rows = sheet.getDataRange().getValues();
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] === username) {
      return {
        status: 'success',
        user: {
          unit_id: rows[i][0],
          username: rows[i][1],
          unit_name: rows[i][3],
          role: rows[i][4]
        }
      };
    }
  }
  return { status: 'error', message: 'Username atau password tidak cocok.' };
}

function handleCreateOrder(ss, payload) {
  const order = payload.order || payload;
  const sheet = ss.getSheetByName(CONFIG.SHEETS.ORDERS);

  let attachmentsJson = '{}';
  if (order.attachments) {
    const uploadedUrls = {};
    if (order.attachments.receipt && order.attachments.receipt.startsWith('data:')) {
      uploadedUrls.receipt = saveBase64ToDrive(order.attachments.receipt, `NOTA_${order.order_id}.jpg`);
    } else {
      uploadedUrls.receipt = order.attachments.receipt || '';
    }
    if (order.attachments.transfer && order.attachments.transfer.startsWith('data:')) {
      uploadedUrls.transfer = saveBase64ToDrive(order.attachments.transfer, `TRANSFER_${order.order_id}.jpg`);
    }
    if (order.attachments.photo && order.attachments.photo.startsWith('data:')) {
      uploadedUrls.photo = saveBase64ToDrive(order.attachments.photo, `FISIK_${order.order_id}.jpg`);
    }
    attachmentsJson = JSON.stringify(uploadedUrls);
  }

  const newRow = [
    order.order_id,
    order.unit_id,
    order.order_type,
    order.items_json || JSON.stringify(order.items || []),
    order.total_amount,
    'Pending_Verification',
    order.created_at || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm'),
    '',
    order.notes || '',
    attachmentsJson,
    ''
  ];

  sheet.appendRow(newRow);
  return { status: 'success', message: 'Order created successfully', order_id: order.order_id };
}

function handleApproveOrder(ss, payload) {
  const orderId = payload.order_id;
  const orderSheet = ss.getSheetByName(CONFIG.SHEETS.ORDERS);
  const rapbsSheet = ss.getSheetByName(CONFIG.SHEETS.RAPBS);
  const stockSheet = ss.getSheetByName(CONFIG.SHEETS.STOCK);
  const logSheet = ss.getSheetByName(CONFIG.SHEETS.LOGS);

  const orderRows = orderSheet.getDataRange().getValues();
  let orderRowIdx = -1;
  let targetOrder = null;

  for (let i = 1; i < orderRows.length; i++) {
    if (orderRows[i][0] === orderId) {
      orderRowIdx = i + 1;
      targetOrder = {
        order_id: orderRows[i][0],
        unit_id: orderRows[i][1],
        order_type: orderRows[i][2],
        items_json: orderRows[i][3],
        total_amount: Number(orderRows[i][4]),
        status: orderRows[i][5]
      };
      break;
    }
  }

  if (!targetOrder) return { status: 'error', message: 'Order tidak ditemukan.' };
  if (targetOrder.status === 'Approved') return { status: 'error', message: 'Order ini sudah disetujui sebelumnya.' };

  const rapbsRows = rapbsSheet.getDataRange().getValues();
  let rapbsRowIdx = -1;
  let currentPlafond = 0, currentTerpakai = 0, currentSaldo = 0;

  for (let i = 1; i < rapbsRows.length; i++) {
    if (rapbsRows[i][0] === targetOrder.unit_id) {
      rapbsRowIdx = i + 1;
      currentPlafond = Number(rapbsRows[i][1]);
      currentTerpakai = Number(rapbsRows[i][2]);
      currentSaldo = Number(rapbsRows[i][3]);
      break;
    }
  }

  if (rapbsRowIdx === -1 || currentSaldo < targetOrder.total_amount) {
    return { status: 'error', message: 'Saldo RAPBS Unit tidak mencukupi untuk disetujui.' };
  }

  // FIFO Deduction
  if (targetOrder.order_type === 'E-Commerce') {
    let items = [];
    try { items = JSON.parse(targetOrder.items_json); } catch(e) {}

    const stockData = stockSheet.getDataRange().getValues();

    items.forEach(reqItem => {
      let remainingToDeduct = Number(reqItem.qty);
      const prodName = reqItem.product_name;

      const eligibleBatches = [];
      for (let r = 1; r < stockData.length; r++) {
        if (stockData[r][1] === prodName && stockData[r][7] === 'Active' && Number(stockData[r][3]) > 0) {
          eligibleBatches.push({
            rowIdx: r + 1,
            batchId: stockData[r][0],
            stockQty: Number(stockData[r][3]),
            dateIn: new Date(stockData[r][5])
          });
        }
      }

      eligibleBatches.sort((a, b) => a.dateIn - b.dateIn);

      for (let b of eligibleBatches) {
        if (remainingToDeduct <= 0) break;

        if (b.stockQty <= remainingToDeduct) {
          remainingToDeduct -= b.stockQty;
          stockSheet.getRange(b.rowIdx, 4).setValue(0);
          stockSheet.getRange(b.rowIdx, 8).setValue('Empty');
        } else {
          const newQty = b.stockQty - remainingToDeduct;
          stockSheet.getRange(b.rowIdx, 4).setValue(newQty);
          remainingToDeduct = 0;
        }
      }
    });
  }

  const newTerpakai = currentTerpakai + targetOrder.total_amount;
  const newSaldo = currentSaldo - targetOrder.total_amount;
  const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm');

  rapbsSheet.getRange(rapbsRowIdx, 3).setValue(newTerpakai);
  rapbsSheet.getRange(rapbsRowIdx, 4).setValue(newSaldo);
  rapbsSheet.getRange(rapbsRowIdx, 5).setValue(nowStr);

  const totalLogs = Math.max(1, logSheet.getLastRow());
  const yearMonth = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy/MM');
  const invNumber = `INV/SARPRAS/${yearMonth}/${String(totalLogs).padStart(3, '0')}`;

  orderSheet.getRange(orderRowIdx, 6).setValue('Approved');
  orderSheet.getRange(orderRowIdx, 8).setValue(nowStr);
  orderSheet.getRange(orderRowIdx, 11).setValue(invNumber);

  const logId = `LOG-${Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd')}-${Math.floor(Math.random() * 900 + 100)}`;
  logSheet.appendRow([
    logId,
    targetOrder.order_id,
    targetOrder.unit_id,
    targetOrder.total_amount,
    newSaldo,
    nowStr,
    invNumber
  ]);

  return {
    status: 'success',
    message: 'Order approved successfully.',
    invoice_number: invNumber,
    remaining_balance: newSaldo
  };
}

function handleRejectOrder(ss, payload) {
  const orderId = payload.order_id;
  const sheet = ss.getSheetByName(CONFIG.SHEETS.ORDERS);
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === orderId) {
      sheet.getRange(i + 1, 6).setValue('Rejected');
      sheet.getRange(i + 1, 8).setValue(Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm'));
      return { status: 'success', message: 'Order rejected.' };
    }
  }
  return { status: 'error', message: 'Order tidak ditemukan.' };
}

function handleRestockInventory(ss, payload) {
  const batch = payload.batch || payload;
  const sheet = ss.getSheetByName(CONFIG.SHEETS.STOCK);

  const dateInStr = batch.date_in || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd');
  const batchId = batch.batch_id || `BATCH-${dateInStr.replace(/-/g, '').slice(0,6)}-${Math.floor(Math.random() * 90 + 10)}`;

  const newRow = [
    batchId,
    batch.product_name,
    batch.category || 'ATK & Kertas',
    Number(batch.stock_qty),
    Number(batch.unit_price),
    dateInStr,
    batch.method || 'FIFO',
    'Active'
  ];

  sheet.appendRow(newRow);
  return { status: 'success', message: 'Batch restock added successfully', batch_id: batchId };
}

function handleSaveSettings(ss, payload) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.SETTINGS);
  const settingsJson = JSON.stringify(payload.settings || {});
  
  sheet.clear();
  sheet.appendRow(['Key', 'Value', 'Updated_At']);
  sheet.appendRow(['CMS_CONFIG', settingsJson, Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm')]);

  return { status: 'success', message: 'CMS Settings saved successfully to Google Sheets.' };
}

function getSettingsData(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.SETTINGS);
  if (!sheet) return null;

  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === 'CMS_CONFIG') {
      try {
        return JSON.parse(rows[i][1]);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}

// =========================================================================
// DATA RETRIEVAL FUNCTIONS
// =========================================================================

function getCatalogData(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.STOCK);
  const rows = sheet.getDataRange().getValues();
  const items = [];

  for (let i = 1; i < rows.length; i++) {
    items.push({
      batch_id: rows[i][0],
      product_name: rows[i][1],
      category: rows[i][2],
      stock_qty: Number(rows[i][3]),
      unit_price: Number(rows[i][4]),
      date_in: rows[i][5] instanceof Date ? Utilities.formatDate(rows[i][5], 'Asia/Jakarta', 'yyyy-MM-dd') : String(rows[i][5]),
      method: rows[i][6],
      status: rows[i][7]
    });
  }
  return items;
}

function getRAPBSData(ss, unitId) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.RAPBS);
  const rows = sheet.getDataRange().getValues();
  const list = [];

  for (let i = 1; i < rows.length; i++) {
    if (!unitId || rows[i][0] === unitId) {
      list.push({
        unit_id: rows[i][0],
        total_plafond: Number(rows[i][1]),
        terpakai: Number(rows[i][2]),
        saldo_tersedia: Number(rows[i][3]),
        updated_at: String(rows[i][4])
      });
    }
  }
  return list;
}

function getOrdersData(ss, unitId) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.ORDERS);
  const rows = sheet.getDataRange().getValues();
  const list = [];

  for (let i = 1; i < rows.length; i++) {
    if (!unitId || rows[i][1] === unitId) {
      list.push({
        order_id: rows[i][0],
        unit_id: rows[i][1],
        order_type: rows[i][2],
        items_json: rows[i][3],
        total_amount: Number(rows[i][4]),
        status: rows[i][5],
        created_at: String(rows[i][6]),
        approved_at: String(rows[i][7]),
        notes: rows[i][8],
        attachments_json: rows[i][9],
        invoice_number: rows[i][10]
      });
    }
  }
  return list;
}

function getTransactionsData(ss, unitId) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.LOGS);
  const rows = sheet.getDataRange().getValues();
  const list = [];

  for (let i = 1; i < rows.length; i++) {
    if (!unitId || rows[i][2] === unitId) {
      list.push({
        log_id: rows[i][0],
        order_id: rows[i][1],
        unit_id: rows[i][2],
        amount_deducted: Number(rows[i][3]),
        remaining_balance: Number(rows[i][4]),
        timestamp: String(rows[i][5]),
        invoice_number: rows[i][6]
      });
    }
  }
  return list;
}

function getLowStockAlerts(ss) {
  const catalog = getCatalogData(ss);
  const stockMap = {};

  catalog.forEach(item => {
    if (!stockMap[item.product_name]) {
      stockMap[item.product_name] = { product_name: item.product_name, category: item.category, total_stock: 0 };
    }
    if (item.status === 'Active') {
      stockMap[item.product_name].total_stock += item.stock_qty;
    }
  });

  return Object.values(stockMap).filter(p => p.total_stock <= 5);
}

function saveBase64ToDrive(base64Data, filename) {
  try {
    let folder;
    const folders = DriveApp.getFoldersByName(CONFIG.FOLDER_NAME);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(CONFIG.FOLDER_NAME);
      folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    }

    const contentType = base64Data.substring(5, base64Data.indexOf(';'));
    const bytes = Utilities.base64Decode(base64Data.substr(base64Data.indexOf('base64,') + 7));
    const blob = Utilities.newBlob(bytes, contentType, filename);
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return file.getUrl();
  } catch (e) {
    Logger.log('Error saving file to Drive: ' + e.toString());
    return '';
  }
}

function initDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Users Sheet
  let usersSheet = ss.getSheetByName(CONFIG.SHEETS.USERS);
  if (!usersSheet) {
    usersSheet = ss.insertSheet(CONFIG.SHEETS.USERS);
    usersSheet.appendRow(['Unit_ID', 'Username', 'Password_Hash', 'Unit_Name', 'Role']);
    usersSheet.appendRow(['unit_tk', 'tk_alimam', 'hash_tk', 'TK Islam Al-Imam', 'Unit']);
    usersSheet.appendRow(['unit_sd', 'sd_alimam', 'hash_sd', 'SD Islam Al-Imam', 'Unit']);
    usersSheet.appendRow(['unit_smp', 'smp_alimam', 'hash_smp', 'SMP Islam Al-Imam', 'Unit']);
    usersSheet.appendRow(['unit_sma', 'sma_alimam', 'hash_sma', 'SMA Islam Al-Imam', 'Unit']);
    usersSheet.appendRow(['bendahara', 'bendahara_yayasan', 'hash_ben', 'Bendahara Yayasan', 'Bendahara']);
    usersSheet.appendRow(['admin', 'admin_sarpras', 'hash_adm', 'Admin Logistik & SARPRAS', 'Admin']);
  }

  // 2. RAPBS_Poin Sheet
  let rapbsSheet = ss.getSheetByName(CONFIG.SHEETS.RAPBS);
  if (!rapbsSheet) {
    rapbsSheet = ss.insertSheet(CONFIG.SHEETS.RAPBS);
    rapbsSheet.appendRow(['Unit_ID', 'Total_Plafond', 'Terpakai', 'Saldo_Tersedia', 'Updated_At']);
    rapbsSheet.appendRow(['unit_tk', 15000000, 2750000, 12250000, '2026-09-15 08:30']);
    rapbsSheet.appendRow(['unit_sd', 35000000, 8400000, 26600000, '2026-09-16 10:15']);
    rapbsSheet.appendRow(['unit_smp', 30000000, 6200000, 23800000, '2026-09-17 14:00']);
    rapbsSheet.appendRow(['unit_sma', 40000000, 11500000, 28500000, '2026-09-18 09:00']);
  }

  // 3. Stock_Inventory Sheet
  let stockSheet = ss.getSheetByName(CONFIG.SHEETS.STOCK);
  if (!stockSheet) {
    stockSheet = ss.insertSheet(CONFIG.SHEETS.STOCK);
    stockSheet.appendRow(['Batch_ID', 'Product_Name', 'Category', 'Stock_Qty', 'Unit_Price', 'Date_In', 'Method', 'Status']);
    stockSheet.appendRow(['BATCH-202607-01', 'Spidol Whiteboard Snowman Hitam', 'ATK & Kertas', 0, 8500, '2026-07-10', 'FIFO', 'Empty']);
    stockSheet.appendRow(['BATCH-202608-04', 'Spidol Whiteboard Snowman Hitam', 'ATK & Kertas', 12, 9000, '2026-08-15', 'FIFO', 'Active']);
    stockSheet.appendRow(['BATCH-202609-02', 'Spidol Whiteboard Snowman Hitam', 'ATK & Kertas', 50, 9500, '2026-09-05', 'FIFO', 'Active']);
    stockSheet.appendRow(['BATCH-202608-01', 'Kertas HVS A4 80gr PaperOne (Rim)', 'ATK & Kertas', 25, 52000, '2026-08-01', 'FIFO', 'Active']);
    stockSheet.appendRow(['BATCH-202609-01', 'Kertas HVS A4 80gr PaperOne (Rim)', 'ATK & Kertas', 40, 54000, '2026-09-02', 'FIFO', 'Active']);
  }

  // 4. Orders Sheet
  let ordersSheet = ss.getSheetByName(CONFIG.SHEETS.ORDERS);
  if (!ordersSheet) {
    ordersSheet = ss.insertSheet(CONFIG.SHEETS.ORDERS);
    ordersSheet.appendRow(['Order_ID', 'Unit_ID', 'Order_Type', 'Items_JSON', 'Total_Amount', 'Status', 'Created_At', 'Approved_At', 'Notes', 'Attachments_JSON', 'Invoice_Number']);
    ordersSheet.appendRow(['ORD-202609-001', 'unit_sd', 'E-Commerce', '[{"product_name":"Spidol Whiteboard Snowman Hitam","qty":10,"unit_price":9000,"subtotal":90000}]', 90000, 'Approved', '2026-09-16 09:30', '2026-09-16 10:15', 'Kebutuhan Ujian Siswa', '{}', 'INV/SARPRAS/2026/09/001']);
  }

  // 5. Transactions_Log Sheet
  let logSheet = ss.getSheetByName(CONFIG.SHEETS.LOGS);
  if (!logSheet) {
    logSheet = ss.insertSheet(CONFIG.SHEETS.LOGS);
    logSheet.appendRow(['Log_ID', 'Order_ID', 'Unit_ID', 'Amount_Deducted', 'Remaining_Balance', 'Timestamp', 'Invoice_Number']);
    logSheet.appendRow(['LOG-202609-001', 'ORD-202609-001', 'unit_sd', 90000, 26600000, '2026-09-16 10:15:22', 'INV/SARPRAS/2026/09/001']);
  }

  // 6. Settings Sheet (White-Label Config)
  let settingsSheet = ss.getSheetByName(CONFIG.SHEETS.SETTINGS);
  if (!settingsSheet) {
    settingsSheet = ss.insertSheet(CONFIG.SHEETS.SETTINGS);
    settingsSheet.appendRow(['Key', 'Value', 'Updated_At']);
  }

  return ss;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
