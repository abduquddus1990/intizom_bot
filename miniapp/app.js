// =========================================================================
// INTIZOM AI — Kengaytirilgan Mini App va Brauzer Dashboard Dasturi
// =========================================================================

const SUPABASE_URL = "https://wfrclcwjeeqeqchmdhzw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_XXGPseelcyjkO6EJie1bHQ_t32mh4Do";
const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/miniapp-api`;

const tg = window.Telegram?.WebApp;

// 1. Asosiy Menyu Bo'limlari
const CORE_NAV_ITEMS = [
  { key: "reports", icon: "analytics", label_uz: "Hisobotlar", label_ru: "Отчёты" },
  { key: "attendance", icon: "schedule", label_uz: "Davomat", label_ru: "Посещаемость" },
  { key: "employees", icon: "badge", label_uz: "Xodimlar", label_ru: "Сотрудники" },
  { key: "ai_chat", icon: "smart_toy", label_uz: "Intizom AI", label_ru: "Intizom AI" },
  { key: "camera", icon: "videocam", label_uz: "Kamera", label_ru: "Камера" },
  { key: "settings", icon: "tune", label_uz: "Sozlamalar", label_ru: "Настройки" },
];

// 2. Yangi Qo'shimcha Tahlil
const ADVANCED_NAV_ITEMS = [
  { key: "analytics", icon: "trending_up", label_uz: "Dinamika & Tahlil", label_ru: "Динамика и Анализ" },
  { key: "live_radar", icon: "notifications_active", label_uz: "Jonli Radar & Alerts", label_ru: "Радар & Оповещения" },
];

let currentUser = {
  full_name: "Quddusxon",
  role: "manager",
  permissions: ["reports", "attendance", "employees", "ai_chat", "camera", "settings", "analytics", "live_radar"],
  language: "uz",
};

// 8 Ta Pinterest Fon Mavzulari
const PINTEREST_THEMES = [
  { key: "theme-emerald", label_uz: "Zangori Zumrad", label_ru: "Изумрудный Лес", color: "#10b981" },
  { key: "theme-cream", label_uz: "Wabi-Sabi Qum", label_ru: "Песочный Крем", color: "#e8d8c3" },
  { key: "theme-sage", label_uz: "Sokin Matcha", label_ru: "Матча Зеленый", color: "#a3b899" },
  { key: "theme-plum", label_uz: "Nafis Shafaq", label_ru: "Нежная Слива", color: "#8a508f" },
  { key: "theme-sky", label_uz: "Tiniq Osmon", label_ru: "Ясное Неbo", color: "#38bdf8" },
  { key: "theme-obsidian", label_uz: "Obsidian Tuni", label_ru: "Ночной Обсидиан", color: "#0f172a" },
  { key: "theme-espresso", label_uz: "Iliq Qahva", label_ru: "Теплый Эспрессо", color: "#3c2a21" },
  { key: "theme-grid", label_uz: "Arxitektura To'ri", label_ru: "Сетка", color: "#0284c7" },
];

const TRANSLATIONS = {
  uz: {
    reports_title: "Bugungi Suhbatlar Hisoboti",
    reports_sub: "Real vaqtli AI tahlili va sifat ko'rsatkichlari",
    today_convs: "Jami suhbatlar",
    avg_score: "O'rtacha sifat bali",
    active_mics: "Faol mikrofonlar",
    radar_alerts: "Radar signallari",
    filter_all: "Barchasi",
    filter_good: "🟢 A'lo (85+)",
    filter_mid: "🟡 O'rta (60-84)",
    filter_bad: "🔴 Past (<60)",
    attendance_title: "Xodimlar Davomati va Mikrofon Holati",
    attendance_sub: "Heartbeat va ovoz faolligi nazorati (24/7 Monitoring)",
    employees_title: "Xodimlar Ro'yxati",
    employees_sub: "Darchalar, oklad va umumiy KPI ko'rsatkichlari",
    analytics_title: "Dinamika va Tahliliy Ko'rsatkichlar",
    analytics_sub: "Haftalik sifat trendlari va xatoliklar taqsimoti",
    radar_title: "Jonli Radar va Xavfsizlik Signallari",
    radar_sub: "Real vaqtli monitoring va ziddiyatli suhbatlar ogohlantirishlari",
    camera_title: "Jonli Kuzatuv Kameralari (CCTV)",
    camera_sub: "Hikvision ISAPI / RTSP Onlayn Oqim Ko'rinishi",
    chat_title: "Intizom AI Maslahatchisi",
    chat_sub: "Ovozli va matnli tahlil yordamchisi",
    settings_title: "Tizim Sozlamalari",
    settings_sub: "Pinterest estetik fonlari, til va bonus parametrlari",
  },
  ru: {
    reports_title: "Отчёты по разговорам за сегодня",
    reports_sub: "Анализ качества в реальном времени с помощью AI",
    today_convs: "Всего разговоров",
    avg_score: "Средний балл",
    active_mics: "Активные микрофоны",
    radar_alerts: "Сигналы радара",
    filter_all: "Все",
    filter_good: "🟢 Отлично (85+)",
    filter_mid: "🟡 Средне (60-84)",
    filter_bad: "🔴 Низко (<60)",
    attendance_title: "Посещаемость и статус микрофонов",
    attendance_sub: "Контроль Heartbeat и голосовой активности (24/7)",
    employees_title: "Список сотрудников",
    employees_sub: "Окна, оклады и показатели KPI",
    analytics_title: "Динамика и аналитические показатели",
    analytics_sub: "Недельные тренды качества и распределение ошибок",
    radar_title: "Живой Радар и оповещения безопасности",
    radar_sub: "Мониторинг в реальном времени и предупреждения",
    camera_title: "Камеры наблюдения (CCTV)",
    camera_sub: "Прямой поток Hikvision ISAPI / RTSP",
    chat_title: "Консультант Intizom AI",
    chat_sub: "Голосовой и текстовый аналитический ассистент",
    settings_title: "Настройки системы",
    settings_sub: "Темы Pinterest, язык и параметры бонусов",
  },
};

function t(key) {
  const lang = currentUser.language || "uz";
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.uz[key] || key;
}

const DEMO_DATA = {
  stats: {
    today_convs: 48,
    avg_score: 88.4,
    active_mics: "4 / 4",
    pending_alerts: 3,
  },
  conversations: [
    {
      id: "c-101",
      employee_name: "Dilnoza Karimova",
      workstation: "1-Darcha",
      time: "10:42",
      score: 94,
      duration: "3 daq 12 son",
      summary: "Mijozga kadastr ma'lumotnomasini olish bo'yicha to'liq va xushmuomala xizmat ko'rsatildi.",
      criteria: { salomlashish: 15, tinglash: 20, malumot: 28, yechim: 18, xayrlashish: 13 },
      errors: [],
      strengths: ["Xushfe'l salomlashdi", "Barcha hujjatlarni bosqichma-bosqich tushuntirdi"],
      audio_url: "https://actions.google.com/sounds/v1/ambiences/office_room.ogg",
    },
    {
      id: "c-102",
      employee_name: "Alisher Rustamov",
      workstation: "2-Darcha",
      time: "10:15",
      score: 72,
      duration: "4 daq 05 son",
      summary: "Xodim ma'lumot berdi, ammo davlat boji miqdorini tushuntirishda biroz noaniqlikka yo'l qo'ydi.",
      criteria: { salomlashish: 12, tinglash: 15, malumot: 20, yechim: 15, xayrlashish: 10 },
      errors: [{ text: "Boj miqdorini aniq bilmadi", fix: "Yangi tariflar jadvaliga qarang" }],
      strengths: ["Sabr bilan tingladi"],
      audio_url: "https://actions.google.com/sounds/v1/ambiences/office_room.ogg",
    },
    {
      id: "c-103",
      employee_name: "Jasur Bekchanov",
      workstation: "3-Darcha",
      time: "09:30",
      score: 48,
      duration: "1 daq 40 son",
      summary: "Xodim asabiy ohangda javob berdi, salomlashmadi va mijoz savolini oxirigacha tinglamadi.",
      criteria: { salomlashish: 5, tinglash: 8, malumot: 15, yechim: 12, xayrlashish: 8 },
      errors: [
        { text: "Salom bermasdan gap boshladi", fix: "Har doim 'Assalomu alaykum' bilan boshlang" },
        { text: "Mijoz gapini bo'ldi", fix: "Mijoz fikrini to'liq ifodalashiga imkon bering" },
      ],
      strengths: [],
      audio_url: "https://actions.google.com/sounds/v1/ambiences/office_room.ogg",
    },
    {
      id: "c-104",
      employee_name: "Nigora Umarova",
      workstation: "4-Darcha",
      time: "09:05",
      score: 96,
      duration: "5 daq 20 son",
      summary: "Mukammal xizmat ko'rsatish: elektron raqamli imzo masalasida barcha savollarga aniq javob berildi.",
      criteria: { salomlashish: 15, tinglash: 20, malumot: 30, yechim: 18, xayrlashish: 13 },
      errors: [],
      strengths: ["A'lo darajadagi odob", "Muammoni tezkor hal qilish"],
      audio_url: "https://actions.google.com/sounds/v1/ambiences/office_room.ogg",
    },
  ],
  attendance: [
    { name: "Dilnoza Karimova", mic: "mic-1", is_online: true, start: "08:50", active_mins: 145, recorded_mins: 82 },
    { name: "Alisher Rustamov", mic: "mic-2", is_online: true, start: "08:55", active_mins: 140, recorded_mins: 76 },
    { name: "Jasur Bekchanov", mic: "mic-3", is_online: true, start: "09:00", active_mins: 135, recorded_mins: 54 },
    { name: "Nigora Umarova", mic: "mic-4", is_online: true, start: "08:45", active_mins: 150, recorded_mins: 90 },
  ],
  employees: [
    { name: "Dilnoza Karimova", pos: "Katta Operator", ws: "1-Darcha", mic: "mic-1", salary: "4,500,000", score: 94, total: 142 },
    { name: "Alisher Rustamov", pos: "Operator", ws: "2-Darcha", mic: "mic-2", salary: "3,800,000", score: 82, total: 118 },
    { name: "Jasur Bekchanov", pos: "Kichik Operator", ws: "3-Darcha", mic: "mic-3", salary: "3,200,000", score: 68, total: 95 },
    { name: "Nigora Umarova", pos: "Yetakchi Mutaxassis", ws: "4-Darcha", mic: "mic-4", salary: "5,000,000", score: 96, total: 160 },
  ],
  alerts: [
    { id: "a-1", type: "critical", title: "Past ball ogohlantirishi", desc: "Jasur Bekchanov (3-darcha) 48 ball oldi.", time: "09:32" },
    { id: "a-2", type: "medium", title: "Kutish vaqti uzayishi", desc: "2-darchada xizmat ko'rsatish 8 daqiqadan oshdi.", time: "10:15" },
    { id: "a-3", type: "info", title: "A'lo sifat ko'rsatkichi", desc: "Nigora Umarova 96 ball bilan xizmat ko'rsatdi.", time: "09:08" },
  ],
};

let currentFilter = "all";

function isPreviewMode() {
  return !tg || !tg.initData;
}

function applyTheme(themeKey) {
  document.documentElement.setAttribute("data-bg-theme", themeKey);
  localStorage.setItem("intizom_bg_theme", themeKey);
  if (tg?.CloudStorage) {
    try { tg.CloudStorage.setItem("dashboard_background_theme", themeKey); } catch (e) {}
  }
}

function initTheme() {
  const saved = localStorage.getItem("intizom_bg_theme") || "theme-emerald";
  applyTheme(saved);
}

function showToast(message, icon = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast glass-card";
  toast.innerHTML = `<span class="material-symbols-outlined">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function openModal(title, bodyHtml) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-body").innerHTML = bodyHtml;
  document.getElementById("modal-overlay").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal-overlay").classList.add("hidden");
}

