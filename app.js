const LOGO = "logo.webp";
const COMPANY = {
  name: "ألوان الحياة للديكور", nameEn: "lifecoloers",
  phone: "+966 564 964 000", email: "LIFECOLOERS@GMAIL.COM",
  address: "السعودية - الإحساء - شارع صلاح الدين"
};
const LOW_STOCK_THRESHOLD = 5;

/* ---------------- Materials & suppliers catalog ---------------- */
const CATALOG = [
  {id:'c1',  name:'باركيه صيني',                     price:55,   company:'صح',              rep:'544165630',   category:'أرضيات'},
  {id:'c2',  name:'باركيه بلجيكي',                    price:75,   company:'صح',              rep:'544165630',   category:'أرضيات'},
  {id:'c3',  name:'باركيه تركي',                      price:65,   company:'انجاز',            rep:'558997714',   category:'أرضيات'},
  {id:'c4',  name:'باركيه ألماني',                    price:85,   company:'انجاز',            rep:'558997714',   category:'أرضيات'},
  {id:'c5',  name:'باركيه SPC',                       price:95,   company:'الخيال',           rep:'533843784',   category:'أرضيات'},
  {id:'c6',  name:'باركيه هرمي',                      price:105,  company:'الفخامة',          rep:'532081377',   category:'أرضيات'},
  {id:'c7',  name:'لباد (فوم)',                       price:13,   company:'صح',              rep:'544165630',   category:'أرضيات'},
  {id:'c8',  name:'بديل الخشب داخلي',                 price:65,   company:'عالم همسة نايا',   rep:'563038442',   category:'بدائل الخشب والرخام'},
  {id:'c9',  name:'بديل الخشب خارجي',                 price:110,  company:'صح',              rep:'544165630',   category:'بدائل الخشب والرخام'},
  {id:'c10', name:'بديل الشيبورد',                    price:280,  company:'رنين الجودة',      rep:'503777157',   category:'بدائل الخشب والرخام'},
  {id:'c11', name:'بديل الرخام',                      price:250,  company:'هوم ديزاين',       rep:'541620305',   category:'بدائل الخشب والرخام'},
  {id:'c12', name:'بديل الحجر (بلاطات)',               price:120,  company:'شراح الريح',       rep:'554212789',   category:'بدائل الخشب والرخام'},
  {id:'c13', name:'بديل الحجر (لوح)',                  price:1000, company:'صح',              rep:'544165630',   category:'بدائل الخشب والرخام'},
  {id:'c14', name:'ورق جدران',                        price:300,  company:'بيت النقش',        rep:'506682138',   category:'ديكورات الجدران'},
  {id:'c15', name:'مرايات عادية',                     price:250,  company:'عند ناصر',        rep:'عند علاء',    category:'ديكورات الجدران'},
  {id:'c16', name:'مرايات ديكورية',                   price:350,  company:'عند ناصر',        rep:'عند علاء',    category:'ديكورات الجدران'},
  {id:'c17', name:'جبس بورد طبقة',                    price:55,   company:'احنا ومحمد علي',   rep:'احنا ومحمد علي', category:'ديكورات الجدران'},
  {id:'c18', name:'جبس بورد طبقتين',                  price:75,   company:'احنا ومحمد علي',   rep:'احنا ومحمد علي', category:'ديكورات الجدران'},
  {id:'c19', name:'جبس بورد ثلاثة طبقات',              price:95,   company:'احنا ومحمد علي',   rep:'احنا ومحمد علي', category:'ديكورات الجدران'},
  {id:'c20', name:'صبغ مع المواد',                    price:30,   company:'احنا ومحمد علي',   rep:'احنا ومحمد علي', category:'الدهانات'},
  {id:'c21', name:'صبغ بدون مواد',                    price:20,   company:'احنا ومحمد علي',   rep:'احنا ومحمد علي', category:'الدهانات'},
  {id:'c22', name:'خشب MDF مكتبة',                    price:600,  company:'الموسى',           rep:'551101174',   category:'الخشب والمطابخ'},
  {id:'c23', name:'خشب MDF دريسنج مع درفة زجاج',        price:900,  company:'الموسى',           rep:'551101174',   category:'الخشب والمطابخ'},
  {id:'c24', name:'خشب MDF دريسنج بدون زجاج',           price:750,  company:'الروائع الخشبية',  rep:'536362615',   category:'الخشب والمطابخ'},
  {id:'c25', name:'خشب شيبورد الماني للمطبخ',           price:1150, company:'ايتكو',            rep:'55 513 9286', category:'الخشب والمطابخ'},
];
const CATEGORIES = [...new Set(CATALOG.map(c=>c.category))];
const EXPENSE_CATEGORIES = ['إيجار','رواتب ومندوبين','نقل وتوصيل','فواتير وخدمات','أخرى'];
function isPhoneLike(s){ return /^[0-9+\s]+$/.test(String(s||'').trim()) && String(s).replace(/\D/g,'').length>=7; }
function catalogById(id){ return CATALOG.find(c=>c.id===id); }

/* ---------------- State & storage ---------------- */
const STORAGE_KEY = 'alwan-hayat-clients-v2';
let STATE = { clients: [], inventory: {}, purchases: [], expenses: [] };
let VIEW = { name: 'dashboard', clientId: null };
let DRAFT = null;
let CAT_FILTER = 'الكل';
let DASH_SEARCH = '';
let DASH_STATUS_FILTER = 'all';
const LEAD_SOURCES = ['غير محدد','إنستقرام','سناب شات','تيك توك','واتساب','إحالة من عميل','معرض/زيارة محل','أخرى'];
const ROLES_LIST = ['مدير','مبيعات','محاسب'];
const CLIENT_TAGS = [
  {key:'عادي', color:'#9C8F70'},
  {key:'VIP', color:'#B8874A'},
  {key:'بارد', color:'#7FB0C9'},
  {key:'مهم/عاجل', color:'#A23B2E'}
];
function tagColor(tag){ const t = CLIENT_TAGS.find(x=>x.key===tag); return t?t.color:'#9C8F70'; }

const STATUS_LIST = [
  { key:'new',        label:'عميل جديد' },
  { key:'measured',   label:'تم أخذ القياسات' },
  { key:'quoted',     label:'تم إرسال عرض السعر' },
  { key:'contract',   label:'تم توقيع العقد' },
  { key:'production', label:'قيد التنفيذ' },
  { key:'delivered',  label:'تم التسليم والتركيب' },
  { key:'collected',  label:'تم التحصيل بالكامل' },
];
function statusLabel(key){ const s = STATUS_LIST.find(s=>s.key===key); return s? s.label : key; }
function uid(){ return 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function fmt(n){ return (Math.round((n||0)*100)/100).toLocaleString('ar-EG', {maximumFractionDigits:2}); }
function todayStr(){ const d=new Date(); return d.toLocaleDateString('ar-EG-u-nu-latn', {year:'numeric', month:'2-digit', day:'2-digit'}); }
function todayISO(){ return new Date().toISOString().slice(0,10); }
function normalizePhone(phone){
  let p = String(phone||'').replace(/[^0-9]/g,'');
  if(!p) return '';
  if(p.startsWith('00966')) p = p.slice(2);
  if(p.startsWith('0')) p = '966' + p.slice(1);
  if(!p.startsWith('966') && p.length===9) p = '966' + p;
  return p;
}
function waLink(phone, text){
  const p = normalizePhone(phone);
  const msg = encodeURIComponent(text||'');
  return p ? `https://wa.me/${p}?text=${msg}` : `https://api.whatsapp.com/send?text=${msg}`;
}
function isQuoteExpired(c){
  if(!c.quoteDateISO || !c.quoteValidDays) return false;
  if(['contract','production','delivered','collected'].includes(c.status)) return false;
  const deadline = new Date(c.quoteDateISO); deadline.setDate(deadline.getDate() + (parseInt(c.quoteValidDays)||0));
  return new Date() > deadline;
}
function buildWhatsAppQuoteMessage(c){
  const t = calcOrder(c);
  const lines = [
    `مرحبًا ${c.name} 🌿`,
    `هذا عرض السعر من ${COMPANY.name}:`,
    ''
  ];
  c.items.forEach((it,idx)=>{
    const ic = calcItem(it);
    const sell = ic.itemCost * (1 + (t.margin/100));
    lines.push(`${idx+1}. ${itemDisplayName(it)} — الكمية ${fmt(it.qty)} — ${fmt(sell)} ر.س`);
  });
  lines.push('');
  if(t.installation>0) lines.push(`تركيب وتوصيل: ${fmt(t.installation)} ر.س`);
  lines.push(`الإجمالي المستحق: ${fmt(t.grandTotal)} ر.س`);
  lines.push(`صالح لمدة ${c.quoteValidDays||15} يومًا من تاريخ الإرسال.`);
  lines.push('');
  lines.push(`للتواصل: ${COMPANY.phone}`);
  return lines.join('\n');
}

/* ---------------- رمز QR المبسّط (ZATCA - مرحلة التوليد الأولى) ---------------- */
function zatcaTLV(tag, value){
  const valueBytes = new TextEncoder().encode(String(value));
  return new Uint8Array([tag, valueBytes.length, ...valueBytes]);
}
function buildZatcaQRBase64(sellerName, vatNumber, timestampISO, totalWithVat, vatAmount){
  const parts = [
    zatcaTLV(1, sellerName), zatcaTLV(2, vatNumber), zatcaTLV(3, timestampISO),
    zatcaTLV(4, totalWithVat), zatcaTLV(5, vatAmount)
  ];
  const totalLen = parts.reduce((s,p)=>s+p.length,0);
  const buffer = new Uint8Array(totalLen);
  let offset=0; parts.forEach(p=>{ buffer.set(p, offset); offset+=p.length; });
  let binary = ''; buffer.forEach(b=> binary += String.fromCharCode(b));
  return btoa(binary);
}
function renderZatcaQR(){
  const c = STATE.clients.find(c=>c.id===VIEW.clientId) || DRAFT;
  const vat = (STATE.settings && STATE.settings.vatNumber) || '';
  const qrDiv = document.getElementById('zatca-qr');
  if(!qrDiv) return;
  if(!vat){ qrDiv.innerHTML = '<div class="muted-note">أضف رقمك الضريبي من تبويب الإعدادات لتفعيل رمز الفاتورة المبسط.</div>'; return; }
  if(typeof QRCode === 'undefined'){ qrDiv.innerHTML = ''; return; }
  const t = calcOrder(c);
  const totalWithVat = t.grandTotal;
  const vatAmount = totalWithVat - (totalWithVat/1.15);
  const b64 = buildZatcaQRBase64(COMPANY.name, vat, new Date().toISOString(), totalWithVat.toFixed(2), vatAmount.toFixed(2));
  qrDiv.innerHTML = '';
  new QRCode(qrDiv, { text: b64, width:110, height:110 });
}

let SERVER_ONLINE = true;
let NEEDS_LOGIN = false;
let LOGIN_ERROR = '';
let PORTAL_ID = null;
let PORTAL_DATA = null;
let USER_ROLE = (function(){ try{ return localStorage.getItem('alwan_role')||'مدير'; }catch(e){ return 'مدير'; } })();
let DARK_MODE = (function(){ try{ return localStorage.getItem('alwan_theme')==='dark'; }catch(e){ return false; } })();
function applyTheme(){
  document.documentElement.setAttribute('data-theme', DARK_MODE ? 'dark' : 'light');
}
function toggleDarkMode(){
  DARK_MODE = !DARK_MODE;
  try{ localStorage.setItem('alwan_theme', DARK_MODE?'dark':'light'); }catch(e){}
  applyTheme();
  render();
}
function printFullReport(){
  logEvent('طباعة تقرير كامل', '');
  const wasDark = DARK_MODE;
  if(wasDark) document.documentElement.setAttribute('data-theme','light');
  document.body.classList.add('printing-report');
  const restore = () => {
    document.body.classList.remove('printing-report');
    if(wasDark) document.documentElement.setAttribute('data-theme','dark');
    window.removeEventListener('afterprint', restore);
  };
  window.addEventListener('afterprint', restore);
  window.print();
  setTimeout(restore, 1500);
}
async function loadState(){
  try{
    const res = await fetch('/api/state');
    if(res.status === 401){ NEEDS_LOGIN = true; SERVER_ONLINE = true; return; }
    if(!res.ok) throw new Error('server error');
    STATE = await res.json();
    SERVER_ONLINE = true; NEEDS_LOGIN = false;
  }catch(e){ STATE = { clients: [] }; SERVER_ONLINE = false; }
  if(!STATE.clients) STATE.clients = [];
  if(!STATE.inventory) STATE.inventory = {};
  if(!STATE.purchases) STATE.purchases = [];
  if(!STATE.expenses) STATE.expenses = [];
  if(!STATE.settings) STATE.settings = { vatNumber: '' };
  if(!STATE.auditLog) STATE.auditLog = [];
  if(!STATE.templates) STATE.templates = [];
  if(!STATE.employees) STATE.employees = [];
  if(!STATE.campaigns) STATE.campaigns = [];
  STATE.clients.forEach(c=>{
    if(!c.payments) c.payments = [];
    if(!c.activities) c.activities = [];
    if(!c.leadSource) c.leadSource = 'غير محدد';
    if(c.nextFollowUpDate===undefined) c.nextFollowUpDate = '';
    if(!c.tasks) c.tasks = [];
    if(c.inventoryDeducted===undefined) c.inventoryDeducted = false;
    if(!c.clientTag) c.clientTag = 'عادي';
    if(!c.quoteHistory) c.quoteHistory = [];
    if(!c.photos) c.photos = [];
    if(c.rating===undefined) c.rating = null;
    if(c.ratingComment===undefined) c.ratingComment = '';
  });
}
async function saveState(){
  try{
    const res = await fetch('/api/state', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(STATE)
    });
    if(res.status === 401){ NEEDS_LOGIN = true; render(); return; }
    if(!res.ok) throw new Error('server error');
    SERVER_ONLINE = true;
  }catch(e){
    SERVER_ONLINE = false;
    showToast('تعذّر الحفظ — تأكد أن الخادم (server.js) يعمل');
  }
}
async function checkServerHealth(){
  try{ const res = await fetch('/api/health'); SERVER_ONLINE = res.ok; }
  catch(e){ SERVER_ONLINE = false; }
  return SERVER_ONLINE;
}
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(showToast._h);
  showToast._h = setTimeout(()=>t.classList.remove('show'), 1800);
}

/* ---------------- Item model & calc ---------------- */
function newItem(){ return { id: uid(), catalogId:'', customName:'', location:'', qty:1, unitPrice:'', company:'', rep:'' }; }
function calcItem(it){ const qty = parseFloat(it.qty)||0; const price = parseFloat(it.unitPrice)||0; return { itemCost: qty*price }; }
function itemDisplayName(it){ if(it.catalogId){ const c = catalogById(it.catalogId); return c? c.name : it.customName; } return it.customName || 'بند بدون اسم'; }
function calcOrder(client){
  let totalCost = 0;
  (client.items||[]).forEach(it=>{ totalCost += calcItem(it).itemCost; });
  const margin = parseFloat(client.marginPercent)||0;
  const marginAmount = totalCost * margin/100;
  const installation = parseFloat(client.installationFee)||0;
  const itemsSelling = totalCost + marginAmount;
  const grandTotal = itemsSelling + installation;
  return { totalCost, marginAmount, installation, itemsSelling, grandTotal, margin };
}
function clientCollected(c){ return (c.payments||[]).reduce((s,p)=>s+(parseFloat(p.amount)||0),0); }
function getStock(catalogId){ return STATE.inventory[catalogId]!==undefined ? STATE.inventory[catalogId] : 0; }
function logEvent(action, details){
  try{ fetch('/api/log', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action, details: details||''}), keepalive:true}).catch(()=>{}); }catch(e){}
}
function addAudit(action, details){
  if(!STATE.auditLog) STATE.auditLog = [];
  STATE.auditLog.push({id:uid(), action, details, role:USER_ROLE, date:todayStr(), dateISO:todayISO()});
  // نحتفظ بآخر 500 حدث فقط لتفادي تضخّم قاعدة البيانات
  if(STATE.auditLog.length>500) STATE.auditLog = STATE.auditLog.slice(-500);
}

