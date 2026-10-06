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
    SETTINGS: 'Settings',
    AC_INVENTORY: 'AC_Inventory',
    AC_SERVICES: 'AC_Services',
    RENOV_PROJECTS: 'Renov_Projects',
    RENOV_REQUESTS: 'Renov_Requests'
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

      case 'fetchMarketplaceInfo':
        return createJsonResponse(handleFetchMarketplaceInfo(e.parameter || {}));

      case 'initDatabase':
        initDatabase();
        return createJsonResponse({ status: 'success', message: 'Database sheets initialized with seed data successfully!' });

      default:
        return createJsonResponse({
          status: 'success',
          message: 'E-Commerce SARPRAS REST API is online.',
          version: '2.0.0 (White-Label Ready)',
          available_actions: ['getCatalog', 'getRAPBS', 'getOrders', 'getTransactions', 'getLowStockAlerts', 'getSettings', 'fetchMarketplaceInfo', 'initDatabase']
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

      case 'saveProduct':
        return createJsonResponse(handleSaveProduct(ss, payload));

      case 'bulkSaveProducts':
        return createJsonResponse(handleBulkSaveProducts(ss, payload));

      case 'updateOrder':
        return createJsonResponse(handleUpdateOrder(ss, payload));

      case 'deleteProduct':
        return createJsonResponse(handleDeleteProduct(ss, payload));

      case 'updateBatch':
        return createJsonResponse(handleUpdateBatch(ss, payload));

      case 'deleteBatch':
        return createJsonResponse(handleDeleteBatch(ss, payload));

      case 'saveSettings':
        return createJsonResponse(handleSaveSettings(ss, payload));

      case 'uploadFile':
        return createJsonResponse(handleFileUpload(payload));

      case 'fetchMarketplaceInfo':
        return createJsonResponse(handleFetchMarketplaceInfo(payload));

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
        status: orderRows[i][5],
        attachments_json: orderRows[i][9] || ''
      };
      break;
    }
  }

  if (!targetOrder) return { status: 'error', message: 'Order tidak ditemukan.' };
  if (targetOrder.status === 'Approved') return { status: 'error', message: 'Order ini sudah disetujui sebelumnya.' };

  let items = [];
  try {
    items = payload.items ? payload.items : JSON.parse(targetOrder.items_json);
  } catch(e) {
    items = [];
  }

  const approvedItems = items.filter(it => it.status !== 'Rejected');
  const approvedAmount = Number(payload.approved_amount) || approvedItems.reduce((acc, it) => acc + (Number(it.subtotal) || (Number(it.qty) * Number(it.unit_price)) || 0), 0);
  const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm');
  const yearMonth = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy/MM');
  const totalLogs = Math.max(1, logSheet.getLastRow());
  const invNumber = payload.invoice_number || `INV/SARPRAS/${yearMonth}/${String(totalLogs).padStart(3, '0')}`;

  // 1. Stock FIFO deduction for approved catalog items
  const stockData = stockSheet.getDataRange().getValues();
  approvedItems.forEach(reqItem => {
    if (reqItem.item_type === 'catalog' || (!reqItem.item_type && targetOrder.order_type === 'E-Commerce')) {
      let remainingToDeduct = Number(reqItem.qty) || 1;
      const prodName = reqItem.product_name || reqItem.item_name;

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
    }

    // 2. Auto-create Master Product for custom requested items
    if (reqItem.item_type === 'custom_request' || targetOrder.order_type === 'Request_Barang_Baru') {
      const prodName = reqItem.product_name || reqItem.item_name;
      let alreadyExists = false;
      for (let r = 1; r < stockData.length; r++) {
        if (String(stockData[r][1]).toLowerCase() === String(prodName).toLowerCase()) {
          alreadyExists = true;
          break;
        }
      }

      if (!alreadyExists) {
        const dateInStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd');
        const batchId = `BATCH-${dateInStr.replace(/-/g, '').slice(0,6)}-${Math.floor(Math.random() * 90 + 10)}`;
        stockSheet.appendRow([
          batchId,
          prodName,
          reqItem.category || 'ATK & Kertas',
          Number(reqItem.qty) || 1,
          Number(reqItem.unit_price) || 0,
          dateInStr,
          'FIFO',
          'Active',
          reqItem.image_url || ''
        ]);
      }
    }
  });

  // 3. RAPBS Point Deduction & Ledger Logging
  const rapbsRows = rapbsSheet.getDataRange().getValues();

  // If Split Units (e.g. Care Unit SD & SMP)
  if (payload.split_units && Array.isArray(payload.split_units) && payload.split_units.length > 0) {
    payload.split_units.forEach(sp => {
      const splitUnitId = sp.unit_id;
      const splitAmount = Number(sp.amount);

      for (let i = 1; i < rapbsRows.length; i++) {
        if (rapbsRows[i][0] === splitUnitId) {
          const curTerpakai = Number(rapbsRows[i][2]);
          const curSaldo = Number(rapbsRows[i][3]);
          const newTerpakai = curTerpakai + splitAmount;
          const newSaldo = curSaldo - splitAmount;

          rapbsSheet.getRange(i + 1, 3).setValue(newTerpakai);
          rapbsSheet.getRange(i + 1, 4).setValue(newSaldo);
          rapbsSheet.getRange(i + 1, 5).setValue(nowStr);

          const logId = `LOG-${Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd')}-${Math.floor(Math.random() * 9000 + 1000)}`;
          logSheet.appendRow([
            logId,
            targetOrder.order_id,
            splitUnitId,
            splitAmount,
            newSaldo,
            nowStr,
            `${invNumber} (${sp.unit_name || splitUnitId})`
          ]);
          break;
        }
      }
    });
  } else {
    // Single Unit deduction
    let rapbsRowIdx = -1;
    let currentTerpakai = 0, currentSaldo = 0;

    for (let i = 1; i < rapbsRows.length; i++) {
      if (rapbsRows[i][0] === targetOrder.unit_id) {
        rapbsRowIdx = i + 1;
        currentTerpakai = Number(rapbsRows[i][2]);
        currentSaldo = Number(rapbsRows[i][3]);
        break;
      }
    }

    if (rapbsRowIdx !== -1) {
      const newTerpakai = currentTerpakai + approvedAmount;
      const newSaldo = currentSaldo - approvedAmount;

      rapbsSheet.getRange(rapbsRowIdx, 3).setValue(newTerpakai);
      rapbsSheet.getRange(rapbsRowIdx, 4).setValue(newSaldo);
      rapbsSheet.getRange(rapbsRowIdx, 5).setValue(nowStr);

      const logId = `LOG-${Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd')}-${Math.floor(Math.random() * 9000 + 1000)}`;
      logSheet.appendRow([
        logId,
        targetOrder.order_id,
        targetOrder.unit_id,
        approvedAmount,
        newSaldo,
        nowStr,
        invNumber
      ]);
    }
  }

  // 4. Update Order Record
  orderSheet.getRange(orderRowIdx, 4).setValue(JSON.stringify(items));
  orderSheet.getRange(orderRowIdx, 5).setValue(approvedAmount);
  orderSheet.getRange(orderRowIdx, 6).setValue('Approved');
  orderSheet.getRange(orderRowIdx, 8).setValue(nowStr);
  orderSheet.getRange(orderRowIdx, 11).setValue(invNumber);

  if (payload.transfer_proof) {
    let att = {};
    try { att = JSON.parse(targetOrder.attachments_json || '{}'); } catch(e) {}
    att.transfer = payload.transfer_proof;
    orderSheet.getRange(orderRowIdx, 10).setValue(JSON.stringify(att));
  }

  return {
    status: 'success',
    message: 'Order approved successfully.',
    invoice_number: invNumber,
    approved_amount: approvedAmount
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
    'Active',
    batch.image_url || ''
  ];

  sheet.appendRow(newRow);
  return { status: 'success', message: 'Batch restock added successfully', batch_id: batchId };
}