const setView = (html) => {
  document.getElementById("view").innerHTML = html;
};

// =========================================================================
// 1. HISOBOTLAR BO'LIMI (REPORTS)
// =========================================================================
function viewReports() {
  let convs = DEMO_DATA.conversations;
  if (currentFilter === "good") convs = convs.filter((c) => c.score >= 85);
  else if (currentFilter === "mid") convs = convs.filter((c) => c.score >= 60 && c.score < 85);
  else if (currentFilter === "bad") convs = convs.filter((c) => c.score < 60);

  const avg = DEMO_DATA.stats.avg_score;
  const total = DEMO_DATA.stats.today_convs;

  const html = `
    ${isPreviewMode() ? `<div class="preview-banner glass-card"><span class="preview-badge">BRAUZER PREVIEW</span><span>Tezkor 60 FPS rejim faol. Barcha bo'limlar, hisobotlar va tahlillar ochiq.</span></div>` : ""}

    <div class="view-header">
      <div class="view-title-box">
        <h2>${t("reports_title")}</h2>
        <p>${t("reports_sub")}</p>
      </div>
      <button class="action-btn-pill" onclick="showToast('Hisobotlar PDF eksport qilindi', 'download')">
        <span class="material-symbols-outlined">download</span> Eksport
      </button>
    </div>

    <!-- Asosiy 4 ta statistika kartalari -->
    <div class="stats-grid-4">
      <div class="stat-card-pro glass-card">
        <div class="stat-icon-wrap blue"><span class="material-symbols-outlined">forum</span></div>
        <div class="stat-details">
          <span class="stat-num">${total}</span>
          <span class="stat-sub">${t("today_convs")}</span>
          <span class="stat-trend up">↑ +12% kechagiga nisbatan</span>
        </div>
      </div>
      <div class="stat-card-pro glass-card">
        <div class="stat-icon-wrap green"><span class="material-symbols-outlined">verified</span></div>
        <div class="stat-details">
          <span class="stat-num">${avg}</span>
          <span class="stat-sub">${t("avg_score")}</span>
          <span class="stat-trend up">↑ +4.2 ball</span>
        </div>
      </div>
      <div class="stat-card-pro glass-card">
        <div class="stat-icon-wrap amber"><span class="material-symbols-outlined">mic</span></div>
        <div class="stat-details">
          <span class="stat-num">4 / 4</span>
          <span class="stat-sub">${t("active_mics")}</span>
          <span class="stat-trend">100% qamrov</span>
        </div>
      </div>
      <div class="stat-card-pro glass-card">
        <div class="stat-icon-wrap purple"><span class="material-symbols-outlined">notifications_active</span></div>
        <div class="stat-details">
          <span class="stat-num">${DEMO_DATA.stats.pending_alerts} ta</span>
          <span class="stat-sub">${t("radar_alerts")}</span>
          <span class="stat-trend">Nazorat ostida</span>
        </div>
      </div>
    </div>

    <!-- Kalendar o'rniga / qo'shimcha: Smart Kunlar & Tezkor Sifat Filterlari -->
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
      <!-- Tezkor filtr chipslari -->
      <div style="display:flex; gap:6px; overflow-x:auto;">
        <button class="chat-chip ${currentFilter === "all" ? "active" : ""}" style="${currentFilter === "all" ? "background:var(--primary); color:#fff;" : ""}" onclick="setFilter('all')">${t("filter_all")} (48)</button>
        <button class="chat-chip ${currentFilter === "good" ? "active" : ""}" style="${currentFilter === "good" ? "background:var(--score-good); color:#fff;" : ""}" onclick="setFilter('good')">${t("filter_good")}</button>
        <button class="chat-chip ${currentFilter === "mid" ? "active" : ""}" style="${currentFilter === "mid" ? "background:var(--score-mid); color:#fff;" : ""}" onclick="setFilter('mid')">${t("filter_mid")}</button>
        <button class="chat-chip ${currentFilter === "bad" ? "active" : ""}" style="${currentFilter === "bad" ? "background:var(--score-bad); color:#fff;" : ""}" onclick="setFilter('bad')">${t("filter_bad")}</button>
      </div>

      <!-- Kunlik taqqoslash va Sana tanlash -->
      <div style="display:flex; align-items:center; gap:6px;">
        <button class="action-btn-pill" onclick="showToast('Bugungi sana: 15-Avgust 2026', 'calendar_month')">
          <span class="material-symbols-outlined">calendar_today</span> 15-Avgust (Bugun)
        </button>
      </div>
    </div>

    <h3 style="margin-bottom:12px; font-size:16px;">Tahlil Qilingan Suhbatlar Ro'yxati</h3>
    <ul class="item-list">
      ${convs.map((c) => {
        const scoreClass = c.score >= 85 ? "good" : c.score >= 60 ? "mid" : "bad";
        return `
          <li class="item-card glass-card" onclick="openConversationDetails('${c.id}')">
            <div class="score-circle ${scoreClass}">${c.score}</div>
            <div class="item-info">
              <div class="item-title">
                <span>${c.employee_name}</span>
                <span class="item-badge-pill">${c.workstation}</span>
              </div>
              <div class="item-subtitle">${c.time} · ${c.duration} · ${c.summary}</div>
            </div>
            <div class="item-actions">
              <button class="icon-btn" title="Audioni eshitish" onclick="event.stopPropagation(); playAudioMock('${c.id}')">
                <span class="material-symbols-outlined">play_circle</span>
              </button>
            </div>
          </li>
        `;
      }).join("")}
    </ul>
  `;
  setView(html);
}

function setFilter(f) {
  currentFilter = f;
  viewReports();
}

function openConversationDetails(convId) {
  const c = DEMO_DATA.conversations.find((x) => x.id === convId);
  if (!c) return;

  const bodyHtml = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
      <div>
        <h4 style="font-size:17px; font-weight:800;">${c.employee_name} (${c.workstation})</h4>
        <p style="color:var(--text-muted); font-size:12px;">${c.time} · ${c.duration}</p>
      </div>
      <div class="score-circle ${c.score >= 85 ? "good" : c.score >= 60 ? "mid" : "bad"}" style="width:50px; height:50px; font-size:17px;">
        ${c.score}
      </div>
    </div>

    <div style="margin-bottom:14px;">
      <h5 style="font-size:12px; color:var(--text-dim); text-transform:uppercase; margin-bottom:4px;">Qisqa Xulosa:</h5>
      <p style="font-size:13px; background:rgba(0,0,0,0.25); padding:10px 12px; border-radius:8px;">${c.summary}</p>
    </div>

    <h5 style="font-size:12px; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px;">Mezonlar bo'yicha ballar:</h5>
    <div class="criteria-progress-list" style="margin-bottom:16px;">
      <div class="crit-item"><div class="crit-header"><span>Salomlashish va odob</span><span>${c.criteria.salomlashish}/15</span></div><div class="crit-bar-bg"><div class="crit-bar-fill good" style="width:${(c.criteria.salomlashish/15)*100}%"></div></div></div>
      <div class="crit-item"><div class="crit-header"><span>Tinglash va tushunish</span><span>${c.criteria.tinglash}/20</span></div><div class="crit-bar-bg"><div class="crit-bar-fill good" style="width:${(c.criteria.tinglash/20)*100}%"></div></div></div>
      <div class="crit-item"><div class="crit-header"><span>Ma'lumot to'g'riligi</span><span>${c.criteria.malumot}/30</span></div><div class="crit-bar-bg"><div class="crit-bar-fill ${c.criteria.malumot < 20 ? "bad" : "good"}" style="width:${(c.criteria.malumot/30)*100}%"></div></div></div>
      <div class="crit-item"><div class="crit-header"><span>Muammo hal qilish</span><span>${c.criteria.yechim}/20</span></div><div class="crit-bar-bg"><div class="crit-bar-fill good" style="width:${(c.criteria.yechim/20)*100}%"></div></div></div>
      <div class="crit-item"><div class="crit-header"><span>Xayrlashish</span><span>${c.criteria.xayrlashish}/15</span></div><div class="crit-bar-bg"><div class="crit-bar-fill good" style="width:${(c.criteria.xayrlashish/15)*100}%"></div></div></div>
    </div>

    ${c.errors.length ? `
      <h5 style="font-size:12px; color:var(--score-bad); text-transform:uppercase; margin-bottom:4px;">Aniqlangan xatolar:</h5>
      <ul style="list-style:none; margin-bottom:14px;">
        ${c.errors.map((e) => `<li style="background:rgba(239,68,68,0.12); padding:8px 10px; border-radius:6px; font-size:12px; margin-bottom:6px;"><b>Xato:</b> ${e.text}<br><span style="color:var(--score-good);"><b>Tavsiya:</b> ${e.fix}</span></li>`).join("")}
      </ul>
    ` : ""}

    <div class="audio-player-custom" style="margin-top:10px;">
      <audio controls autoplay src="${c.audio_url}" style="width:100%; height:36px;"></audio>
    </div>
  `;
  openModal("Suhbat Tahlili Tafsilotlari", bodyHtml);
}