/* ---------------- Router ---------------- */
function go(name, clientId){
  if(!PORTAL_ID && !NEEDS_LOGIN){
    const cl = clientId && STATE && STATE.clients ? STATE.clients.find(x=>x.id===clientId) : null;
    logEvent('فتح صفحة', name + (cl ? ' — ' + cl.name : ''));
  }
  VIEW = { name, clientId: clientId||null }; const g = groupContaining(name); if(g) OPEN_GROUP = g; render(); }
function render(){
  const app = document.getElementById('app');
  if(PORTAL_ID){ app.innerHTML = viewPortal(); return; }
  if(NEEDS_LOGIN){ app.innerHTML = viewLogin(); return; }
  if(VIEW.name==='dashboard') app.innerHTML = viewDashboard();
  else if(VIEW.name==='clients') app.innerHTML = viewClients();
  else if(VIEW.name==='form') app.innerHTML = viewClientForm();
  else if(VIEW.name==='quote'){ app.innerHTML = viewQuote(); renderZatcaQR(); }
  else if(VIEW.name==='quotes') app.innerHTML = viewQuotes();
  else if(VIEW.name==='projects') app.innerHTML = viewProjects();
  else if(VIEW.name==='estimates') app.innerHTML = viewEstimates();
  else if(VIEW.name==='catalog') app.innerHTML = viewCatalog();
  else if(VIEW.name==='items') app.innerHTML = viewItems();
  else if(VIEW.name==='suppliers') app.innerHTML = viewSuppliers();
  else if(VIEW.name==='inventory') app.innerHTML = viewInventory();
  else if(VIEW.name==='purchases') app.innerHTML = viewPurchases();
  else if(VIEW.name==='collections') app.innerHTML = viewCollections();
  else if(VIEW.name==='expenses') app.innerHTML = viewExpenses();
  else if(VIEW.name==='profits') app.innerHTML = viewProfits();
  else if(VIEW.name==='accounts') app.innerHTML = viewAccounts();
  else if(VIEW.name==='reports') app.innerHTML = viewReports();
  else if(VIEW.name==='analytics'){ app.innerHTML = viewAnalytics(); renderReportCharts(); }
  else if(VIEW.name==='settings') app.innerHTML = viewSettings();
  else if(VIEW.name==='users') app.innerHTML = viewUsers();
  else if(VIEW.name==='kanban') app.innerHTML = viewKanban();
  else if(VIEW.name==='schedule') app.innerHTML = viewSchedule();
  else if(VIEW.name==='templates') app.innerHTML = viewTemplates();
  else if(VIEW.name==='auditlog'){ app.innerHTML = viewAuditLog(); loadActivityLog(); }
  else if(VIEW.name==='employees') app.innerHTML = viewEmployees();
  else if(VIEW.name==='marketing') app.innerHTML = viewMarketing();
  else if(VIEW.name==='leadstats') app.innerHTML = viewLeadStats();
}

/* ---------------- Login ---------------- */
function viewLogin(){
  return `
  <div style="max-width:380px; margin:80px auto; text-align:center;">
    <img src="${LOGO}" style="width:64px; height:64px; object-fit:contain; margin-bottom:10px;">
    <h1 style="color:var(--maroon); margin-bottom:4px;">${COMPANY.name}</h1>
    <div class="muted-note" style="margin-bottom:24px;">تسجيل الدخول للمتابعة</div>
    <div class="card" style="text-align:right;">
      <label>الدور</label>
      <select id="login-role">
        <option value="مدير" ${USER_ROLE==='مدير'?'selected':''}>مدير</option>
        <option value="مبيعات" ${USER_ROLE==='مبيعات'?'selected':''}>مبيعات</option>
        <option value="محاسب" ${USER_ROLE==='محاسب'?'selected':''}>محاسب</option>
      </select>
      <label style="margin-top:12px;">كلمة مرور هذا الدور</label>
      <input id="login-password" type="password" placeholder="••••••••" onkeydown="if(event.key==='Enter'){doLogin();}">
      ${LOGIN_ERROR ? `<div style="color:var(--danger); font-size:13px; margin-top:12px;">${escapeHtml(LOGIN_ERROR)}</div>` : ''}
      <button class="btn-gold" style="width:100%; margin-top:16px;" onclick="doLogin()">دخول</button>
    </div>
    <div class="muted-note" style="margin-top:16px;">كلمة مرور كل دور منفصلة عن الباقي. الافتراضية عند أول تشغيل لكل الأدوار: alwan2026 — غيّرها من "المستخدمون والصلاحيات" بعد الدخول.</div>
  </div>`;
}
async function doLogin(){
  const password = document.getElementById('login-password').value;
  const role = document.getElementById('login-role').value;
  try{
    const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({password, role}) });
    if(!res.ok){ const j = await res.json().catch(()=>({})); LOGIN_ERROR = j.error || 'تعذّر تسجيل الدخول'; render(); return; }
    USER_ROLE = role;
    try{ localStorage.setItem('alwan_role', role); }catch(e){}
    NEEDS_LOGIN = false; LOGIN_ERROR = '';
    await loadState();
    go('dashboard');
  }catch(e){ LOGIN_ERROR = 'تعذّر الاتصال بالخادم'; render(); }
}
async function doLogout(){
  try{ await fetch('/api/logout', {method:'POST'}); }catch(e){}
  NEEDS_LOGIN = true;
  render();
}

/* ---------------- بوابة العميل العامة (قراءة فقط) ---------------- */
async function loadPortal(id){
  PORTAL_ID = id;
  try{
    const res = await fetch('/api/portal/'+id);
    if(res.ok) PORTAL_DATA = await res.json();
    else PORTAL_DATA = null;
  }catch(e){ PORTAL_DATA = null; }
  render();
}
function viewPortal(){
  if(!PORTAL_DATA){
    return `<div style="max-width:420px;margin:80px auto;text-align:center;" class="muted-note">تعذّر العثور على هذا العرض، أو أن الرابط غير صحيح.</div>`;
  }
  const c = PORTAL_DATA;
  const rows = c.items.map((it,idx)=>{
    const name = it.catalogId ? (catalogById(it.catalogId)?.name || it.customName) : it.customName;
    return `<tr><td>${idx+1}</td><td>${escapeHtml(name)}${it.location?' — '+escapeHtml(it.location):''}</td><td>${fmt(it.qty)}</td><td>${fmt(it.sell)} ر.س</td></tr>`;
  }).join('');
  const tasksHtml = (c.tasks||[]).map(tk=>`<div style="padding:6px 0;">${tk.done?'✅':'⬜'} ${escapeHtml(tk.text)}</div>`).join('') || '<div class="muted-note">لا توجد مهام بعد</div>';
  const photosHtml = (c.photos||[]).length ? `<div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:10px;">` + c.photos.map(p=>`
    <div style="width:130px;"><img src="${p.url}" style="width:130px; height:95px; object-fit:cover; border-radius:4px;"><div class="muted-note" style="text-align:center;">${p.type==='before'?'قبل':'بعد'}</div></div>
  `).join('') + `</div>` : '';
  const ratingHtml = c.rating
    ? `<div style="font-size:22px; color:#B8874A; margin-top:10px;">${'★'.repeat(c.rating)}${'☆'.repeat(5-c.rating)}</div><div class="muted-note">شكرًا لتقييمك!</div>`
    : (['delivered','collected'].includes(c.status) ? `
      <div style="margin-top:10px;">
        <div id="rate-stars" style="font-size:28px; cursor:pointer; color:#D8AE72;">${[1,2,3,4,5].map(n=>`<span onclick="setPortalRating(${n})" id="star-${n}">☆</span>`).join('')}</div>
        <textarea id="rate-comment" rows="2" placeholder="أي ملاحظة إضافية (اختياري)" style="margin-top:8px; width:100%; font-family:'Tajawal'; padding:8px; border-radius:4px; border:1px solid #E7D5AE;"></textarea>
        <button class="btn-gold" style="margin-top:8px;" onclick="submitPortalRating('${PORTAL_ID}')">إرسال التقييم</button>
      </div>` : '');
  return `
  <div class="quote-sheet" style="margin-top:30px;">
    <div class="qhead">
      <div class="brandline"><img src="${LOGO}"><div><h2>${COMPANY.name}</h2><div class="sub">بوابة متابعة الطلب</div></div></div>
      <div class="qmeta"><div><b>الحالة:</b> ${statusLabel(c.status)}</div><div><b>التاريخ:</b> ${c.quoteDate||''}</div></div>
    </div>
    <div class="client-box"><div><span class="l">مرحبًا: </span><b>${escapeHtml(c.name)}</b></div></div>
    <table><thead><tr><th>م</th><th>البيان</th><th>الكمية</th><th>السعر</th></tr></thead><tbody>${rows}</tbody></table>
    <div class="qtotals">
      <div class="row"><span>الإجمالي</span><span>${fmt(c.grandTotal)} ر.س</span></div>
      <div class="row"><span>المدفوع</span><span>${fmt(c.collected)} ر.س</span></div>
      <div class="row grand"><span>المتبقي</span><span>${fmt(c.remaining)} ر.س</span></div>
    </div>
    <div class="section-title"><h2>مراحل التنفيذ</h2><div class="line"></div></div>
    ${tasksHtml}
    ${photosHtml ? `<div class="section-title"><h2>صور المشروع</h2><div class="line"></div></div>${photosHtml}` : ''}
    ${ratingHtml ? `<div class="section-title"><h2>قيّم تجربتك</h2><div class="line"></div></div>${ratingHtml}` : ''}
    <div class="contactfoot" style="margin-top:20px;"><span>📞 ${COMPANY.phone}</span></div>
  </div>`;
}
let PORTAL_SELECTED_STARS = 0;
function setPortalRating(n){
  PORTAL_SELECTED_STARS = n;
  for(let i=1;i<=5;i++){ const el=document.getElementById('star-'+i); if(el) el.textContent = i<=n ? '★' : '☆'; }
}
async function submitPortalRating(clientId){
  if(!PORTAL_SELECTED_STARS){ showToast('اختر عدد النجوم أولًا'); return; }
  const comment = document.getElementById('rate-comment').value.trim();
  try{
    const res = await fetch('/api/portal/'+clientId+'/rating', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({rating:PORTAL_SELECTED_STARS, comment})});
    if(!res.ok){ showToast('تعذّر إرسال التقييم'); return; }
    showToast('شكرًا لتقييمك!');
    await loadPortal(clientId);
  }catch(e){ showToast('تعذّر الاتصال بالخادم'); }
}

/* ---------------- Topbar (shared) ---------------- */
const NAV_GROUPS = [
  { group:null, items:[
    {key:'dashboard', label:'لوحة التحكم', roles:['مدير','مبيعات','محاسب']},
  ]},
  { group:'العملاء والمبيعات', items:[
    {key:'clients',     label:'العملاء',        roles:['مدير','مبيعات','محاسب']},
    {key:'kanban',      label:'الصفقات',        roles:['مدير','مبيعات']},
    {key:'quotes',      label:'عروض الأسعار',   roles:['مدير','مبيعات','محاسب']},
    {key:'collections', label:'التحصيل',        roles:['مدير','مبيعات','محاسب']},
  ]},
  { group:'المشاريع', items:[
    {key:'projects',   label:'المشاريع',         roles:['مدير','مبيعات']},
    {key:'estimates',  label:'المقايسات',        roles:['مدير','مبيعات']},
    {key:'schedule',   label:'جدولة التركيب',    roles:['مدير','مبيعات']},
    {key:'templates',  label:'قوالب المشاريع',   roles:['مدير','مبيعات']},
  ]},
  { group:'المخزون والمشتريات', items:[
    {key:'inventory', label:'المخزون',   roles:['مدير','مبيعات','محاسب']},
    {key:'items',     label:'الأصناف',   roles:['مدير','مبيعات','محاسب']},
    {key:'suppliers', label:'الموردون',  roles:['مدير','مبيعات','محاسب']},
    {key:'purchases', label:'المشتريات', roles:['مدير','محاسب']},
  ]},
  { group:'المالية', items:[
    {key:'expenses', label:'المصروفات', roles:['مدير','محاسب']},
    {key:'profits',  label:'الأرباح',   roles:['مدير','محاسب']},
    {key:'accounts', label:'الحسابات',  roles:['مدير','محاسب']},
  ]},
  { group:'التقارير', items:[
    {key:'reports',   label:'التقارير',   roles:['مدير','محاسب']},
    {key:'analytics', label:'التحليلات',  roles:['مدير','محاسب']},
  ]},
  { group:'الموظفون', items:[
    {key:'employees', label:'الموظفون', roles:['مدير']},
  ]},
  { group:'التسويق', items:[
    {key:'marketing',  label:'الحملات التسويقية', roles:['مدير','مبيعات']},
    {key:'leadstats',  label:'أداء مصادر العملاء', roles:['مدير','مبيعات']},
  ]},
  { group:'الإدارة', items:[
    {key:'settings',  label:'الإعدادات',              roles:['مدير']},
    {key:'users',     label:'المستخدمون والصلاحيات',  roles:['مدير']},
    {key:'auditlog',  label:'سجل التدقيق',            roles:['مدير']},
  ]},
];
let OPEN_GROUP = null;
function groupContaining(key){
  for(const g of NAV_GROUPS){ if(g.group && g.items.some(i=>i.key===key)) return g.group; }
  return null;
}
function toggleGroup(g){ OPEN_GROUP = (OPEN_GROUP===g ? null : g); render(); }

function topbar(activeNav){
  if(OPEN_GROUP===null) OPEN_GROUP = groupContaining(activeNav);
  const itemBtn = (item) => `<button class="${activeNav===item.key?'active':''}" onclick="go('${item.key}')">${item.label}</button>`;
  const groupsHtml = NAV_GROUPS.map(g=>{
    const visible = g.items.filter(i=>i.roles.includes(USER_ROLE));
    if(!visible.length) return '';
    if(!g.group) return visible.map(itemBtn).join('');
    const isOpen = OPEN_GROUP===g.group;
    return `
      <div class="nav-group">
        <button class="nav-group-head ${isOpen?'open':''}" onclick="toggleGroup('${g.group}')">
          <span>${g.group}</span><span class="chev">${isOpen?'︿':'﹀'}</span>
        </button>
        <div class="nav-group-body ${isOpen?'open':''}">${visible.map(itemBtn).join('')}</div>
      </div>`;
  }).join('');
  return `
  <div class="topbar">
    <div class="brand">
      <img src="${LOGO}" alt="شعار ألوان الحياة">
      <div><h1>${COMPANY.name}</h1><div class="tag">${COMPANY.nameEn} — نظام شامل مصغّر</div></div>
    </div>
    <div class="topbar-actions">
      <button class="btn-gold" onclick="newClient()">+ عميل جديد</button>
      <button class="menu-toggle" onclick="toggleMenu()" aria-label="القائمة">☰</button>
    </div>
  </div>
  <div class="server-status ${SERVER_ONLINE?'ok':'down'}">
    ${SERVER_ONLINE ? '● متصل بالخادم — البيانات محفوظة في قاعدة البيانات على هذا الجهاز' : '● تعذّر الاتصال بالخادم — تأكد أن نافذة الطرفية (node server.js) ما زالت تعمل'}
  </div>
  <div class="sidebar-backdrop" id="sidebar-backdrop" onclick="closeMenu()"></div>
  <nav class="sidebar-menu" id="sidebar-menu">
    <div class="sidebar-head">
      <img src="${LOGO}" alt="شعار">
      <div><b>${COMPANY.name}</b><div class="muted-note">${COMPANY.nameEn}</div></div>
      <button class="icon-btn" style="margin-right:auto; font-size:20px;" onclick="closeMenu()">✕</button>
    </div>
    <div class="sidebar-links">${groupsHtml}</div>
    <div class="sidebar-links" style="border-top:1px solid var(--border-soft); padding-top:10px;">
      <button onclick="toggleDarkMode()">${DARK_MODE ? 'الوضع الفاتح' : 'الوضع الداكن'}</button>
    </div>
    <div class="sidebar-footer">
      <span>الدخول باسم: <b>${escapeHtml(USER_ROLE)}</b></span>
      <button class="btn-ghost btn-sm" onclick="doLogout()">🚪 خروج</button>
    </div>
  </nav>`;
}
function setupFollowUpNotifications(){
  if(!('Notification' in window)) return;
  if(Notification.permission==='default'){ Notification.requestPermission().catch(()=>{}); }
  const notified = new Set();
  function check(){
    if(Notification.permission!=='granted') return;
    const today = todayISO();
    (STATE.clients||[]).forEach(c=>{
      if(c.nextFollowUpDate && c.nextFollowUpDate<=today && c.status!=='collected' && !notified.has(c.id)){
        notified.add(c.id);
        try{ new Notification('📌 متابعة عميل: '+c.name, {body:'تاريخ المتابعة: '+c.nextFollowUpDate, icon:'logo.webp'}); }catch(e){}
      }
    });
  }
  check();
  setInterval(check, 5*60*1000); // كل 5 دقائق — يعمل فقط أثناء فتح المتصفح
}
function toggleMenu(){
  const menu = document.getElementById('sidebar-menu');
  const backdrop = document.getElementById('sidebar-backdrop');
  if(menu) menu.classList.toggle('open');
  if(backdrop) backdrop.classList.toggle('open');
}
function closeMenu(){
  const menu = document.getElementById('sidebar-menu');
  const backdrop = document.getElementById('sidebar-backdrop');
  if(menu) menu.classList.remove('open');
  if(backdrop) backdrop.classList.remove('open');
}

