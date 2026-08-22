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

// Pinterest & 3D Fon Mavzulari (files (10).zip bilan boyitildi)
const PINTEREST_THEMES = [
  { key: "theme-emerald", label_uz: "Zangori Zumrad", label_ru: "Изумрудный Лес", color: "#10b981" },
  { key: "theme-neon", label_uz: "Neon Cyber", label_ru: "Неоновый Кибер", color: "#ff2fd0" },
  { key: "theme-mesh", label_uz: "Mesh Gradient", label_ru: "Мэш Градиент", color: "#3a8bfd" },
  { key: "theme-glass", label_uz: "Billur Glass", label_ru: "Хрустальное Стекло", color: "#38bdf8" },
  { key: "theme-3d", label_uz: "3D Tilt Cyber", label_ru: "3D Перспектива", color: "#4facfe" },
  { key: "theme-aurora", label_uz: "Aurora Shaftoli", label_ru: "Северное Сияние", color: "#7b2fff" },
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
// 5. NIZOLI VAZIYATLAR SIGNALIZATSIYASI (REAL-TIME ESCALATION SHIELD)
// =========================================================================
let currentEscFilter = "all";

function setEscFilter(f) {
  currentEscFilter = f;
  viewLiveRadar();
}

function resolveEscalation(id) {
  const esc = (DEMO_DATA.escalations || []).find((e) => e.id === id);
  if (esc) {
    esc.status = "resolved";
    esc.resolved_by = "Rahbariyat";
    esc.resolved_time = new Date().toLocaleTimeString().slice(0, 5);
    showToast("✅ Nizoli vaziyat hal qilingan deb belgilandi!", "check_circle");
    viewLiveRadar();
  }
}

function viewLiveRadar() {
  if (!DEMO_DATA.escalations) {
    DEMO_DATA.escalations = [
      {
        id: "esc-101",
        severity: "critical",
        status: "pending",
        employee_name: "Jasur Bekchanov",
        workstation: "3-Darcha",
        time: "10:48",
        reason: "Mijoz to'lov summasi asossiz oshirilganidan qattiq norozi bo'lib, prokuraturaga shikoyat qilish bilan tahdid qildi.",
        ai_recommendation: "Darcha rahbari zudlik bilan fuqaroni qabul xonasiga taklif qilib, kvitansiya va rasmiy tarif reglamentini taqdim etishi lozim.",
        audio_url: "https://actions.google.com/sounds/v1/ambiences/office_room.ogg",
      },
      {
        id: "esc-102",
        severity: "warning",
        status: "pending",
        employee_name: "Alisher Rustamov",
        workstation: "2-Darcha",
        time: "10:15",
        reason: "Xodim mijozning gapini ketma-ket 3 marta bo'ldi, mijoz asabiylashib joyidan turib ketdi.",
        ai_recommendation: "Operator bilan faol tinglash va xushmuomalalik bo'yicha 2 daqiqalik mikro-trening o'tkazish tavsiya etiladi.",
        audio_url: "https://actions.google.com/sounds/v1/ambiences/office_room.ogg",
      },
      {
        id: "esc-103",
        severity: "warning",
        status: "resolved",
        employee_name: "Dilnoza Karimova",
        workstation: "1-Darcha",
        time: "09:30",
        reason: "Mijoz pasport muddati o'tganiga tushunmadi va biroz e'tiroz bildirdi.",
        ai_recommendation: "Xodim sabr bilan tushuntirdi va masala tinch hal qilindi.",
        audio_url: "https://actions.google.com/sounds/v1/ambiences/office_room.ogg",
        resolved_by: "Rahbar (Quddusxon)",
        resolved_time: "09:35",
      },
    ];
  }

  let list = DEMO_DATA.escalations;
  if (currentEscFilter === "critical") list = list.filter((e) => e.severity === "critical" && e.status === "pending");
  else if (currentEscFilter === "warning") list = list.filter((e) => e.severity === "warning" && e.status === "pending");
  else if (currentEscFilter === "resolved") list = list.filter((e) => e.status === "resolved");

  const pendingCount = DEMO_DATA.escalations.filter((e) => e.status === "pending").length;
  const criticalCount = DEMO_DATA.escalations.filter((e) => e.severity === "critical" && e.status === "pending").length;

  const html = `
    <div class="view-header">
      <div class="view-title-box">
        <h2>🚨 Nizoli Vaziyatlar & Signalizatsiya (Escalation Shield)</h2>
        <p>Real vaqtda suhbatlardagi nizoli holatlar va shoshilinch signallar monitoringi</p>
      </div>
      <button class="action-btn-pill" onclick="showToast('Signalizatsiya tizimi faol va ishlamoqda', 'verified_user')">
        <span class="material-symbols-outlined" style="color:#10b981;">shield</span> Faol Himoya
      </button>
    </div>

    <!-- Real-time Pulse Banner -->
    <div class="glass-card" style="padding:16px; margin-bottom:16px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; background:linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%); border-left:4px solid ${criticalCount > 0 ? '#ef4444' : '#10b981'};">
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="width:40px; height:40px; border-radius:50%; background:${criticalCount > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}; display:flex; align-items:center; justify-content:center;">
          <span class="material-symbols-outlined" style="color:${criticalCount > 0 ? '#ef4444' : '#10b981'}; font-size:24px;">
            ${criticalCount > 0 ? 'warning' : 'check_circle'}
          </span>
        </div>
        <div>
          <h4 style="font-size:15px; font-weight:800; color:var(--text-main);">
            ${criticalCount > 0 ? `${criticalCount} ta Shoshilinch Nizo Nazoratda!` : 'Hozircha Favqulodda Nizo Yo\'q'}
          </h4>
          <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">
            AI barcha darchalarni 30 soniyalik kechikishsiz skanerlamoqda.
          </p>
        </div>
      </div>
      <div style="display:flex; gap:8px;">
        <span class="live-pill"><span class="pulse-dot" style="background:${criticalCount > 0 ? '#ef4444' : '#10b981'};"></span> ${pendingCount} ta Faol Signal</span>
      </div>
    </div>

    <!-- Filter Chiplari -->
    <div style="display:flex; gap:8px; overflow-x:auto; margin-bottom:16px; padding-bottom:4px;">
      <button class="chat-chip ${currentEscFilter === 'all' ? 'active' : ''}" style="${currentEscFilter === 'all' ? 'background:var(--primary); color:#fff;' : ''}" onclick="setEscFilter('all')">
        Barchasi (${DEMO_DATA.escalations.length})
      </button>
      <button class="chat-chip ${currentEscFilter === 'critical' ? 'active' : ''}" style="${currentEscFilter === 'critical' ? 'background:#ef4444; color:#fff;' : ''}" onclick="setEscFilter('critical')">
        🔴 Jiddiy (Critical)
      </button>
      <button class="chat-chip ${currentEscFilter === 'warning' ? 'active' : ''}" style="${currentEscFilter === 'warning' ? 'background:#f59e0b; color:#fff;' : ''}" onclick="setEscFilter('warning')">
        🟡 Ogohlantirish (Warning)
      </button>
      <button class="chat-chip ${currentEscFilter === 'resolved' ? 'active' : ''}" style="${currentEscFilter === 'resolved' ? 'background:#10b981; color:#fff;' : ''}" onclick="setEscFilter('resolved')">
        🟢 Hal qilinganlar
      </button>
    </div>

    <!-- Escalation Feed Cards -->
    <div style="display:flex; flex-direction:column; gap:12px;">
      ${list.map((esc) => `
        <div class="glass-card" style="padding:16px; border-radius:14px; position:relative; overflow:hidden; border:1px solid ${esc.status === 'resolved' ? 'rgba(16, 185, 129, 0.3)' : esc.severity === 'critical' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.3)'};">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="material-symbols-outlined" style="color:${esc.status === 'resolved' ? '#10b981' : esc.severity === 'critical' ? '#ef4444' : '#f59e0b'}; font-size:22px;">
                ${esc.status === 'resolved' ? 'task_alt' : 'crisis_alert'}
              </span>
              <div>
                <h3 style="font-size:14.5px; font-weight:700; color:var(--text-main);">${esc.workstation} — ${esc.employee_name}</h3>
                <span style="font-size:11.5px; color:var(--text-muted);">Voqea vaqti: ${esc.time}</span>
              </div>
            </div>
            <span style="font-size:11px; font-weight:800; padding:3px 8px; border-radius:999px; text-transform:uppercase; ${
              esc.status === 'resolved' 
                ? 'background:rgba(16, 185, 129, 0.15); color:#10b981;' 
                : esc.severity === 'critical' 
                ? 'background:rgba(239, 68, 68, 0.2); color:#ef4444;' 
                : 'background:rgba(245, 158, 11, 0.2); color:#f59e0b;'
            }">
              ${esc.status === 'resolved' ? 'HAL QILINDI' : esc.severity}
            </span>
          </div>

          <!-- Nizo Sababi & AI Tavsiyasi -->
          <div style="background:rgba(0, 0, 0, 0.2); padding:10px 12px; border-radius:8px; margin-bottom:12px; font-size:13px; line-height:1.5;">
            <div style="margin-bottom:6px;">
              <b style="color:${esc.severity === 'critical' ? '#f87171' : '#fbbf24'};">⚠️ Nizo sababi:</b> ${esc.reason}
            </div>
            <div style="color:var(--text-muted); font-size:12.5px;">
              <b style="color:#38bdf8;">💡 AI Tavsiyasi:</b> ${esc.ai_recommendation}
            </div>
          </div>

          <!-- Audio Pleyer & Tugmalar -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <button class="action-btn-pill" onclick="playAudio('${esc.id}', '${esc.audio_url}')">
                <span class="material-symbols-outlined" id="play-icon-${esc.id}">play_arrow</span> Eshitish
              </button>
              <button class="action-btn-pill" onclick="showToast('${esc.workstation} xodimiga xabar yuborildi', 'send')">
                <span class="material-symbols-outlined">chat</span> Xabar
              </button>
            </div>

            ${esc.status === 'pending' ? `
              <button class="action-btn-pill" style="background:linear-gradient(135deg, #10b981 0%, #059669 100%); color:#fff; font-weight:700;" onclick="resolveEscalation('${esc.id}')">
                <span class="material-symbols-outlined">check</span> Muammo Hal Qilindi
              </button>
            ` : `
              <span style="font-size:12px; color:var(--score-good); display:flex; align-items:center; gap:4px;">
                <span class="material-symbols-outlined" style="font-size:16px;">verified</span> ${esc.resolved_by} (${esc.resolved_time})
              </span>
            `}
          </div>
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
// =========================================================================
// 7. INTIZOM AI CHAT — 4 Ta Rol (Iqtisodchi, HR, Psixolog, Assistent)
// =========================================================================
let currentAiMode = "hr"; // 'iqtisod', 'hr', 'psixolog', 'biznes'
let currentAiTone = "normal";   // 'normal', 'formal', 'concise'
let isAiThinking = false;
let aiDailyRemaining = 28;
let aiVoiceResponseOn = false;

let chatMessages = [
  { 
    role: "assistant", 
    mode: "hr",
    reasoning: "Kontekst yuklandi: 4 ta darcha audio tahlili, so'nggi xatolar va xodimlar ko'rsatkichlari faol.",
    text: "Assalomu alaykum! Men sizning shaxsiy AI Yordamchingizman. Iqtisodiy tahlil, HR maslahatlari, xodimlar motivatsiyasi va biznes boshqaruvida yordam berishga tayyorman. Savolingizni yozing yoki pastdagi tezkor tahlillarni tanlang!" 
  },
];

function toggleAiVoiceResponse() {
  aiVoiceResponseOn = !aiVoiceResponseOn;
  showToast(aiVoiceResponseOn ? "🔊 AI ovozli javob berish yoqildi" : "🔇 Ovozli javob o'chirildi", "graphic_eq");
  viewAiChat();
}

function viewAiChat() {
  const hasUserChatted = chatMessages.some(m => m.role === "user");

  const html = `
    <div class="view-header" style="margin-bottom:10px;">
      <div class="view-title-box">
        <h2>${t("chat_title")}</h2>
        <p>HR, Biznes Strategiya, Moliya va Psixologik Tahlil (All-in-One)</p>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        ${hasUserChatted ? `
          <button class="action-btn-pill" style="font-size:11px; padding:4px 9px; background:rgba(255,255,255,0.08);" onclick="resetAiChat()">
            <span class="material-symbols-outlined" style="font-size:13px;">refresh</span> Yangi suhbat
          </button>
        ` : ""}
        <span class="live-pill" style="font-size:11px; background:rgba(255,255,255,0.06); border:1px solid var(--card-border);">
          <span class="pulse-dot"></span> Bugun: <b>${aiDailyRemaining}/30</b>
        </span>
      </div>
    </div>

    <!-- AI Stage (fon 2.jpg bilan 100% mos) -->
    <div class="ai-stage-container ${hasUserChatted ? 'chat-active-full' : ''}">
      
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
              <button class="ai-pill-btn icon-only" title="Hujjat yoki Rasm biriktirish" onclick="showToast('📎 Rasm/Audio/Hujjat biriktirildi', 'attach_file')">
                <span class="material-symbols-outlined" style="font-size:17px;">add</span>
              </button>
              
              <button class="ai-pill-btn" id="ai-tone-btn" onclick="toggleToneMenu()">
                <span class="material-symbols-outlined" style="font-size:15px;">draw</span>
                <span id="ai-tone-text">${currentAiTone === "formal" ? "Rasmiy" : currentAiTone === "concise" ? "Qisqa" : "Oddiy"}</span>
                <span class="material-symbols-outlined" style="font-size:13px;">expand_more</span>
              </button>

              <div class="ai-pill-btn active-mode" style="background:rgba(192,132,252,0.15); border-color:rgba(192,132,252,0.35); color:#ffffff; cursor:default;">
                <span class="material-symbols-outlined" style="font-size:15px; color:#c084fc;">psychology</span>
                <span>Universal AI Maslahatchi</span>
              </div>
            </div>

            <div class="ai-right-controls">
              <button class="ai-pill-btn ${aiVoiceResponseOn ? 'active-mode' : ''}" onclick="toggleAiVoiceResponse()" title="Ovozli javob (TTS)">
                <span class="material-symbols-outlined" style="font-size:15px; color:${aiVoiceResponseOn ? '#10b981' : '#38bdf8'};">
                  ${aiVoiceResponseOn ? 'volume_up' : 'graphic_eq'}
                </span>
                <span>${aiVoiceResponseOn ? 'TTS On' : 'Voice'}</span>
              </button>

              <button class="ai-send-gradient-btn" id="ai-send-btn" onclick="submitChatMessage()" title="Yuborish">
                <span class="material-symbols-outlined" style="font-size:18px;">north_east</span>
              </button>
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
                  <span>DeepThink Reasoning & Tahlil Zanjiri</span>
                </div>
                <div style="white-space:pre-line;">${m.reasoning}</div>
              </div>
            ` : ""}
            <div class="chat-text-content" style="white-space:pre-line; line-height:1.6; font-size:13.5px;">${formatAiMessageText(m.text)}</div>
            ${m.audio_url ? `
              <div style="margin-top:8px;">
                <audio controls src="${m.audio_url}" style="width:100%; height:32px; border-radius:6px;"></audio>
              </div>
            ` : ""}
          </div>
        `).join("")}
        ${isAiThinking ? `
          <div class="chat-bubble assistant" style="display:flex; align-items:center; gap:8px; opacity:0.85;">
            <span class="material-symbols-outlined" style="font-size:18px; color:#c084fc; animation:spin 1.5s linear infinite;">psychology</span>
            <span>Universal AI tahlil qilmoqda (DeepThink 2.5)...</span>
          </div>
        ` : ""}
      </div>

      <!-- 3. PASTKI QISM: Faqat suhbat boshlanmaganda ko'rinadi -->
      ${!hasUserChatted ? `
        <div class="ai-faq-bottom-section">
          <div class="ai-faq-header">
            <span class="material-symbols-outlined" style="font-size:15px; color:var(--primary);">quiz</span>
            <span>Tezkor Tahlil Savollari</span>
          </div>
          <div class="ai-faq-grid">
            <div class="ai-faq-card" onclick="sendQuickPrompt('Mening faoliyatim dizaynerlik xizmati. Mijozlarni ko\\'paytirish va muomalani nazorat qilish bo\\'yicha maslahat ber')">
              <div class="ai-faq-icon blue">
                <span class="material-symbols-outlined">brush</span>
              </div>
              <div class="ai-faq-text-wrap">
                <div class="ai-faq-title">1. Dizayn Xizmati & Mijozlar</div>
                <div class="ai-faq-sub">Sotuvni oshirish va muomala nazorati</div>
              </div>
            </div>

            <div class="ai-faq-card" onclick="sendQuickPrompt('Xodimni jazolashim yoki ishdan bo\\'shatishim kerakmi?')">
              <div class="ai-faq-icon green">
                <span class="material-symbols-outlined">gavel</span>
              </div>
              <div class="ai-faq-text-wrap">
                <div class="ai-faq-title">2. Intizomiy Chora Maslahati</div>
                <div class="ai-faq-sub">Yengil choralardan boshlash bo'yicha tavsiya</div>
              </div>
            </div>

            <div class="ai-faq-card" onclick="sendQuickPrompt('Bugun kim eng ko\\'p xato qildi?')">
              <div class="ai-faq-icon amber">
                <span class="material-symbols-outlined">warning</span>
              </div>
              <div class="ai-faq-text-wrap">
                <div class="ai-faq-title">3. Eng Ko'p Xatolar</div>
                <div class="ai-faq-sub">Past ball olgan xodimlar va kamchiliklar</div>
              </div>
            </div>

            <div class="ai-faq-card" onclick="sendQuickPrompt('Jamoa stress darajasi va ish muhiti qanday?')">
              <div class="ai-faq-icon purple">
                <span class="material-symbols-outlined">sentiment_satisfied</span>
              </div>
              <div class="ai-faq-text-wrap">
                <div class="ai-faq-title">4. Jamoa Stress Radari</div>
                <div class="ai-faq-sub">Emotsional charchoq va tanaffus ehtiyoji</div>
              </div>
            </div>
          </div>
        </div>
      ` : ""}
    </div>
  `;
  setView(html);

  // Avtomatik pastga tushirish
  setTimeout(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, 50);
}