function playAudioMock(convId) {
  openConversationDetails(convId);
}

// =========================================================================
// 2. DAVOMAT BO'LIMI (ATTENDANCE — Aynan Brauzer Standarti)
// =========================================================================
function viewAttendance() {
  const rows = DEMO_DATA.attendance;
  const html = `
    <div class="view-header">
      <div class="view-title-box">
        <h2>${t("attendance_title")}</h2>
        <p>${t("attendance_sub")}</p>
      </div>
      <button class="action-btn-pill" onclick="showToast('Mikrofonlar holati yangilandi', 'refresh')">
        <span class="material-symbols-outlined">refresh</span> Yangilash
      </button>
    </div>

    <ul class="item-list">
      ${rows.map((r) => `
        <li class="item-card glass-card">
          <div class="stat-icon-wrap ${r.is_online ? "green" : "amber"}">
            <span class="material-symbols-outlined">${r.is_online ? "mic" : "mic_off"}</span>
          </div>
          <div class="item-info">
            <div class="item-title">
              <span>${r.name}</span>
              <span class="item-badge-pill">${r.mic}</span>
              <span class="status-tag ${r.is_online ? "approved" : "rejected"}">${r.is_online ? "Faol (Onlayn)" : "O'chiq"}</span>
            </div>
            <div class="item-subtitle">
              Smena: ${r.start} · <b>Bugun faol:</b> ${Math.floor(r.active_mins/60)}s ${r.active_mins%60}d · <b>Nutq yozuvi:</b> ${r.recorded_mins} daq
            </div>
          </div>
          <button class="action-btn-pill" onclick="showToast('${r.name} mikrofon holati tekshirildi', 'graphic_eq')">
            <span class="material-symbols-outlined">graphic_eq</span>
          </button>
        </li>
      `).join("")}
    </ul>
  `;
  setView(html);
}