/* ---------------- Settings & backup view ---------------- */
function viewSettings(){
  return `
  ${topbar('settings')}
  <div class="section-title" style="margin-top:0;"><h2>الإعدادات والنسخ الاحتياطي</h2><div class="line"></div></div>
  <div class="card">
    <h4 style="margin-bottom:10px;">حالة الخادم وقاعدة البيانات</h4>
    <div class="muted-note" id="health-line">جارٍ التحقق من الاتصال...</div>
    <div class="actions-bar" style="justify-content:flex-start; margin-top:14px;">
      <button class="btn-ghost btn-sm" onclick="refreshHealth()">تحديث الحالة</button>
    </div>
  </div>

  <div class="card">
    <h4 style="margin-bottom:10px;">تغيير كلمة المرور</h4>
    <div class="muted-note">كلمة مرور واحدة مشتركة لكل من يدخل النظام (مدير/مبيعات/محاسب). الأدوار حاليًا لتخصيص الواجهة فقط وليست صلاحيات حقيقية منفصلة.</div>
    <div class="grid3" style="margin-top:12px;">
      <div class="field"><input id="old-pass" type="password" placeholder="كلمة المرور الحالية"></div>
      <div class="field"><input id="new-pass" type="password" placeholder="كلمة المرور الجديدة"></div>
      <div class="field"><button class="btn-gold" style="width:100%" onclick="changePassword()">تحديث</button></div>
    </div>
  </div>

  <div class="card">
    <h4 style="margin-bottom:10px;">الرقم الضريبي (VAT) — لرمز الفاتورة المبسّط</h4>
    <div class="muted-note">يُستخدم لتوليد رمز QR مبسّط على عروض الأسعار (مرحلة التوليد الأولى من ZATCA فقط). هذا لا يغني عن التحقق من التزاماتك الفعلية تجاه هيئة الزكاة والضريبة والجمارك.</div>
    <div class="grid3" style="margin-top:12px;">
      <div class="field" style="grid-column:span 2;"><input id="vat-number" placeholder="3xxxxxxxxxxxxx" value="${escapeHtml((STATE.settings&&STATE.settings.vatNumber)||'')}"></div>
      <div class="field"><button class="btn-ghost" style="width:100%" onclick="saveVatNumber()">حفظ</button></div>
    </div>
  </div>

  <div class="card">
    <h4 style="margin-bottom:10px;">تثبيت النظام على الجوال (تطبيق ويب PWA)</h4>
    <div class="muted-note">من متصفح الجوال (كروم/سفاري) اختر "إضافة إلى الشاشة الرئيسية" ليظهر النظام كأيقونة تطبيق عادية.</div>
  </div>

  <div class="card">
    <h4 style="margin-bottom:10px;">تنزيل نسخة احتياطية</h4>
    <div class="muted-note">يحفظ الخادم نسخة احتياطية تلقائيًا قبل كل عملية حفظ (آخر 30 نسخة) داخل مجلد data/backups. يمكنك أيضًا تنزيل نسخة كاملة الآن كملف JSON.</div>
    <div class="actions-bar" style="justify-content:flex-start; margin-top:14px;">
      <button class="btn-gold" onclick="downloadBackup()">⬇ تنزيل نسخة احتياطية الآن</button>
    </div>
  </div>
  <div class="card">
    <h4 style="margin-bottom:10px;">استيراد نسخة احتياطية</h4>
    <div class="muted-note">اختر ملف نسخة احتياطية (JSON) تم تنزيله سابقًا من هذا النظام لاستعادة البيانات. تنبيه: هذا سيستبدل كل البيانات الحالية.</div>
    <div class="actions-bar" style="justify-content:flex-start; margin-top:14px;">
      <input type="file" id="restore-file" accept="application/json" style="max-width:300px;">
      <button class="btn-ghost" onclick="restoreBackup()">استعادة من الملف</button>
    </div>
  </div>
  `;
}
async function changePassword(){
  const oldPassword = document.getElementById('old-pass').value;
  const newPassword = document.getElementById('new-pass').value;
  if(!oldPassword || !newPassword){ showToast('عبّي الحقلين أولًا'); return; }
  try{
    const res = await fetch('/api/change-password', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({oldPassword, newPassword})});
    const j = await res.json();
    if(!res.ok){ showToast(j.error || 'تعذّر التحديث'); return; }
    showToast('تم تحديث كلمة المرور بنجاح');
    document.getElementById('old-pass').value=''; document.getElementById('new-pass').value='';
  }catch(e){ showToast('تعذّر الاتصال بالخادم'); }
}
async function saveVatNumber(){
  const v = document.getElementById('vat-number').value.trim();
  if(!STATE.settings) STATE.settings = {};
  STATE.settings.vatNumber = v;
  await saveState();
  showToast('تم حفظ الرقم الضريبي');
}
async function refreshHealth(){
  const ok = await checkServerHealth();
  const el = document.getElementById('health-line');
  if(el) el.textContent = ok ? 'متصل بالخادم بنجاح — كل شيء يعمل بشكل طبيعي.' : 'تعذّر الاتصال بالخادم. تأكد أن الأمر node server.js ما زال يعمل في الطرفية.';
  render();
}
function downloadBackup(){
  window.location.href = '/api/backup';
}
async function restoreBackup(){
  const fileEl = document.getElementById('restore-file');
  if(!fileEl.files || !fileEl.files[0]){ showToast('اختر ملف النسخة الاحتياطية أولًا'); return; }
  if(!confirm('سيتم استبدال كل البيانات الحالية بمحتوى الملف. متابعة؟')) return;
  try{
    const text = await fileEl.files[0].text();
    const data = JSON.parse(text);
    if(!data || typeof data !== 'object'){ throw new Error('صيغة غير صالحة'); }
    STATE = data;
    if(!STATE.clients) STATE.clients = [];
    if(!STATE.inventory) STATE.inventory = {};
    if(!STATE.purchases) STATE.purchases = [];
    if(!STATE.expenses) STATE.expenses = [];
    await saveState();
    showToast('تم استيراد النسخة الاحتياطية بنجاح');
    go('dashboard');
  }catch(e){
    showToast('تعذّرت قراءة الملف — تأكد أنه نسخة احتياطية صالحة');
  }
}

/* ---------------- Dashboard ---------------- */
function viewDashboard(){
  const clients = STATE.clients;
  const pendingQuote = clients.filter(c=>c.status==='quoted').length;
  const contracts = clients.filter(c=>['contract','production','delivered'].includes(c.status)).length;
  let expected = 0;
  clients.forEach(c=>{ if(c.status==='collected') return; expected += calcOrder(c).grandTotal; });
  const r = computeReports();
  const lowStockCount = CATALOG.filter(c=> getStock(c.id) < LOW_STOCK_THRESHOLD).length;

  const today = todayISO();
  const dueFollowUps = clients.filter(c=> c.nextFollowUpDate && c.nextFollowUpDate <= today && c.status!=='collected')
    .sort((a,b)=> a.nextFollowUpDate.localeCompare(b.nextFollowUpDate));

  const followUpRows = dueFollowUps.map(c=>{
    const overdue = c.nextFollowUpDate < today;
    return `<tr>
      <td><b>${escapeHtml(c.name)}</b></td>
      <td style="color:${overdue?'var(--danger)':'var(--text)'}">${c.nextFollowUpDate}${overdue?' (متأخرة)':''}</td>
      <td style="white-space:nowrap">
        ${c.phone ? `<a href="${waLink(c.phone,'مرحبًا '+c.name+'، نتابع معك بخصوص طلبك من '+COMPANY.name+'.')}" target="_blank" class="btn-gold btn-sm">واتساب</a>` : ''}
        <button class="btn-ghost btn-sm" onclick="openClient('${c.id}')">فتح</button>
        <button class="icon-btn" title="تمت المتابعة" onclick="clearFollowUp('${c.id}')">✔</button>
      </td>
    </tr>`;
  }).join('');

  return `
  ${topbar('dashboard')}
  <div class="strip">
    <div class="cell"><div class="num">${clients.length}</div><div class="lbl">إجمالي العملاء</div></div>
    <div class="cell"><div class="num">${pendingQuote}</div><div class="lbl">عروض بانتظار الرد</div></div>
    <div class="cell"><div class="num">${contracts}</div><div class="lbl">عقود موقعة / قيد التنفيذ</div></div>
    <div class="cell"><div class="num">${fmt(expected)}</div><div class="lbl">متوقع تحصيله (ر.س)</div></div>
  </div>
  <div class="strip">
    <div class="cell"><div class="num">${fmt(r.collected)}</div><div class="lbl">محصّل فعليًا (ر.س)</div></div>
    <div class="cell"><div class="num" style="color:${r.netProfitCash>=0?'var(--green)':'var(--danger)'}">${fmt(r.netProfitCash)}</div><div class="lbl">صافي الربح النقدي التقديري</div></div>
    <div class="cell"><div class="num">${fmt(r.expensesTotal)}</div><div class="lbl">إجمالي المصروفات (ر.س)</div></div>
    <div class="cell"><div class="num" style="color:${lowStockCount>0?'var(--danger)':'var(--text)'}">${lowStockCount}</div><div class="lbl">أصناف منخفضة المخزون</div></div>
  </div>

  ${dueFollowUps.length ? `
  <div class="section-title" style="margin-top:0;"><h2>📌 متابعات اليوم والمتأخرة (${dueFollowUps.length})</h2><div class="line"></div></div>
  <div class="table-scroll"><table class="ledger" style="margin-bottom:8px;">
    <thead><tr><th>العميل</th><th>تاريخ المتابعة</th><th></th></tr></thead>
    <tbody>${followUpRows}</tbody>
  </table></div>` : `<div class="muted-note">لا توجد متابعات مستحقة اليوم 🎉</div>`}

  <div class="actions-bar" style="justify-content:flex-start; margin-top:20px;">
    <button class="btn-ghost" onclick="go('clients')">عرض كل العملاء ›</button>
  </div>
  `;
}
function viewClients(){
  const clients = STATE.clients;
  const filtered = clients.filter(c=>{
    if(DASH_STATUS_FILTER!=='all' && c.status!==DASH_STATUS_FILTER) return false;
    if(DASH_SEARCH){
      const q = DASH_SEARCH.trim();
      const hay = (c.name||'') + ' ' + (c.phone||'');
      if(!hay.includes(q)) return false;
    }
    return true;
  });
  const statusFilterOptions = `<option value="all">كل الحالات</option>` + STATUS_LIST.map(s=>`<option value="${s.key}" ${DASH_STATUS_FILTER===s.key?'selected':''}>${s.label}</option>`).join('');
  const rows = filtered.length ? filtered.map(c=>{
    const t = calcOrder(c);
    const expired = isQuoteExpired(c);
    return `<tr>
      <td><b>${escapeHtml(c.name||'—')}</b> ${c.clientTag && c.clientTag!=='عادي' ? `<span style="background:${tagColor(c.clientTag)}; color:#fff; font-size:10.5px; padding:2px 7px; border-radius:10px; margin-right:4px;">${c.clientTag}</span>` : ''}<div class="muted-note" style="margin-top:2px">${escapeHtml(c.phone||'')}</div></td>
      <td>${c.items?c.items.length:0} بند</td>
      <td>
        <span class="badge ${c.status}"><span class="dot"></span>${statusLabel(c.status)}</span>
        ${expired ? `<div class="badge low" style="margin-top:5px;"><span class="dot"></span>العرض منتهي الصلاحية</div>` : ''}
      </td>
      <td>${fmt(t.grandTotal)} ر.س</td>
      <td>${c.createdAtStr||''}</td>
      <td style="white-space:nowrap">
        ${c.phone ? `<a href="${waLink(c.phone,'')}" target="_blank" class="icon-btn" title="واتساب">💬</a>` : ''}
        <button class="btn-ghost btn-sm" onclick="openClient('${c.id}')">فتح</button>
        <button class="icon-btn" title="حذف العميل" onclick="deleteClient('${c.id}')">✕</button>
      </td>
    </tr>`;
  }).join('') : `<tr class="empty-row"><td colspan="6">${clients.length ? 'لا توجد نتائج مطابقة للبحث' : 'لا يوجد عملاء بعد — ابدأ بإضافة عميلك الأول'}</td></tr>`;
  return `
  ${topbar('clients')}
  <div class="section-title" style="margin-top:0;"><h2>العملاء</h2><div class="line"></div><button class="btn-ghost btn-sm" onclick="exportClientsCSV()">⬇ تصدير CSV</button></div>
  <div class="grid3" style="margin-bottom:14px;">
    <div class="field" style="grid-column:span 2;"><input placeholder="ابحث بالاسم أو رقم الجوال..." value="${escapeHtml(DASH_SEARCH)}" oninput="setDashSearch(this.value)"></div>
    <div class="field"><select onchange="setDashStatusFilter(this.value)">${statusFilterOptions}</select></div>
  </div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>العميل</th><th>البنود</th><th>الحالة</th><th>قيمة العرض</th><th>تاريخ الإضافة</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  `;
}
function setDashSearch(v){
  DASH_SEARCH = v; render();
  const el = document.querySelector('#app input[placeholder="ابحث بالاسم أو رقم الجوال..."]');
  if(el){ el.focus(); const p = el.value.length; el.setSelectionRange(p,p); }
}
function setDashStatusFilter(v){ DASH_STATUS_FILTER = v; render(); }
async function clearFollowUp(clientId){
  const c = STATE.clients.find(c=>c.id===clientId);
  if(!c) return;
  c.nextFollowUpDate = '';
  if(!c.activities) c.activities = [];
  c.activities.push({id:uid(), text:'تمت المتابعة ✔', date: todayStr()});
  await saveState();
  showToast('تم تحديث حالة المتابعة');
  render();
}