function handleSaveProduct(ss, payload) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.STOCK);
  const mode = payload.mode || 'add';
  const originalName = payload.original_name || '';
  const newName = payload.product_name;
  const category = payload.category || 'ATK & Kertas';
  const price = Number(payload.unit_price) || 0;
  const imageUrl = payload.image_url || '';

  if (mode === 'add') {
    const initialStock = Number(payload.initial_stock) || 0;
    const dateInStr = payload.date_in || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd');
    const batchId = payload.batch_id || `BATCH-${dateInStr.replace(/-/g, '').slice(0,6)}-${Math.floor(Math.random() * 90 + 10)}`;

    const newRow = [
      batchId,
      newName,
      category,
      initialStock,
      price,
      dateInStr,
      'FIFO',
      initialStock > 0 ? 'Active' : 'Empty',
      imageUrl
    ];
    sheet.appendRow(newRow);
    return { status: 'success', message: 'Master product added successfully', batch_id: batchId };
  } else {
    const rows = sheet.getDataRange().getValues();
    let updated = 0;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] === originalName) {
        sheet.getRange(i + 1, 2).setValue(newName);
        sheet.getRange(i + 1, 3).setValue(category);
        sheet.getRange(i + 1, 5).setValue(price);
        if (imageUrl) {
          sheet.getRange(i + 1, 9).setValue(imageUrl);
        }
        updated++;
      }
    }
    return { status: 'success', message: `Master product updated (${updated} batches modified)` };
  }
}

function handleBulkSaveProducts(ss, payload) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.STOCK);
  const products = payload.products || [];
  if (!products || products.length === 0) {
    return { status: 'error', message: 'Tidak ada data produk untuk diinput.' };
  }

  const dateInStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd');
  const newRows = products.map(p => {
    const batchId = p.batch_id || `BATCH-${dateInStr.replace(/-/g, '').slice(0,6)}-${Math.floor(Math.random() * 900 + 100)}`;
    const prodName = p.product_name || p.name || 'Produk Tanpa Nama';
    const category = p.category || 'ATK & Kertas';
    const stockQty = Number(p.stock_qty !== undefined ? p.stock_qty : (p.initial_stock !== undefined ? p.initial_stock : 10)) || 0;
    const unitPrice = Number(p.unit_price !== undefined ? p.unit_price : p.price) || 0;
    const dateIn = p.date_in || dateInStr;
    const method = p.method || 'FIFO';
    const status = stockQty > 0 ? 'Active' : 'Empty';
    const imageUrl = p.image_url || '';

    return [batchId, prodName, category, stockQty, unitPrice, dateIn, method, status, imageUrl];
  });

  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1, newRows.length, 9).setValues(newRows);

  return {
    status: 'success',
    message: `${newRows.length} master produk berhasil ditambahkan secara massal!`,
    inserted_count: newRows.length
  };
}

function handleUpdateOrder(ss, payload) {
  const orderId = payload.order_id;
  const sheet = ss.getSheetByName(CONFIG.SHEETS.ORDERS);
  const rows = sheet.getDataRange().getValues();
  let rowIdx = -1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === orderId) {
      rowIdx = i + 1;
      break;
    }
  }
  if (rowIdx === -1) return { status: 'error', message: 'Order tidak ditemukan.' };

  if (payload.items_json) sheet.getRange(rowIdx, 4).setValue(payload.items_json);
  if (payload.total_amount !== undefined) sheet.getRange(rowIdx, 5).setValue(Number(payload.total_amount));
  if (payload.notes !== undefined) sheet.getRange(rowIdx, 9).setValue(payload.notes);
  if (payload.attachments_json) sheet.getRange(rowIdx, 10).setValue(payload.attachments_json);

  return { status: 'success', message: `Order ${orderId} berhasil diperbarui.` };
}

function handleDeleteProduct(ss, payload) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.STOCK);
  const productName = payload.product_name;
  const rows = sheet.getDataRange().getValues();
  let deleted = 0;

  for (let i = rows.length - 1; i >= 1; i--) {
    if (rows[i][1] === productName) {
      sheet.deleteRow(i + 1);
      deleted++;
    }
  }
  return { status: 'success', message: `Product and ${deleted} batches deleted successfully` };
}

function handleUpdateBatch(ss, payload) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.STOCK);
  const batchId = payload.batch_id;
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === batchId) {
      if (payload.product_name) sheet.getRange(i + 1, 2).setValue(payload.product_name);
      if (payload.category) sheet.getRange(i + 1, 3).setValue(payload.category);
      if (payload.stock_qty !== undefined) sheet.getRange(i + 1, 4).setValue(Number(payload.stock_qty));
      if (payload.unit_price !== undefined) sheet.getRange(i + 1, 5).setValue(Number(payload.unit_price));
      if (payload.date_in) sheet.getRange(i + 1, 6).setValue(payload.date_in);
      if (payload.status) sheet.getRange(i + 1, 8).setValue(payload.status);
      if (payload.image_url !== undefined) sheet.getRange(i + 1, 9).setValue(payload.image_url);
      return { status: 'success', message: `Batch ${batchId} updated successfully` };
    }
  }
  return { status: 'error', message: `Batch ${batchId} not found` };
}

function handleDeleteBatch(ss, payload) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.STOCK);
  const batchId = payload.batch_id;
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === batchId) {
      sheet.deleteRow(i + 1);
      return { status: 'success', message: `Batch ${batchId} deleted successfully` };
    }
  }
  return { status: 'error', message: `Batch ${batchId} not found` };
}