// =========================================================================
// 3. XODIMLAR BO'LIMI (EMPLOYEES)
// =========================================================================
function viewEmployees() {
  const emps = DEMO_DATA.employees;
  const html = `
    <div class="view-header">
      <div class="view-title-box">
        <h2>${t("employees_title")}</h2>
        <p>${t("employees_sub")}</p>
      </div>
      <button class="action-btn-pill" onclick="showToast('Yangi xodim qo\'shish oynasi', 'person_add')">
        <span class="material-symbols-outlined">person_add</span> Xodim Qo'shish
      </button>
    </div>

    <ul class="item-list">
      ${emps.map((e) => `
        <li class="item-card glass-card">
          <div class="score-circle ${e.score >= 85 ? "good" : e.score >= 60 ? "mid" : "bad"}">${e.score}</div>
          <div class="item-info">
            <div class="item-title">
              <span>${e.name}</span>
              <span class="item-badge-pill">${e.pos}</span>
            </div>
            <div class="item-subtitle">
              ${e.ws} (${e.mic}) · Oklad: ${e.salary} so'm · Jami suhbatlar: ${e.total} ta
            </div>
          </div>
          <button class="action-btn-pill" onclick="showToast('${e.name} shaxsiy hisoboti ochildi', 'receipt_long')">
            Hisobot
          </button>
        </li>
      `).join("")}
    </ul>
  `;
  setView(html);
}

// =========================================================================
// 4. DINAMIKA & TAHLIL (ANALYTICS)
// =========================================================================
function viewAnalytics() {
  const html = `
    <div class="view-header">
      <div class="view-title-box">
        <h2>${t("analytics_title")}</h2>
        <p>${t("analytics_sub")}</p>
      </div>
    </div>

    <div class="analytics-grid-2">
      <div class="chart-card glass-card">
        <div class="chart-card-title">
          <span>7 Kunlik Sifat Grafigi (O'rtacha Ball)</span>
          <span class="material-symbols-outlined">show_chart</span>
        </div>
        <div class="bar-chart-container">
          <div class="bar-col"><div class="bar-val">82</div><div class="bar-fill" style="height:82%;"></div><div class="bar-label">Dush</div></div>
          <div class="bar-col"><div class="bar-val">85</div><div class="bar-fill" style="height:85%;"></div><div class="bar-label">Sesh</div></div>
          <div class="bar-col"><div class="bar-val">79</div><div class="bar-fill" style="height:79%;"></div><div class="bar-label">Chor</div></div>
          <div class="bar-col"><div class="bar-val">88</div><div class="bar-fill" style="height:88%;"></div><div class="bar-label">Pay</div></div>
          <div class="bar-col"><div class="bar-val">91</div><div class="bar-fill" style="height:91%;"></div><div class="bar-label">Juma</div></div>
          <div class="bar-col"><div class="bar-val">94</div><div class="bar-fill" style="height:94%;"></div><div class="bar-label">Shan</div></div>
          <div class="bar-col"><div class="bar-val">88</div><div class="bar-fill" style="height:88%; background:var(--accent);"></div><div class="bar-label">Bugun</div></div>
        </div>
      </div>

      <div class="chart-card glass-card">
        <div class="chart-card-title">
          <span>Mezonlar Bo'yicha O'rtacha Natija</span>
          <span class="material-symbols-outlined">pie_chart</span>
        </div>
        <div class="criteria-progress-list">
          <div class="crit-item">
            <div class="crit-header"><span>Salomlashish va odob</span><span>92%</span></div>
            <div class="crit-bar-bg"><div class="crit-bar-fill good" style="width:92%"></div></div>
          </div>
          <div class="crit-item">
            <div class="crit-header"><span>Mijozni tinglash</span><span>88%</span></div>
            <div class="crit-bar-bg"><div class="crit-bar-fill good" style="width:88%"></div></div>
          </div>
          <div class="crit-item">
            <div class="crit-header"><span>Ma'lumot to'g'riligi</span><span>84%</span></div>
            <div class="crit-bar-bg"><div class="crit-bar-fill mid" style="width:84%"></div></div>
          </div>
          <div class="crit-item">
            <div class="crit-header"><span>Muammo hal qilish</span><span>89%</span></div>
            <div class="crit-bar-bg"><div class="crit-bar-fill good" style="width:89%"></div></div>
          </div>
          <div class="crit-item">
            <div class="crit-header"><span>Xayrlashish odobi</span><span>86%</span></div>
            <div class="crit-bar-bg"><div class="crit-bar-fill good" style="width:86%"></div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-card glass-card">
      <div class="chart-card-title">
        <span>Eng Ko'p Uchraydigan Xatolar (Top-3)</span>
        <span class="material-symbols-outlined">warning</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:rgba(239,68,68,0.1); border-radius:8px;">
          <span>1. Davlat boji to'lovi muddatlarini noto'g'ri aytish</span>
          <span style="font-weight:800; color:var(--score-bad);">14 marta</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:rgba(245,158,11,0.1); border-radius:8px;">
          <span>2. Xayrlashishda xushmuomala yakun qilmaslik</span>
          <span style="font-weight:800; color:var(--score-mid);">9 marta</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; background:rgba(56,189,248,0.1); border-radius:8px;">
          <span>3. Mijoz gapini shoshirib bo'lish</span>
          <span style="font-weight:800; color:var(--primary);">6 marta</span>
        </div>
      </div>
    </div>
  `;
  setView(html);
}