function newClient(){
  DRAFT = { id: uid(), name:'', phone:'', address:'', notes:'', status:'new', createdAtStr: todayStr(),
    marginPercent: 30, installationFee: '', quoteValidDays: 15, items: [ newItem() ], payments: [],
    leadSource:'غير محدد', nextFollowUpDate:'', activities: [], tasks: [], installDate:'', installerName:'',
    inventoryDeducted: false, clientTag:'عادي', quoteHistory: [], photos: [], rating:null, ratingComment:'' };
  go('form');
}
function openClient(id){
  const c = STATE.clients.find(c=>c.id===id);
  if(!c) return;
  DRAFT = JSON.parse(JSON.stringify(c));
  if(!DRAFT.items || !DRAFT.items.length) DRAFT.items = [newItem()];
  if(!DRAFT.activities) DRAFT.activities = [];
  if(!DRAFT.leadSource) DRAFT.leadSource = 'غير محدد';
  if(DRAFT.nextFollowUpDate===undefined) DRAFT.nextFollowUpDate = '';
  if(!DRAFT.tasks) DRAFT.tasks = [];
  if(DRAFT.installDate===undefined) DRAFT.installDate = '';
  if(DRAFT.installerName===undefined) DRAFT.installerName = '';
  if(DRAFT.inventoryDeducted===undefined) DRAFT.inventoryDeducted = false;
  if(!DRAFT.clientTag) DRAFT.clientTag = 'عادي';
  if(!DRAFT.quoteHistory) DRAFT.quoteHistory = [];
  if(!DRAFT.photos) DRAFT.photos = [];
  if(DRAFT.rating===undefined) DRAFT.rating = null;
  if(DRAFT.ratingComment===undefined) DRAFT.ratingComment = '';
  go('form', id);
}
async function deleteClient(id){
  if(!confirm('حذف هذا العميل نهائيًا؟')) return;
  const c = STATE.clients.find(c=>c.id===id);
  STATE.clients = STATE.clients.filter(c=>c.id!==id);
  if(c) addAudit('حذف عميل', c.name);
  await saveState(); render(); showToast('تم حذف العميل');
}

/* ---------------- Client form ---------------- */
function viewClientForm(){
  const d = DRAFT;
  const t = calcOrder(d);
  const itemsHtml = d.items.map((it,idx)=>itemCardHtml(it, idx)).join('');
  const statusOptions = STATUS_LIST.map(s=>`<option value="${s.key}" ${s.key===d.status?'selected':''}>${s.label}</option>`).join('');

  return `
  ${topbar('')}
  <div class="card">
    <div class="section-title" style="margin-top:0;"><h2>بيانات العميل</h2><div class="line"></div></div>
    <div class="grid2" style="margin-bottom:14px;">
      <div class="field"><label>اسم العميل</label><input value="${escapeHtml(d.name)}" placeholder="مثال: أ. سارة المطيري" oninput="onClientField('name', this.value)"></div>
      <div class="field"><label>رقم الجوال</label><input value="${escapeHtml(d.phone)}" placeholder="05xxxxxxxx" oninput="onClientField('phone', this.value)"></div>
    </div>
    <div class="grid3" style="margin-bottom:14px;">
      <div class="field" style="grid-column:span 2;"><label>قوالب واتساب سريعة</label><select id="wa-template">${Object.keys(MESSAGE_TEMPLATES).map(k=>`<option value="${k}">${k}</option>`).join('')}</select></div>
      <div class="field"><label>&nbsp;</label><button class="btn-maroon" style="width:100%" onclick="sendTemplateMessage()">📤 إرسال عبر واتساب</button></div>
    </div>
    <div class="grid2" style="margin-bottom:14px;">
      <div class="field"><label>العنوان</label><input value="${escapeHtml(d.address)}" placeholder="الحي — المدينة" oninput="onClientField('address', this.value)"></div>
      <div class="field"><label>الحالة</label><select class="status-select" onchange="onClientField('status', this.value)">${statusOptions}</select></div>
    </div>
    <div class="grid2" style="margin-bottom:14px;">
      <div class="field"><label>مصدر العميل</label><select onchange="onClientField('leadSource', this.value)">${LEAD_SOURCES.map(s=>`<option value="${s}" ${d.leadSource===s?'selected':''}>${s}</option>`).join('')}</select></div>
      <div class="field"><label>تصنيف العميل</label><select onchange="onClientField('clientTag', this.value)">${CLIENT_TAGS.map(t=>`<option value="${t.key}" ${d.clientTag===t.key?'selected':''}>${t.key}</option>`).join('')}</select></div>
    </div>
    <div class="grid2" style="margin-bottom:14px;">
      <div class="field"><label>تاريخ المتابعة القادمة</label><input type="date" value="${d.nextFollowUpDate||''}" onchange="onClientField('nextFollowUpDate', this.value)"></div>
    </div>
    <div class="grid2" style="margin-bottom:14px;">
      <div class="field"><label>تاريخ التركيب المجدول</label><input type="date" value="${d.installDate||''}" onchange="onClientField('installDate', this.value)"></div>
      <div class="field"><label>الفني / فريق التركيب</label><input value="${escapeHtml(d.installerName||'')}" placeholder="مثال: فريق سعد" oninput="onClientField('installerName', this.value)"></div>
    </div>
    <div class="field"><label>ملاحظات عامة</label><textarea rows="2" placeholder="أي تفاصيل إضافية عن الطلب..." oninput="onClientField('notes', this.value)">${escapeHtml(d.notes)}</textarea></div>
  </div>

  <div class="section-title"><h2>سجل المتابعات (CRM)</h2><div class="line"></div></div>
  <div class="card">
    ${activitiesListHtml(d.activities)}
    <div class="grid3" style="margin-top:12px;">
      <div class="field" style="grid-column:span 2;"><input id="new-activity-text" placeholder="مثال: اتصلت بالعميل، وعدني بالرد الخميس" onkeydown="if(event.key==='Enter'){event.preventDefault(); addActivity();}"></div>
      <div class="field"><button class="btn-ghost" style="width:100%" onclick="addActivity()">+ إضافة للسجل</button></div>
    </div>
  </div>

  <div class="section-title"><h2>قائمة مهام المشروع</h2><div class="line"></div></div>
  <div class="card">
    ${tasksListHtml(d.tasks)}
    ${(!d.tasks || !d.tasks.length) ? `<button class="btn-ghost btn-sm" onclick="seedDefaultTasks()">+ إضافة قائمة المهام الافتراضية</button>` : ''}
    <div class="grid3" style="margin-top:12px;">
      <div class="field" style="grid-column:span 2;"><input id="new-task-text" placeholder="مهمة جديدة..." onkeydown="if(event.key==='Enter'){event.preventDefault(); addTask();}"></div>
      <div class="field"><button class="btn-ghost" style="width:100%" onclick="addTask()">+ إضافة مهمة</button></div>
    </div>
  </div>

  <div class="section-title"><h2>صور المشروع (قبل / بعد)</h2><div class="line"></div></div>
  <div class="card">
    ${photosListHtml(d.photos)}
    <div class="grid4" style="margin-top:14px;">
      <div class="field"><input type="file" id="photo-file" accept="image/*"></div>
      <div class="field"><select id="photo-type"><option value="before">قبل</option><option value="after">بعد</option></select></div>
      <div class="field"><input id="photo-caption" placeholder="وصف مختصر (اختياري)"></div>
      <div class="field"><button class="btn-ghost" style="width:100%" onclick="uploadPhoto()">⬆ رفع الصورة</button></div>
    </div>
  </div>

  ${d.rating ? `
  <div class="section-title"><h2>تقييم العميل</h2><div class="line"></div></div>
  <div class="card">
    <div style="font-size:20px; color:var(--gold);">${'★'.repeat(d.rating)}${'☆'.repeat(5-d.rating)}</div>
    ${d.ratingComment ? `<div class="muted-note" style="margin-top:6px;">"${escapeHtml(d.ratingComment)}"</div>` : ''}
  </div>` : ''}

  <div class="section-title"><h2>الأصناف المطلوبة</h2><div class="line"></div></div>
  <div id="items-wrap">${itemsHtml}</div>
  <button class="btn-ghost btn-sm" onclick="addItem()">+ إضافة صنف جديد</button>
  <button class="btn-ghost btn-sm" onclick="saveAsTemplate()">💾 حفظ هذه الأصناف كقالب</button>

  <div class="section-title"><h2>التسعير النهائي</h2><div class="line"></div></div>
  <div class="card">
    <div class="grid3">
      <div class="field"><label>هامش الربح (%)</label><input type="number" min="0" value="${d.marginPercent}" oninput="onClientField('marginPercent', this.value, true)"></div>
      <div class="field"><label>رسوم التركيب والتوصيل (ر.س)</label><input type="number" min="0" value="${d.installationFee}" placeholder="0" oninput="onClientField('installationFee', this.value, true)"></div>
      <div class="field"><label>صلاحية العرض (أيام)</label><input type="number" min="1" value="${d.quoteValidDays}" oninput="onClientField('quoteValidDays', this.value)"></div>
    </div>
    <div class="totals-box" id="totals-box">${totalsBoxHtml(t, d.id)}</div>
  </div>

  <div class="actions-bar">
    <button class="btn-ghost" onclick="saveClient(false)">حفظ فقط</button>
    <button class="btn-gold" onclick="saveClient(true)">حفظ وإنشاء عرض السعر ›</button>
  </div>
  `;
}

function itemCardHtml(it, idx){
  const c = calcItem(it);
  const catOptions = `<option value="">— صنف مخصص (غير موجود في القائمة) —</option>` +
    CATEGORIES.map(cat=>{
      const opts = CATALOG.filter(x=>x.category===cat).map(x=>`<option value="${x.id}" ${it.catalogId===x.id?'selected':''}>${x.name} — ${x.price} ر.س</option>`).join('');
      return `<optgroup label="${cat}">${opts}</optgroup>`;
    }).join('');
  const cat = it.catalogId ? catalogById(it.catalogId) : null;
  const supplierHtml = cat ? supplierNoteHtml(cat) : '';
  const nameFieldHtml = it.catalogId
    ? `<div class="field"><label>اسم الصنف</label><input value="${escapeHtml(cat.name)}" disabled></div>`
    : `<div class="field"><label>اسم الصنف (مخصص)</label><input value="${escapeHtml(it.customName)}" placeholder="مثال: إضاءة مخفية" oninput="onItemField('${it.id}','customName', this.value)"></div>`;

  return `
  <div class="item-card" id="item-${it.id}">
    <div class="item-head">
      <h4>بند ${idx+1}${it.location? ' — '+escapeHtml(it.location):''}</h4>
      ${idx>0 ? `<button class="icon-btn" onclick="removeItem('${it.id}')">✕ حذف</button>` : ''}
    </div>
    <div class="grid3" style="margin-bottom:12px;">
      <div class="field"><label>اختر من قائمة الأصناف</label><select onchange="onItemCatalogPick('${it.id}', this.value)">${catOptions}</select></div>
      ${nameFieldHtml}
      <div class="field"><label>مكان التركيب / ملاحظة</label><input value="${escapeHtml(it.location)}" placeholder="غرفة المعيشة" oninput="onItemField('${it.id}','location', this.value)"></div>
    </div>
    <div class="grid3">
      <div class="field"><label>الكمية (متر أو لوح حسب الصنف)</label><input type="number" min="0" step="0.1" value="${it.qty}" oninput="onItemField('${it.id}','qty', this.value, true)"></div>
      <div class="field"><label>سعر الوحدة (ر.س)</label><input type="number" min="0" value="${it.unitPrice}" oninput="onItemField('${it.id}','unitPrice', this.value, true)"></div>
      <div class="field"><label>&nbsp;</label><div class="muted-note" style="margin-top:9px;">السعر معبّأ تلقائيًا من القائمة، ويمكنك تعديله لأي اتفاق خاص</div></div>
    </div>
    <div class="calc-strip" id="calc-${it.id}">${calcStripHtml(c)}</div>
    <div class="supplier-note ${cat?'show':''}" id="supplier-${it.id}">${supplierHtml}</div>
  </div>`;
}
function supplierNoteHtml(cat){
  const phone = isPhoneLike(cat.rep) ? `<a href="tel:${String(cat.rep).replace(/\s/g,'')}">${cat.rep}</a>` : cat.rep;
  return `جهة التوريد: <b>${escapeHtml(cat.company)}</b> — المندوب: ${phone}`;
}
function calcStripHtml(c){ return `<span>تكلفة هذا البند: <b>${fmt(c.itemCost)} ر.س</b></span>`; }
function totalsBoxHtml(t, clientId){
  let extra = '';
  const saved = STATE.clients.find(c=>c.id===clientId);
  if(saved){
    const collected = clientCollected(saved);
    const remaining = t.grandTotal - collected;
    extra = `<div class="row"><span>المحصّل حتى الآن (تبويب التحصيل)</span><b>${fmt(collected)} ر.س</b></div>
             <div class="row"><span>المتبقي على العميل</span><b>${fmt(remaining)} ر.س</b></div>`;
  }
  return `
    <div class="row"><span>إجمالي تكلفة المواد</span><b>${fmt(t.totalCost)} ر.س</b></div>
    <div class="row"><span>هامش الربح (${fmt(t.margin)}%)</span><b>${fmt(t.marginAmount)} ر.س</b></div>
    <div class="row"><span>رسوم التركيب والتوصيل</span><b>${fmt(t.installation)} ر.س</b></div>
    <div class="row grand"><span>السعر النهائي للعميل</span><b>${fmt(t.grandTotal)} ر.س</b></div>
    ${extra}
  `;
}