function handleFetchMarketplaceInfo(payload) {
  const url = payload.url || '';
  if (!url) {
    return { status: 'error', message: 'URL tidak boleh kosong.' };
  }

  const lower = url.toLowerCase();
  if (lower.match(/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i) || lower.includes('img.susercontent.com') || lower.includes('images.tokopedia.net')) {
    return {
      status: 'success',
      data: {
        title: '',
        image_url: url,
        price: 0,
        source: 'direct_image'
      }
    };
  }

  try {
    const response = UrlFetchApp.fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
      },
      muteHttpExceptions: true,
      followRedirects: true
    });

    const html = response.getContentText();
    let ogImage = '';
    let ogTitle = '';
    let ogPrice = 0;

    const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                       html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i) ||
                       html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i) ||
                       html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i);
    if (imageMatch && imageMatch[1]) {
      ogImage = imageMatch[1].replace(/&amp;/g, '&');
    }

    const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                       html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:title["']/i) ||
                       html.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      ogTitle = titleMatch[1].replace(/&amp;/g, '&').trim();
      ogTitle = ogTitle.split(' | Tokopedia')[0].split(' | Shopee Indonesia')[0].split(' - Shopee')[0].trim();
    }

    const priceMatch = html.match(/<meta\s+property=["']product:price:amount["']\s+content=["']([^"']+)["']/i) ||
                       html.match(/<meta\s+property=["']og:price:amount["']\s+content=["']([^"']+)["']/i);
    if (priceMatch && priceMatch[1]) {
      ogPrice = parseFloat(priceMatch[1]) || 0;
    }

    if (!ogImage) {
      const shopeeCdn = html.match(/https:\/\/(cf\.shopee\.co\.id|down-id\.img\.susercontent\.com)\/file\/([a-zA-Z0-9_-]+)/i);
      if (shopeeCdn) {
        ogImage = shopeeCdn[0];
      }
      const tokpedCdn = html.match(/https:\/\/images\.tokopedia\.net\/img\/cache\/[^\s"'>]+/i);
      if (tokpedCdn) {
        ogImage = tokpedCdn[0];
      }
    }

    return {
      status: 'success',
      data: {
        title: ogTitle,
        image_url: ogImage,
        price: ogPrice,
        source: 'marketplace_scraper'
      }
    };
  } catch (err) {
    return {
      status: 'error',
      message: 'Gagal mengekstrak data dari URL: ' + err.toString()
    };
  }
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
      status: rows[i][7],
      image_url: rows[i][8] ? String(rows[i][8]) : ''
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
    usersSheet.appendRow(['bendahara', 'bendahara_yayasan', 'hash_ben', 'Bendahara Yayasan', 'Bendahara']);
    usersSheet.appendRow(['admin', 'admin_sarpras', 'hash_adm', 'Admin Logistik & SARPRAS', 'Admin']);
  }

  // 2. RAPBS_Poin Sheet
  let rapbsSheet = ss.getSheetByName(CONFIG.SHEETS.RAPBS);
  if (!rapbsSheet) {
    rapbsSheet = ss.insertSheet(CONFIG.SHEETS.RAPBS);
    rapbsSheet.appendRow(['Unit_ID', 'Total_Plafond', 'Terpakai', 'Saldo_Tersedia', 'Updated_At']);
    rapbsSheet.appendRow(['unit_tk', 15000000, 510000, 14490000, '2026-07-10 10:45']);
    rapbsSheet.appendRow(['unit_sd', 35884000, 965329, 34918671, '2026-09-28 10:00']);
    rapbsSheet.appendRow(['unit_smp', 24506000, 3756629, 20749371, '2026-08-28 16:00']);
  }

  // 3. Stock_Inventory Sheet
  let stockSheet = ss.getSheetByName(CONFIG.SHEETS.STOCK);
  if (!stockSheet) {
    stockSheet = ss.insertSheet(CONFIG.SHEETS.STOCK);
    stockSheet.appendRow(['Batch_ID', 'Product_Name', 'Category', 'Stock_Qty', 'Unit_Price', 'Date_In', 'Method', 'Status', 'Image_URL']);
    stockSheet.appendRow(['BATCH-202609-01', 'Alat kebersihan OB', 'Kebersihan & Sanitasi', 24, 100000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-02', 'Tinta white board 1 kelas/2/1botol', 'ATK & Kertas', 60, 15000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-03', 'Spidol', 'ATK & Kertas', 50, 10000, '2026-09-05', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-04', 'Kertas HVS F4 untuk admin guru', 'ATK & Kertas', 40, 60000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-05', 'Kertas HVS F4 untuk admin kantor', 'ATK & Kertas', 35, 50000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-06', 'Pewangi kelas', 'Kebersihan & Sanitasi', 50, 10000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-07', 'Gayung, Ember', 'Kebersihan & Sanitasi', 20, 35000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-08', 'Penghapus papan tulis', 'Perlengkapan Kelas', 40, 10000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-09', 'Tinta Printer Hitam dan warna 6 bln 1 set (4 btl)', 'Elektronik & IT', 15, 700000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-10', 'Fotocopy', 'Jasa & Operasional', 5000, 2000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=80']);
    // SMP items
    stockSheet.appendRow(['BATCH-202609-20', 'Kertas SPR', 'ATK & Kertas', 500, 500, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-21', 'Kertas Dinas (rim)', 'ATK & Kertas', 20, 50000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-22', 'Tinta white board 1 kelas @10 botol', 'ATK & Kertas', 36, 15000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-23', 'Pena, Pensil, Penghapus', 'ATK & Kertas', 30, 15000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-24', 'Sabun kamar mandi', 'Kebersihan & Sanitasi', 72, 10000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-25', 'Pewangi kamar mandi', 'Kebersihan & Sanitasi', 72, 10000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-26', 'Obat pel', 'Kebersihan & Sanitasi', 30, 15000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-27', 'Lampu kelas @4 setahun', 'Elektronik & IT', 20, 35000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-28', 'Kebutuhan Kebersihan', 'Kebersihan & Sanitasi', 12, 300000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-29', 'Maintenance AC', 'Jasa & Operasional', 56, 75000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202609-30', 'Alat Peraga Olah Raga dll', 'Perlengkapan Kelas', 5, 1000000, '2026-09-01', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80']);
    // SMP July & August 2026 Catalog
    stockSheet.appendRow(['BATCH-202607-10', 'Kertas Concord A4', 'ATK & Kertas', 15, 13000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-11', 'Lem Kertas Stik', 'ATK & Kertas', 20, 26000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-12', 'Lem Fox Putih PVAc', 'ATK & Kertas', 24, 5000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-13', 'Lakban Bening', 'ATK & Kertas', 30, 8000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-14', 'Sticky Note Apple', 'ATK & Kertas', 36, 5600, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-15', 'Box Besar (Penyimpanan Barang)', 'Perlengkapan Kelas', 8, 128000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1595079672139-5470805086ae?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-16', 'Penggaris Besi 30 cm', 'ATK & Kertas', 25, 3500, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-17', 'Pembalut Sanitasi UKS', 'Kebersihan & Sanitasi', 12, 21000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-18', 'Double Tape', 'ATK & Kertas', 30, 5000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-19', 'Lakban Hitam', 'ATK & Kertas', 20, 8000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-20', 'Timbangan Berat Badan UKS', 'Perlengkapan Kelas', 4, 73900, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-21', 'Gunting Besar', 'ATK & Kertas', 18, 11500, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-22', 'Staples Besar + Isi (Set)', 'ATK & Kertas', 10, 42000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-23', 'Konektor Proyektor HDMI to Type C', 'Elektronik & IT', 6, 36000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-24', 'Bola Futsal Ortus', 'Perlengkapan Kelas', 4, 178695, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-25', 'Net Bola Voli', 'Perlengkapan Kelas', 3, 149847, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-26', 'Cons Kerucut (Set 20 pcs)', 'Perlengkapan Kelas', 6, 45000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-27', 'Gantungan Kunci Prakarya', 'Perlengkapan Kelas', 10, 11800, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-28', 'Rantai Pelor Biji Lada', 'Perlengkapan Kelas', 10, 11500, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-29', 'Pembolong Kertas', 'ATK & Kertas', 12, 29500, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-30', 'Cutter Kecil', 'ATK & Kertas', 24, 4000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-31', 'Klem Penjepit Kaca Lemari', 'Perlengkapan Kelas', 10, 12000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-32', 'Whiteboard Timeboard Kecil', 'Perlengkapan Kelas', 15, 11000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-33', 'Tissue Box Kotak Meja', 'Kebersihan & Sanitasi', 20, 20900, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-34', 'Jam Dinding Quartz', 'Perlengkapan Kelas', 8, 64900, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-35', 'Playmat Matras Lantai', 'Perlengkapan Kelas', 6, 90000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202607-36', 'Fiber Hitam 0,6 x 1m', 'Perlengkapan Kelas', 12, 14000, '2026-07-29', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-30', 'Bingkai Foto (Presiden/Wapres/Guru)', 'Perlengkapan Kelas', 22, 22500, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-31', 'Lampu Mushala 12 Watt', 'Elektronik & IT', 16, 25000, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-32', 'Cetak Banner Target Panahan', 'Perlengkapan Kelas', 5, 26000, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-33', 'Stella Pocket Jeruk', 'Kebersihan & Sanitasi', 36, 9700, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-34', 'Cable Ties', 'Elektronik & IT', 15, 4725, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-35', 'Tape Cutter Pemotong Lakban', 'ATK & Kertas', 10, 17000, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-36', 'Minyak Kayu Putih 120 ML (P3K)', 'Kebersihan & Sanitasi', 12, 40000, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-37', 'Promag Tablet Obat Sakit Maag Box', 'Kebersihan & Sanitasi', 10, 25000, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-38', 'Tissue Soft Pack', 'Kebersihan & Sanitasi', 20, 31000, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-39', 'Selempang Upacara Bendera', 'Perlengkapan Kelas', 30, 6500, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-40', 'Sarung Tangan Putih Upacara', 'Perlengkapan Kelas', 10, 38000, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-41', 'Isi Spidol Papan Tulis Warna Hitam', 'ATK & Kertas', 24, 20500, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-42', 'Cone Pelangi Marker (Pack 20pcs)', 'Perlengkapan Kelas', 6, 73200, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-43', 'Indikator Benedict Test Reducing IPA', 'Perlengkapan Kelas', 5, 21000, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-44', 'Larutan Iodine Uji Karbohidrat IPA', 'Perlengkapan Kelas', 5, 45000, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-45', 'Penutup Bawah Pintu', 'Perlengkapan Kelas', 12, 25480, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-46', 'Gantungan Sapu & Pel Dinding', 'Perlengkapan Kelas', 15, 22500, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-47', 'Kaca Cermin Dinding', 'Perlengkapan Kelas', 8, 45600, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-48', 'Kemoceng Bulu Pembersih Debu', 'Kebersihan & Sanitasi', 20, 8500, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-49', 'Wireless Mic Clip-on Kelas', 'Elektronik & IT', 5, 231734, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-50', 'Sticker Dinding Emas Kaligrafi', 'Perlengkapan Kelas', 20, 7372, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80']);
    stockSheet.appendRow(['BATCH-202608-51', 'Tirai Jendela Hitam 68x125 cm', 'Perlengkapan Kelas', 10, 53000, '2026-08-28', 'FIFO', 'Active', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80']);
  }

  // 4. Orders Sheet
  let ordersSheet = ss.getSheetByName(CONFIG.SHEETS.ORDERS);
  if (!ordersSheet) {
    ordersSheet = ss.insertSheet(CONFIG.SHEETS.ORDERS);
    ordersSheet.appendRow(['Order_ID', 'Unit_ID', 'Order_Type', 'Items_JSON', 'Total_Amount', 'Status', 'Created_At', 'Approved_At', 'Notes', 'Attachments_JSON', 'Invoice_Number']);
    ordersSheet.appendRow(['ORD-SMP-20260729-01', 'unit_smp', 'E-Commerce', JSON.stringify([{ product_name: 'Pengadaan SARPRAS Administrasi Kelas SMP Bulan Juli 2026 (34 Item)', qty: 1, unit_price: 1859198, subtotal: 1859198 }]), 1859198, 'Approved', '2026-07-29 10:00', '2026-07-29 14:00', 'LPJ Pengadaan SARPRAS Administrasi Kelas SMP Bulan Juli 2026 (No: 01/PS/Int/SMP-AIIS/VII/2026)', '', 'LPJ/SMP/2026/0701']);
    ordersSheet.appendRow(['ORD-SMP-20260828-01', 'unit_smp', 'E-Commerce', JSON.stringify([{ product_name: 'Pengadaan SARPRAS Administrasi Kelas SMP Bulan Agustus 2026 (29 Item)', qty: 1, unit_price: 1897431, subtotal: 1897431 }]), 1897431, 'Approved', '2026-08-28 10:00', '2026-08-28 16:00', 'LPJ Pengadaan SARPRAS Administrasi Kelas SMP Bulan Agustus 2026 (No: 02/PS/Int/SMP-AIIS/VIII/2026)', '', 'LPJ/SMP/2026/0801']);
    ordersSheet.appendRow(['ORD-AC-20260710-01', 'unit_smp', 'AC_Service', JSON.stringify([{ product_name: '[Maintenance AC] Cuci AC Rutin 2 Unit SMP', qty: 2, unit_price: 85163, subtotal: 170326 }]), 170326, 'Approved', '2026-07-10 08:30', '2026-07-10 09:00', '2 unit cuci SMP (Pos D Item 16)', '', 'INV/AC/2026/0701']);
    ordersSheet.appendRow(['ORD-AC-20260710-02', 'unit_tk', 'AC_Service', JSON.stringify([{ product_name: '[Maintenance AC] Cuci AC Rutin 6 Unit PG-TK', qty: 6, unit_price: 85000, subtotal: 510000 }]), 510000, 'Approved', '2026-07-10 10:15', '2026-07-10 10:45', '6 unit cuci TK', '', 'INV/AC/2026/0702']);
    ordersSheet.appendRow(['ORD-AC-20260716-01', 'unit_smp', 'AC_Service', JSON.stringify([{ product_name: '[Maintenance AC] Kabel AC Ruang Yayasan', qty: 1, unit_price: 110061, subtotal: 110061 }]), 110061, 'Approved', '2026-07-16 11:00', '2026-07-16 11:30', 'Kabel AC ruang yys', '', 'INV/AC/2026/0703']);
    ordersSheet.appendRow(['ORD-AC-20260717-01', 'unit_smp', 'AC_Service', JSON.stringify([{ product_name: '[Maintenance AC] 4 unit cuci, 1 unit isi freon, 1 unit Service SMP', qty: 1, unit_price: 700000, subtotal: 700000 }]), 700000, 'Approved', '2026-07-17 08:30', '2026-07-17 09:00', '4 unit cuci, 1 freon, 1 service SMP (Pos D Item 16)', '', 'INV/AC/2026/0704']);
    ordersSheet.appendRow(['ORD-AC-20260731-01', 'unit_sd', 'AC_Service', JSON.stringify([{ product_name: '[Maintenance AC] 1 unit service SD', qty: 1, unit_price: 175000, subtotal: 175000 }]), 175000, 'Approved', '2026-07-31 09:00', '2026-07-31 09:30', '1 unit service SD', '', 'INV/AC/2026/0705']);
    ordersSheet.appendRow(['ORD-AC-20260731-02', 'unit_smp', 'AC_Service', JSON.stringify([{ product_name: '[Maintenance AC] 2 unit cuci SMP', qty: 2, unit_price: 75000, subtotal: 150000 }]), 150000, 'Approved', '2026-07-31 13:00', '2026-07-31 13:30', '2 unit cuci SMP (Pos D Item 16)', '', 'INV/AC/2026/0706']);
    ordersSheet.appendRow(['ORD-AC-20260829-01', 'unit_sd', 'AC_Service', JSON.stringify([{ product_name: '[Maintenance AC] 1 unit service SD', qty: 1, unit_price: 90329, subtotal: 90329 }]), 90329, 'Approved', '2026-08-29 10:00', '2026-08-29 10:30', '1 unit service SD', '', 'INV/AC/2026/0801']);
    ordersSheet.appendRow(['ORD-AC-20260904-01', 'unit_smp', 'AC_Service', JSON.stringify([{ product_name: '[Maintenance AC] 4 unit cuci SMP (Batch 1)', qty: 4, unit_price: 75000, subtotal: 300000 }]), 300000, 'Approved', '2026-09-04 08:30', '2026-09-04 09:00', '4 unit cuci SMP (Pos D Item 16)', '', 'INV/AC/2026/0901']);
    ordersSheet.appendRow(['ORD-AC-20260904-02', 'unit_smp', 'AC_Service', JSON.stringify([{ product_name: '[Maintenance AC] 4 unit cuci 4 SMP (Batch 2)', qty: 4, unit_price: 75000, subtotal: 300000 }]), 300000, 'Approved', '2026-09-04 13:00', '2026-09-04 13:30', '4 unit cuci 4 SMP (Pos D Item 16)', '', 'INV/AC/2026/0902']);
    ordersSheet.appendRow(['ORD-AC-20260928-01', 'unit_sd', 'AC_Service', JSON.stringify([{ product_name: '[Maintenance AC] 4 Unit Cleaning Kelas 1, Tambah Freon Guru Kls 4, Bocor Perpus', qty: 1, unit_price: 700000, subtotal: 700000 }]), 700000, 'Approved', '2026-09-28 09:30', '2026-09-28 10:00', 'Cleaning Kls 1, Freon Kls 4, Bocor Perpus', '', 'INV/AC/2026/0903']);
  }

  // 5. Transactions_Log Sheet
  let logSheet = ss.getSheetByName(CONFIG.SHEETS.LOGS);
  if (!logSheet) {
    logSheet = ss.insertSheet(CONFIG.SHEETS.LOGS);
    logSheet.appendRow(['Log_ID', 'Order_ID', 'Unit_ID', 'Amount_Deducted', 'Remaining_Balance', 'Timestamp', 'Invoice_Number']);
    logSheet.appendRow(['LOG-SMP-20260729-01', 'ORD-SMP-20260729-01', 'unit_smp', 1859198, 22646802, '2026-07-29 14:00', 'LPJ/SMP/2026/0701']);
    logSheet.appendRow(['LOG-SMP-20260828-01', 'ORD-SMP-20260828-01', 'unit_smp', 1897431, 20749371, '2026-08-28 16:00', 'LPJ/SMP/2026/0801']);
    logSheet.appendRow(['LOG-AC-20260710-01', 'ORD-AC-20260710-01', 'unit_smp', 170326, 24335674, '2026-07-10 09:00', 'INV/AC/2026/0701']);
    logSheet.appendRow(['LOG-AC-20260710-02', 'ORD-AC-20260710-02', 'unit_tk', 510000, 14490000, '2026-07-10 10:45', 'INV/AC/2026/0702']);
    logSheet.appendRow(['LOG-AC-20260716-01', 'ORD-AC-20260716-01', 'unit_smp', 110061, 24225613, '2026-07-16 11:30', 'INV/AC/2026/0703']);
    logSheet.appendRow(['LOG-AC-20260717-01', 'ORD-AC-20260717-01', 'unit_smp', 700000, 23525613, '2026-07-17 09:00', 'INV/AC/2026/0704']);
    logSheet.appendRow(['LOG-AC-20260731-01', 'ORD-AC-20260731-01', 'unit_sd', 175000, 35709000, '2026-07-31 09:30', 'INV/AC/2026/0705']);
    logSheet.appendRow(['LOG-AC-20260731-02', 'ORD-AC-20260731-02', 'unit_smp', 150000, 23375613, '2026-07-31 13:30', 'INV/AC/2026/0706']);
    logSheet.appendRow(['LOG-AC-20260829-01', 'ORD-AC-20260829-01', 'unit_sd', 90329, 35618671, '2026-08-29 10:30', 'INV/AC/2026/0801']);
    logSheet.appendRow(['LOG-AC-20260904-01', 'ORD-AC-20260904-01', 'unit_smp', 300000, 23075613, '2026-09-04 09:00', 'INV/AC/2026/0901']);
    logSheet.appendRow(['LOG-AC-20260904-02', 'ORD-AC-20260904-02', 'unit_smp', 300000, 22775613, '2026-09-04 13:30', 'INV/AC/2026/0902']);
    logSheet.appendRow(['LOG-AC-20260928-01', 'ORD-AC-20260928-01', 'unit_sd', 700000, 34918671, '2026-09-28 10:00', 'INV/AC/2026/0903']);
  }

  // 6. Settings Sheet (White-Label Config)
  let settingsSheet = ss.getSheetByName(CONFIG.SHEETS.SETTINGS);
  if (!settingsSheet) {
    settingsSheet = ss.insertSheet(CONFIG.SHEETS.SETTINGS);
    settingsSheet.appendRow(['Key', 'Value', 'Updated_At']);
  }

  // 7. AC_Inventory Sheet (41 Units SD, SMP & PG-TK)
  let acInventorySheet = ss.getSheetByName(CONFIG.SHEETS.AC_INVENTORY);
  if (!acInventorySheet) {
    acInventorySheet = ss.insertSheet(CONFIG.SHEETS.AC_INVENTORY);
    acInventorySheet.appendRow(['AC_ID', 'Unit_ID', 'Room_Name', 'Brand', 'Capacity_PK', 'Condition', 'Last_Service_Date', 'Next_Service_Date', 'Install_Year', 'Total_Service_Count', 'Notes']);
    // TK
    acInventorySheet.appendRow(['AC-TK-01', 'unit_tk', 'Kelas TK A (Sentra Balok)', 'Daikin FTKC25 (Inverter)', '1 PK', 'Baik / Normal', '2026-07-10', '2026-10-10', 2024, 1, 'Outdoor di balkon lantai 1']);
    acInventorySheet.appendRow(['AC-TK-02', 'unit_tk', 'Kelas TK B (Sentra Imtaq)', 'Sharp AH-A9UCY', '1 PK', 'Baik / Normal', '2026-07-10', '2026-10-10', 2024, 1, 'Outdoor samping lorong bermain']);
    acInventorySheet.appendRow(['AC-TK-03', 'unit_tk', 'Kelas Playgroup (Sentra Main Peran)', 'Panasonic CS-YN9WKJ', '1 PK', 'Baik / Normal', '2026-07-10', '2026-10-10', 2025, 1, 'Indoor bersih']);
    acInventorySheet.appendRow(['AC-TK-04', 'unit_tk', 'Kantor Kepala & Guru PG-TK', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-07-10', '2026-10-10', 2023, 1, 'Outdoor aman beratap']);
    acInventorySheet.appendRow(['AC-TK-05', 'unit_tk', 'Ruang UKS & Konseling PG-TK', 'Gree Eco King GWC-05MOO', '0.5 PK', 'Baik / Normal', '2026-07-10', '2026-10-10', 2025, 1, 'Unit baru dipasang awal tahun']);
    acInventorySheet.appendRow(['AC-TK-06', 'unit_tk', 'Ruang Makan / Daycare Balita', 'Panasonic Low Watt 1 PK', '1 PK', 'Baik / Normal', '2026-07-10', '2026-10-10', 2023, 1, 'Sering dipakai full day']);
    acInventorySheet.appendRow(['AC-TK-07', 'unit_tk', 'Ruang Sentra Bahan Alam', 'Sharp Standard 1 PK', '1 PK', 'Baik / Normal', '2026-08-01', '2026-11-01', 2024, 1, 'Outdoor di taman belakang']);
    acInventorySheet.appendRow(['AC-TK-08', 'unit_tk', 'Lobby & Ruang Tunggu Orang Tua TK', 'Daikin Inverter 2 PK', '2 PK', 'Baik / Normal', '2026-08-01', '2026-11-01', 2025, 1, 'Heavy duty lobby']);
    // SD (18 Units)
    acInventorySheet.appendRow(['AC-SD-01', 'unit_sd', 'Kantor Kepala SD', 'Gree Eco 1/2 PK', '0.5 PK', 'Baik / Normal', '2026-07-31', '2026-10-31', 2024, 1, 'Kantor Kepala Sekolah SD']);
    acInventorySheet.appendRow(['AC-SD-02', 'unit_sd', 'Kantor Guru Ikhwan', 'Gree Eco 1/2 PK', '0.5 PK', 'Baik / Normal', '2026-07-31', '2026-10-31', 2024, 1, 'Ruang Kerja Guru Ikhwan']);
    acInventorySheet.appendRow(['AC-SD-03', 'unit_sd', "Kantor Kabid Al-Qur'an", 'Gree Eco 1/2 PK', '0.5 PK', 'Baik / Normal', '2026-07-16', '2026-10-16', 2024, 1, "Gedung Pusat Al-Qur'an Al-Imam"]);
    acInventorySheet.appendRow(['AC-SD-04', 'unit_sd', 'Ruang Guru SD', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-28', '2026-12-28', 2024, 1, 'Ruang Guru SD']);
    acInventorySheet.appendRow(['AC-SD-05', 'unit_sd', 'Kelas 1 Abdullah (Unit 1)', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-28', '2026-12-28', 2024, 1, 'Cleaning AC Kelas 1 (28/9/2026)']);
    acInventorySheet.appendRow(['AC-SD-06', 'unit_sd', 'Kelas 1 Abdullah (Unit 2)', 'Gree Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-28', '2026-12-28', 2024, 1, 'Cleaning AC Kelas 1 (28/9/2026)']);
    acInventorySheet.appendRow(['AC-SD-07', 'unit_sd', 'Kelas 2 Saad (Unit 1)', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-28', '2026-12-28', 2024, 1, 'Cleaning AC Kelas 2 (28/9/2026)']);
    acInventorySheet.appendRow(['AC-SD-08', 'unit_sd', 'Kelas 2 Saad (Unit 2)', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-28', '2026-12-28', 2024, 1, 'Cleaning AC Kelas 2 (28/9/2026)']);
    acInventorySheet.appendRow(['AC-SD-09', 'unit_sd', "Kelas 3 Ka'ab (Unit 1)", 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-07-31', '2026-10-31', 2024, 1, 'Servis rutin 31/7/2026']);
    acInventorySheet.appendRow(['AC-SD-10', 'unit_sd', "Kelas 3 Ka'ab (Unit 2)", 'Gree Heavy Duty 2 PK', '2 PK', 'Baik / Normal', '2026-07-31', '2026-10-31', 2024, 1, 'Servis rutin 31/7/2026']);
    acInventorySheet.appendRow(['AC-SD-11', 'unit_sd', 'Kelas 4 Ali', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-08-29', '2026-11-29', 2024, 1, 'Servis & pengecekan (29/8/2026)']);
    acInventorySheet.appendRow(['AC-SD-12', 'unit_sd', 'Kelas 4 Sumayyah / Guru Kls 4', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-28', '2026-12-28', 2024, 1, 'Tambah freon 1.5-2 PK (28/9/2026)']);
    acInventorySheet.appendRow(['AC-SD-13', 'unit_sd', 'Kelas 5 Utsman', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-08-15', '2026-11-15', 2024, 1, 'Lantai 2 Gedung SD']);
    acInventorySheet.appendRow(['AC-SD-14', 'unit_sd', 'Kelas 5 Rumaysha', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-08-15', '2026-11-15', 2024, 1, 'Lantai 2 Gedung SD']);
    acInventorySheet.appendRow(['AC-SD-15', 'unit_sd', 'Kelas 6 Umar', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-08-10', '2026-11-10', 2024, 1, 'Lantai 2 Gedung SD']);
    acInventorySheet.appendRow(['AC-SD-16', 'unit_sd', 'Kelas 6 Hafsah', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-08-10', '2026-11-10', 2024, 1, 'Lantai 2 Gedung SD']);
    acInventorySheet.appendRow(['AC-SD-17', 'unit_sd', 'Lab Komputer SD', 'Daikin Heavy Duty 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-08-01', '2026-11-01', 2025, 1, 'Ruang Laboratorium Komputer']);
    acInventorySheet.appendRow(['AC-SD-18', 'unit_sd', 'Lab IPA SD', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-08-01', '2026-11-01', 2024, 1, 'Ruang Praktikum Sains & IPA']);
    // SMP (15 Units)
    acInventorySheet.appendRow(['AC-SMP-01', 'unit_smp', 'Kantor TU SD SMP (Unit 1)', 'Daikin Inverter 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-07-10', '2026-10-10', 2024, 1, 'Kantor Tata Usaha Bersama SD-SMP']);
    acInventorySheet.appendRow(['AC-SMP-02', 'unit_smp', 'Kantor TU SD SMP (Unit 2)', 'Gree Standard 2 PK', '2 PK', 'Baik / Normal', '2026-07-10', '2026-10-10', 2024, 1, 'Kantor Tata Usaha Bersama SD-SMP']);
    acInventorySheet.appendRow(['AC-SMP-03', 'unit_smp', 'Kantor Kepala Sekolah SMP', 'Gree Eco 1/2 PK', '0.5 PK', 'Baik / Normal', '2026-07-17', '2026-10-17', 2024, 1, 'Kantor Kepala Sekolah SMP']);
    acInventorySheet.appendRow(['AC-SMP-04', 'unit_smp', 'Perpustakaan Al-Imam (SD/SMP)', 'Gree Low Watt 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-28', '2026-12-28', 2024, 1, 'Penanganan bocor air tuntas 28/9/2026']);
    acInventorySheet.appendRow(['AC-SMP-05', 'unit_smp', 'Kelas 7 Utsman', 'Gree Heavy Duty 2 PK', '2 PK', 'Baik / Normal', '2026-07-10', '2026-10-10', 2024, 1, 'Cuci rutin 10/7/2026 (Pos D Item 16)']);
    acInventorySheet.appendRow(['AC-SMP-06', 'unit_smp', 'Kelas 7 Aisyah', 'Daikin Inverter 2 PK', '2 PK', 'Baik / Normal', '2026-07-10', '2026-10-10', 2024, 1, 'Cuci rutin 10/7/2026 (Pos D Item 16)']);
    acInventorySheet.appendRow(['AC-SMP-07', 'unit_smp', 'Kantor Guru Akhwat SMP', 'Daikin Inverter 2 PK', '2 PK', 'Baik / Normal', '2026-09-04', '2026-12-04', 2024, 1, 'Cuci rutin 4/9/2026 (Pos D Item 16)']);
    acInventorySheet.appendRow(['AC-SMP-08', 'unit_smp', 'Kelas 9 Ummu (Unit 1)', 'Gree Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-04', '2026-12-04', 2024, 1, 'Cuci rutin 4/9/2026 (Pos D Item 16)']);
    acInventorySheet.appendRow(['AC-SMP-09', 'unit_smp', 'Kelas 9 Ummu (Unit 2)', 'Gree Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-04', '2026-12-04', 2024, 1, 'Cuci rutin 4/9/2026 (Pos D Item 16)']);
    acInventorySheet.appendRow(['AC-SMP-10', 'unit_smp', 'Kelas 8 Khodijah (Unit 1)', 'Daikin Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-07-31', '2026-10-31', 2024, 1, 'Cuci rutin 31/7/2026 (Pos D Item 16)']);
    acInventorySheet.appendRow(['AC-SMP-11', 'unit_smp', 'Kelas 8 Khodijah (Unit 2)', 'Gree Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-07-31', '2026-10-31', 2024, 1, 'Cuci rutin 31/7/2026 (Pos D Item 16)']);
    acInventorySheet.appendRow(['AC-SMP-12', 'unit_smp', 'Kelas 8 Umar bin Khattab (Unit 1)', 'Gree Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-04', '2026-12-04', 2024, 1, 'Cuci rutin 4/9/2026 (Pos D Item 16)']);
    acInventorySheet.appendRow(['AC-SMP-13', 'unit_smp', 'Kelas 8 Umar bin Khattab (Unit 2)', 'Gree Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-04', '2026-12-04', 2024, 1, 'Cuci rutin 4/9/2026 (Pos D Item 16)']);
    acInventorySheet.appendRow(['AC-SMP-14', 'unit_smp', 'Kelas 9 Abu Bakar (Unit 1)', 'Daikin Inverter 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-04', '2026-12-04', 2024, 1, 'Cuci rutin 4/9/2026 (Pos D Item 16)']);
    acInventorySheet.appendRow(['AC-SMP-15', 'unit_smp', 'Kelas 9 Abu Bakar (Unit 2)', 'Gree Standard 1.5 PK', '1.5 PK', 'Baik / Normal', '2026-09-04', '2026-12-04', 2024, 1, 'Cuci rutin 4/9/2026 (Pos D Item 16)']);
  }

  // 8. AC_Services Sheet (10 Real Service Records)
  let acServicesSheet = ss.getSheetByName(CONFIG.SHEETS.AC_SERVICES);
  if (!acServicesSheet) {
    acServicesSheet = ss.insertSheet(CONFIG.SHEETS.AC_SERVICES);
    acServicesSheet.appendRow(['Request_ID', 'Unit_ID', 'Room_Name', 'AC_ID', 'Service_Name', 'Qty', 'Unit_Price', 'Total_Amount', 'Funding_Source', 'Scheduled_Date', 'Vendor_Name', 'Status', 'Created_At']);
    acServicesSheet.appendRow(['AC-REQ-202607-01', 'unit_smp', 'Kelas 7 Utsman & 7 Aisyah SMP', 'AC-SMP-05', 'Cuci AC Rutin SMP (2 Unit)', 2, 85163, 170326, 'RAPBS_POIN', '2026-07-10', 'CV Sarana Sejuk Al-Imam', 'Selesai', '2026-07-10 08:30']);
    acServicesSheet.appendRow(['AC-REQ-202607-02', 'unit_tk', 'Area PG-TK (6 Unit)', 'AC-TK-01', 'Cuci AC Rutin PG-TK (6 Unit)', 6, 85000, 510000, 'RAPBS_POIN', '2026-07-10', 'CV Sarana Sejuk Al-Imam', 'Selesai', '2026-07-10 10:15']);
    acServicesSheet.appendRow(['AC-REQ-202607-03', 'unit_smp', "Ruang Yayasan / Kantor Kabid Al-Qur'an", 'AC-SD-03', 'Instalasi & Kabel AC Ruang Yayasan', 1, 110061, 110061, 'RAPBS_POIN', '2026-07-16', 'CV Sarana Sejuk Al-Imam', 'Selesai', '2026-07-16 11:00']);
    acServicesSheet.appendRow(['AC-REQ-202607-04', 'unit_smp', 'Kelas 8 & 9 SMP (4 Ruang Kelas)', 'AC-SMP-08', 'Paket Service SMP: 4 Cuci, 1 Freon, 1 Service', 6, 116666, 700000, 'RAPBS_POIN', '2026-07-17', 'CV Sarana Sejuk Al-Imam', 'Selesai', '2026-07-17 08:30']);
    acServicesSheet.appendRow(['AC-REQ-202607-05', 'unit_sd', "Ruang Kelas 3 Ka'ab SD", 'AC-SD-09', 'Perbaikan & Service AC SD (1 Unit)', 1, 175000, 175000, 'RAPBS_POIN', '2026-07-31', 'CV Sarana Sejuk Al-Imam', 'Selesai', '2026-07-31 09:00']);
    acServicesSheet.appendRow(['AC-REQ-202607-06', 'unit_smp', 'Kelas 8 Khodijah SMP (2 Unit)', 'AC-SMP-10', 'Cuci AC Rutin SMP (2 Unit)', 2, 75000, 150000, 'RAPBS_POIN', '2026-07-31', 'CV Sarana Sejuk Al-Imam', 'Selesai', '2026-07-31 13:00']);
    acServicesSheet.appendRow(['AC-REQ-202608-01', 'unit_sd', 'Ruang Kelas 4 Ali SD', 'AC-SD-11', 'Service & Pengecekan AC SD (1 Unit)', 1, 90329, 90329, 'RAPBS_POIN', '2026-08-29', 'CV Sarana Sejuk Al-Imam', 'Selesai', '2026-08-29 10:00']);
    acServicesSheet.appendRow(['AC-REQ-202609-01', 'unit_smp', 'Kelas 8 Umar & 9 Abu Bakar (Batch 1)', 'AC-SMP-12', 'Cuci AC Rutin SMP (4 Unit)', 4, 75000, 300000, 'RAPBS_POIN', '2026-09-04', 'CV Sarana Sejuk Al-Imam', 'Selesai', '2026-09-04 08:30']);
    acServicesSheet.appendRow(['AC-REQ-202609-02', 'unit_smp', 'Kelas 9 Ummu & Kantor Guru (Batch 2)', 'AC-SMP-08', 'Cuci AC Rutin 4 SMP (Batch 2)', 4, 75000, 300000, 'RAPBS_POIN', '2026-09-04', 'CV Sarana Sejuk Al-Imam', 'Selesai', '2026-09-04 13:00']);
    acServicesSheet.appendRow(['AC-REQ-202609-03', 'unit_sd', 'Kelas 1, Guru Kls 4 & Perpus SD/SMP', 'AC-SD-05', 'Paket Cleaning AC Kls 1, Freon & Bocor Perpus', 6, 116666, 700000, 'RAPBS_POIN', '2026-09-28', 'CV Sarana Sejuk Al-Imam', 'Selesai', '2026-09-28 09:30']);
  }

  // 9. Renov_Projects Sheet
  let renovProjectsSheet = ss.getSheetByName(CONFIG.SHEETS.RENOV_PROJECTS);
  if (!renovProjectsSheet) {
    renovProjectsSheet = ss.insertSheet(CONFIG.SHEETS.RENOV_PROJECTS);
    renovProjectsSheet.appendRow(['Project_ID', 'Unit_ID', 'Location_Name', 'Category', 'Budget_Estimate', 'Progress_Pct', 'Target_Date', 'Status', 'Notes', 'Created_At']);
    renovProjectsSheet.appendRow(['PRJ-TK-01', 'unit_tk', 'Pagar Depan & Area Bermain TK', 'Pengecatan Gedung / Kelas', 3500000, 75, '2026-10-05', 'Dalam Pengerjaan', 'Pengecatan pagar warna-warni ramah anak dan perbaikan ayunan.', '2026-09-20']);
    renovProjectsSheet.appendRow(['PRJ-SD-01', 'unit_sd', 'Dinding Kelas 1A, 1B & Koridor Lantai 1', 'Pengecatan Gedung / Kelas', 5800000, 50, '2026-10-10', 'Dalam Pengerjaan', 'Pengecatan ulang Dulux Catylac interior dan perapian plamir retak rambut.', '2026-09-22']);
    renovProjectsSheet.appendRow(['PRJ-SD-02', 'unit_sd', 'Toilet Siswa & Guru SD (Lantai 1)', 'Renovasi Toilet & Sanitasi', 4200000, 25, '2026-10-15', 'Dalam Pengerjaan', 'Penggantian keramik lantai anti slip, kran air dan perbaikan saluran pembuangan.', '2026-09-25']);
    renovProjectsSheet.appendRow(['PRJ-SMP-01', 'unit_smp', 'Pengecatan Koridor & Kelas 7-9 SMP', 'Pengecatan Gedung / Kelas', 6500000, 60, '2026-10-08', 'Dalam Pengerjaan', 'Pengecatan dinding koridor utama dan pintu kelas SMP.', '2026-09-21']);
  }

  // 10. Renov_Requests Sheet
  let renovRequestsSheet = ss.getSheetByName(CONFIG.SHEETS.RENOV_REQUESTS);
  if (!renovRequestsSheet) {
    renovRequestsSheet = ss.insertSheet(CONFIG.SHEETS.RENOV_REQUESTS);
    renovRequestsSheet.appendRow(['Request_ID', 'Project_ID', 'Unit_ID', 'Location_Name', 'Category', 'Material_Name', 'Qty', 'Unit_Price', 'Material_Subtotal', 'Labor_Count', 'Labor_Days', 'Labor_Rate', 'Labor_Subtotal', 'Total_Amount', 'Scheduled_Date', 'Vendor_Name', 'Funding_Source', 'Status', 'Notes', 'Created_At']);
    renovRequestsSheet.appendRow(['RNV-REQ-202609-01', 'PRJ-SD-01', 'unit_sd', 'Dinding Kelas 1A & 1B', 'Pengecatan Gedung / Kelas', 'Cat Tembok Interior Dulux / Catylac 20kg', 4, 650000, 2600000, 2, 4, 175000, 1400000, 4000000, '2026-09-28', 'TB. Al-Imam Jaya Material', 'RAPBS_POIN', 'Dalam Pengerjaan', 'Warna Putih Salju & Hijau Pastel kelas.', '2026-09-24 10:00']);
  }

  return ss;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