// =========================================================================
// 5. JONLI RADAR & ALERTS
// =========================================================================
function viewLiveRadar() {
  const alerts = DEMO_DATA.alerts;
  const html = `
    <div class="view-header">
      <div class="view-title-box">
        <h2>${t("radar_title")}</h2>
        <p>${t("radar_sub")}</p>
      </div>
    </div>

    <div class="radar-pulse-box glass-card">
      <div>
        <h4 style="font-size:15px; font-weight:800;">Jonli Sifat Radari Faol</h4>
        <p style="font-size:12px; color:var(--text-muted);">Barcha 4 ta darcha mikrofonlari real vaqtda tahlil qilinmoqda.</p>
      </div>
    </div>

    <h3 style="margin-bottom:12px; font-size:16px;">So'nggi Signallar Oqimi</h3>
    <div class="alert-feed-list">
      ${alerts.map((a) => `
        <div class="alert-feed-item glass-card ${a.type === "critical" ? "critical" : ""}">
          <span class="material-symbols-outlined" style="color:${a.type === "critical" ? "#ef4444" : "#f59e0b"}; font-size:24px;">
            ${a.type === "critical" ? "error" : "notifications"}
          </span>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between;">
              <span style="font-weight:700; font-size:13px;">${a.title}</span>
              <span style="font-size:11px; color:var(--text-muted);">${a.time}</span>
            </div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">${a.desc}</div>
          </div>
          <button class="action-btn-pill" onclick="showToast('Ogohlantirish ko\\'rildi', 'done')">
            Ko'rildi
          </button>
        </div>
      `).join("")}
    </div>
  `;
  setView(html);
}

// =========================================================================
// 6. KAMERA BO'LIMI (CAMERA LIVE STREAM)
// =========================================================================
function viewCamera() {
  const html = `
    <div class="view-header">
      <div class="view-title-box">
        <h2>${t("camera_title")}</h2>
        <p>${t("camera_sub")}</p>
      </div>
      <button class="action-btn-pill" onclick="showToast('Kameralar oqimi yangilandi', 'videocam')">
        <span class="material-symbols-outlined">sync</span> Oqimni Yangilash
      </button>
    </div>

    <div class="camera-grid-2">
      <div class="camera-feed-card">
        <div class="camera-overlay-tag"><span class="pulse-dot"></span> 1-Darcha (Dilnoza)</div>
        <img class="camera-video-mock" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" alt="Camera 1" />
        <div class="camera-timestamp">2026-08-15 10:48:22 CAM-01</div>
      </div>
      <div class="camera-feed-card">
        <div class="camera-overlay-tag"><span class="pulse-dot"></span> 2-Darcha (Alisher)</div>
        <img class="camera-video-mock" src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80" alt="Camera 2" />
        <div class="camera-timestamp">2026-08-15 10:48:22 CAM-02</div>
      </div>
      <div class="camera-feed-card">
        <div class="camera-overlay-tag"><span class="pulse-dot"></span> 3-Darcha (Jasur)</div>
        <img class="camera-video-mock" src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80" alt="Camera 3" />
        <div class="camera-timestamp">2026-08-15 10:48:22 CAM-03</div>
      </div>
      <div class="camera-feed-card">
        <div class="camera-overlay-tag"><span class="pulse-dot"></span> Umumiy Kutish Zali</div>
        <img class="camera-video-mock" src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80" alt="Camera 4" />
        <div class="camera-timestamp">2026-08-15 10:48:22 CAM-HALL</div>
      </div>
    </div>
  `;
  setView(html);
}

// =========================================================================
// 7. INTIZOM AI CHAT — Futuristic Glow Aura, Top Capsule & 4 FAQ Cards
// =========================================================================
let currentAiMode = "deepthink"; // 'quick', 'balanced', 'deepthink', 'research'
let currentAiTone = "normal";   // 'normal', 'formal', 'concise'
let isAiThinking = false;

let chatMessages = [
  { 
    role: "assistant", 
    mode: "deepthink",
    reasoning: "Kontekst tahlil qilindi: 4 ta darcha audio yozuvlari, 5 ta sifat mezoni va davomat ma'lumotlari yuklandi.",
    text: "Assalomu alaykum! Men Intizom AI yordamchisiman. DeepThink rejimida xodimlaringiz muloqoti, bugungi xatolar va sifat tahlilini chuqur tekshirib beraman. Yuqoridagi maydondan savolingizni bering yoki pastdagi tezkor savollarni tanlang!" 
  },
];