function activitiesListHtml(activities){
  if(!activities || !activities.length) return `<div class="muted-note">لا يوجد سجل متابعات بعد — أضف أول ملاحظة بالأسفل.</div>`;
  return activities.slice().reverse().map(a=>`
    <div style="padding:9px 0; border-bottom:1px solid var(--border-soft); display:flex; justify-content:space-between; gap:10px;">
      <div><b style="font-family:'Cairo'; font-size:12.5px; color:var(--maroon);">${a.date}</b> — ${escapeHtml(a.text)}</div>
      <button class="icon-btn" onclick="removeActivity('${a.id}')">✕</button>
    </div>`).join('');
}
function addActivity(){
  const el = document.getElementById('new-activity-text');
  const text = el.value.trim();
  if(!text){ showToast('اكتب نص المتابعة أولًا'); return; }
  if(!DRAFT.activities) DRAFT.activities = [];
  DRAFT.activities.push({id:uid(), text, date: todayStr()});
  el.value = '';
  render();
}
function removeActivity(id){
  DRAFT.activities = (DRAFT.activities||[]).filter(a=>a.id!==id);
  render();
}
const DEFAULT_TASKS = ['استلام المقاس النهائي','شراء المواد الناقصة','التركيب في الموقع','التسليم والاستلام النهائي'];
function seedDefaultTasks(){
  if(!DRAFT.tasks) DRAFT.tasks = [];
  if(DRAFT.tasks.length) return;
  DRAFT.tasks = DEFAULT_TASKS.map(t=>({id:uid(), text:t, done:false}));
  render();
}
function photosListHtml(photos){
  if(!photos || !photos.length) return `<div class="muted-note">لا توجد صور بعد.</div>`;
  return `<div style="display:flex; flex-wrap:wrap; gap:10px;">` + photos.map(p=>`
    <div style="width:120px;">
      <img src="${p.url}" style="width:120px; height:90px; object-fit:cover; border-radius:var(--radius); border:1px solid var(--border);">
      <div class="muted-note" style="text-align:center; margin-top:4px;">${p.type==='before'?'قبل':'بعد'}${p.caption?' — '+escapeHtml(p.caption):''}</div>
      <button class="icon-btn" style="width:100%; text-align:center;" onclick="removePhoto('${p.id}')">✕ حذف</button>
    </div>`).join('') + `</div>`;
}
async function uploadPhoto(){
  const fileEl = document.getElementById('photo-file');
  const typeEl = document.getElementById('photo-type');
  const captionEl = document.getElementById('photo-caption');
  if(!fileEl.files || !fileEl.files[0]){ showToast('اختر صورة أولًا'); return; }
  const file = fileEl.files[0];
  if(file.size > 8*1024*1024){ showToast('حجم الصورة كبير جدًا (الحد 8 ميجا)'); return; }
  const reader = new FileReader();
  reader.onload = async () => {
    try{
      const res = await fetch('/api/upload', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({dataBase64: reader.result, mime: file.type})});
      const j = await res.json();
      if(!res.ok){ showToast(j.error||'تعذّر رفع الصورة'); return; }
      if(!DRAFT.photos) DRAFT.photos = [];
      DRAFT.photos.push({id:uid(), url:j.url, type:typeEl.value, caption:captionEl.value.trim(), date:todayStr()});
      captionEl.value=''; fileEl.value='';
      showToast('تم رفع الصورة');
      render();
    }catch(e){ showToast('تعذّر الاتصال بالخادم'); }
  };
  reader.readAsDataURL(file);
}
function removePhoto(id){
  DRAFT.photos = (DRAFT.photos||[]).filter(p=>p.id!==id);
  render();
}
function tasksListHtml(tasks){
  if(!tasks || !tasks.length) return `<div class="muted-note">لا توجد مهام بعد.</div>`;
  return tasks.map(tk=>`
    <div style="padding:7px 0; display:flex; align-items:center; gap:10px;">
      <input type="checkbox" ${tk.done?'checked':''} onchange="toggleTask('${tk.id}')">
      <span style="${tk.done?'text-decoration:line-through; color:var(--text-dim);':''}">${escapeHtml(tk.text)}</span>
      <button class="icon-btn" style="margin-right:auto;" onclick="removeTask('${tk.id}')">✕</button>
    </div>`).join('');
}
function toggleTask(id){
  const tk = (DRAFT.tasks||[]).find(t=>t.id===id);
  if(tk) tk.done = !tk.done;
  render();
}
function removeTask(id){
  DRAFT.tasks = (DRAFT.tasks||[]).filter(t=>t.id!==id);
  render();
}
function addTask(){
  const el = document.getElementById('new-task-text');
  const text = el.value.trim();
  if(!text){ showToast('اكتب نص المهمة أولًا'); return; }
  if(!DRAFT.tasks) DRAFT.tasks = [];
  DRAFT.tasks.push({id:uid(), text, done:false});
  el.value = '';
  render();
}
function onClientField(field, value, recalc){ DRAFT[field] = value; if(recalc) refreshTotals(); }
function onItemField(id, field, value, recalc){
  const it = DRAFT.items.find(i=>i.id===id);
  if(!it) return;
  it[field] = value;
  if(recalc){
    const stripEl = document.getElementById('calc-'+id);
    if(stripEl) stripEl.innerHTML = calcStripHtml(calcItem(it));
    refreshTotals();
  }
}
function onItemCatalogPick(id, catalogId){
  const it = DRAFT.items.find(i=>i.id===id);
  if(!it) return;
  it.catalogId = catalogId;
  if(catalogId){ const cat = catalogById(catalogId); it.unitPrice = cat.price; it.company = cat.company; it.rep = cat.rep; it.customName = ''; }
  else { it.unitPrice = ''; it.company=''; it.rep=''; }
  const idx = DRAFT.items.findIndex(i=>i.id===id);
  document.getElementById('item-'+id).outerHTML = itemCardHtml(it, idx);
  refreshTotals();
}
function refreshTotals(){ const box = document.getElementById('totals-box'); if(box) box.innerHTML = totalsBoxHtml(calcOrder(DRAFT), DRAFT.id); }
function addItem(){ DRAFT.items.push(newItem()); document.getElementById('items-wrap').innerHTML = DRAFT.items.map((it,idx)=>itemCardHtml(it, idx)).join(''); }
function removeItem(id){
  DRAFT.items = DRAFT.items.filter(i=>i.id!==id);
  document.getElementById('items-wrap').innerHTML = DRAFT.items.map((it,idx)=>itemCardHtml(it, idx)).join('');
  refreshTotals();
}
function backToDashboard(){ DRAFT=null; go('dashboard'); }

async function saveClient(thenQuote){
  if(!DRAFT.name || !DRAFT.name.trim()){ showToast('الرجاء إدخال اسم العميل أولًا'); return; }
  if(!DRAFT.payments) DRAFT.payments = [];
  if(!DRAFT.activities) DRAFT.activities = [];
  if(!DRAFT.tasks) DRAFT.tasks = [];
  if(!DRAFT.quoteHistory) DRAFT.quoteHistory = [];
  const idx = STATE.clients.findIndex(c=>c.id===DRAFT.id);
  const oldStatus = idx>=0 ? STATE.clients[idx].status : null;
  const isNewClient = idx<0;
  if(idx<0 && DRAFT.phone && DRAFT.phone.trim()){
    const dup = STATE.clients.find(c=> c.id!==DRAFT.id && normalizePhone(c.phone)===normalizePhone(DRAFT.phone) && normalizePhone(c.phone));
    if(dup && !confirm(`⚠ يوجد عميل آخر بنفس رقم الجوال: "${dup.name}"\nهل تريد المتابعة بإضافة هذا العميل الجديد؟`)) return;
  }
  if(DRAFT.status==='new' && DRAFT.items.some(it=>parseFloat(it.qty)>0 && parseFloat(it.unitPrice)>0)) DRAFT.status='measured';
  if(DRAFT.status==='production' && oldStatus!=='production') deductInventoryForClient(DRAFT);
  if(oldStatus && oldStatus!==DRAFT.status) addAudit('تغيير حالة', `${DRAFT.name}: ${statusLabel(oldStatus)} ← ${statusLabel(DRAFT.status)}`);
  if(idx>=0){ DRAFT.payments = STATE.clients[idx].payments || []; STATE.clients[idx] = DRAFT; } else { STATE.clients.push(DRAFT); addAudit('عميل جديد', DRAFT.name); }
  await saveState();
  showToast('تم حفظ بيانات العميل');
  if(thenQuote){
    if(DRAFT.quoteDate){
      const t = calcOrder(DRAFT);
      DRAFT.quoteHistory.push({date: DRAFT.quoteDate, grandTotal: t.grandTotal, itemsCount: DRAFT.items.length});
    }
    DRAFT.status = (DRAFT.status==='new'||DRAFT.status==='measured') ? 'quoted' : DRAFT.status;
    DRAFT.quoteDate = todayStr();
    DRAFT.quoteDateISO = todayISO();
    const idx2 = STATE.clients.findIndex(c=>c.id===DRAFT.id);
    if(idx2>=0) STATE.clients[idx2] = DRAFT;
    addAudit('إصدار عرض سعر', `${DRAFT.name} — ${fmt(calcOrder(DRAFT).grandTotal)} ر.س`);
    await saveState();
    go('quote', DRAFT.id);
  } else { go('clients'); }
}

/* ---------------- Quote view ---------------- */
function viewQuote(){
  const c = STATE.clients.find(c=>c.id===VIEW.clientId) || DRAFT;
  const t = calcOrder(c);
  const rows = c.items.map((it,idx)=>{
    const ic = calcItem(it);
    const sell = ic.itemCost * (1 + (t.margin/100));
    return `<tr>
      <td>${idx+1}</td>
      <td>${escapeHtml(itemDisplayName(it))}${it.location? ' — '+escapeHtml(it.location):''}</td>
      <td>${fmt(it.qty)||0}</td>
      <td>${fmt(sell)} ر.س</td>
    </tr>`;
  }).join('');

  return `
  <div class="no-print-bar">
    <button class="btn-ghost" onclick="go('form', '${c.id}')">‹ تعديل الطلب</button>
    <button class="btn-gold" onclick="printQuote('${c.id}')">طباعة / حفظ PDF</button>
    <button class="btn-maroon" onclick="shareQuoteOnWhatsApp('${c.id}')">📤 مشاركة عبر واتساب</button>
    <button class="btn-ghost" onclick="copyPortalLink('${c.id}')">🔗 نسخ رابط متابعة للعميل</button>
    <button class="btn-ghost" onclick="backToDashboard()">لوحة التحكم</button>
  </div>
  <div class="quote-sheet">
    <div class="qhead">
      <div class="brandline">
        <img src="${LOGO}" alt="شعار">
        <div><h2>${COMPANY.name}</h2><div class="sub">${COMPANY.nameEn} — ديكورات وتشطيبات داخلية</div></div>
      </div>
      <div class="qmeta">
        <div><b>عرض سعر رقم:</b> ${c.id.slice(-6).toUpperCase()}</div>
        <div><b>التاريخ:</b> ${c.quoteDate||todayStr()}</div>
        <div><b>صالح لمدة:</b> ${c.quoteValidDays||15} يومًا</div>
      </div>
    </div>
    <div class="client-box">
      <div><span class="l">العميل: </span><b>${escapeHtml(c.name)}</b></div>
      ${c.phone?`<div><span class="l">الجوال: </span>${escapeHtml(c.phone)}</div>`:''}
      ${c.address?`<div><span class="l">العنوان: </span>${escapeHtml(c.address)}</div>`:''}
    </div>
    <table>
      <thead><tr><th>م</th><th>البيان</th><th>الكمية</th><th>السعر الإجمالي</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="qtotals">
      <div class="row"><span>إجمالي البنود</span><span>${fmt(t.itemsSelling)} ر.س</span></div>
      <div class="row"><span>تركيب وتوصيل</span><span>${fmt(t.installation)} ر.س</span></div>
      <div class="row grand"><span>الإجمالي المستحق</span><span>${fmt(t.grandTotal)} ر.س</span></div>
    </div>
    <div class="terms">
      <b>الشروط والأحكام:</b>
      <ul>
        <li>يُدفع 50% من قيمة العرض مقدمًا عند توقيع العقد، والباقي عند التسليم والتركيب.</li>
        <li>مدة التنفيذ التقريبية من تاريخ توقيع العقد: 10–15 يوم عمل حسب حجم الطلب.</li>
        <li>الأسعار شاملة توريد المواد المذكورة والتنفيذ، وغير شاملة أي أعمال إضافية خارج البنود أعلاه.</li>
        <li>ضمان سنة كاملة على عيوب التصنيع والتركيب.</li>
      </ul>
    </div>
    <div class="contactfoot">
      <span>📞 ${COMPANY.phone}</span><span>✉ ${COMPANY.email}</span><span>📍 ${COMPANY.address}</span>
    </div>
    <div class="signrow">
      <div class="sign">توقيع العميل</div>
      <div class="sign">توقيع ${COMPANY.name}</div>
    </div>
  </div>
  `;
}

const MESSAGE_TEMPLATES = {
  'ترحيب': c => `مرحبًا ${c.name} 🌿\nيسعدنا تواصلك مع ${COMPANY.name}. راسلنا بمقاسات المكان أو صور توضيحية وبنجهز لك عرض سعر بأسرع وقت.`,
  'تذكير متابعة': c => `مرحبًا ${c.name}، نتابع معك بخصوص طلبك من ${COMPANY.name} — هل عندك أي استفسار أو تحتاج تعديل على عرض السعر؟`,
  'تذكير دفع': c => `مرحبًا ${c.name}، نود تذكيركم بخصوص المبلغ المتبقي من طلبكم لدى ${COMPANY.name}. للاستفسار: ${COMPANY.phone}`,
  'شكر بعد التسليم': c => `شكرًا لك ${c.name} على ثقتك بـ${COMPANY.name} 🌿 نتمنى إنك عجبك التنفيذ، ويسعدنا أي ملاحظة أو تقييم منك.`
};
function sendTemplateMessage(){
  const key = document.getElementById('wa-template').value;
  if(!key || !MESSAGE_TEMPLATES[key]) return;
  const msg = MESSAGE_TEMPLATES[key](DRAFT);
  logEvent('رسالة واتساب (قالب)', key + ' — ' + (DRAFT.name||''));
  window.open(waLink(DRAFT.phone, msg), '_blank');
}
function printQuote(clientId){
  const c = STATE.clients.find(c=>c.id===clientId) || DRAFT;
  logEvent('طباعة عرض سعر', c.name);
  window.print();
}
function shareQuoteOnWhatsApp(clientId){
  const c = STATE.clients.find(c=>c.id===clientId) || DRAFT;
  logEvent('مشاركة عرض سعر عبر واتساب', c.name);
  const msg = buildWhatsAppQuoteMessage(c);
  window.open(waLink(c.phone, msg), '_blank');
}
function copyPortalLink(clientId){
  logEvent('نسخ رابط متابعة العميل', clientId);
  const link = window.location.origin + '/?portal=' + clientId;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(link).then(()=> showToast('تم نسخ الرابط')).catch(()=> prompt('انسخ الرابط يدويًا:', link));
  } else { prompt('انسخ الرابط يدويًا:', link); }
}

/* ---------------- Catalog & suppliers view ---------------- */
function viewCatalog(){
  const filtered = CAT_FILTER==='الكل' ? CATALOG : CATALOG.filter(c=>c.category===CAT_FILTER);
  const chips = ['الكل', ...CATEGORIES].map(cat=>`<div class="chip ${CAT_FILTER===cat?'active':''}" onclick="setCatFilter('${cat}')">${cat}</div>`).join('');
  const rows = filtered.map(c=>{
    const phone = isPhoneLike(c.rep) ? `<a href="tel:${String(c.rep).replace(/\s/g,'')}" style="color:var(--maroon); font-weight:700; text-decoration:none;">${c.rep}</a>` : c.rep;
    const stock = getStock(c.id);
    const stockBadge = stock < LOW_STOCK_THRESHOLD ? `<span class="badge low"><span class="dot"></span>${fmt(stock)}</span>` : `<span class="badge collected"><span class="dot"></span>${fmt(stock)}</span>`;
    return `<tr>
      <td><b>${escapeHtml(c.name)}</b></td>
      <td>${escapeHtml(c.category)}</td>
      <td>${fmt(c.price)} ر.س</td>
      <td>${escapeHtml(c.company)}</td>
      <td>${phone}</td>
      <td>${stockBadge}</td>
    </tr>`;
  }).join('');

  return `
  ${topbar('catalog')}
  <div class="section-title" style="margin-top:0;"><h2>الأصناف والموردون</h2><div class="line"></div></div>
  <div class="chips">${chips}</div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>الصنف</th><th>الفئة</th><th>سعر البيع (متر/لوح)</th><th>الشركة الموردة</th><th>رقم المندوب</th><th>المخزون</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  <div class="muted-note">هذه قائمة الأسعار الأساسية (تكلفة الشراء المرجعية). لتعديل كمية المخزون اذهب لتبويب "المخزون".</div>
  `;
}
function setCatFilter(cat){ CAT_FILTER = cat; render(); }

/* ---------------- Inventory view ---------------- */
function viewInventory(){
  const rows = CATALOG.map(c=>{
    const stock = getStock(c.id);
    const low = stock < LOW_STOCK_THRESHOLD;
    return `<tr>
      <td><b>${escapeHtml(c.name)}</b></td>
      <td>${escapeHtml(c.category)}</td>
      <td><input type="number" min="0" step="0.1" value="${stock}" style="width:110px;" onchange="updateStock('${c.id}', this.value)"></td>
      <td>${low? `<span class="badge low"><span class="dot"></span>منخفض</span>` : `<span class="badge collected"><span class="dot"></span>متوفر</span>`}</td>
    </tr>`;
  }).join('');
  const lowItems = CATALOG.filter(c=> getStock(c.id) < LOW_STOCK_THRESHOLD);
  return `
  ${topbar('inventory')}
  <div class="section-title" style="margin-top:0;"><h2>المخزون</h2><div class="line"></div>
    ${lowItems.length ? `<button class="btn-maroon btn-sm" onclick="sendLowStockAlert()">📤 إرسال تنبيه نواقص عبر واتساب</button>` : ''}
  </div>
  <div class="muted-note" style="margin-bottom:14px;">الكمية بالمتر أو اللوح حسب الصنف. الكمية تُحدَّث تلقائيًا عند تسجيل شراء جديد أو عند بدء تنفيذ طلب عميل (خصم تلقائي)، ويمكنك أيضًا تعديلها يدويًا هنا.</div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>الصنف</th><th>الفئة</th><th>الكمية المتوفرة</th><th>الحالة</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  `;
}
function sendLowStockAlert(){
  logEvent('تنبيه نواقص المخزون عبر واتساب', '');
  const lowItems = CATALOG.filter(c=> getStock(c.id) < LOW_STOCK_THRESHOLD);
  if(!lowItems.length){ showToast('لا توجد أصناف منخفضة حاليًا'); return; }
  const lines = [`⚠ تنبيه نواقص مخزون — ${COMPANY.name}`, ''];
  lowItems.forEach(c=> lines.push(`- ${c.name}: متبقي ${fmt(getStock(c.id))} فقط (المورد: ${c.company} — ${c.rep})`));
  window.open(waLink('', lines.join('\n')), '_blank');
}
async function updateStock(catalogId, value){
  STATE.inventory[catalogId] = parseFloat(value)||0;
  await saveState();
  showToast('تم تحديث المخزون');
}