function resetAiChat() {
  chatMessages = [
    { 
      role: "assistant", 
      reasoning: "Universal AI Maslahatchi tizimi ishga tushirildi. Biznes strategiya, HR boshqaruv, moliya va psixologik tahlil modullari tayyor.",
      text: "Assalomu alaykum! Men sizning Universal AI Maslahatchingizman. Biznesingizni rivojlantirish, mijozlar oqimini oshirish, xodimlar muomalasini nazorat qilish va moliyaviy KPI masalalarida yordam berishga tayyorman. Savolingizni yozing!" 
    },
  ];
  showToast("Chat tozalandi", "refresh");
  viewAiChat();
}

function handleChatKeyDown(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    submitChatMessage();
  }
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

function formatAiMessageText(text) {
  if (!text) return "";
  return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
}

function sendQuickPrompt(prompt) {
  sendUserMessage(prompt);
}

async function sendUserMessage(text) {
  chatMessages.push({ role: "user", text });
  if (aiDailyRemaining > 0) aiDailyRemaining--;
  isAiThinking = true;
  viewAiChat();

  try {
    // 1. Haqiqiy jonli Gemini 3.5 neyrotarmog'iga so'rov
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        history: chatMessages.slice(-8)
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.text) {
        isAiThinking = false;
        chatMessages.push({
          role: "assistant",
          reasoning: data.reasoning || "DeepThink 2.5 — Mantiqiy tahlil yakunlandi.",
          text: data.text,
          audio_url: aiVoiceResponseOn ? "https://actions.google.com/sounds/v1/ambiences/office_room.ogg" : null
        });
        viewAiChat();
        return;
      }
    }
  } catch (err) {
    console.warn("Live API ulanmadi, aqlli fallback ishlatilmoqda:", err);
  }

  // 2. Fallback (Agar oflayn bo'lsa yoki tarmoqda uzilish bo'lsa)
  setTimeout(() => {
    let reply = "";
    let reasoning = "";
    const lower = text.toLowerCase();

    // 1. LOKATSIYA VA OFIS TANLASH / XARITA
    if (lower.includes("lokatsiya") || lower.includes("joy") || lower.includes("hudud") || lower.includes("ofis")) {
      reasoning = `1. Lokatsiya tahlili: Piyodalar va transport oqimi, raqobatchilar masofasi va maqsadli auditoriya mezonlari ko'rib chiqildi.\n2. Dizayn studiyasi/ofis uchun qulaylik koeffitsiyenti baholandi.`;
      
      reply = "Albatta, ofisingiz joylashgan hudud lokatsiyasini yuborsangiz, quyidagi muhim omillar bo'yicha to'liq tahlil va amaliy yordam bera olaman:\n\n" +
              "📍 <b>Lokatsiya bo'yicha qanday yordam bera olaman:</b>\n" +
              "1. <b>Mijozlar uchun qulaylik:</b> Piyoda va avtomobilda kelish, metro yoki asosiy transport bekatlariga yaqinligi, parkovka (avtoturargoh) mavjudligi;\n" +
              "2. <b>Maqsadli Auditoriya:</b> Hududdagi biznes markazlar, savdo majmualari va sizning dizayn xizmatlaringizga ehtiyoji bor tadbirkorlar zichligi;\n" +
              "3. <b>Raqobatchilar Joylashuvi:</b> Shu atrofda xuddi shunday dizayn yoki reklama agentliklari bormi-yo'qligini tahlil qilish;\n" +
              "4. <b>Tashqi Reklama & Ko'rinuvchanlik:</b> Bino peshtoqiga banner yoki belgi (peshlavha) o'rnatish qulayligi.\n\n" +
              "📌 <b>Boshlash uchun:</b> Hudud nomini, mo'ljalni yoki xarita linkini (koordinatalarini) yozib yuboring!";

    // 2. DIZAYN XIZMATI VA MIJOZLAR OQIMI / MUOMALA NAZORATI
    } else if (lower.includes("dizayn") || (lower.includes("mijoz") && (lower.includes("kopay") || lower.includes("oshir") || lower.includes("jalb")))) {
      reasoning = `1. Biznes tahlili: Dizayn xizmatlari bozorida mijozlarni jalb qilish va saqlash modellari o'rganildi.\n2. HR & Muloqot standarti: Dizayner/menejer va buyurtmachi o'rtasidagi sifat mezonlari (5 ta sifat omili) tekshirildi.\n3. Amaliy, 2 qismli kompleks strategiya shakllantirildi.`;
      
      reply = "Dizayn xizmatlari sohasida mijozlarni ko'paytirish va xodimlar muomalasini nazorat qilish bo'yicha amaliy kompleks tavsiyalar:\n\n" +
              "🎨 <b>1. Mijozlar Oqimini Ko'paytirish (Marketing & Savdo):</b>\n" +
              "• <b>Keyslar (Case-Study) Portfolio:</b> Shunchaki rasm emas, balki «Mijoz muammosi ➔ Dizayn yechimi ➔ Erishilgan natija (savdo oshishi)» formatida portfolio taqdim eting;\n" +
              "• <b>Ijtimoiy tarmoqlar (Instagram / Telegram / Behance):</b> «Oldin va Keyin» (Before/After) taqqoslashlari va dizayn jarayoni (backstage) videolarini muntazam ulashing;\n" +
              "• <b>5 Daqiqalik Bepul Audit:</b> Yangi murojaat qilgan mijoz brendiga dastlabki bepul ekspress maslahat bering — bu darhol ishonch uyg'otadi;\n" +
              "• <b>Tavsiya (Referral) Dasturi:</b> Mamnun mijoz yangi buyurtmachi olib kelsa, keyingi xizmat uchun 10-15% chegirma yoki bonus taqdim eting.\n\n" +
              "👥 <b>2. Xodimlar Muomalasini Nazorat Qilish (HR & Sifat):</b>\n" +
              "• <b>Muloqot Standartlari (Skriptlar):</b> Salomlashish, texnik topshiriq (TZ)ni diqqat bilan eshitish va muddatlarni aniq kelishish qoidasini o'rnating;\n" +
              "• <b>Tezkor Javob Qoidasi (SLA):</b> Mijoz murojaat qilganda 10-15 daqiqa ichida xushmuomala javob qaytarilishini yo'lga qo'ying;\n" +
              "• <b>5 Ta Sifat Mezoni:</b> Salomlashish, tinglash madaniyati, professional tushuntirish, xushmuomalalik va minnatdorlik bilan xayrlashish;\n" +
              "• <b>Sifat Bonusi:</b> Mijozlardan a'lo baho va ijobiy fikr (otzyv) olgan xodimlarga oylik qo'shimcha bonus bering.\n\n" +
              "💡 <b>Xulosa:</b> Sifatli dizayn + samimiy va tezkor muloqot xizmat narxini oshirishga va doimiy sodiq mijozlar oqimini ta'minlashga yordam beradi.";

    // 3. INTIZOMIY CHORALAR BO'YICHA SAMIMIY VA BOSQICHMA-BOSQICH HR STANDARTI
    } else if (lower.includes("jazo") || lower.includes("bo'shat") || lower.includes("jarima") || lower.includes("chora")) {
      reasoning = `1. Mehnat munosabatlari va HR psixologiyasi tahlil qilindi.\n2. Bosqichma-bosqich intizomiy choralar ketma-ketligi belgilandi.`;
      
      reply = "Bu vaziyatda darhol eng qattiq chorani (jarima yoki ishdan bo'shatish) qo'llashdan oldin, vaziyat sabablarini o'rganishni tavsiya qilaman.\n\n" +
              "📌 <b>Tavsiya etiladigan bosqichma-bosqich yondashuv:</b>\n\n" +
              "1. <b>Og'zaki suhbat:</b> Xodim bilan xolis, yakkama-yakka suhbat o'tkazib, kamchilik sababini aniqlang.\n" +
              "2. <b>Yozma ogohlantirish:</b> Agar holat ikkinchi marta takrorlansa, rasmiy yozma ogohlantirish bering;\n" +
              "3. <b>Hayfsan / Qattiq chora:</b> Faqat tizimli va takroriy qonunbuzarlik bo'lsagina jiddiy intizomiy chora qo'llang.\n\n" +
              "Bu yondashuv jamoani saqlab qolish va adolatli ish muhitini ta'minlash uchun xavfsizroqdir.";

    // 4. BUGUNGI XATOLAR TAHLILI
    } else if (lower.includes("xato") || lower.includes("kamchilik")) {
      reasoning = `1. 4 ta darcha audio yozuvlari va muloqot transkriptlari tekshirildi.\n2. Salomlashish va mijoz gapini bo'lish holatlari filtrlandi.`;
      
      reply = "Bugungi tahlil bo'yicha eng ko'p kamchilik 3-darcha xodimi Jasur Bekchanovda qayd etildi (48 ball).\n\n" +
              "⚠️ <b>Aniqlangan asosiy sabablar:</b>\n" +
              "• Salomlashish tartibiga rioya qilmadi;\n" +
              "• Mijoz so'zini oxirigacha eshitmasdan gapini bo'ldi;\n" +
              "• Xizmat yakunida minnatdorlik bildirmadi.\n\n" +
              "💡 <b>Tavsiya:</b> Xodim bilan 10 daqiqalik yakkama-yakka suhbat o'tkazib, mijoz so'zidan keyin 3 soniya pauza saqlash qoidasini eslatish lozim.";

    // 5. STRESS VA JAMOA MUHITI
    } else if (lower.includes("stress") || lower.includes("muhit") || lower.includes("charchoq")) {
      reasoning = `1. Xodimlar audio balandligi, intonatsiya va suhbatlar soni tahlil qilindi.\n2. Emotsional charchoq ko'rsatkichi hisoblandi.`;
      
      reply = "Jamoaning umumiy stress darajasi: <b>18% (Barqaror & Qoniqarli)</b>.\n\n" +
              "📊 <b>Xodimlar bo'yicha holat:</b>\n" +
              "• 1-darcha (Dilnoza Karimova): Bugun 35 ta mijoz qabul qildi, biroz emotsional charchoq sezilmoqda. Unga 15 daqiqalik tanaffus tavsiya etiladi;\n" +
              "• 4-darcha (Nigora Umarova): A'lo darajada emotsional barqarorlik (96 ball);\n" +
              "• 3-darcha (Jasur Bekchanov): Asabiylik darajasi 32% (og'ir mijozlar bilan muloqotdan so'ng).";

    // 6. BONUSLAR VA MOLIYAVIY KPI
    } else if (lower.includes("bonus") || lower.includes("kpi") || lower.includes("maosh") || lower.includes("daromad")) {
      reasoning = `1. Sifat formulasi (5 ta mezon) va suhbatlar soni normasi taqqoslandi.\n2. Oylik bonuslar taqsimoti hisoblab chiqildi.`;
      
      reply = "Joriy oy uchun xodimlarning hisoblangan bonuslar taqsimoti:\n\n" +
              "💰 <b>Xodimlar ko'rsatkichlari:</b>\n" +
              "1. <b>Nigora Umarova (4-darcha):</b> 500,000 so'm (100% bonus, o'rtacha 96 ball);\n" +
              "2. <b>Dilnoza Karimova (1-darcha):</b> 420,000 so'm (93% bonus, o'rtacha 89 ball);\n" +
              "3. <b>Alisher Rustamov (2-darcha):</b> 280,000 so'm (73% bonus, o'rtacha 78 ball);\n" +
              "4. <b>Jasur Bekchanov (3-darcha):</b> Bonus hisoblanmadi (ball 65 dan past).";

    // 7. UMUMIY BIZNES VA BOSHQARUV SAVOLLARI
    } else {
      reasoning = `1. «${text}» so'rovi bo'yicha biznes, HR va tahliliy mezonlar kompleks ko'rib chiqildi.\n2. Universal AI ekspert xulosasi shakllantirildi.`;
      
      reply = `«${text}» bo'yicha tavsiyalar:\n\n` +
              `📌 <b>1. Boshqaruv & Strategiya:</b> Jarayonlarni aniq reglamentlash va xodimlar o'rtasida mas'uliyatni to'g'ri taqsimlash samaradorlikni 25-30% ga oshiradi.\n` +
              `📌 <b>2. Sifat Nazorati:</b> Doimiy mijozlar muloqotini kuzatib borish va haftalik qisqa brifinglar o'tkazish xatolarni 2 barobar kamaytiradi.\n` +
              `📌 <b>3. Moliyaviy Natija:</b> Xodimlarni aniq KPI va sifat ko'rsatkichlariga bog'lash daromadning barqaror o'sishiga zamin yaratadi.\n\n` +
              `Agar biror yo'nalish bo'yicha batafsilroq reja kerak bo'lsa, aniqroq savol berishingiz mumkin!`;
    }

    isAiThinking = false;
    chatMessages.push({ 
      role: "assistant", 
      reasoning, 
      text: reply,
      audio_url: aiVoiceResponseOn ? "https://actions.google.com/sounds/v1/ambiences/office_room.ogg" : null
    });
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
    if (dd && !dd.contains(e.target) && e.target.id !== "profile-btn") {
      dd.classList.add("hidden");
    }
    const modePopover = document.getElementById("ai-mode-popover");
    const modeBtn = document.getElementById("ai-mode-btn");
    if (modePopover && !modePopover.classList.contains("hidden")) {
      if (!modePopover.contains(e.target) && !modeBtn?.contains(e.target)) {
        modePopover.classList.add("hidden");
      }
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