function viewAiChat() {
  const modeLabels = {
    quick: { label: "Tezkor", icon: "bolt", color: "#fbbf24" },
    balanced: { label: "Balansli", icon: "balance", color: "#38bdf8" },
    deepthink: { label: "DeepThink", icon: "psychology", color: "#c084fc" },
    research: { label: "Tadqiqot", icon: "science", color: "#10b981" }
  };
  const activeMode = modeLabels[currentAiMode] || modeLabels.deepthink;

  const html = `
    <div class="view-header" style="margin-bottom:10px;">
      <div class="view-title-box">
        <h2>${t("chat_title")}</h2>
        <p>${t("chat_sub")}</p>
      </div>
      <div class="live-pill">
        <span class="pulse-dot"></span>
        <span style="font-weight:700; color:var(--primary); font-size:12px;">DeepThink 2.5 Faol</span>
      </div>
    </div>

    <!-- AI Stage (fon 2.jpg bilan 100% mos) -->
    <div class="ai-stage-container">
      
      <!-- 1. YUQORIDAGI MATN KIRITISH KAPSULASI (TOP PROMPT CAPSULE + AMBIENT AURA) -->
      <div class="ai-capsule-outer-wrap">
        <!-- Chap to'q sariq va o'ng moviy nurlar (fon 2.jpg dagi aura) -->
        <div class="capsule-ambient-glow left-orange"></div>
        <div class="capsule-ambient-glow right-blue"></div>

        <!-- Fon orqasidagi matrix kodlar (fon 2.jpg dagi matn) -->
        <div class="capsule-matrix-text left-matrix" aria-hidden="true">
          <div>L X H D Q V • + # X & • H</div>
          <div>T U • D C • N + Z • C - N</div>
          <div>N C T • + U N • D O Z</div>
        </div>
        <div class="capsule-matrix-text right-matrix" aria-hidden="true">
          <div>H 1 + S • Q • U N O T E</div>
          <div>L X H D Q V • + # X &</div>
          <div>T U • D C • N + Z</div>
        </div>

        <div class="ai-prompt-capsule ${isAiThinking ? 'is-thinking' : ''}" id="ai-capsule">
          <div class="ai-input-row">
            <textarea 
              id="chat-input" 
              class="ai-textarea" 
              placeholder="Savolingizni yozing... / Ask anything..." 
              rows="1"
              onkeydown="handleChatKeyDown(event)"
            ></textarea>
          </div>

          <div class="ai-capsule-bottom-bar">
            <div class="ai-left-controls">
              <button class="ai-pill-btn icon-only" title="Audio yoki Fayl yuklash" onclick="showToast('Audio/Hujjat biriktirish oynasi', 'attach_file')">
                <span class="material-symbols-outlined" style="font-size:17px;">add</span>
              </button>
              
              <button class="ai-pill-btn" id="ai-tone-btn" onclick="toggleToneMenu()">
                <span class="material-symbols-outlined" style="font-size:15px;">draw</span>
                <span id="ai-tone-text">${currentAiTone === "formal" ? "Rasmiy" : currentAiTone === "concise" ? "Qisqa" : "Oddiy"}</span>
                <span class="material-symbols-outlined" style="font-size:13px;">expand_more</span>
              </button>

              <button class="ai-pill-btn active-mode" id="ai-mode-btn" onclick="toggleModePopover(event)">
                <span class="material-symbols-outlined" style="font-size:15px; color:${activeMode.color};">${activeMode.icon}</span>
                <span>${activeMode.label}</span>
                <span class="material-symbols-outlined" style="font-size:13px;">expand_less</span>
              </button>
            </div>

            <div class="ai-right-controls">
              <button class="ai-pill-btn" onclick="toggleVoiceInput()">
                <span class="material-symbols-outlined" style="font-size:15px; color:#38bdf8;">graphic_eq</span>
                <span>Voice</span>
              </button>

              <button class="ai-send-gradient-btn" id="ai-send-btn" onclick="submitChatMessage()" title="Yuborish">
                <span class="material-symbols-outlined" style="font-size:18px;">north_east</span>
              </button>
            </div>
          </div>

          <!-- DeepThink Dropdown Popover matching fon 2.jpg -->
          <div id="ai-mode-popover" class="ai-mode-popover hidden">
            <div class="ai-mode-option ${currentAiMode === 'quick' ? 'active' : ''}" onclick="selectAiMode('quick')">
              <span class="material-symbols-outlined" style="color:#fbbf24;">bolt</span>
              <div>
                <div class="m-title">Quick answer</div>
                <div class="m-sub">1-2 jumlada qisqa tezkor javob</div>
              </div>
            </div>
            <div class="ai-mode-option ${currentAiMode === 'balanced' ? 'active' : ''}" onclick="selectAiMode('balanced')">
              <span class="material-symbols-outlined" style="color:#38bdf8;">balance</span>
              <div>
                <div class="m-title">Balanced</div>
                <div class="m-sub">Standart tahlil va mezonlar</div>
              </div>
            </div>
            <div class="ai-mode-option ${currentAiMode === 'deepthink' ? 'active' : ''}" onclick="selectAiMode('deepthink')">
              <span class="material-symbols-outlined" style="color:#c084fc;">psychology</span>
              <div>
                <div class="m-title">DeepThink</div>
                <div class="m-sub">Mantiqiy zanjirli chuqur tahlil</div>
              </div>
            </div>
            <div class="ai-mode-option ${currentAiMode === 'research' ? 'active' : ''}" onclick="selectAiMode('research')">
              <span class="material-symbols-outlined" style="color:#10b981;">science</span>
              <div>
                <div class="m-title">Research</div>
                <div class="m-sub">Qonunchilik va xizmat reglamenti</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. O'RTA QISM: XABARLAR MAYDONI (MESSAGES STREAM) -->
      <div class="chat-messages-area" id="chat-box">
        ${chatMessages.map((m) => `
          <div class="chat-bubble ${m.role}">
            ${m.reasoning ? `
              <div class="deepthink-reasoning-box">
                <div class="deepthink-reasoning-header">
                  <span class="material-symbols-outlined" style="font-size:16px;">psychology</span>
                  <span>DeepThink Reasoning Jarayoni</span>
                </div>
                <div style="white-space:pre-line;">${m.reasoning}</div>
              </div>
            ` : ""}
            <div>${m.text}</div>
          </div>
        `).join("")}
        ${isAiThinking ? `
          <div class="chat-bubble assistant" style="display:flex; align-items:center; gap:8px; opacity:0.85;">
            <span class="material-symbols-outlined" style="font-size:18px; color:#c084fc; animation:spin 1.5s linear infinite;">psychology</span>
            <span>Intizom AI tahlil qilmoqda (DeepThink)...</span>
          </div>
        ` : ""}
      </div>

      <!-- 3. PASTKI QISM: 4 TA KO'P BERILADIGAN SAVOLLAR (FAQ SECTION) -->
      <div class="ai-faq-bottom-section">
        <div class="ai-faq-header">
          <span class="material-symbols-outlined" style="font-size:15px; color:var(--primary);">quiz</span>
          <span>Ko'p Beriladigan Savollar & Tahlillar</span>
        </div>
        <div class="ai-faq-grid">
          <div class="ai-faq-card" onclick="sendQuickPrompt('Bugun kim eng ko\\'p xato qildi?')">
            <div class="ai-faq-icon amber">
              <span class="material-symbols-outlined">warning</span>
            </div>
            <div class="ai-faq-text-wrap">
              <div class="ai-faq-title">1. Bugungi Eng Ko'p Xatolar</div>
              <div class="ai-faq-sub">Past ball olgan xodimlar va kamchiliklar</div>
            </div>
          </div>

          <div class="ai-faq-card" onclick="sendQuickPrompt('Eng xushmuomala xodim kim?')">
            <div class="ai-faq-icon green">
              <span class="material-symbols-outlined">emoji_events</span>
            </div>
            <div class="ai-faq-text-wrap">
              <div class="ai-faq-title">2. Eng Xushmuomala Xodim</div>
              <div class="ai-faq-sub">Eng yuqori 90+ ball to'plagan operator</div>
            </div>
          </div>

          <div class="ai-faq-card" onclick="sendQuickPrompt('Oylik bonus hisobotini chiqar')">
            <div class="ai-faq-icon blue">
              <span class="material-symbols-outlined">payments</span>
            </div>
            <div class="ai-faq-text-wrap">
              <div class="ai-faq-title">3. Oylik Bonuslar Taqsimoti</div>
              <div class="ai-faq-sub">Sifat formulasi bo'yicha hisoblangan summa</div>
            </div>
          </div>

          <div class="ai-faq-card" onclick="sendQuickPrompt('3-darcha bo\\'yicha tavsiya ber')">
            <div class="ai-faq-icon purple">
              <span class="material-symbols-outlined">lightbulb</span>
            </div>
            <div class="ai-faq-text-wrap">
              <div class="ai-faq-title">4. 3-Darcha Amaliy Tavsiya</div>
              <div class="ai-faq-sub">Muloqotni yaxshilash bo'yicha yechim</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  setView(html);

  // Avtomatik pastga tushirish
  setTimeout(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, 50);
}

function handleChatKeyDown(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    submitChatMessage();
  }
}

function toggleModePopover(e) {
  if (e) e.stopPropagation();
  const popover = document.getElementById("ai-mode-popover");
  if (popover) popover.classList.toggle("hidden");
}

function selectAiMode(mode) {
  currentAiMode = mode;
  const popover = document.getElementById("ai-mode-popover");
  if (popover) popover.classList.add("hidden");
  showToast(`Rejim almashtirildi: ${mode.toUpperCase()}`, "psychology");
  viewAiChat();
}

function toggleToneMenu() {
  const tones = ["normal", "formal", "concise"];
  const next = tones[(tones.indexOf(currentAiTone) + 1) % tones.length];
  currentAiTone = next;
  showToast(`Uslub: ${next === "formal" ? "Rasmiy" : next === "concise" ? "Qisqa" : "Oddiy"}`, "draw");
  viewAiChat();
}

function toggleVoiceInput() {
  showToast("🎙 Ovoz yozish faollashtirildi (Gapiring...)", "graphic_eq");
}

function submitChatMessage() {
  const input = document.getElementById("chat-input");
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  sendUserMessage(text);
  input.value = "";
}

function sendQuickPrompt(prompt) {
  sendUserMessage(prompt);
}

function sendUserMessage(text) {
  chatMessages.push({ role: "user", text });
  isAiThinking = true;
  viewAiChat();

  // O'ylash paytida ramkani RGB aylanuvchi rejimga o'tkazish
  setTimeout(() => {
    let reply = "Xodimlaringiz tahlili bo'yicha ma'lumot tayyorlandi.";
    let reasoning = null;

    if (currentAiMode === "deepthink") {
      reasoning = `1. Audio arxiv tekshirildi: «${text}» bo'yicha so'rov identifikatsiya qilindi.\n2. Mezonlar taqqoslandi: Odob-axloq (4.2-band), Davlat xizmati reglamenti va audio spektr tahlil qilindi.\n3. Xulosa shakllantirildi: Konkret darcha xodimi va sabablari ko'rsatildi.`;
    }

    if (text.includes("xato")) {
      reply = "Bugun eng ko'p xatoga 3-darcha xodimi Jasur Bekchanov yo'l qo'ydi (48 ball). Asosiy sabab: salomlashmadi va mijoz gapini bo'ldi.";
    } else if (text.includes("yaxshi") || text.includes("xushmuomala")) {
      reply = "Bugungi eng xushmuomala xodim — 4-darcha operatori Nigora Umarova (96 ball). Barcha 5 ta mezon bo'yicha a'lo baholandi.";
    } else if (text.includes("bonus")) {
      reply = "Joriy oy uchun bonus hisobi: Nigora Umarova (500,000 so'm, 100%), Dilnoza Karimova (420,000 so'm, 93%).";
    } else if (text.includes("3-darcha") || text.includes("tavsiya")) {
      reply = "3-darcha (Jasur Bekchanov) uchun tavsiya: Mijoz so'zini oxirigacha eshitish (kamida 3 soniya pauza) va xizmat yakunida minnatdorlik bildirish bo'yicha qisqa trening o'tkazish tavsiya etiladi.";
    } else {
      reply = `«${text}» bo'yicha suhbatlar bazasidan ma'lumot olindi. Xodimlar intizomi umumiy 88.4% darajasida barqaror.`;
    }

    isAiThinking = false;
    chatMessages.push({ role: "assistant", reasoning, text: reply });
    viewAiChat();
  }, 1200);
}