/* ---------------- Purchases view ---------------- */
function viewPurchases(){
  const catOptions = CATEGORIES.map(cat=>{
    const opts = CATALOG.filter(x=>x.category===cat).map(x=>`<option value="${x.id}">${x.name} — سعر البيع ${x.price} ر.س</option>`).join('');
    return `<optgroup label="${cat}">${opts}</optgroup>`;
  }).join('');
  const rows = (STATE.purchases||[]).slice().reverse().map(p=>{
    const cat = catalogById(p.catalogId);
    const cost = (parseFloat(p.qty)||0)*(parseFloat(p.unitCost)||0);
    return `<tr>
      <td>${p.date}</td>
      <td>${escapeHtml(cat?cat.name:'—')}</td>
      <td>${fmt(p.qty)}</td>
      <td>${fmt(p.unitCost)} ر.س</td>
      <td><b>${fmt(cost)} ر.س</b></td>
      <td>${escapeHtml(p.company||'')}</td>
      <td><button class="icon-btn" onclick="deletePurchase('${p.id}')">✕</button></td>
    </tr>`;
  }).join('') || `<tr class="empty-row"><td colspan="7">لا توجد مشتريات مسجّلة بعد</td></tr>`;

  return `
  ${topbar('purchases')}
  <div class="section-title" style="margin-top:0;"><h2>تسجيل مشتريات جديدة</h2><div class="line"></div></div>
  <div class="card">
    <div class="grid4">
      <div class="field" style="grid-column:span 2;"><label>الصنف (من الموردين)</label><select id="pur-catalog">${catOptions}</select></div>
      <div class="field"><label>الكمية</label><input id="pur-qty" type="number" min="0" step="0.1" value="1"></div>
      <div class="field"><label>تكلفة الوحدة المدفوعة (ر.س)</label><input id="pur-cost" type="number" min="0" placeholder="سعر الشراء الفعلي"></div>
    </div>
    <div class="actions-bar"><button class="btn-gold" onclick="addPurchase()">+ تسجيل الشراء وتحديث المخزون</button></div>
  </div>
  <div class="section-title"><h2>سجل المشتريات</h2><div class="line"></div><button class="btn-ghost btn-sm" onclick="exportPurchasesCSV()">⬇ تصدير CSV</button></div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>التاريخ</th><th>الصنف</th><th>الكمية</th><th>تكلفة الوحدة</th><th>الإجمالي</th><th>المورد</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  `;
}
async function addPurchase(){
  const catalogId = document.getElementById('pur-catalog').value;
  const qty = parseFloat(document.getElementById('pur-qty').value)||0;
  const unitCost = parseFloat(document.getElementById('pur-cost').value)||0;
  if(!catalogId || qty<=0 || unitCost<=0){ showToast('أكمل بيانات الشراء أولًا'); return; }
  const cat = catalogById(catalogId);
  STATE.purchases.push({id:uid(), catalogId, qty, unitCost, company:cat.company, rep:cat.rep, date:todayStr(), dateISO:todayISO()});
  STATE.inventory[catalogId] = getStock(catalogId) + qty;
  addAudit('شراء جديد', `${cat.name} — ${fmt(qty)} × ${fmt(unitCost)} ر.س`);
  await saveState();
  showToast('تم تسجيل الشراء وتحديث المخزون');
  render();
}
async function deletePurchase(id){ STATE.purchases = STATE.purchases.filter(p=>p.id!==id); await saveState(); render(); }

/* ---------------- Collections view ---------------- */
function viewCollections(){
  const clients = STATE.clients.filter(c=> c.items && c.items.length && calcOrder(c).grandTotal>0);
  const rows = clients.map(c=>{
    const t = calcOrder(c);
    const collected = clientCollected(c);
    const remaining = t.grandTotal - collected;
    const remindMsg = `مرحبًا ${c.name}، نود تذكيركم بخصوص المبلغ المتبقي (${fmt(remaining)} ر.س) من طلبكم لدى ${COMPANY.name}. للاستفسار: ${COMPANY.phone}`;
    return `<tr>
      <td><b>${escapeHtml(c.name)}</b><div class="muted-note">${statusLabel(c.status)}</div></td>
      <td>${fmt(t.grandTotal)} ر.س</td>
      <td>${fmt(collected)} ر.س</td>
      <td style="color:${remaining>0.01?'var(--danger)':'var(--success)'}"><b>${fmt(remaining)} ر.س</b></td>
      <td>
        <div class="paycell">
          <input id="pay-amt-${c.id}" type="number" min="0" placeholder="المبلغ">
          <select id="pay-method-${c.id}">
            <option value="نقدًا">نقدًا</option>
            <option value="تحويل بنكي">تحويل</option>
            <option value="شبكة">شبكة</option>
          </select>
          <button class="btn-gold btn-sm" onclick="registerPayment('${c.id}')">تسجيل</button>
          ${c.phone && remaining>0.01 ? `<a href="${waLink(c.phone, remindMsg)}" target="_blank" class="btn-ghost btn-sm">تذكير واتساب</a>` : ''}
        </div>
      </td>
    </tr>`;
  }).join('') || `<tr class="empty-row"><td colspan="5">لا توجد عروض أسعار بعد لعرض التحصيل</td></tr>`;

  return `
  ${topbar('collections')}
  <div class="section-title" style="margin-top:0;"><h2>التحصيل والمتابعة المالية</h2><div class="line"></div></div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>العميل</th><th>إجمالي العرض</th><th>المحصّل</th><th>المتبقي</th><th>تسجيل دفعة جديدة</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  `;
}
async function registerPayment(clientId){
  const amtEl = document.getElementById('pay-amt-'+clientId);
  const methodEl = document.getElementById('pay-method-'+clientId);
  const amount = parseFloat(amtEl.value);
  if(!amount || amount<=0){ showToast('أدخل مبلغًا صحيحًا'); return; }
  const c = STATE.clients.find(c=>c.id===clientId);
  if(!c) return;
  if(!c.payments) c.payments=[];
  c.payments.push({id:uid(), amount, method: methodEl.value, date: todayStr(), dateISO: todayISO()});
  addAudit('تسجيل دفعة', `${c.name} — ${fmt(amount)} ر.س (${methodEl.value})`);
  await saveState();
  showToast('تم تسجيل الدفعة');
  render();
}

/* ---------------- Expenses view ---------------- */
function viewExpenses(){
  const catOptions = EXPENSE_CATEGORIES.map(c=>`<option value="${c}">${c}</option>`).join('');
  const rows = (STATE.expenses||[]).slice().reverse().map(e=>`
    <tr>
      <td>${e.date}</td><td>${escapeHtml(e.category)}</td><td>${escapeHtml(e.description||'')}</td>
      <td><b>${fmt(e.amount)} ر.س</b></td>
      <td><button class="icon-btn" onclick="deleteExpense('${e.id}')">✕</button></td>
    </tr>`).join('') || `<tr class="empty-row"><td colspan="5">لا توجد مصروفات مسجّلة بعد</td></tr>`;

  return `
  ${topbar('expenses')}
  <div class="section-title" style="margin-top:0;"><h2>تسجيل مصروف جديد</h2><div class="line"></div></div>
  <div class="card">
    <div class="grid4">
      <div class="field"><label>الفئة</label><select id="exp-cat">${catOptions}</select></div>
      <div class="field" style="grid-column:span 2;"><label>الوصف</label><input id="exp-desc" placeholder="مثال: إيجار المستودع"></div>
      <div class="field"><label>المبلغ (ر.س)</label><input id="exp-amount" type="number" min="0"></div>
    </div>
    <div class="actions-bar"><button class="btn-gold" onclick="addExpense()">+ تسجيل المصروف</button></div>
  </div>
  <div class="section-title"><h2>سجل المصروفات</h2><div class="line"></div><button class="btn-ghost btn-sm" onclick="exportExpensesCSV()">⬇ تصدير CSV</button></div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>التاريخ</th><th>الفئة</th><th>الوصف</th><th>المبلغ</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  `;
}
async function addExpense(){
  const category = document.getElementById('exp-cat').value;
  const description = document.getElementById('exp-desc').value;
  const amount = parseFloat(document.getElementById('exp-amount').value)||0;
  if(amount<=0){ showToast('أدخل مبلغًا صحيحًا'); return; }
  STATE.expenses.push({id:uid(), category, description, amount, date:todayStr(), dateISO:todayISO()});
  addAudit('مصروف جديد', `${category} — ${fmt(amount)} ر.س`);
  await saveState();
  showToast('تم تسجيل المصروف');
  render();
}
async function deleteExpense(id){ STATE.expenses = STATE.expenses.filter(e=>e.id!==id); await saveState(); render(); }

/* ---------------- خصم المخزون التلقائي عند بدء التنفيذ ---------------- */
function deductInventoryForClient(c){
  if(c.inventoryDeducted) return;
  (c.items||[]).forEach(it=>{
    if(it.catalogId){
      const qty = parseFloat(it.qty)||0;
      STATE.inventory[it.catalogId] = Math.max(0, getStock(it.catalogId) - qty);
    }
  });
  c.inventoryDeducted = true;
  if(!c.activities) c.activities = [];
  c.activities.push({id:uid(), text:'تم خصم المواد من المخزون تلقائيًا عند بدء التنفيذ', date: todayStr()});
}

/* ---------------- لوحة الصفقات (Kanban) ---------------- */
function viewKanban(){
  const columns = STATUS_LIST.map(s=>{
    const clientsInCol = STATE.clients.filter(c=>c.status===s.key);
    const cards = clientsInCol.map(c=>{
      const t = calcOrder(c);
      return `<div class="kanban-card" draggable="true" ondragstart="event.dataTransfer.setData('text/plain','${c.id}')" onclick="openClient('${c.id}')">
        <b>${escapeHtml(c.name)}</b> ${c.clientTag && c.clientTag!=='عادي' ? `<span style="background:${tagColor(c.clientTag)}; color:#fff; font-size:10px; padding:1px 6px; border-radius:10px;">${c.clientTag}</span>` : ''}
        <div class="muted-note">${fmt(t.grandTotal)} ر.س</div>
      </div>`;
    }).join('');
    return `<div class="kanban-col" ondragover="event.preventDefault()" ondrop="onKanbanDrop(event,'${s.key}')">
      <div class="kanban-col-head">${s.label} <span class="muted-note">(${clientsInCol.length})</span></div>
      <div class="kanban-col-body">${cards || '<div class="muted-note" style="padding:10px;">لا يوجد</div>'}</div>
    </div>`;
  }).join('');
  return `
  ${topbar('kanban')}
  <div class="section-title" style="margin-top:0;"><h2>لوحة الصفقات — اسحب البطاقة لتغيير الحالة</h2><div class="line"></div></div>
  <div class="kanban-board">${columns}</div>
  `;
}
async function onKanbanDrop(event, newStatus){
  event.preventDefault();
  const clientId = event.dataTransfer.getData('text/plain');
  const c = STATE.clients.find(c=>c.id===clientId);
  if(!c || c.status===newStatus) return;
  const oldStatus = c.status;
  c.status = newStatus;
  if(newStatus==='production' && oldStatus!=='production') deductInventoryForClient(c);
  addAudit('تغيير حالة (سحب)', `${c.name}: ${statusLabel(oldStatus)} ← ${statusLabel(newStatus)}`);
  await saveState();
  showToast('تم تحديث حالة '+c.name);
  render();
}

/* ---------------- جدولة التركيب ---------------- */
function viewSchedule(){
  const scheduled = STATE.clients.filter(c=>c.installDate).sort((a,b)=> a.installDate.localeCompare(b.installDate));
  const rows = scheduled.map(c=>`
    <tr>
      <td>${c.installDate}</td>
      <td><b>${escapeHtml(c.name)}</b><div class="muted-note">${escapeHtml(c.address||'')}</div></td>
      <td>${escapeHtml(c.installerName||'—')}</td>
      <td><span class="badge ${c.status}"><span class="dot"></span>${statusLabel(c.status)}</span></td>
      <td>${c.phone ? `<a href="${waLink(c.phone,'')}" target="_blank" class="icon-btn" title="واتساب">💬</a>` : ''} <button class="btn-ghost btn-sm" onclick="openClient('${c.id}')">فتح</button></td>
    </tr>`).join('') || `<tr class="empty-row"><td colspan="5">لا توجد مواعيد تركيب مجدولة بعد — أضف تاريخ التركيب من صفحة العميل</td></tr>`;
  return `
  ${topbar('schedule')}
  <div class="section-title" style="margin-top:0;"><h2>جدولة التركيب</h2><div class="line"></div></div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>تاريخ التركيب</th><th>العميل</th><th>الفني/الفريق</th><th>الحالة</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  `;
}

/* ---------------- قوالب المشاريع ---------------- */
function viewTemplates(){
  const rows = (STATE.templates||[]).map(t=>`
    <tr>
      <td><b>${escapeHtml(t.name)}</b></td>
      <td>${t.items.length} صنف</td>
      <td>
        <button class="btn-gold btn-sm" onclick="useTemplate('${t.id}')">استخدام في عميل جديد</button>
        <button class="icon-btn" onclick="deleteTemplate('${t.id}')">✕</button>
      </td>
    </tr>`).join('') || `<tr class="empty-row"><td colspan="3">لا توجد قوالب محفوظة بعد — احفظ قالبًا من صفحة أي عميل (زر "حفظ كقالب" أسفل قائمة الأصناف)</td></tr>`;
  return `
  ${topbar('templates')}
  <div class="section-title" style="margin-top:0;"><h2>قوالب المشاريع</h2><div class="line"></div></div>
  <div class="muted-note" style="margin-bottom:14px;">قوالب جاهزة لأنواع طلبات متكررة (مثلاً "غرفة نوم كاملة") — توفّر عليك إعادة إدخال نفس الأصناف من الصفر كل مرة.</div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>اسم القالب</th><th>عدد الأصناف</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  `;
}
async function saveAsTemplate(){
  const name = prompt('اسم القالب (مثال: غرفة نوم كاملة):');
  if(!name || !name.trim()) return;
  if(!STATE.templates) STATE.templates = [];
  STATE.templates.push({id:uid(), name:name.trim(), items: DRAFT.items.map(it=>({...it, id:undefined}))});
  await saveState();
  showToast('تم حفظ القالب');
}
function useTemplate(id){
  const t = (STATE.templates||[]).find(t=>t.id===id);
  if(!t) return;
  newClient();
  DRAFT.items = t.items.map(it=>({...it, id:uid()}));
  showToast('تم تحميل القالب — أكمل بيانات العميل');
  render();
}
async function deleteTemplate(id){
  STATE.templates = (STATE.templates||[]).filter(t=>t.id!==id);
  await saveState(); render();
}