// =========================================================================
// 8. SOZLAMALAR BO'LIMI (SETTINGS — Pinterest Fonlari & Til Qulay Joylashuvi)
// =========================================================================
function viewSettings() {
  const activeTheme = document.documentElement.getAttribute("data-bg-theme") || "theme-emerald";
  const curLang = currentUser.language || "uz";

  const html = `
    <div class="view-header">
      <div class="view-title-box">
        <h2>${t("settings_title")}</h2>
        <p>${t("settings_sub")}</p>
      </div>
    </div>

    <div class="settings-section">
      <!-- 1. Pinterest Fon Mavzulari (Birinchi va eng qulay o'rinda) -->
      <div class="glass-card" style="padding:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <h3 style="font-size:15px; font-weight:700; display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-outlined" style="color:var(--primary);">palette</span>
            🎨 Pinterest Estetik Fonlari
          </h3>
          <span class="item-badge-pill">8 xil mavzu</span>
        </div>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">Tanlangan fonga mos holda harakatdagi "INTIZOM" yozuvlari avtomatik moslashadi:</p>

        <div class="theme-swatch-grid">
          ${PINTEREST_THEMES.map((tItem) => `
            <div class="theme-swatch-card glass-card ${activeTheme === tItem.key ? "active" : ""}" onclick="selectTheme('${tItem.key}')">
              <div class="swatch-circle" style="background:${tItem.color};"></div>
              <span>${curLang === "ru" ? tItem.label_ru : tItem.label_uz}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- 2. Til Sozlamalari (i18n) -->
      <div class="glass-card" style="padding:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h3 style="font-size:15px; font-weight:700; display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-outlined" style="color:#38bdf8;">translate</span>
            🌐 Interfeys Tili
          </h3>
        </div>
        <div style="display:flex; gap:10px; margin-top:8px;">
          <button class="chat-chip" style="flex:1; padding:10px; font-weight:700; ${curLang === "uz" ? "background:var(--primary); color:#fff;" : ""}" onclick="changeLanguage('uz')">
            🇺🇿 O'zbekcha
          </button>
          <button class="chat-chip" style="flex:1; padding:10px; font-weight:700; ${curLang === "ru" ? "background:var(--primary); color:#fff;" : ""}" onclick="changeLanguage('ru')">
            🇷🇺 Русский
          </button>
        </div>
      </div>

      <!-- 3. Bonus va KPI Mezonlari -->
      <div class="glass-card" style="padding:18px;">
        <h3 style="font-size:15px; font-weight:700; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          <span class="material-symbols-outlined" style="color:#fbbf24;">monetization_on</span>
          💰 Bonus va KPI Mezonlari
        </h3>
        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--card-border); font-size:13px;">
          <span>Maksimal bonus foizi:</span>
          <b>10% (Okladga nisbatan)</b>
        </div>
        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--card-border); font-size:13px;">
          <span>Oylik suhbat normasi:</span>
          <b>120 ta suhbat</b>
        </div>
        <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px;">
          <span>Lokal PII Maskalash (O'RQ-547):</span>
          <b style="color:var(--score-good);">● Faol (Himoyalangan)</b>
        </div>
      </div>
    </div>
  `;
  setView(html);
}

function selectTheme(themeKey) {
  applyTheme(themeKey);
  viewSettings();
  showToast(`"${PINTEREST_THEMES.find(x => x.key === themeKey)?.label_uz}" foni o'rnatildi`, "palette");
}

function changeLanguage(lang) {
  currentUser.language = lang;
  renderSidebar();
  viewSettings();
  showToast(lang === "uz" ? "Til o'zbek tiliga o'zgartirildi" : "Язык изменён на русский", "translate");
}

// =========================================================================
// ROUTING
// =========================================================================

const VIEWS = {
  reports: viewReports,
  attendance: viewAttendance,
  employees: viewEmployees,
  ai_chat: viewAiChat,
  camera: viewCamera,
  settings: viewSettings,
  analytics: viewAnalytics,
  live_radar: viewLiveRadar,
};

function navigateTo(key) {
  if (!VIEWS[key]) key = "reports";
  location.hash = key;
  document.querySelectorAll(".sidebar-nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.key === key);
  });
  VIEWS[key]();
}

function renderSidebar() {
  const coreNav = document.getElementById("sidebar-nav-core");
  const advNav = document.getElementById("sidebar-nav-advanced");
  const curLang = currentUser.language || "uz";

  coreNav.innerHTML = CORE_NAV_ITEMS.map((item) => `
    <button data-key="${item.key}" class="sidebar-nav-btn" onclick="handleNavClick('${item.key}')">
      <span class="material-symbols-outlined">${item.icon}</span>
      <span>${curLang === "ru" ? item.label_ru : item.label_uz}</span>
    </button>
  `).join("");

  advNav.innerHTML = ADVANCED_NAV_ITEMS.map((item) => `
    <button data-key="${item.key}" class="sidebar-nav-btn" onclick="handleNavClick('${item.key}')">
      <span class="material-symbols-outlined">${item.icon}</span>
      <span>${curLang === "ru" ? item.label_ru : item.label_uz}</span>
    </button>
  `).join("");
}

function handleNavClick(key) {
  navigateTo(key);
  closeSidebar();
}

function openSidebar() {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("sidebar-overlay").classList.remove("hidden");
  setTimeout(() => document.getElementById("sidebar-overlay").classList.add("visible"), 10);
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebar-overlay").classList.remove("visible");
  setTimeout(() => document.getElementById("sidebar-overlay").classList.add("hidden"), 200);
}

function init() {
  initTheme();
  renderSidebar();

  document.getElementById("menu-btn").addEventListener("click", openSidebar);
  document.getElementById("sidebar-close").addEventListener("click", closeSidebar);
  document.getElementById("sidebar-overlay").addEventListener("click", closeSidebar);

  document.getElementById("modal-close-btn").addEventListener("click", closeModal);
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") closeModal();
  });

  document.getElementById("profile-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("profile-dropdown").classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    const dd = document.getElementById("profile-dropdown");
    if (!dd.contains(e.target) && e.target.id !== "profile-btn") {
      dd.classList.add("hidden");
    }
  });

  document.getElementById("theme-quick-btn").addEventListener("click", () => {
    navigateTo("settings");
  });

  document.getElementById("radar-quick-btn").addEventListener("click", () => {
    navigateTo("live_radar");
  });

  document.getElementById("dropdown-settings-btn").addEventListener("click", () => {
    document.getElementById("profile-dropdown").classList.add("hidden");
    navigateTo("settings");
  });

  document.getElementById("sidebar-whoami").textContent = `${currentUser.full_name} (Boshqaruvchi)`;
  document.getElementById("dropdown-name").textContent = currentUser.full_name;
  document.getElementById("dropdown-role").textContent = "Boshqaruvchi";
  document.getElementById("avatar-letter").textContent = currentUser.full_name.charAt(0);
  document.getElementById("dropdown-avatar-circle").textContent = currentUser.full_name.charAt(0);

  const initialKey = location.hash.replace("#", "") || "reports";
  navigateTo(initialKey);

  window.addEventListener("hashchange", () => {
    const key = location.hash.replace("#", "");
    if (VIEWS[key]) navigateTo(key);
  });
}

document.addEventListener("DOMContentLoaded", init);