/* ---------------- سجل التدقيق ---------------- */
function viewAuditLog(){
  const rows = (STATE.auditLog||[]).slice().reverse().slice(0,200).map(a=>`
    <tr>
      <td>${a.date}</td>
      <td>${escapeHtml(a.action)}</td>
      <td>${escapeHtml(a.details||'')}</td>
      <td>${escapeHtml(a.role||'')}</td>
    </tr>`).join('') || `<tr class="empty-row"><td colspan="4">لا يوجد سجل بعد</td></tr>`;
  return `
  ${topbar('auditlog')}
  <div class="section-title" style="margin-top:0;"><h2>سجل التدقيق (آخر 200 حدث)</h2><div class="line"></div></div>
  <div class="card">
    <h4 style="margin-bottom:6px;">السجل الدائم لكل خطوة في النظام</h4>
    <div class="muted-note" style="margin-top:0;">يُحفظ على الخادم في الملف <b>data/activity-log.jsonl</b> ولا يُمسح ولا يُقصّ: تسجيل الدخول والخروج، كل إضافة/تعديل/حذف (مع القيمة قبل وبعد)، المخزون، الإعدادات، فتح الصفحات، الطباعة والمشاركة.</div>
    <div class="actions-bar" style="justify-content:flex-start; margin-top:12px;">
      <a class="btn-gold btn-sm" href="/api/activity-log?format=csv" style="text-decoration:none; padding:6px 12px; border-radius:4px;">⬇ تنزيل السجل الكامل (Excel / CSV)</a>
      <a class="btn-ghost btn-sm" href="/api/activity-log?format=json" style="text-decoration:none; padding:6px 12px; border-radius:4px;">⬇ تنزيل JSON</a>
    </div>
    <div id="activity-log-box" class="table-scroll" style="margin-top:14px;"><div class="muted-note">جارٍ التحميل…</div></div>
  </div>
  <div class="muted-note" style="margin-bottom:14px;">
    ملاحظة صادقة: الدور المسجَّل هنا مأخوذ من اختيار الشخص عند تسجيل الدخول فقط (وليس حسابًا منفصلًا) —
    فهو مرجع تنظيمي وليس إثباتًا أمنيًا لهوية من قام بالفعل.
  </div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>التاريخ</th><th>الحدث</th><th>التفاصيل</th><th>الدور</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  `;
}

async function loadActivityLog(){
  const box = document.getElementById('activity-log-box'); if(!box) return;
  try{
    const res = await fetch('/api/activity-log');
    if(res.status===403){ box.innerHTML = '<div class="muted-note">السجل الكامل متاح للمدير فقط.</div>'; return; }
    const data = await res.json();
    const typeAr = {auth:'دخول/خروج', data:'بيانات', ui:'استخدام'};
    const rows = data.entries.map(e=>`<tr><td style="white-space:nowrap;">${escapeHtml(new Date(e.time).toLocaleString('ar-SA-u-nu-latn'))}</td><td>${escapeHtml(e.role||'')}</td><td>${typeAr[e.type]||e.type}</td><td>${escapeHtml(e.action)}</td><td>${escapeHtml(e.details||'')}</td></tr>`).join('') || '<tr class="empty-row"><td colspan="5">لا يوجد سجل بعد</td></tr>';
    box.innerHTML = `<div class="muted-note" style="margin-bottom:8px;">إجمالي الأحداث المحفوظة: <b>${data.total}</b> (يُعرض آخر 300)</div><table class="ledger"><thead><tr><th>الوقت</th><th>الدور</th><th>النوع</th><th>الحدث</th><th>التفاصيل</th></tr></thead><tbody>${rows}</tbody></table>`;
  }catch(e){ box.innerHTML = '<div class="muted-note">تعذّر تحميل السجل.</div>'; }
}

/* ---------------- Reports view ---------------- */
function computeReports(){
  let invoiced=0, materialsCost=0, collected=0;
  STATE.clients.forEach(c=>{
    const t = calcOrder(c);
    if(['contract','production','delivered','collected'].includes(c.status)){ invoiced += t.grandTotal; materialsCost += t.totalCost; }
    collected += clientCollected(c);
  });
  let purchasesTotal=0;
  (STATE.purchases||[]).forEach(p=> purchasesTotal += (parseFloat(p.qty)||0)*(parseFloat(p.unitCost)||0));
  let expensesTotal=0;
  (STATE.expenses||[]).forEach(e=> expensesTotal += parseFloat(e.amount)||0);
  const netProfitCash = collected - purchasesTotal - expensesTotal;
  const remaining = invoiced - collected;
  const grossProfit = invoiced - materialsCost;
  const operatingProfit = grossProfit - expensesTotal;
  return { invoiced, collected, remaining, purchasesTotal, expensesTotal, netProfitCash, materialsCost, grossProfit, operatingProfit };
}
function buildMonthlyMap(){
  const months = {};
  STATE.clients.forEach(c=>{
    if(c.quoteDateISO){
      const k = c.quoteDateISO.slice(0,7);
      const t = calcOrder(c);
      if(!months[k]) months[k] = {invoiced:0, collected:0};
      months[k].invoiced += t.grandTotal;
    }
    (c.payments||[]).forEach(p=>{
      if(p.dateISO){
        const k = p.dateISO.slice(0,7);
        if(!months[k]) months[k] = {invoiced:0, collected:0};
        months[k].collected += parseFloat(p.amount)||0;
      }
    });
  });
  return months;
}
function computeMonthlySeries(){
  const months = buildMonthlyMap();
  return Object.keys(months).sort().slice(-6).map(k=>({month:k, ...months[k]}));
}
function computeMonthComparison(){
  const months = buildMonthlyMap();
  const now = new Date();
  const curKey = now.toISOString().slice(0,7);
  const prev = new Date(now.getFullYear(), now.getMonth()-1, 1);
  const prevKey = prev.toISOString().slice(0,7);
  return { curKey, prevKey, cur: months[curKey]||{invoiced:0,collected:0}, prv: months[prevKey]||{invoiced:0,collected:0} };
}
function computeTopItems(){
  const map = {};
  STATE.clients.forEach(c=>{
    const t = calcOrder(c);
    (c.items||[]).forEach(it=>{
      const ic = calcItem(it);
      const sell = ic.itemCost * (1+(t.margin/100));
      const name = itemDisplayName(it);
      map[name] = (map[name]||0) + sell;
    });
  });
  return Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,6);
}
function computeLeadSourceStats(){
  const map = {};
  STATE.clients.forEach(c=>{ const src = c.leadSource || 'غير محدد'; map[src] = (map[src]||0)+1; });
  return Object.entries(map).sort((a,b)=>b[1]-a[1]);
}
function pctChange(cur, prev){
  if(!prev) return cur>0 ? '+100%' : '0%';
  const p = ((cur-prev)/prev)*100;
  return (p>=0?'+':'') + p.toFixed(0) + '%';
}
function viewReports(){
  const r = computeReports();
  const cmp = computeMonthComparison();
  return `
  ${topbar('reports')}
  <div class="section-title" style="margin-top:0;"><h2>التقارير المالية</h2><div class="line"></div><button class="btn-ghost btn-sm" onclick="printFullReport()">🖨️ طباعة التقرير الكامل</button></div>
  <div class="strip" style="grid-template-columns:repeat(3,1fr);">
    <div class="cell"><div class="num">${fmt(r.invoiced)}</div><div class="lbl">إجمالي قيمة العقود (ر.س)</div></div>
    <div class="cell"><div class="num">${fmt(r.collected)}</div><div class="lbl">المحصّل فعليًا (ر.س)</div></div>
    <div class="cell"><div class="num">${fmt(r.remaining)}</div><div class="lbl">متبقٍ في ذمة العملاء (ر.س)</div></div>
  </div>
  <div class="strip" style="grid-template-columns:repeat(3,1fr);">
    <div class="cell"><div class="num">${fmt(r.purchasesTotal)}</div><div class="lbl">إجمالي المشتريات (ر.س)</div></div>
    <div class="cell"><div class="num">${fmt(r.expensesTotal)}</div><div class="lbl">إجمالي المصروفات (ر.س)</div></div>
    <div class="cell"><div class="num" style="color:${r.netProfitCash>=0?'var(--green)':'var(--danger)'}">${fmt(r.netProfitCash)}</div><div class="lbl">صافي الربح النقدي التقديري</div></div>
  </div>
  <div class="muted-note">صافي الربح النقدي = المحصّل فعليًا − إجمالي المشتريات − إجمالي المصروفات (تدفق نقدي فعلي). للتفصيل المحاسبي راجع تبويب "الأرباح"، وللرسوم البيانية راجع "التحليلات".</div>

  <div class="section-title"><h2>مقارنة الشهر الحالي بالشهر السابق</h2><div class="line"></div></div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th></th><th>${cmp.prevKey}</th><th>${cmp.curKey}</th><th>التغيّر</th></tr></thead>
    <tbody>
      <tr><td>قيمة العقود</td><td>${fmt(cmp.prv.invoiced)} ر.س</td><td>${fmt(cmp.cur.invoiced)} ر.س</td><td>${pctChange(cmp.cur.invoiced, cmp.prv.invoiced)}</td></tr>
      <tr><td>المحصّل</td><td>${fmt(cmp.prv.collected)} ر.س</td><td>${fmt(cmp.cur.collected)} ر.س</td><td>${pctChange(cmp.cur.collected, cmp.prv.collected)}</td></tr>
    </tbody>
  </table></div>
  `;
}
function viewProfits(){
  const r = computeReports();
  return `
  ${topbar('profits')}
  <div class="section-title" style="margin-top:0;"><h2>الأرباح — قائمة الدخل المبسطة</h2><div class="line"></div></div>
  <div class="card">
    <div class="totals-box" style="margin-top:0;">
      <div class="row"><span>الإيرادات (العقود المتعاقد عليها)</span><b>${fmt(r.invoiced)} ر.س</b></div>
      <div class="row"><span>تكلفة البضاعة المرجعية (حسب أسعار الأصناف)</span><b>${fmt(r.materialsCost)} ر.س</b></div>
      <div class="row"><span>مجمل الربح</span><b>${fmt(r.grossProfit)} ر.س</b></div>
      <div class="row"><span>المصروفات التشغيلية</span><b>${fmt(r.expensesTotal)} ر.س</b></div>
      <div class="row grand"><span>صافي الربح التشغيلي التقديري</span><b style="color:${r.operatingProfit>=0?'var(--green)':'var(--danger)'}">${fmt(r.operatingProfit)} ر.س</b></div>
    </div>
    <div class="muted-note">تقدير محاسبي مبسّط لغرض المتابعة الداخلية فقط — وليس بديلاً عن قوائم مالية معتمدة من محاسب قانوني.</div>
  </div>
  <div class="card">
    <h4 style="margin-bottom:10px;">صافي الربح النقدي (تدفق فعلي)</h4>
    <div class="num" style="font-family:'Cairo'; font-size:26px; color:${r.netProfitCash>=0?'var(--green)':'var(--danger)'};">${fmt(r.netProfitCash)} ر.س</div>
    <div class="muted-note" style="margin-top:6px;">= المحصّل فعليًا (${fmt(r.collected)}) − المشتريات (${fmt(r.purchasesTotal)}) − المصروفات (${fmt(r.expensesTotal)})</div>
  </div>
  `;
}
function viewAnalytics(){
  return `
  ${topbar('analytics')}
  <div class="section-title" style="margin-top:0;"><h2>التحليلات</h2><div class="line"></div></div>
  <div class="section-title"><h2>الاتجاه الشهري (آخر 6 أشهر)</h2><div class="line"></div></div>
  <div class="card"><canvas id="chart-monthly" height="90"></canvas></div>
  <div class="grid2">
    <div class="card"><h4 style="margin-bottom:10px;">الأصناف الأعلى إيرادًا</h4><canvas id="chart-items" height="120"></canvas></div>
    <div class="card"><h4 style="margin-bottom:10px;">مصدر العملاء</h4><canvas id="chart-leads" height="120"></canvas></div>
  </div>
  `;
}
function renderReportCharts(){
  if(typeof Chart === 'undefined') return;
  const series = computeMonthlySeries();
  const items = computeTopItems();
  const leads = computeLeadSourceStats();
  ['chart-monthly','chart-items','chart-leads'].forEach(id=>{
    const el = document.getElementById(id);
    if(el && el._chartInstance){ el._chartInstance.destroy(); }
  });
  const c1 = document.getElementById('chart-monthly');
  if(c1) c1._chartInstance = new Chart(c1, { type:'bar',
    data:{ labels: series.map(s=>s.month), datasets:[
      {label:'قيمة العقود', data: series.map(s=>s.invoiced), backgroundColor:'#B8874A'},
      {label:'المحصّل', data: series.map(s=>s.collected), backgroundColor:'#5C0D33'}
    ]}, options:{responsive:true, plugins:{legend:{position:'bottom'}}} });
  const c2 = document.getElementById('chart-items');
  if(c2) c2._chartInstance = new Chart(c2, { type:'bar',
    data:{ labels: items.map(i=>i[0]), datasets:[{label:'الإيراد', data: items.map(i=>i[1]), backgroundColor:'#5F6B47'}]},
    options:{indexAxis:'y', plugins:{legend:{display:false}}} });
  const c3 = document.getElementById('chart-leads');
  if(c3) c3._chartInstance = new Chart(c3, { type:'doughnut',
    data:{ labels: leads.map(l=>l[0]), datasets:[{data: leads.map(l=>l[1]), backgroundColor:['#B8874A','#5C0D33','#5F6B47','#818F63','#D8AE72','#84234F','#9FAEA6']}]},
    options:{plugins:{legend:{position:'bottom'}}} });
}

/* ---------------- عروض الأسعار ---------------- */
function viewQuotes(){
  const quoted = STATE.clients.filter(c=>c.quoteDate).sort((a,b)=> (b.quoteDateISO||'').localeCompare(a.quoteDateISO||''));
  const rows = quoted.map(c=>{
    const t = calcOrder(c);
    const expired = isQuoteExpired(c);
    return `<tr>
      <td>${c.id.slice(-6).toUpperCase()}</td>
      <td><b>${escapeHtml(c.name)}</b></td>
      <td>${c.quoteDate}</td>
      <td>${fmt(t.grandTotal)} ر.س</td>
      <td>
        <span class="badge ${c.status}"><span class="dot"></span>${statusLabel(c.status)}</span>
        ${expired?`<div class="badge low" style="margin-top:5px;"><span class="dot"></span>منتهي</div>`:''}
      </td>
      <td>${c.quoteHistory && c.quoteHistory.length ? c.quoteHistory.length+' نسخة سابقة' : '—'}</td>
      <td><button class="btn-ghost btn-sm" onclick="go('quote','${c.id}')">عرض</button></td>
    </tr>`;
  }).join('') || `<tr class="empty-row"><td colspan="7">لا توجد عروض أسعار مُصدرة بعد</td></tr>`;
  return `
  ${topbar('quotes')}
  <div class="section-title" style="margin-top:0;"><h2>عروض الأسعار</h2><div class="line"></div></div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>رقم العرض</th><th>العميل</th><th>التاريخ</th><th>الإجمالي</th><th>الحالة</th><th>السجل</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

/* ---------------- المشاريع (نشطة) ---------------- */
function viewProjects(){
  const active = STATE.clients.filter(c=>['contract','production','delivered'].includes(c.status));
  const rows = active.map(c=>{
    const t = calcOrder(c);
    const doneTasks = (c.tasks||[]).filter(tk=>tk.done).length;
    const totalTasks = (c.tasks||[]).length;
    return `<tr>
      <td><b>${escapeHtml(c.name)}</b><div class="muted-note">${escapeHtml(c.address||'')}</div></td>
      <td><span class="badge ${c.status}"><span class="dot"></span>${statusLabel(c.status)}</span></td>
      <td>${totalTasks ? `${doneTasks}/${totalTasks} مهمة` : '—'}</td>
      <td>${c.installDate||'—'}</td>
      <td>${escapeHtml(c.installerName||'—')}</td>
      <td>${fmt(t.grandTotal)} ر.س</td>
      <td><button class="btn-ghost btn-sm" onclick="openClient('${c.id}')">فتح</button></td>
    </tr>`;
  }).join('') || `<tr class="empty-row"><td colspan="7">لا توجد مشاريع نشطة حاليًا (بعد توقيع العقد)</td></tr>`;
  return `
  ${topbar('projects')}
  <div class="section-title" style="margin-top:0;"><h2>المشاريع النشطة</h2><div class="line"></div></div>
  <div class="muted-note" style="margin-bottom:14px;">تشمل العملاء بعد توقيع العقد وحتى التسليم.</div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>العميل</th><th>الحالة</th><th>المهام</th><th>موعد التركيب</th><th>الفني</th><th>القيمة</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

/* ---------------- المقايسات (بانتظار التسعير) ---------------- */
function viewEstimates(){
  const pending = STATE.clients.filter(c=>['new','measured'].includes(c.status));
  const rows = pending.map(c=>`
    <tr>
      <td><b>${escapeHtml(c.name)}</b></td>
      <td>${escapeHtml(c.phone||'')}</td>
      <td>${c.items?c.items.length:0} بند</td>
      <td><span class="badge ${c.status}"><span class="dot"></span>${statusLabel(c.status)}</span></td>
      <td>${c.createdAtStr||''}</td>
      <td><button class="btn-gold btn-sm" onclick="openClient('${c.id}')">أكمل المقايسة</button></td>
    </tr>`).join('') || `<tr class="empty-row"><td colspan="6">لا توجد مقايسات بانتظار التسعير — كل العملاء تم تسعيرهم 🎉</td></tr>`;
  return `
  ${topbar('estimates')}
  <div class="section-title" style="margin-top:0;"><h2>المقايسات بانتظار التسعير</h2><div class="line"></div></div>
  <div class="muted-note" style="margin-bottom:14px;">عملاء تم أخذ قياساتهم لكن لم يُصدر لهم عرض سعر بعد.</div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>العميل</th><th>الجوال</th><th>البنود</th><th>الحالة</th><th>التاريخ</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

/* ---------------- الأصناف (بدون بيانات الموردين) ---------------- */
function viewItems(){
  const filtered = CAT_FILTER==='الكل' ? CATALOG : CATALOG.filter(c=>c.category===CAT_FILTER);
  const chips = ['الكل', ...CATEGORIES].map(cat=>`<div class="chip ${CAT_FILTER===cat?'active':''}" onclick="setCatFilter('${cat}')">${cat}</div>`).join('');
  const rows = filtered.map(c=>{
    const stock = getStock(c.id);
    const stockBadge = stock < LOW_STOCK_THRESHOLD ? `<span class="badge low"><span class="dot"></span>${fmt(stock)}</span>` : `<span class="badge collected"><span class="dot"></span>${fmt(stock)}</span>`;
    return `<tr><td><b>${escapeHtml(c.name)}</b></td><td>${escapeHtml(c.category)}</td><td>${fmt(c.price)} ر.س</td><td>${stockBadge}</td></tr>`;
  }).join('');
  return `
  ${topbar('items')}
  <div class="section-title" style="margin-top:0;"><h2>الأصناف</h2><div class="line"></div></div>
  <div class="chips">${chips}</div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>الصنف</th><th>الفئة</th><th>سعر البيع (متر/لوح)</th><th>المخزون</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

/* ---------------- الموردون (دليل التوريد) ---------------- */
function viewSuppliers(){
  const companies = [...new Set(CATALOG.map(c=>c.company))];
  const sections = companies.map(company=>{
    const items = CATALOG.filter(c=>c.company===company);
    const rep = items[0].rep;
    const phone = isPhoneLike(rep) ? `<a href="tel:${String(rep).replace(/\s/g,'')}" style="color:var(--maroon); font-weight:700; text-decoration:none;">${rep}</a>` : rep;
    return `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h4>${escapeHtml(company)}</h4>
        <div>المندوب: ${phone} ${isPhoneLike(rep) ? `<a href="${waLink(rep,'مرحبًا، معك '+COMPANY.name)}" target="_blank" class="btn-gold btn-sm" style="margin-right:8px;">واتساب</a>`:''}</div>
      </div>
      <div class="muted-note">${items.map(i=>i.name).join(' — ')}</div>
    </div>`;
  }).join('');
  return `
  ${topbar('suppliers')}
  <div class="section-title" style="margin-top:0;"><h2>الموردون</h2><div class="line"></div></div>
  ${sections}`;
}

/* ---------------- الحسابات — دفتر حركة نقدية مبسّط ---------------- */
function viewAccounts(){
  const rows = [];
  STATE.clients.forEach(c=>{
    (c.payments||[]).forEach(p=> rows.push({date:p.dateISO||'', label:`دفعة من ${c.name}`, amount:parseFloat(p.amount)||0, type:'in'}));
  });
  (STATE.purchases||[]).forEach(p=>{
    const cat = catalogById(p.catalogId);
    rows.push({date:p.dateISO||'', label:`شراء: ${cat?cat.name:''}`, amount:(parseFloat(p.qty)||0)*(parseFloat(p.unitCost)||0), type:'out'});
  });
  (STATE.expenses||[]).forEach(e=>{
    rows.push({date:e.dateISO||'', label:`مصروف: ${e.category}${e.description?' — '+e.description:''}`, amount:parseFloat(e.amount)||0, type:'out'});
  });
  rows.sort((a,b)=> (a.date||'').localeCompare(b.date||''));
  let balance = 0;
  const bodyRows = rows.map(r=>{
    balance += r.type==='in' ? r.amount : -r.amount;
    return `<tr>
      <td>${r.date}</td><td>${escapeHtml(r.label)}</td>
      <td style="color:var(--green)">${r.type==='in'?fmt(r.amount)+' ر.س':''}</td>
      <td style="color:var(--danger)">${r.type==='out'?fmt(r.amount)+' ر.س':''}</td>
      <td><b>${fmt(balance)} ر.س</b></td>
    </tr>`;
  }).join('') || `<tr class="empty-row"><td colspan="5">لا توجد حركات مسجّلة بعد</td></tr>`;
  return `
  ${topbar('accounts')}
  <div class="section-title" style="margin-top:0;"><h2>الحسابات — دفتر الحركة النقدية المبسّط</h2><div class="line"></div></div>
  <div class="muted-note" style="margin-bottom:14px;">سجل زمني لكل الدفعات الواردة والمشتريات والمصروفات الخارجة، مع رصيد تراكمي. هذا دفتر نقدي مبسّط وليس نظام قيود محاسبية مزدوجة كاملاً.</div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>التاريخ</th><th>البيان</th><th>وارد</th><th>صادر</th><th>الرصيد التراكمي</th></tr></thead>
    <tbody>${bodyRows}</tbody>
  </table></div>`;
}

/* ---------------- المستخدمون والصلاحيات ---------------- */
function viewUsers(){
  const roleDesc = {
    'مدير':'صلاحية كاملة على كل الأقسام بلا استثناء.',
    'مبيعات':'العملاء، الصفقات، عروض الأسعار، التحصيل، المشاريع، المخزون (عرض فقط)، التسويق.',
    'محاسب':'العملاء (عرض)، التحصيل، المخزون، المشتريات، المصروفات، الأرباح، الحسابات، التقارير.'
  };
  const rows = ROLES_LIST.map(r=>`
    <div class="card">
      <h4 style="margin-bottom:6px;">${r}</h4>
      <div class="muted-note" style="margin-bottom:12px;">${roleDesc[r]}</div>
      <div class="grid3">
        <div class="field"><input id="pw-old-${r}" type="password" placeholder="كلمة المرور الحالية لهذا الدور"></div>
        <div class="field"><input id="pw-new-${r}" type="password" placeholder="كلمة المرور الجديدة"></div>
        <div class="field"><button class="btn-gold" style="width:100%" onclick="changeRolePassword('${r}')">تحديث</button></div>
      </div>
    </div>`).join('');
  return `
  ${topbar('users')}
  <div class="section-title" style="margin-top:0;"><h2>المستخدمون والصلاحيات</h2><div class="line"></div></div>
  <div class="muted-note" style="margin-bottom:14px;">
    كل دور له كلمة مرور منفصلة وفعلية على مستوى الخادم (وليست شكلية). ملاحظة صادقة: هذا لا يزال دون نظام حسابات فردية كامل — كل من يعرف كلمة مرور دور معيّن يدخل بصلاحياته، وواجهة البرمجة (API) ما زالت تعيد نفس البيانات لأي دور مسجّل دخول (الفرق الحالي فقط في عناصر القائمة الظاهرة).
  </div>
  ${rows}`;
}
async function changeRolePassword(role){
  const oldPassword = document.getElementById('pw-old-'+role).value;
  const newPassword = document.getElementById('pw-new-'+role).value;
  if(!oldPassword || !newPassword){ showToast('عبّي الحقلين أولًا'); return; }
  try{
    const res = await fetch('/api/change-password', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({role, oldPassword, newPassword})});
    const j = await res.json();
    if(!res.ok){ showToast(j.error || 'تعذّر التحديث'); return; }
    showToast('تم تحديث كلمة مرور '+role);
    document.getElementById('pw-old-'+role).value=''; document.getElementById('pw-new-'+role).value='';
  }catch(e){ showToast('تعذّر الاتصال بالخادم'); }
}

/* ---------------- الموظفون ---------------- */
function viewEmployees(){
  const rows = (STATE.employees||[]).map(e=>`
    <tr>
      <td><b>${escapeHtml(e.name)}</b></td>
      <td>${escapeHtml(e.position||'')}</td>
      <td>${escapeHtml(e.phone||'')}</td>
      <td>${e.joinDate||''}</td>
      <td><button class="icon-btn" onclick="deleteEmployee('${e.id}')">✕</button></td>
    </tr>`).join('') || `<tr class="empty-row"><td colspan="5">لا يوجد موظفون مسجّلون بعد</td></tr>`;
  return `
  ${topbar('employees')}
  <div class="section-title" style="margin-top:0;"><h2>الموظفون</h2><div class="line"></div></div>
  <div class="card">
    <div class="grid4">
      <div class="field"><input id="emp-name" placeholder="اسم الموظف"></div>
      <div class="field"><input id="emp-position" placeholder="الوظيفة (فني تركيب، مندوب...)"></div>
      <div class="field"><input id="emp-phone" placeholder="رقم الجوال"></div>
      <div class="field"><input id="emp-join" type="date"></div>
    </div>
    <div class="actions-bar"><button class="btn-gold" onclick="addEmployee()">+ إضافة موظف</button></div>
  </div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>الاسم</th><th>الوظيفة</th><th>الجوال</th><th>تاريخ الالتحاق</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  <div class="muted-note">هذا سجل بيانات موظفين أساسي (بدون رواتب أو حضور وانصراف) — يمكن ربطه لاحقًا بجدولة التركيب لتعيين الفني مباشرة من هذه القائمة.</div>`;
}
async function addEmployee(){
  const name = document.getElementById('emp-name').value.trim();
  const position = document.getElementById('emp-position').value.trim();
  const phone = document.getElementById('emp-phone').value.trim();
  const joinDate = document.getElementById('emp-join').value;
  if(!name){ showToast('أدخل اسم الموظف أولًا'); return; }
  STATE.employees.push({id:uid(), name, position, phone, joinDate});
  addAudit('إضافة موظف', name);
  await saveState();
  showToast('تم إضافة الموظف');
  render();
}
async function deleteEmployee(id){
  STATE.employees = STATE.employees.filter(e=>e.id!==id);
  await saveState(); render();
}

/* ---------------- التسويق ---------------- */
function viewMarketing(){
  const rows = (STATE.campaigns||[]).map(c=>`
    <tr>
      <td><b>${escapeHtml(c.name)}</b></td>
      <td>${escapeHtml(c.channel)}</td>
      <td>${fmt(c.budget)} ر.س</td>
      <td>${c.startDate||''} → ${c.endDate||''}</td>
      <td><button class="icon-btn" onclick="deleteCampaign('${c.id}')">✕</button></td>
    </tr>`).join('') || `<tr class="empty-row"><td colspan="5">لا توجد حملات مسجّلة بعد</td></tr>`;
  return `
  ${topbar('marketing')}
  <div class="section-title" style="margin-top:0;"><h2>الحملات التسويقية</h2><div class="line"></div></div>
  <div class="card">
    <div class="grid4">
      <div class="field"><input id="camp-name" placeholder="اسم الحملة"></div>
      <div class="field"><select id="camp-channel">${LEAD_SOURCES.filter(s=>s!=='غير محدد').map(s=>`<option value="${s}">${s}</option>`).join('')}</select></div>
      <div class="field"><input id="camp-budget" type="number" min="0" placeholder="الميزانية (ر.س)"></div>
      <div class="field"><input id="camp-start" type="date"></div>
    </div>
    <div class="actions-bar"><button class="btn-gold" onclick="addCampaign()">+ إضافة حملة</button></div>
  </div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>الحملة</th><th>القناة</th><th>الميزانية</th><th>الفترة</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>
  <div class="actions-bar" style="justify-content:flex-start;"><button class="btn-ghost btn-sm" onclick="go('leadstats')">عرض أداء المصادر ›</button></div>`;
}
async function addCampaign(){
  const name = document.getElementById('camp-name').value.trim();
  const channel = document.getElementById('camp-channel').value;
  const budget = parseFloat(document.getElementById('camp-budget').value)||0;
  const startDate = document.getElementById('camp-start').value;
  if(!name){ showToast('أدخل اسم الحملة أولًا'); return; }
  STATE.campaigns.push({id:uid(), name, channel, budget, startDate});
  addAudit('حملة تسويقية جديدة', name);
  await saveState();
  showToast('تم إضافة الحملة');
  render();
}
async function deleteCampaign(id){
  STATE.campaigns = STATE.campaigns.filter(c=>c.id!==id);
  await saveState(); render();
}
function viewLeadStats(){
  const stats = computeLeadSourceStats();
  const total = stats.reduce((s,x)=>s+x[1],0) || 1;
  const rows = stats.map(([src,count])=>{
    const clientsFromSrc = STATE.clients.filter(c=>(c.leadSource||'غير محدد')===src);
    const revenue = clientsFromSrc.reduce((s,c)=> s + (['contract','production','delivered','collected'].includes(c.status) ? calcOrder(c).grandTotal : 0), 0);
    return `<tr><td>${escapeHtml(src)}</td><td>${count}</td><td>${(count/total*100).toFixed(0)}%</td><td>${fmt(revenue)} ر.س</td></tr>`;
  }).join('');
  return `
  ${topbar('leadstats')}
  <div class="section-title" style="margin-top:0;"><h2>أداء مصادر العملاء</h2><div class="line"></div></div>
  <div class="table-scroll"><table class="ledger">
    <thead><tr><th>المصدر</th><th>عدد العملاء</th><th>النسبة</th><th>إجمالي الإيراد المتحقق</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

/* ---------------- Utils ---------------- */
function escapeHtml(s){
  if(s===undefined || s===null) return '';
  return String(s).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function downloadCSV(filename, headers, rows){
  const esc = v => `"${String(v===undefined||v===null?'':v).replace(/"/g,'""')}"`;
  const csv = '\uFEFF' + [headers.map(esc).join(','), ...rows.map(r=>r.map(esc).join(','))].join('\r\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function exportClientsCSV(){
  const headers = ['الاسم','الجوال','العنوان','الحالة','مصدر العميل','قيمة العرض','المحصّل','تاريخ الإضافة'];
  const rows = STATE.clients.map(c=>{
    const t = calcOrder(c);
    return [c.name, c.phone, c.address, statusLabel(c.status), c.leadSource||'', t.grandTotal.toFixed(2), clientCollected(c).toFixed(2), c.createdAtStr||''];
  });
  downloadCSV('عملاء-ألوان-الحياة.csv', headers, rows);
}
function exportPurchasesCSV(){
  const headers = ['التاريخ','الصنف','الكمية','تكلفة الوحدة','الإجمالي','المورد'];
  const rows = (STATE.purchases||[]).map(p=>{
    const cat = catalogById(p.catalogId);
    return [p.date, cat?cat.name:'', p.qty, p.unitCost, ((parseFloat(p.qty)||0)*(parseFloat(p.unitCost)||0)).toFixed(2), p.company||''];
  });
  downloadCSV('مشتريات-ألوان-الحياة.csv', headers, rows);
}
function exportExpensesCSV(){
  const headers = ['التاريخ','الفئة','الوصف','المبلغ'];
  const rows = (STATE.expenses||[]).map(e=>[e.date, e.category, e.description||'', e.amount]);
  downloadCSV('مصروفات-ألوان-الحياة.csv', headers, rows);
}

/* ---------------- Boot ---------------- */
(async function(){
  applyTheme();
  const params = new URLSearchParams(window.location.search);
  const portalId = params.get('portal');
  if(portalId){ await loadPortal(portalId); return; }
  await loadState();
  if(NEEDS_LOGIN){ render(); return; }
  go('dashboard');
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js').catch(()=>{});
  }
  setupFollowUpNotifications();
})();
