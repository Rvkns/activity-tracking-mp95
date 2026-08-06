/**
 * Activity & Resource Tracking Application Logic - MP95 (Media Point 95)
 * Connected directly to Neon PostgreSQL Backend API & LocalStorage Fallback
 */

const INITIAL_PROJECTS = [
  { id: "PRJ-001", progetto: "Boe mensa-IT-Digital", stato: "Manutenzione", pm: "Lara Tini Brunozzi", effort: 1 },
  { id: "PRJ-002", progetto: "Intouch-IT-Digital", stato: "Manutenzione", pm: "Lara Tini Brunozzi", effort: 1 },
  { id: "PRJ-003", progetto: "NRC-IT-Digital - TOYOTA", stato: "In corso", pm: "Serena Lacorte", effort: 5 },
  { id: "PRJ-004", progetto: "NRC-IT-Digital - LEXUS", stato: "In corso", pm: "Serena Lacorte", effort: 5 },
  { id: "PRJ-005", progetto: "Paperless-IT-Digital", stato: "In corso", pm: "Serena Lacorte", effort: 5 },
  { id: "PRJ-006", progetto: "WIDE-IT-Digital", stato: "In corso", pm: "Serena Lacorte", effort: 25 },
  { id: "PRJ-007", progetto: "Franchise-IT-Digital", stato: "In corso", pm: "Serena Lacorte", effort: 10 },
  { id: "PRJ-008", progetto: "Rinnovi Digitali-IT-Digital", stato: "Terminato", pm: "Serena Lacorte", effort: 0 },
  { id: "PRJ-009", progetto: "CMS - gestione ticket secondo livello-IT-Digital", stato: "In corso", pm: "Valerio Andreuccioli", effort: 30 },
  { id: "PRJ-010", progetto: "CMS-IT-Digital", stato: "In corso", pm: "Valerio Andreuccioli", effort: 70 },
  { id: "PRJ-011", progetto: "Dismissione Halley-IT-Corporate", stato: "Stand by", pm: "Emanuela Raschellà", effort: 0 },
  { id: "PRJ-012", progetto: "Flag usato akita-IT-Digital", stato: "Da iniziare", pm: "Valerio Andreuccioli", effort: 10 },
  { id: "PRJ-013", progetto: "Sailpoint-IT-Digital", stato: "In corso", pm: "Stefano Giovannella", effort: 40 },
  { id: "PRJ-014", progetto: "Service Now-IT-Digital", stato: "Manutenzione", pm: "Stefano Giovannella", effort: 2 },
  { id: "PRJ-015", progetto: "WayTo Apps-IT-Digital", stato: "Manutenzione", pm: "Stefano Giovannella", effort: 5 },
  { id: "PRJ-016", progetto: "WayTo-IT-Digital", stato: "Manutenzione", pm: "Stefano Giovannella", effort: 10 },
  { id: "PRJ-017", progetto: "Service Now 2.0-IT-Digital", stato: "In corso", pm: "Stefano Giovannella", effort: 5 },
  { id: "PRJ-018", progetto: "Repository per Product Quality", stato: "In corso", pm: "Francesco Di Legge", effort: 10 },
  { id: "PRJ-019", progetto: "AI LAB", stato: "In corso", pm: "Francesco Di Legge", effort: 15 },
  { id: "PRJ-020", progetto: "ACT AS A BSS PARTNER - Survey-IT-Digital", stato: "Attività periodica", pm: "Emanuela Raschellà", effort: 15 },
  { id: "PRJ-021", progetto: "Digital Finance - Controlling-IT-Digital", stato: "In corso", pm: "Emanuela Raschellà", effort: 15 },
  { id: "PRJ-022", progetto: "Digital Sales-IT-Digital", stato: "In corso", pm: "Emanuela Raschellà", effort: 35 },
  { id: "PRJ-023", progetto: "Procedura Service Now-IT-Digital", stato: "Terminato", pm: "Emanuela Raschellà", effort: 100 },
  { id: "PRJ-024", progetto: "Digital Finance - Purchasing-IT-Digital", stato: "In corso", pm: "Emanuela Raschellà", effort: 20 },
  { id: "PRJ-025", progetto: "TED-IT-Digital", stato: "Manutenzione", pm: "Emanuela Raschellà", effort: 20 },
  { id: "PRJ-026", progetto: "BRiT WayDoc-IT-Digital", stato: "Terminato", pm: "Serena Lacorte", effort: 20 },
  { id: "PRJ-027", progetto: "Calendario chiusure-IT-Digital", stato: "In corso", pm: "Serena Lacorte", effort: 0 },
  { id: "PRJ-028", progetto: "DEALER RISK-IT-Digital", stato: "Attività periodica", pm: "Serena Lacorte", effort: 1 },
  { id: "PRJ-029", progetto: "Backlog Bearit -IT-Digital", stato: "In corso", pm: "Serena Lacorte", effort: 20 },
  { id: "PRJ-030", progetto: "MIA - KPI Dealer-IT-Digital", stato: "In corso", pm: "Serena Lacorte", effort: 20 },
  { id: "PRJ-031", progetto: "OWE-IT-Digital", stato: "Attività periodica", pm: "Serena Lacorte", effort: 0 },
  { id: "PRJ-032", progetto: "Riaddebbiti/fatturazione-IT-Digital", stato: "Attività periodica", pm: "Serena Lacorte", effort: 10 },
  { id: "PRJ-033", progetto: "Warehouse channel -IT-Digital", stato: "Manutenzione", pm: "Serena Lacorte", effort: 30 },
  { id: "PRJ-034", progetto: "WayTo Kinto-IT-Digital", stato: "Manutenzione", pm: "Serena Lacorte", effort: 5 },
  { id: "PRJ-035", progetto: "WayTo-IT-Digital", stato: "Manutenzione", pm: "Serena Lacorte", effort: 15 },
  { id: "PRJ-036", progetto: "Service Now Flotte -IT-Digital", stato: "In corso", pm: "Serena Lacorte", effort: 15 }
];

const OFFICIAL_COORDINATORS = [
  { name: "Valerio Andreuccioli", reparto: "Data Management", badgeColor: "#06B6D4" },
  { name: "Serena Lacorte", reparto: "IT&Digital", badgeColor: "#2872FA" },
  { name: "Stefano Giovannella", reparto: "Infra", badgeColor: "#EC4899" },
  { name: "Emanuela Raschellà", reparto: "Corporate", badgeColor: "#F59E0B" },
  { name: "Lara Tini Brunozzi", reparto: "Support&Help Desk", badgeColor: "#10B981" },
  { name: "Francesco Di Legge", reparto: "Innovation", badgeColor: "#A78BFA" }
];

let customCoordinators = JSON.parse(localStorage.getItem('mp95_custom_coordinators')) || [];

function getAllCoordinators() {
  return [...OFFICIAL_COORDINATORS, ...customCoordinators];
}

const DEFAULT_COORDINATOR_RESOURCES = {
  "Valerio Andreuccioli": [
    { name: "Daniele De Dominicis", role: "Backend Lead", projects: ["CMS-IT-Digital", "CMS - gestione ticket secondo livello-IT-Digital"] },
    { name: "Giuseppe Neri", role: "Specialista IT", projects: ["CMS-IT-Digital"] },
    { name: "Elena Moretti", role: "DBA Specialist", projects: ["Flag usato akita-IT-Digital"] }
  ],
  "Serena Lacorte": [
    { name: "Aurora Parisi", role: "External PM / Specialist", projects: ["WIDE-IT-Digital", "Franchise-IT-Digital"] },
    { name: "Marco Rossi", role: "Senior Fullstack Dev", projects: ["WIDE-IT-Digital"] },
    { name: "Laura Conti", role: "UI/UX Designer", projects: ["Paperless-IT-Digital"] },
    { name: "Roberto Gatti", role: "System Engineer", projects: ["Warehouse channel -IT-Digital"] },
    { name: "Simona D'Amico", role: "Data Analyst", projects: ["MIA - KPI Dealer-IT-Digital"] }
  ],
  "Stefano Giovannella": [
    { name: "Federico Arte", role: "Senior Infrastructure Lead", projects: ["Sailpoint-IT-Digital", "Service Now 2.0-IT-Digital"] },
    { name: "Matteo Galli", role: "DevOps Engineer", projects: ["WayTo Apps-IT-Digital"] }
  ],
  "Emanuela Raschellà": [
    { name: "Francesca Rozzi", role: "Corporate Consultant", projects: ["Digital Finance - Controlling-IT-Digital", "Digital Sales-IT-Digital"] },
    { name: "Davide Palmieri", role: "Financial Consultant", projects: ["Digital Finance - Purchasing-IT-Digital"] },
    { name: "Chiara Ferri", role: "Solution Architect", projects: ["Procedura Service Now-IT-Digital"] }
  ],
  "Lara Tini Brunozzi": [
    { name: "Stefano Rinaldi", role: "Support Lead", projects: ["Boe mensa-IT-Digital", "Intouch-IT-Digital"] }
  ],
  "Francesco Di Legge": [
    { name: "Alessia Fontana", role: "AI Specialist", projects: ["AI LAB", "Repository per Product Quality"] }
  ]
};

/**
 * Maps a PM name to its official coordinator name.
 * Uses EXACT full-name matching first, then falls back to a curated alias map.
 * IMPORTANT: Never match on first-name substrings alone — resource names
 * like "Stefano Rinaldi" must NOT be remapped to "Stefano Giovannella".
 */
const PM_ALIAS_MAP = {
  'aurora parisi':          'Serena Lacorte',
  'serena lacorte':         'Serena Lacorte',
  'daniele de dominicis':   'Valerio Andreuccioli',
  'valerio andreuccioli':   'Valerio Andreuccioli',
  'federico arte':          'Stefano Giovannella',
  'stefano giovannella':    'Stefano Giovannella',
  'francesca rozzi':        'Emanuela Raschellà',
  'emanuela raschellà':     'Emanuela Raschellà',
  'emanuela raschella':     'Emanuela Raschellà',
  'lara tini brunozzi':     'Lara Tini Brunozzi',
  'alessia fontana':        'Francesco Di Legge',
  'francesco di legge':     'Francesco Di Legge'
};

function sanitizeProjectPM(pm) {
  if (!pm) return 'Serena Lacorte';
  const str = pm.trim();
  if (!str) return 'Serena Lacorte';
  const lower = str.toLowerCase();

  // 1. Exact full-name match against official coordinators
  const matched = OFFICIAL_COORDINATORS.find(c => c.name.toLowerCase() === lower);
  if (matched) return matched.name;

  // 2. Curated alias map (full-name match only, no substring)
  if (PM_ALIAS_MAP[lower]) return PM_ALIAS_MAP[lower];

  // 3. Return the original string — do NOT guess
  return str;
}

// App State
let projects = (JSON.parse(localStorage.getItem('mp95_projects')) || [...INITIAL_PROJECTS]).map(p => ({
  ...p,
  pm: sanitizeProjectPM(p.pm)
}));
let coordinatorResources = JSON.parse(localStorage.getItem('mp95_resources')) || DEFAULT_COORDINATOR_RESOURCES;

function syncResourceProjectsToProjectsTable() {
  const allCoords = getAllCoordinators();
  let maxIdNum = 0;
  projects.forEach(p => {
    const match = (p.id || '').match(/^PRJ-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxIdNum) maxIdNum = num;
    }
  });

  let changed = false;

  Object.keys(coordinatorResources).forEach(pmName => {
    const coordObj = allCoords.find(c => c.name.toLowerCase() === pmName.toLowerCase());
    const reparto = coordObj ? coordObj.reparto : null;
    const resList = coordinatorResources[pmName] || [];

    resList.forEach(r => {
      const rName = typeof r === 'string' ? r : r.name;
      const rProjects = typeof r === 'object' && r.projects ? r.projects : [];

      rProjects.forEach(pName => {
        if (!pName || !pName.trim()) return;
        const normPName = pName.trim().toLowerCase();
        const normPm = pmName.trim().toLowerCase();

        const existingWithRes = projects.find(p =>
          p.progetto.trim().toLowerCase() === normPName &&
          sanitizeProjectPM(p.pm).toLowerCase() === normPm &&
          p.risorsa && p.risorsa.trim().toLowerCase() === rName.trim().toLowerCase()
        );

        if (!existingWithRes) {
          const existingNoRes = projects.find(p =>
            p.progetto.trim().toLowerCase() === normPName &&
            sanitizeProjectPM(p.pm).toLowerCase() === normPm &&
            (!p.risorsa || p.risorsa.trim() === '')
          );

          if (existingNoRes) {
            existingNoRes.risorsa = rName;
            if (!existingNoRes.reparto && reparto) existingNoRes.reparto = reparto;
            changed = true;
          } else {
            maxIdNum++;
            const newId = `PRJ-${String(maxIdNum).padStart(3, '0')}`;
            projects.push({
              id: newId,
              progetto: pName.trim(),
              stato: 'In corso',
              pm: pmName,
              effort: 10,
              risorsa: rName,
              reparto: reparto,
              descrizione: null,
              effort_previsto: 0,
              effort_residuo: 0,
              avanzamento: 0,
              data_inizio: new Date().toISOString().slice(0, 10),
              scadenza: null,
              stato_tempistiche: 'In linea',
              criticita: null
            });
            changed = true;
          }
        }
      });
    });
  });

  if (changed) {
    localStorage.setItem('mp95_projects', JSON.stringify(projects));
  }
}

// DOM Load
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initNavigation();
  initDashboard();
  initAnalyticsView();
  initProjectsView();
  initCoordinatorsView();
  initTimelineView();
  initReportsView();
  initModals();
  initExcelFileHandlers();

  // Load from Neon DB API — single source of truth
  // syncResourceProjectsToProjectsTable runs AFTER DB data arrives
  await fetchFromNeonDB();
});

/* ----------------------------------------------------
   THEME MANAGEMENT (Light / Dark Mode)
---------------------------------------------------- */
function initTheme() {
  const savedTheme = localStorage.getItem('mp95_theme') || 'dark';
  applyTheme(savedTheme);

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('mp95_theme', newTheme);
      showToast(`Tema ${newTheme === 'light' ? 'Chiaro (Light)' : 'Scuro (Dark)'} attivato!`);
    });
  }
}

function applyTheme(theme) {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeBtn) {
      themeBtn.innerHTML = `<i class="fa-solid fa-moon" style="color:var(--mp95-blue);"></i> Tema Scuro`;
      themeBtn.title = "Passa al Tema Scuro (Dark)";
    }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeBtn) {
      themeBtn.innerHTML = `<i class="fa-solid fa-sun" style="color:var(--mp95-orange);"></i> Tema Chiaro`;
      themeBtn.title = "Passa al Tema Chiaro (Light)";
    }
  }
}


// Sync data from Neon DB — single source of truth for all users
async function fetchFromNeonDB() {
  let dbReached = false;
  try {
    const resPrj = await fetch('/api/projects');
    if (resPrj.ok) {
      const data = await resPrj.json();
      if (Array.isArray(data) && data.length > 0) {
        // DB is authoritative: replace entire local state
        projects = data.map(p => ({
          ...p,
          pm: sanitizeProjectPM(p.pm)
        }));
        localStorage.setItem('mp95_projects', JSON.stringify(projects));
        dbReached = true;
      }
    }

    const resResources = await fetch('/api/resources');
    if (resResources.ok) {
      const resData = await resResources.json();
      if (Object.keys(resData).length > 0) {
        // Merge DB resources with defaults so coordinators without
        // DB entries still show their hardcoded team members
        const merged = { ...DEFAULT_COORDINATOR_RESOURCES };
        Object.keys(resData).forEach(coordName => {
          if (!merged[coordName]) {
            merged[coordName] = resData[coordName];
          } else {
            // DB entries take precedence; add any DB-only members
            const existingNames = new Set(merged[coordName].map(r => (typeof r === 'string' ? r : r.name).toLowerCase()));
            resData[coordName].forEach(dbRes => {
              const dbName = (typeof dbRes === 'string' ? dbRes : dbRes.name).toLowerCase();
              if (!existingNames.has(dbName)) {
                merged[coordName].push(dbRes);
              } else {
                // Update role/projects from DB
                const idx = merged[coordName].findIndex(r => (typeof r === 'string' ? r : r.name).toLowerCase() === dbName);
                if (idx >= 0) merged[coordName][idx] = dbRes;
              }
            });
          }
        });
        coordinatorResources = merged;
        localStorage.setItem('mp95_resources', JSON.stringify(coordinatorResources));
        dbReached = true;
      }
    }
  } catch (err) {
    console.log("DB non raggiungibile — dati da LocalStorage offline cache.");
  } finally {
    if (dbReached) {
      console.log("✓ Dati sincronizzati dal DB Neon PostgreSQL.");
    }
    syncResourceProjectsToProjectsTable();
    refreshAllViews();
  }
}

// Save State: LocalStorage (offline/fast) + Neon DB (cross-user consistency)
function saveState() {
  localStorage.setItem('mp95_projects', JSON.stringify(projects));
  localStorage.setItem('mp95_resources', JSON.stringify(coordinatorResources));
  refreshAllViews();

  // Persist to Neon DB asynchronously so other users get the latest data
  persistToNeonDB();
}

// Debounced write to DB to avoid flooding on rapid saves
let _persistTimer = null;
function persistToNeonDB() {
  if (_persistTimer) clearTimeout(_persistTimer);
  _persistTimer = setTimeout(async () => {
    try {
      await fetch('/api/projects/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projects)
      });
      await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coordinatorResources)
      });
      console.log('✓ Stato salvato nel DB Neon.');
    } catch (err) {
      console.warn('⚠ Impossibile sincronizzare con il DB Neon:', err.message);
    }
  }, 500); // debounce 500ms
}

function refreshAllViews() {
  renderDashboard();
  renderAnalyticsView();
  renderProjectsTable();
  renderCoordinatorsGrid();
  populatePmFilterOptions();
  populateTimelinePmFilter();
  refreshTimelineView();
}

/* ----------------------------------------------------
   NAVIGATION
---------------------------------------------------- */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const viewSections = document.querySelectorAll('.view-section');
  const sectionTitle = document.getElementById('sectionTitle');
  const sectionSubtitle = document.getElementById('sectionSubtitle');
  const openWikiBtn = document.getElementById('openWikiBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeSidebarBtn = document.getElementById('closeSidebarBtn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  const titles = {
    dashboard: { title: "Executive Dashboard", subtitle: "Panoramica generale dell'effort e delle attività dei coordinatori MP95" },
    analytics: { title: "Analytics & Executive KPI", subtitle: "Analisi avanzata delle metriche di effort, reparto e saturazione delle risorse MP95" },
    projects: { title: "Gestione Progetti & Effort", subtitle: "Elenco completo dei progetti censiti con allocazioni percentuale" },
    coordinators: { title: "Carico di Lavoro & Risorse Coordinatori", subtitle: "Analisi della capacità, progetti e risorse gestite per ciascun PM" },
    timeline: { title: "Governance Temporale & Timeline", subtitle: "Monitoraggio della durata, pianificazione e calendario delle attività MP95" },
    reports: { title: "Reportistica & Import/Export", subtitle: "Esportazione report CSV/JSON e caricamento file Excel (.xlsx)" },
    wiki: { title: "Wiki & Guida Utente TrackMaster MP95", subtitle: "Manuale d'uso completo dell'applicazione e guida a tutte le funzionalità" }
  };

  function openMobileSidebar() {
    if (sidebar) sidebar.classList.add('mobile-open');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeMobileSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileSidebar);

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');

      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      viewSections.forEach(sec => sec.classList.remove('active'));
      const activeSection = document.getElementById(`view-${targetView}`);
      if (activeSection) activeSection.classList.add('active');

      if (titles[targetView]) {
        sectionTitle.textContent = titles[targetView].title;
        sectionSubtitle.textContent = titles[targetView].subtitle;
      }

      // Close mobile drawer on selection
      closeMobileSidebar();
    });
  });

  if (openWikiBtn) {
    openWikiBtn.addEventListener('click', () => {
      const wikiNavItem = document.querySelector('.nav-item[data-view="wiki"]');
      if (wikiNavItem) wikiNavItem.click();
    });
  }
}

/* ----------------------------------------------------
   NAVIGATION HELPER
---------------------------------------------------- */
function navigateToView(viewName) {
  const navItem = document.querySelector(`.nav-item[data-view="${viewName}"]`);
  if (navItem) navItem.click();
}

/* ----------------------------------------------------
   DASHBOARD VIEW
---------------------------------------------------- */
let dashboardWorkloadMode = 'coordinators'; // 'coordinators' | 'resources'

function initDashboard() {
  // Purge any stale custom coordinators entry that contains non-official people
  // (e.g. Alfredo added via old UI). OFFICIAL_COORDINATORS is the single source of truth.
  const officialNames = new Set(OFFICIAL_COORDINATORS.map(c => c.name));
  const storedCustom = JSON.parse(localStorage.getItem('mp95_custom_coordinators')) || [];
  const cleanedCustom = storedCustom.filter(c => !officialNames.has(c.name));
  // If list changed, persist the cleaned version
  if (cleanedCustom.length !== storedCustom.length) {
    localStorage.setItem('mp95_custom_coordinators', JSON.stringify(cleanedCustom));
    customCoordinators = cleanedCustom;
  }

  const btnCoord = document.getElementById('btnWorkloadCoordinators');
  const btnRes = document.getElementById('btnWorkloadResources');

  if (btnCoord && btnRes) {
    // Clone buttons to strip any previously attached listeners
    const newBtnCoord = btnCoord.cloneNode(true);
    const newBtnRes = btnRes.cloneNode(true);
    btnCoord.parentNode.replaceChild(newBtnCoord, btnCoord);
    btnRes.parentNode.replaceChild(newBtnRes, btnRes);

    newBtnCoord.addEventListener('click', () => {
      dashboardWorkloadMode = 'coordinators';
      newBtnCoord.className = 'btn btn-primary btn-sm';
      newBtnRes.className = 'btn btn-secondary btn-sm';
      renderPmWorkloadOverview();
    });
    newBtnRes.addEventListener('click', () => {
      dashboardWorkloadMode = 'resources';
      newBtnRes.className = 'btn btn-primary btn-sm';
      newBtnCoord.className = 'btn btn-secondary btn-sm';
      renderPmWorkloadOverview();
    });
  }

  renderDashboard();
}

function renderDashboard() {
  document.getElementById('kpiTotalProjects').textContent = projects.length;
  
  const activeCount = projects.filter(p => p.stato.trim().toLowerCase() === 'in corso').length;
  document.getElementById('kpiActiveProjects').textContent = activeCount;

  const pmsSet = new Set(projects.map(p => p.pm.trim()));
  document.getElementById('kpiTotalPMs').textContent = pmsSet.size;

  const totalEffort = projects.reduce((acc, p) => acc + (p.effort || 0), 0);
  const avgEffort = projects.length > 0 ? (totalEffort / projects.length).toFixed(1) : 0;
  document.getElementById('kpiAvgEffort').textContent = `${avgEffort}%`;

  // KPI: A rischio / In ritardo
  const atRisk = projects.filter(p => {
    const st = (p.stato_tempistiche || '').toLowerCase();
    return st === 'a rischio' || st === 'in ritardo';
  }).length;
  const kpiRisk = document.getElementById('kpiAtRisk');
  if (kpiRisk) kpiRisk.textContent = atRisk;

  renderStatusDistribution();
  renderPmWorkloadOverview();
}

function renderStatusDistribution() {
  const container = document.getElementById('statusDistributionContainer');
  if (!container) return;

  const counts = {};
  projects.forEach(p => {
    const st = p.stato.trim();
    counts[st] = (counts[st] || 0) + 1;
  });

  const badgeClassMap = {
    'In corso': 'badge-in-corso',
    'Manutenzione': 'badge-manutenzione',
    'Terminato': 'badge-terminato',
    'Stand by': 'badge-stand-by',
    'Da iniziare': 'badge-da-iniziare',
    'Attività periodica': 'badge-periodica'
  };

  container.innerHTML = '';
  Object.keys(counts).forEach(status => {
    const cnt = counts[status];
    const pct = Math.round((cnt / projects.length) * 100);
    const badgeClass = badgeClassMap[status] || 'badge-periodica';

    const rowHtml = `
      <div style="display:flex; flex-direction:column; gap:0.35rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem;">
          <span class="badge ${badgeClass}">${status}</span>
          <span style="font-weight:700;">${cnt} progetti (${pct}%)</span>
        </div>
        <div class="effort-progress-bg">
          <div class="effort-progress-fill" style="width: ${pct}%;"></div>
        </div>
      </div>
    `;
    container.innerHTML += rowHtml;
  });
}

function getResourceEffort(resourceName) {
  if (!resourceName) return 0;
  const cleanName = resourceName.trim().toLowerCase();
  return projects.reduce((acc, p) => {
    const rName = (p.risorsa || p.pm || '').trim().toLowerCase();
    if (rName === cleanName) {
      return acc + (p.effort || 0);
    }
    return acc;
  }, 0);
}

function renderPmWorkloadOverview() {
  const container = document.getElementById('pmWorkloadOverview');
  if (!container) return;

  container.innerHTML = '';

  if (dashboardWorkloadMode === 'coordinators') {
    // Use ONLY official coordinators — custom ones (localStorage) are excluded here
    const officialCoords = OFFICIAL_COORDINATORS;

    // Build effort map keyed strictly to official coordinator names
    const pmEfforts = {};
    officialCoords.forEach(c => {
      pmEfforts[c.name] = { count: 0, totalEffort: 0, reparto: c.reparto || 'Generale' };
    });

    const coordNameSet = new Set(officialCoords.map(c => c.name));
    projects.forEach(p => {
      const pmName = sanitizeProjectPM(p.pm);
      if (!coordNameSet.has(pmName)) return; // Skip anyone not in the official list
      pmEfforts[pmName].count += 1;
      pmEfforts[pmName].totalEffort += (p.effort || 0);
    });

    officialCoords.forEach(coord => {
      const pmName = coord.name;
      const data = pmEfforts[pmName];
      const totalEffort = data.totalEffort;
      
      const barPct = Math.min(totalEffort, 100);

      let statusText = `${totalEffort}%`;
      let colorStyle = 'var(--mp95-blue)';
      let bgStyle = 'linear-gradient(90deg, var(--mp95-blue), var(--success))';

      if (totalEffort > 100) {
        statusText = `${totalEffort}% ⚠️ Overload (+${totalEffort - 100}%)`;
        colorStyle = 'var(--danger)';
        bgStyle = 'var(--danger)';
      }

      const row = document.createElement('div');
      row.style.cssText = 'display:flex; flex-direction:column; gap:0.4rem; padding:0.65rem 0.85rem; background:rgba(255,255,255,0.02); border-radius:var(--radius-md); cursor:pointer; transition:background 0.18s;';
      row.title = `Clicca per vedere il dettaglio di ${pmName}`;
      row.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-weight:700; font-size:0.9rem;">${pmName}</span>
            <span style="font-size:0.75rem; color:var(--text-dim); margin-left:0.4rem;">(${data.reparto})</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-weight:800; font-size:0.82rem; color:${colorStyle};">
              ${statusText} (${data.count} attività)
            </span>
            <i class="fa-solid fa-arrow-right" style="font-size:0.75rem; color:var(--text-dim);"></i>
          </div>
        </div>
        <div class="effort-progress-bg" title="Effort Totale Progetti Gestiti dal Coordinatore ${pmName}">
          <div class="effort-progress-fill" style="width: ${barPct}%; background: ${bgStyle};"></div>
        </div>
      `;
      row.addEventListener('mouseenter', () => { row.style.background = 'rgba(255,255,255,0.055)'; });
      row.addEventListener('mouseleave', () => { row.style.background = 'rgba(255,255,255,0.02)'; });
      row.addEventListener('click', () => {
        navigateToView('coordinators');
        // Highlight the coordinator's card after a short delay for the view to render
        setTimeout(() => {
          const cards = document.querySelectorAll('#coordinatorsGrid .pm-card');
          cards.forEach(card => {
            const h4 = card.querySelector('h4');
            if (h4 && h4.textContent.trim() === pmName) {
              card.scrollIntoView({ behavior: 'smooth', block: 'center' });
              card.style.outline = '2px solid var(--mp95-blue)';
              card.style.transition = 'outline 0.3s';
              setTimeout(() => { card.style.outline = ''; }, 2000);
            }
          });
        }, 150);
      });
      container.appendChild(row);
    });
  } else {
    // Operational Resources
    const resourceEfforts = {};

    projects.forEach(p => {
      const rName = p.risorsa && p.risorsa.trim() ? p.risorsa.trim() : null;
      if (rName) {
        if (!resourceEfforts[rName]) {
          resourceEfforts[rName] = { count: 0, totalEffort: 0, pm: sanitizeProjectPM(p.pm) };
        }
        resourceEfforts[rName].count += 1;
        resourceEfforts[rName].totalEffort += (p.effort || 0);
      }
    });

    const rNames = Object.keys(resourceEfforts);
    if (rNames.length === 0) {
      container.innerHTML = `<div style="font-size:0.85rem; color:var(--text-muted); padding:1rem; text-align:center;">Nessuna risorsa operativa specifica inserita nei progetti.</div>`;
      return;
    }

    rNames.forEach(rName => {
      const data = resourceEfforts[rName];
      const totalEffort = data.totalEffort;
      
      const barPct = Math.min(totalEffort, 100);

      let statusText = `${totalEffort}%`;
      let colorStyle = 'var(--mp95-blue)';
      let bgStyle = 'linear-gradient(90deg, var(--mp95-blue), var(--success))';

      if (totalEffort > 100) {
        statusText = `${totalEffort}% ⚠️ Overload (+${totalEffort - 100}%)`;
        colorStyle = 'var(--danger)';
        bgStyle = 'var(--danger)';
      }

      const rowHtml = `
        <div style="display:flex; flex-direction:column; gap:0.4rem; padding:0.65rem 0.85rem; background:rgba(255,255,255,0.02); border-radius:var(--radius-md);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-weight:700; font-size:0.9rem;">${rName}</span>
              <span style="font-size:0.75rem; color:var(--text-dim); margin-left:0.4rem;">(Team ${data.pm})</span>
            </div>
            <span style="font-weight:800; font-size:0.82rem; color:${colorStyle};">
              ${statusText} (${data.count} attività)
            </span>
          </div>
          <div class="effort-progress-bg" title="Effort Risorsa (Capacità Standard 100%)">
            <div class="effort-progress-fill" style="width: ${barPct}%; background: ${bgStyle};"></div>
          </div>
        </div>
      `;
      container.innerHTML += rowHtml;
    });
  }
}

/* ----------------------------------------------------
   ANALYTICS & EXECUTIVE KPI VIEW
---------------------------------------------------- */
function initAnalyticsView() {
  renderAnalyticsView();
}

function renderAnalyticsView() {
  const totalPrj = projects.length;
  if (totalPrj === 0) return;

  // 1. Top KPI Calculations
  const totalEffort = projects.reduce((acc, p) => acc + (p.effort || 0), 0);
  const totalFTE = (totalEffort / 100).toFixed(1);

  // Saturation Rate (% of official coordinators capacity, 6 * 100% = 600%)
  const officialCoordsCount = OFFICIAL_COORDINATORS.length;
  const maxCapacity = officialCoordsCount * 100;
  const saturationPct = Math.round((totalEffort / maxCapacity) * 100);

  const avgProgress = Math.round(projects.reduce((acc, p) => acc + (p.avanzamento || 0), 0) / totalPrj);

  const atRiskCount = projects.filter(p => {
    const st = (p.stato_tempistiche || '').toLowerCase();
    return st === 'a rischio' || st === 'in ritardo';
  }).length;
  const riskRatio = Math.round((atRiskCount / totalPrj) * 100);

  // Department breakdown
  const deptEffort = {};
  const deptCount = {};
  projects.forEach(p => {
    const dept = p.reparto || 'Non Specificato';
    deptEffort[dept] = (deptEffort[dept] || 0) + (p.effort || 0);
    deptCount[dept] = (deptCount[dept] || 0) + 1;
  });

  let topDept = 'Non Specificato';
  let maxDeptEffort = -1;
  Object.keys(deptEffort).forEach(d => {
    if (deptEffort[d] > maxDeptEffort) {
      maxDeptEffort = deptEffort[d];
      topDept = d;
    }
  });

  // Render Top KPI Cards
  const satEl = document.getElementById('analyticsKpiSaturation');
  if (satEl) satEl.textContent = `${saturationPct}%`;
  const fteEl = document.getElementById('analyticsKpiFTE');
  if (fteEl) fteEl.textContent = totalFTE;
  const topDeptEl = document.getElementById('analyticsKpiTopDept');
  if (topDeptEl) topDeptEl.textContent = topDept;
  const avgProgEl = document.getElementById('analyticsKpiAvgProgress');
  if (avgProgEl) avgProgEl.textContent = `${avgProgress}%`;
  const riskRatioEl = document.getElementById('analyticsKpiRiskRatio');
  if (riskRatioEl) riskRatioEl.textContent = `${riskRatio}% (${atRiskCount} prj)`;

  // 2. Department Breakdown Widget
  const deptContainer = document.getElementById('analyticsDepartmentContainer');
  const deptTag = document.getElementById('analyticsDeptCountTag');
  if (deptTag) deptTag.textContent = `${Object.keys(deptEffort).length} Reparti Attivi`;

  if (deptContainer) {
    deptContainer.innerHTML = '';
    const sortedDepts = Object.keys(deptEffort).sort((a, b) => deptEffort[b] - deptEffort[a]);

    const colorMap = {
      'Data Management': '#06B6D4',
      'Data management': '#06B6D4',
      'Innovation':      '#A78BFA',
      'IT&Digital':      '#2872FA',
      'Digital':         '#2872FA',
      'Corporate':       '#F59E0B',
      'Support&Help Desk': '#10B981',
      'Governance':      '#10B981',
      'Infrastructure, Network & Security': '#EC4899',
      'Infra':           '#EC4899'
    };

    sortedDepts.forEach(dept => {
      const eff = deptEffort[dept];
      const count = deptCount[dept];
      const pctOfTotal = Math.round((eff / totalEffort) * 100) || 0;
      const fte = (eff / 100).toFixed(1);
      const color = colorMap[dept] || '#94A3B8';

      const row = document.createElement('div');
      row.style.cssText = 'display:flex; flex-direction:column; gap:0.4rem; padding:0.65rem 0.85rem; background:rgba(255,255,255,0.02); border-radius:var(--radius-md); border:1px solid var(--border-color);';
      row.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-weight:700; font-size:0.9rem; color:var(--text-main);">${dept}</span>
            <span style="font-size:0.75rem; color:var(--text-dim); margin-left:0.4rem;">(${count} progetti)</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span style="font-size:0.78rem; font-weight:700; color:${color};">${fte} FTE</span>
            <span style="font-weight:800; font-size:0.85rem; color:var(--text-main);">${eff}% (${pctOfTotal}%)</span>
          </div>
        </div>
        <div class="effort-progress-bg" style="height:7px;">
          <div class="effort-progress-fill" style="width: ${Math.min(eff, 100)}%; background: ${color};"></div>
        </div>
      `;
      deptContainer.appendChild(row);
    });
  }

  // 3. Coordinators Load & Capacity Matrix Widget
  const coordContainer = document.getElementById('analyticsCoordinatorsContainer');
  if (coordContainer) {
    coordContainer.innerHTML = '';
    const allCoords = getAllCoordinators();

    allCoords.forEach(coord => {
      const pmName = coord.name;
      const pmPrjs = projects.filter(p => sanitizeProjectPM(p.pm).toLowerCase() === pmName.toLowerCase());
      const pmEffort = pmPrjs.reduce((acc, p) => acc + (p.effort || 0), 0);
      const pmAvgAv = pmPrjs.length > 0 ? Math.round(pmPrjs.reduce((acc, p) => acc + (p.avanzamento || 0), 0) / pmPrjs.length) : 0;
      const teamRes = coordinatorResources[pmName] || [];

      let badgeText = '🟢 Bilanciato';
      let badgeColor = 'var(--success)';
      if (pmEffort > 100) {
        badgeText = '🔴 Overload';
        badgeColor = 'var(--danger)';
      } else if (pmEffort < 40 && pmPrjs.length > 0) {
        badgeText = '🟡 Sotto-utilizzato';
        badgeColor = 'var(--warning)';
      }

      const row = document.createElement('div');
      row.style.cssText = 'display:flex; flex-direction:column; gap:0.4rem; padding:0.65rem 0.85rem; background:rgba(255,255,255,0.02); border-radius:var(--radius-md); border:1px solid var(--border-color);';
      row.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-weight:700; font-size:0.9rem;">${pmName}</span>
            <span style="font-size:0.75rem; color:var(--text-dim); margin-left:0.4rem;">(${coord.reparto || 'Generale'})</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-size:0.75rem; font-weight:700; color:${badgeColor};">${badgeText}</span>
            <span style="font-weight:800; font-size:0.85rem; color:var(--mp95-orange);">${pmEffort}% effort</span>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; color:var(--text-muted); margin-top:0.1rem;">
          <span>Progetti: <strong>${pmPrjs.length}</strong> | Team: <strong>${teamRes.length} persone</strong></span>
          <span>Avanzamento Medio: <strong>${pmAvgAv}%</strong></span>
        </div>
        <div class="effort-progress-bg" style="height:6px; margin-top:0.2rem;">
          <div class="effort-progress-fill" style="width: ${Math.min(pmEffort, 100)}%; background: ${pmEffort > 100 ? 'var(--danger)' : 'var(--mp95-blue)'};"></div>
        </div>
      `;
      coordContainer.appendChild(row);
    });
  }

  // 4. Progress & Health Container Widget
  const healthContainer = document.getElementById('analyticsProgressHealthContainer');
  if (healthContainer) {
    healthContainer.innerHTML = '';

    const avBuckets = {
      'Iniziale (0-25%)': 0,
      'Intermedio (26-75%)': 0,
      'Avanzato (76-99%)': 0,
      'Completato (100%)': 0
    };

    projects.forEach(p => {
      const av = parseInt(p.avanzamento) || 0;
      if (av >= 100) avBuckets['Completato (100%)']++;
      else if (av >= 76) avBuckets['Avanzato (76-99%)']++;
      else if (av >= 26) avBuckets['Intermedio (26-75%)']++;
      else avBuckets['Iniziale (0-25%)']++;
    });

    Object.keys(avBuckets).forEach(bucket => {
      const count = avBuckets[bucket];
      const pct = Math.round((count / totalPrj) * 100) || 0;

      const row = document.createElement('div');
      row.style.cssText = 'display:flex; flex-direction:column; gap:0.35rem;';
      row.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem;">
          <span style="font-weight:600; color:var(--text-main);">${bucket}</span>
          <span style="font-weight:700;">${count} progetti (${pct}%)</span>
        </div>
        <div class="effort-progress-bg" style="height:6px;">
          <div class="effort-progress-fill" style="width: ${pct}%; background: linear-gradient(90deg, var(--mp95-blue), var(--success));"></div>
        </div>
      `;
      healthContainer.appendChild(row);
    });
  }

  // 5. Activity Types & Status Breakdown Widget
  const typeContainer = document.getElementById('analyticsActivityTypesContainer');
  if (typeContainer) {
    typeContainer.innerHTML = '';

    const statusCounts = {};
    projects.forEach(p => {
      const st = p.stato.trim();
      statusCounts[st] = (statusCounts[st] || 0) + 1;
    });

    Object.keys(statusCounts).forEach(status => {
      const cnt = statusCounts[status];
      const pct = Math.round((cnt / totalPrj) * 100) || 0;
      const statusEffort = projects.filter(p => p.stato.trim() === status).reduce((acc, p) => acc + (p.effort || 0), 0);

      const row = document.createElement('div');
      row.style.cssText = 'display:flex; flex-direction:column; gap:0.4rem; padding:0.6rem 0.8rem; background:rgba(255,255,255,0.02); border-radius:var(--radius-sm); border:1px solid var(--border-color);';
      row.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge ${getBadgeClass(status)}">${status}</span>
          <span style="font-weight:700; font-size:0.85rem;">${cnt} progetti (${pct}%)</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; color:var(--text-dim); margin-top:0.1rem;">
          <span>Effort Cumulativo: <strong>${statusEffort}%</strong></span>
          <span>FTE: <strong>${(statusEffort / 100).toFixed(1)}</strong></span>
        </div>
      `;
      typeContainer.appendChild(row);
    });
  }
}

/* ----------------------------------------------------
   PROJECTS VIEW
---------------------------------------------------- */
function initProjectsView() {
  populatePmFilterOptions();

  document.getElementById('projectSearchInput').addEventListener('input', renderProjectsTable);
  document.getElementById('statusFilter').addEventListener('change', renderProjectsTable);
  document.getElementById('pmFilter').addEventListener('change', renderProjectsTable);
  const tFilter = document.getElementById('tempisticheFilter');
  if (tFilter) tFilter.addEventListener('change', renderProjectsTable);
  const rFilter = document.getElementById('repartoFilter');
  if (rFilter) rFilter.addEventListener('change', renderProjectsTable);

  renderProjectsTable();
}

function populatePmFilterOptions() {
  const select = document.getElementById('pmFilter');
  if (!select) return;
  
  const currentVal = select.value;
  select.innerHTML = `<option value="">Tutti i PM / Coordinatori</option>`;
  
  const pmsSet = new Set();
  getAllCoordinators().forEach(c => pmsSet.add(c.name));
  projects.forEach(p => { if (p.pm && p.pm.trim()) pmsSet.add(p.pm.trim()); });

  pmsSet.forEach(pm => {
    select.innerHTML += `<option value="${pm}">${pm}</option>`;
  });
  select.value = currentVal;
}

function getBadgeClass(status) {
  const st = status.toLowerCase();
  if (st.includes('in corso')) return 'badge-in-corso';
  if (st.includes('manutenzione')) return 'badge-manutenzione';
  if (st.includes('terminato')) return 'badge-terminato';
  if (st.includes('stand by')) return 'badge-stand-by';
  if (st.includes('da iniziare')) return 'badge-da-iniziare';
  if (st.includes('periodica')) return 'badge-periodica';
  return 'badge-in-corso';
}

function getTempisticheClass(temp) {
  const t = temp.toLowerCase();
  if (t.includes('ritardo')) return 'tempistiche-ritardo';
  if (t.includes('rischio')) return 'tempistiche-rischio';
  return 'tempistiche-linea';
}

function getAvanzamentoClass(av) {
  if (av >= 100) return 'av-full';
  if (av >= 75) return 'av-high';
  if (av >= 40) return 'av-mid';
  return 'av-low';
}

function getRepartoBadge(reparto) {
  if (!reparto) return '<span style="color:var(--text-dim); font-size:0.78rem;">—</span>';
  const colorMap = {
    'Data management': '#06B6D4',
    'Innovation':      '#A78BFA',
    'Digital':         '#2872FA',
    'Corporate':       '#F59E0B',
    'Governance':      '#10B981',
    'Infrastructure, Network & Security': '#EC4899'
  };
  const color = colorMap[reparto] || '#94A3B8';
  return `<span style="display:inline-block;font-size:0.72rem;font-weight:700;padding:0.18rem 0.55rem;border-radius:9999px;background:${color}22;color:${color};border:1px solid ${color}55;white-space:nowrap;">${reparto}</span>`;
}

function formatScadenza(dateStr) {
  if (!dateStr) return '<span style="color:var(--text-dim); font-size:0.78rem;">—</span>';
  const d = new Date(dateStr);
  const isPast = d < new Date();
  const label = d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
  return `<span class="date-pill ${isPast ? 'past' : ''}">${label}</span>`;
}

function formatDateInizio(dateStr) {
  if (!dateStr) return '<span style="color:var(--text-dim); font-size:0.78rem;">—</span>';
  const d = new Date(dateStr);
  const label = d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
  return `<span class="date-pill" style="background:rgba(16,185,129,0.15); color:var(--success); border-color:rgba(16,185,129,0.3);">${label}</span>`;
}

function renderProjectsTable() {
  const tbody = document.getElementById('projectsTableBody');
  if (!tbody) return;

  const search = document.getElementById('projectSearchInput').value.toLowerCase();
  const statusFilter = document.getElementById('statusFilter').value;
  const pmFilter = document.getElementById('pmFilter').value;
  const tFilter = document.getElementById('tempisticheFilter');
  const tempisticheFilter = tFilter ? tFilter.value : '';
  const rFilter = document.getElementById('repartoFilter');
  const repartoFilter = rFilter ? rFilter.value : '';

  const filtered = projects.filter(p => {
    const matchesSearch = p.progetto.toLowerCase().includes(search) || p.pm.toLowerCase().includes(search) ||
      (p.risorsa || '').toLowerCase().includes(search);
    const matchesStatus = !statusFilter || p.stato.trim().toLowerCase() === statusFilter.toLowerCase();
    const matchesPm = !pmFilter || p.pm.trim() === pmFilter;
    const matchesTempistiche = !tempisticheFilter ||
      (p.stato_tempistiche || 'In linea').toLowerCase() === tempisticheFilter.toLowerCase();
    const matchesReparto = !repartoFilter || (p.reparto || '') === repartoFilter;
    return matchesSearch && matchesStatus && matchesPm && matchesTempistiche && matchesReparto;
  });

  tbody.innerHTML = '';
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="13" style="text-align:center; padding:2rem; color:var(--text-muted);">Nessun progetto trovato</td></tr>`;
    return;
  }

  filtered.forEach(p => {
    const badgeClass = getBadgeClass(p.stato);
    const avPct = parseInt(p.avanzamento) || 0;
    const avClass = getAvanzamentoClass(avPct);
    const tempisticheLabel = p.stato_tempistiche || 'In linea';
    const tempisticheClass = getTempisticheClass(tempisticheLabel);
    const startHtml = formatDateInizio(p.data_inizio);
    const scadenzaHtml = formatScadenza(p.scadenza);
    const risorsaText = p.risorsa || '<span style="color:var(--text-dim); font-size:0.78rem;">—</span>';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:700; color:var(--text-dim); font-size:0.82rem;">${p.id}</td>
      <td>
        <div style="font-weight:700;">${p.progetto}</div>
        ${p.descrizione ? `<div style="font-size:0.75rem; color:var(--text-dim); margin-top:0.2rem; max-width:220px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${p.descrizione}">${p.descrizione}</div>` : ''}
      </td>
      <td>${getRepartoBadge(p.reparto)}</td>
      <td style="font-size:0.85rem; color:var(--text-muted);">${risorsaText}</td>
      <td><span class="badge ${badgeClass}">${p.stato}</span></td>
      <td style="color:var(--text-muted); font-size:0.85rem;">${p.pm}</td>
      <td>
        <div class="effort-bar-container">
          <div class="effort-progress-bg">
            <div class="effort-progress-fill" style="width: ${Math.min(p.effort, 100)}%;"></div>
          </div>
          <span class="effort-val">${p.effort}%</span>
        </div>
      </td>
      <td>
        <div class="avanzamento-cell">
          <div class="avanzamento-bar-bg">
            <div class="avanzamento-bar-fill ${avClass}" style="width:${avPct}%;"></div>
          </div>
          <span class="avanzamento-label">${avPct}%</span>
        </div>
      </td>
      <td>${startHtml}</td>
      <td>${scadenzaHtml}</td>
      <td><span class="${tempisticheClass}">${tempisticheLabel}</span></td>
      <td>
        ${p.criticita
          ? `<div class="criticita-cell" title="${p.criticita.replace(/"/g, '&quot;')}">
               <i class="fa-solid fa-triangle-exclamation" style="color:var(--warning); font-size:0.85rem; flex-shrink:0;"></i>
               <span class="criticita-text">${p.criticita}</span>
             </div>`
          : `<button class="btn btn-secondary btn-sm criticita-empty-btn" onclick="openEditProjectModal('${p.id}')" title="Aggiungi criticit\u00e0">
               <i class="fa-solid fa-plus" style="font-size:0.75rem;"></i> Aggiungi nota
             </button>`
        }
      </td>
      <td style="text-align:right;">
        <button class="btn btn-secondary btn-sm" onclick="openEditProjectModal('${p.id}')">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn btn-secondary btn-sm" onclick="deleteProject('${p.id}')" style="color:var(--danger);">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/* ----------------------------------------------------
   COORDINATORS VIEW & TEAM MANAGEMENT
---------------------------------------------------- */
function initCoordinatorsView() {
  renderCoordinatorsGrid();
  initAddCoordinatorModalEvents();
  initResourceModalEvents();
}

function getProjectsForCoordinator(coordName) {
  const normCoord = coordName.trim().toLowerCase();
  return projects.filter(p => {
    const sanitizedPM = sanitizeProjectPM(p.pm).toLowerCase();
    return sanitizedPM === normCoord;
  });
}

function renderCoordinatorsGrid() {
  const grid = document.getElementById('coordinatorsGrid');
  if (!grid) return;

  const allCoords = getAllCoordinators();

  grid.innerHTML = '';
  allCoords.forEach((coord, pmIndex) => {
    const pmName = coord.name;
    const repartoLabel = coord.reparto || 'Generale';
    const badgeColor = coord.badgeColor || '#2872FA';

    const prjList = getProjectsForCoordinator(pmName);
    const resourcesList = coordinatorResources[pmName] || [];

    // Calculate effort per resource for this coordinator's team
    let teamEffortsSum = 0;
    let resourceCount = 0;
    let overloadedCount = 0;

    const resourceBarsHtml = resourcesList.map(r => {
      const rName = typeof r === 'string' ? r : r.name;
      const rRole = typeof r === 'object' && r.role ? r.role : '';
      const rEffort = getResourceEffort(rName);

      teamEffortsSum += rEffort;
      resourceCount++;
      if (rEffort > 100) overloadedCount++;

      const rBarWidthPct = Math.min(rEffort, 100);
      let rBadge = '<span style="color:var(--success); font-weight:700;">🟢 Std</span>';
      let rFill = 'linear-gradient(90deg, var(--mp95-blue), var(--success))';
      let rColor = 'var(--text-main)';

      if (rEffort > 100) {
        rBadge = '<span style="color:var(--danger); font-weight:800;">🔴 OVERLOAD</span>';
        rFill = 'var(--danger)';
        rColor = 'var(--danger)';
      }

      return `
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.5rem 0.75rem; margin-bottom:0.4rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; margin-bottom:0.3rem;">
            <div>
              <span style="font-weight:700; color:var(--text-main);">${rName}</span>
              ${rRole ? `<span style="font-size:0.72rem; color:var(--text-dim); margin-left:0.3rem;">(${rRole})</span>` : ''}
            </div>
            <span style="font-weight:800; color:${rColor};">${rEffort}%</span>
          </div>
          <div class="pm-capacity-bar" style="height:6px;" title="Effort individuale di ${rName}">
            <div class="pm-capacity-fill" style="width:${rBarWidthPct}%; background:${rFill};"></div>
          </div>
        </div>
      `;
    }).join('');

    const avgTeamEffort = resourceCount > 0 ? Math.round(teamEffortsSum / resourceCount) : 0;

    let overallBadge = `<span style="color:var(--success); font-weight:700;">🟢 Team in Capacità (Media ${avgTeamEffort}%)</span>`;
    if (overloadedCount > 0) {
      overallBadge = `<span style="color:var(--danger); font-weight:800;">🔴 ${overloadedCount} Risorse in Overload (>100%)</span>`;
    } else if (avgTeamEffort > 100) {
      overallBadge = `<span style="color:var(--danger); font-weight:700;">🔴 Media Team in Overload (${avgTeamEffort}%)</span>`;
    }

    const initials = pmName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

    const card = document.createElement('div');
    card.className = 'pm-card';

    card.innerHTML = `
      <div class="pm-header">
        <div class="pm-avatar" style="background:${badgeColor}22; color:${badgeColor}; border:1px solid ${badgeColor}66;">${initials}</div>
        <div class="pm-info">
          <h4>${pmName}</h4>
          <span style="font-size:0.75rem; font-weight:700; padding:0.15rem 0.5rem; border-radius:9999px; background:${badgeColor}22; color:${badgeColor}; border:1px solid ${badgeColor}44;">
            ${repartoLabel}
          </span>
        </div>
      </div>

      <div class="pm-capacity-gauge">
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; font-weight:700; margin-bottom:0.4rem;">
          <span>Allocazione Risorse Team (${resourcesList.length} persone)</span>
          <span style="font-size:0.78rem; color:var(--text-dim);">Media: ${avgTeamEffort}%</span>
        </div>
        ${overallBadge}
        <div style="margin-top:0.65rem;">
          ${resourceBarsHtml || '<div style="font-size:0.8rem; color:var(--text-dim); font-style:italic;">Nessuna risorsa nel team</div>'}
        </div>
      </div>

      <div class="pm-stat-row" style="margin-top:0.75rem;">
        <span style="color:var(--text-muted);">Progetti Gestiti dal Coordinatore</span>
        <span style="font-weight:700;">${prjList.length}</span>
      </div>

      <div class="pm-dropdown-section">

        <!-- DROPDOWN 1: PROGETTI DEL COORDINATORE -->
        <div class="pm-accordion open" id="accordion-prj-${pmIndex}">
          <div class="pm-accordion-header" onclick="toggleAccordion('accordion-prj-${pmIndex}')">
            <span><i class="fa-solid fa-folder-tree" style="color:var(--mp95-orange); margin-right:0.4rem;"></i> Progetti del Coordinatore (${prjList.length})</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="pm-accordion-body">
            ${prjList.length === 0 ? '<div style="font-size:0.82rem; color:var(--text-dim);">Nessun progetto assegnato</div>' : ''}
            ${prjList.map(p => `
              <div class="pm-project-item">
                <div>
                  <span style="font-weight:600;">${p.progetto}</span>
                  <span class="badge ${getBadgeClass(p.stato)}" style="margin-left:0.4rem; font-size:0.7rem;">${p.stato}</span>
                </div>
                <span style="font-weight:700; color:var(--mp95-orange);">${p.effort}%</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- DROPDOWN 2: RISORSE DEL TEAM -->
        <div class="pm-accordion" id="accordion-res-${pmIndex}">
          <div class="pm-accordion-header" onclick="toggleAccordion('accordion-res-${pmIndex}')">
            <span><i class="fa-solid fa-users" style="color:var(--mp95-blue); margin-right:0.4rem;"></i> Risorse del Team (${resourcesList.length})</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="pm-accordion-body">
            ${resourcesList.length === 0 ? '<div style="font-size:0.82rem; color:var(--text-dim); margin-bottom:0.4rem;">Nessuna risorsa nel team</div>' : ''}
            ${resourcesList.map((r, rIdx) => `
              <div class="pm-project-item" style="flex-direction:column; align-items:flex-start; gap:0.25rem; position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%; font-weight:700;">
                  <span><i class="fa-solid fa-user-check" style="color:var(--success); font-size:0.8rem;"></i> ${r.name}</span>
                  <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span style="font-size:0.75rem; color:var(--text-dim);">${r.role || 'Specialista'}</span>
                    <button onclick="openResourceModal('${encodeURIComponent(pmName)}', ${rIdx})" style="background:none; border:none; color:var(--mp95-blue); cursor:pointer; font-size:0.85rem;" title="Modifica risorsa">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="deleteTeamResource('${encodeURIComponent(pmName)}', ${rIdx})" style="background:none; border:none; color:var(--danger); cursor:pointer; font-size:0.85rem;" title="Rimuovi risorsa dal team">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted);">
                  Target: ${r.projects && r.projects.length > 0 ? r.projects.join(', ') : 'Nessun progetto specifico'}
                </div>
              </div>
            `).join('')}
            <button class="btn btn-secondary btn-sm" style="margin-top:0.5rem; width:100%; justify-content:center;" onclick="openResourceModal('${encodeURIComponent(pmName)}')">
              <i class="fa-solid fa-user-plus"></i> + Aggiungi Risorsa al Team
            </button>
          </div>
        </div>

        <!-- DROPDOWN 3: PROGETTI DELLE RISORSE -->
        <div class="pm-accordion" id="accordion-resprj-${pmIndex}">
          <div class="pm-accordion-header" onclick="toggleAccordion('accordion-resprj-${pmIndex}')">
            <span><i class="fa-solid fa-diagram-next" style="color:var(--accent-cyan); margin-right:0.4rem;"></i> Progetti delle Risorse</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="pm-accordion-body">
            ${resourcesList.length === 0 ? '<div style="font-size:0.82rem; color:var(--text-dim);">Nessuna risorsa censita</div>' : `
              <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">Seleziona Risorsa del Team:</label>
              <select class="resource-select-box" onchange="renderResourceProjects(this, '${encodeURIComponent(pmName)}')">
                <option value="">-- Scegli Risorsa --</option>
                ${resourcesList.map((r, idx) => `<option value="${idx}">${r.name} (${r.role || 'Specialista'})</option>`).join('')}
              </select>
              <div class="resource-projects-output" style="display:flex; flex-direction:column; gap:0.4rem; margin-top:0.5rem;">
                <div style="font-size:0.8rem; color:var(--text-dim); italic;">Seleziona una risorsa per visualizzare i relativi progetti.</div>
              </div>
            `}
          </div>
        </div>

      </div>
    `;
    grid.appendChild(card);
  });
}

window.toggleAccordion = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
};

window.renderResourceProjects = function(selectEl, encodedPmName) {
  const pmName = decodeURIComponent(encodedPmName);
  const resourceIdx = selectEl.value;
  const container = selectEl.nextElementSibling;

  if (resourceIdx === "" || !coordinatorResources[pmName] || !coordinatorResources[pmName][resourceIdx]) {
    container.innerHTML = `<div style="font-size:0.8rem; color:var(--text-dim);">Seleziona una risorsa per visualizzare i relativi progetti.</div>`;
    return;
  }

  const res = coordinatorResources[pmName][resourceIdx];
  const resPrjs = res.projects || [];

  if (resPrjs.length === 0) {
    container.innerHTML = `<div style="font-size:0.8rem; color:var(--text-dim);">Nessun progetto attualmente in carico a ${res.name}.</div>`;
    return;
  }

  container.innerHTML = resPrjs.map(pName => {
    const prjObj = projects.find(p => p.progetto.trim().toLowerCase() === pName.trim().toLowerCase());
    const effort = prjObj ? prjObj.effort : 'N/D';

    return `
      <div class="resource-project-tag">
        <span><i class="fa-solid fa-cube" style="color:var(--mp95-orange); margin-right:0.3rem;"></i> ${pName}</span>
        <span style="color:var(--mp95-blue); font-weight:700;">${effort}% effort</span>
      </div>
    `;
  }).join('');
};

/* Resource Modal Handlers */
function initResourceModalEvents() {
  const closeBtn = document.getElementById('closeResourceModal');
  const cancelBtn = document.getElementById('cancelResourceBtn');
  const form = document.getElementById('resourceForm');

  if (closeBtn) closeBtn.addEventListener('click', closeResourceModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeResourceModal);
  if (form) form.addEventListener('submit', handleSaveResourceForm);
}

window.openResourceModal = function(encodedPmName, resourceIdx = null) {
  const pmName = decodeURIComponent(encodedPmName);
  document.getElementById('resourceCoordinatorInput').value = pmName;
  document.getElementById('resourceCoordinatorNameDisplay').textContent = pmName;

  const titleEl = document.getElementById('resourceModalTitle');
  const editIndexInput = document.getElementById('resourceEditIndexInput');
  const nameInput = document.getElementById('resourceNameInput');
  const roleInput = document.getElementById('resourceRoleInput');
  const projectsInput = document.getElementById('resourceProjectsInput');

  if (resourceIdx !== null && resourceIdx !== undefined && resourceIdx >= 0 && coordinatorResources[pmName] && coordinatorResources[pmName][resourceIdx]) {
    const res = coordinatorResources[pmName][resourceIdx];
    const resName = typeof res === 'string' ? res : res.name;
    const resRole = typeof res === 'object' ? (res.role || '') : '';
    const resPrjs = typeof res === 'object' && Array.isArray(res.projects) ? res.projects : [];

    if (editIndexInput) editIndexInput.value = resourceIdx;
    if (nameInput) nameInput.value = resName;
    if (roleInput) roleInput.value = resRole;
    if (projectsInput) projectsInput.value = resPrjs.join(', ');
    if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-user-pen" style="color:var(--mp95-blue); margin-right:0.5rem;"></i> Modifica Risorsa del Team`;
  } else {
    if (editIndexInput) editIndexInput.value = '-1';
    if (nameInput) nameInput.value = '';
    if (roleInput) roleInput.value = '';
    if (projectsInput) projectsInput.value = '';
    if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-user-plus" style="color:var(--mp95-blue); margin-right:0.5rem;"></i> Aggiungi Risorsa al Team`;
  }

  document.getElementById('resourceModal').classList.add('active');
};

function closeResourceModal() {
  const modal = document.getElementById('resourceModal');
  if (modal) modal.classList.remove('active');
}

async function handleSaveResourceForm(e) {
  e.preventDefault();
  const pmName = document.getElementById('resourceCoordinatorInput').value;
  const editIndexVal = document.getElementById('resourceEditIndexInput') ? parseInt(document.getElementById('resourceEditIndexInput').value, 10) : -1;
  const name = document.getElementById('resourceNameInput').value.trim();
  const role = document.getElementById('resourceRoleInput').value.trim() || 'Specialista IT';
  const projectsStr = document.getElementById('resourceProjectsInput').value.trim();

  if (!name) return;

  const projectsArr = projectsStr ? projectsStr.split(',').map(p => p.trim()).filter(Boolean) : [];

  if (!coordinatorResources[pmName]) {
    coordinatorResources[pmName] = [];
  }

  const isEdit = editIndexVal >= 0 && coordinatorResources[pmName][editIndexVal];
  let oldName = '';
  let oldProjects = [];

  if (isEdit) {
    const existingObj = coordinatorResources[pmName][editIndexVal];
    oldName = typeof existingObj === 'string' ? existingObj : existingObj.name;
    oldProjects = typeof existingObj === 'object' && Array.isArray(existingObj.projects) ? existingObj.projects : [];

    coordinatorResources[pmName][editIndexVal] = {
      name: name,
      role: role,
      projects: projectsArr
    };
  } else {
    const existingIdx = coordinatorResources[pmName].findIndex(r => (typeof r === 'string' ? r : r.name).toLowerCase() === name.toLowerCase());
    if (existingIdx >= 0) {
      const existing = coordinatorResources[pmName][existingIdx];
      const existingProjects = typeof existing === 'object' && existing.projects ? existing.projects : [];
      const combinedPrjs = [...new Set([...existingProjects, ...projectsArr])];
      coordinatorResources[pmName][existingIdx] = {
        name: name,
        role: role || (typeof existing === 'object' ? existing.role : 'Specialista IT'),
        projects: combinedPrjs
      };
    } else {
      coordinatorResources[pmName].push({ name, role, projects: projectsArr });
    }
  }

  // Find coordinator reparto
  const allCoords = getAllCoordinators();
  const coordObj = allCoords.find(c => c.name.toLowerCase() === pmName.toLowerCase());
  const reparto = coordObj ? coordObj.reparto : null;

  const normPm = pmName.trim().toLowerCase();

  // If editing and name changed, update risorsa name in projects table
  if (isEdit && oldName && oldName.toLowerCase() !== name.toLowerCase()) {
    projects.forEach(p => {
      if (sanitizeProjectPM(p.pm).toLowerCase() === normPm && p.risorsa && p.risorsa.trim().toLowerCase() === oldName.toLowerCase()) {
        p.risorsa = name;
      }
    });
  }

  // If editing, unassign projects that were in oldProjects but are no longer in projectsArr
  if (isEdit && oldProjects.length > 0) {
    const newNormProjects = new Set(projectsArr.map(p => p.toLowerCase()));
    oldProjects.forEach(oldPName => {
      if (!newNormProjects.has(oldPName.toLowerCase())) {
        projects.forEach(p => {
          if (sanitizeProjectPM(p.pm).toLowerCase() === normPm &&
              p.progetto.trim().toLowerCase() === oldPName.trim().toLowerCase() &&
              p.risorsa && (p.risorsa.trim().toLowerCase() === name.toLowerCase() || p.risorsa.trim().toLowerCase() === oldName.toLowerCase())) {
            p.risorsa = null;
          }
        });
      }
    });
  }

  let maxIdNum = 0;
  projects.forEach(p => {
    const match = (p.id || '').match(/^PRJ-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxIdNum) maxIdNum = num;
    }
  });

  // Update or create project rows for projectsArr
  projectsArr.forEach(pName => {
    const normPName = pName.trim().toLowerCase();

    const existingPrj = projects.find(p =>
      p.progetto.trim().toLowerCase() === normPName &&
      sanitizeProjectPM(p.pm).toLowerCase() === normPm &&
      (!p.risorsa || p.risorsa.trim() === '' || p.risorsa.trim().toLowerCase() === name.toLowerCase() || (oldName && p.risorsa.trim().toLowerCase() === oldName.toLowerCase()))
    );

    if (existingPrj) {
      existingPrj.risorsa = name;
      if (!existingPrj.reparto && reparto) existingPrj.reparto = reparto;
    } else {
      maxIdNum++;
      const newId = `PRJ-${String(maxIdNum).padStart(3, '0')}`;
      const newPrj = {
        id: newId,
        progetto: pName.trim(),
        stato: 'In corso',
        pm: pmName,
        effort: 10,
        risorsa: name,
        reparto: reparto,
        descrizione: null,
        effort_previsto: 0,
        effort_residuo: 0,
        avanzamento: 0,
        data_inizio: new Date().toISOString().slice(0, 10),
        scadenza: null,
        stato_tempistiche: 'In linea',
        criticita: null
      };
      projects.push(newPrj);
    }
  });

  // saveState() handles both LocalStorage and Neon DB persistence
  saveState();
  closeResourceModal();
  showToast(isEdit ? `Risorsa ${name} aggiornata con successo!` : `Nuova risorsa ${name} ed i relativi progetti aggiunti con successo!`);
}

window.deleteTeamResource = async function(encodedPmName, resourceIdx) {
  const pmName = decodeURIComponent(encodedPmName);
  if (!coordinatorResources[pmName] || !coordinatorResources[pmName][resourceIdx]) return;

  const resObj = coordinatorResources[pmName][resourceIdx];
  const resName = typeof resObj === 'string' ? resObj : resObj.name;
  if (!confirm(`Sei sicuro di voler rimuovere ${resName} dal team di ${pmName}?`)) return;

  coordinatorResources[pmName].splice(resourceIdx, 1);

  // Clear risorsa association in projects
  projects.forEach(p => {
    if (sanitizeProjectPM(p.pm).toLowerCase() === pmName.toLowerCase() && p.risorsa && p.risorsa.trim().toLowerCase() === resName.toLowerCase()) {
      p.risorsa = null;
    }
  });

  // saveState() handles both LocalStorage and Neon DB persistence
  saveState();
  showToast(`Risorsa ${resName} rimossa dal team.`);
};

/* Add Coordinator Modal Handlers */
function initAddCoordinatorModalEvents() {
  const addBtn = document.getElementById('addCoordinatorBtn');
  const closeBtn = document.getElementById('closeAddCoordinatorModal');
  const cancelBtn = document.getElementById('cancelAddCoordinatorBtn');
  const form = document.getElementById('addCoordinatorForm');

  if (addBtn) addBtn.addEventListener('click', () => {
    document.getElementById('newCoordinatorNameInput').value = '';
    document.getElementById('addCoordinatorModal').classList.add('active');
  });

  if (closeBtn) closeBtn.addEventListener('click', closeAddCoordinatorModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeAddCoordinatorModal);

  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('newCoordinatorNameInput').value.trim();
    const reparto = document.getElementById('newCoordinatorRepartoInput').value;

    if (!name) return;

    const colorMap = {
      'Data Management': '#06B6D4',
      'IT&Digital': '#2872FA',
      'Infra': '#EC4899',
      'Corporate': '#F59E0B',
      'Support&Help Desk': '#10B981',
      'Innovation': '#A78BFA',
      'Governance': '#10B981'
    };

    customCoordinators.push({
      name,
      reparto,
      badgeColor: colorMap[reparto] || '#94A3B8'
    });

    localStorage.setItem('mp95_custom_coordinators', JSON.stringify(customCoordinators));

    if (!coordinatorResources[name]) {
      coordinatorResources[name] = [];
    }

    saveState();
    closeAddCoordinatorModal();
    showToast(`Nuovo Coordinatore ${name} (${reparto}) aggiunto!`);
  });
}

function closeAddCoordinatorModal() {
  const modal = document.getElementById('addCoordinatorModal');
  if (modal) modal.classList.remove('active');
}

/* ----------------------------------------------------
   TIMELINE & CALENDAR VIEW (GOVERNANCE TEMPORALE)
---------------------------------------------------- */
let currentCalendarDate = new Date();
let currentTimelineViewMode = 'gantt'; // 'gantt' or 'calendar'

function initTimelineView() {
  const pmFilter = document.getElementById('timelinePmFilter');
  const statusFilter = document.getElementById('timelineStatusFilter');

  if (pmFilter) pmFilter.addEventListener('change', refreshTimelineView);
  if (statusFilter) statusFilter.addEventListener('change', refreshTimelineView);

  const toggleGanttBtn = document.getElementById('toggleGanttViewBtn');
  const toggleCalendarBtn = document.getElementById('toggleCalendarViewBtn');

  if (toggleGanttBtn && toggleCalendarBtn) {
    toggleGanttBtn.addEventListener('click', () => {
      currentTimelineViewMode = 'gantt';
      toggleGanttBtn.className = 'btn btn-primary btn-sm active';
      toggleCalendarBtn.className = 'btn btn-secondary btn-sm';
      document.getElementById('ganttViewSection').style.display = 'block';
      document.getElementById('calendarViewSection').style.display = 'none';
      renderGanttChart();
    });

    toggleCalendarBtn.addEventListener('click', () => {
      currentTimelineViewMode = 'calendar';
      toggleCalendarBtn.className = 'btn btn-primary btn-sm active';
      toggleGanttBtn.className = 'btn btn-secondary btn-sm';
      document.getElementById('calendarViewSection').style.display = 'block';
      document.getElementById('ganttViewSection').style.display = 'none';
      renderCalendarGrid();
    });
  }

  const prevBtn = document.getElementById('prevMonthBtn');
  const todayBtn = document.getElementById('todayMonthBtn');
  const nextBtn = document.getElementById('nextMonthBtn');

  if (prevBtn) prevBtn.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendarGrid();
  });
  if (todayBtn) todayBtn.addEventListener('click', () => {
    currentCalendarDate = new Date();
    renderCalendarGrid();
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendarGrid();
  });

  populateTimelinePmFilter();
  refreshTimelineView();
}

function populateTimelinePmFilter() {
  const select = document.getElementById('timelinePmFilter');
  if (!select) return;

  const curVal = select.value;
  select.innerHTML = `<option value="">Tutti i Coordinatori</option>`;
  OFFICIAL_COORDINATORS.forEach(c => {
    select.innerHTML += `<option value="${c.name}">${c.name} (${c.reparto})</option>`;
  });
  select.value = curVal;
}

function refreshTimelineView() {
  if (currentTimelineViewMode === 'gantt') {
    renderGanttChart();
  } else {
    renderCalendarGrid();
  }
}

function renderGanttChart() {
  const container = document.getElementById('ganttChartContainer');
  if (!container) return;

  const pmFilterVal = (document.getElementById('timelinePmFilter').value || '').toLowerCase();
  const statusFilterVal = (document.getElementById('timelineStatusFilter').value || '').toLowerCase();

  const currentYear = new Date().getFullYear();
  const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giug', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

  let totalTasksRendered = 0;
  const allCoordinatorsList = getAllCoordinators();

  const coordsToDisplay = allCoordinatorsList.filter(c => !pmFilterVal || c.name.toLowerCase().includes(pmFilterVal));

  let html = `
    <div class="gantt-grid">
      <div class="gantt-header-row">
        <div>Coordinatore / Attività</div>
        ${months.map(m => `<div>${m} ${currentYear}</div>`).join('')}
      </div>
  `;

  coordsToDisplay.forEach(coord => {
    const pmName = coord.name;
    let pmProjects = getProjectsForCoordinator(pmName);

    if (statusFilterVal) {
      pmProjects = pmProjects.filter(p => p.stato.toLowerCase().includes(statusFilterVal));
    }

    if (pmProjects.length === 0) return;

    totalTasksRendered += pmProjects.length;

    html += `
      <div class="gantt-coord-group">
        <div class="gantt-coord-title">
          <span><i class="fa-solid fa-user-tie"></i> ${pmName} (${coord.reparto || 'Generale'})</span>
          <span style="font-size:0.78rem; font-weight:700; color:var(--text-muted);">${pmProjects.length} attività temporali</span>
        </div>
    `;

    pmProjects.forEach(p => {
      const startDate = p.data_inizio ? new Date(p.data_inizio) : new Date(currentYear, 0, 1);
      const endDate = p.scadenza ? new Date(p.scadenza) : new Date(currentYear, 11, 31);

      const yearStart = new Date(currentYear, 0, 1);
      const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59);
      const totalYearMs = yearEnd - yearStart;

      let startOffsetMs = startDate - yearStart;
      if (startOffsetMs < 0) startOffsetMs = 0;
      let leftPct = (startOffsetMs / totalYearMs) * 100;
      if (leftPct > 95) leftPct = 95;

      let durationMs = endDate - startDate;
      if (durationMs <= 0) durationMs = 30 * 24 * 60 * 60 * 1000;
      let widthPct = (durationMs / totalYearMs) * 100;
      if (leftPct + widthPct > 100) widthPct = 100 - leftPct;
      if (widthPct < 5) widthPct = 5;

      const effortVal = p.effort || 0;
      const avPct = p.avanzamento || 0;

      html += `
        <div class="gantt-task-row">
          <div class="gantt-task-info">
            <div class="gantt-task-name" title="${p.progetto}">${p.progetto}</div>
            <div style="font-size:0.72rem; color:var(--text-dim);">
              <span class="badge ${getBadgeClass(p.stato)}" style="font-size:0.68rem; padding:0.1rem 0.4rem;">${p.stato}</span>
              ${p.risorsa ? ` • ${p.risorsa}` : ''}
            </div>
          </div>
          <div class="gantt-timeline-track">
            <div class="gantt-bar" style="left:${leftPct}%; width:${widthPct}%;" onclick="openEditProjectModal('${p.id}')" title="Attività: ${p.progetto} (${effortVal}% effort, Avanzamento ${avPct}%)\nDal ${startDate.toLocaleDateString('it-IT')} al ${endDate.toLocaleDateString('it-IT')}">
              <span>${p.progetto.length > 18 ? p.progetto.slice(0, 16) + '...' : p.progetto}</span>
              <span>${effortVal}%</span>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  });

  html += `</div>`;

  if (totalTasksRendered === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1.5rem; color:var(--text-muted);">
        <i class="fa-solid fa-calendar-xmark" style="font-size:2.5rem; color:var(--mp95-orange); margin-bottom:1rem;"></i>
        <h4 style="margin:0 0 0.5rem 0; font-size:1.1rem; color:var(--text-main);">Nessuna attività temporale trovata</h4>
        <p style="font-size:0.88rem; color:var(--text-dim); max-width:480px; margin:0 auto 1.25rem auto;">
          Nessun progetto soddisfa i filtri selezionati. Prova a selezionare "Tutti i Coordinatori" oppure aggiungi una nuova attività temporale!
        </p>
        <button class="btn btn-primary btn-sm" onclick="openCreateProjectModal()">
          <i class="fa-solid fa-plus"></i> Nuova Attività Temporale
        </button>
      </div>
    `;
  } else {
    container.innerHTML = html;
  }
}

function renderCalendarGrid() {
  const container = document.getElementById('calendarGridContainer');
  const titleEl = document.getElementById('calendarMonthTitle');
  if (!container) return;

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  
  if (titleEl) {
    titleEl.innerHTML = `<i class="fa-solid fa-calendar-days" style="color:var(--mp95-orange);"></i> Calendario Attività MP95 — ${monthNames[month]} ${year}`;
  }

  const pmFilterVal = (document.getElementById('timelinePmFilter').value || '').toLowerCase();
  const statusFilterVal = (document.getElementById('timelineStatusFilter').value || '').toLowerCase();

  let filteredProjects = projects;
  if (pmFilterVal) {
    filteredProjects = filteredProjects.filter(p => sanitizeProjectPM(p.pm).toLowerCase().includes(pmFilterVal));
  }
  if (statusFilterVal) {
    filteredProjects = filteredProjects.filter(p => p.stato.toLowerCase().includes(statusFilterVal));
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;

  const dayHeaders = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  let html = `
    <div class="calendar-month-grid">
      ${dayHeaders.map(d => `<div class="calendar-day-header">${d}</div>`).join('')}
  `;

  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayNum = prevMonthDays - i;
    html += `
      <div class="calendar-day-cell other-month">
        <span class="calendar-day-num">${dayNum}</span>
      </div>
    `;
  }

  const today = new Date();
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
    const dayDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    const dayProjects = filteredProjects.filter(p => {
      if (!p.scadenza && !p.data_inizio) return false;
      const startStr = p.data_inizio ? String(p.data_inizio).slice(0, 10) : '';
      const endStr = p.scadenza ? String(p.scadenza).slice(0, 10) : '';
      return startStr === dayDateStr || endStr === dayDateStr;
    });

    html += `
      <div class="calendar-day-cell ${isToday ? 'today' : ''}">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="calendar-day-num">${d}</span>
          ${isToday ? `<span style="font-size:0.65rem; font-weight:800; color:var(--mp95-orange);">OGGI</span>` : ''}
        </div>
        ${dayProjects.map(p => `
          <div class="calendar-project-pill" onclick="openEditProjectModal('${p.id}')" title="${p.progetto} (${p.pm}) - ${p.effort}% effort">
            ${p.progetto.length > 14 ? p.progetto.slice(0, 12) + '..' : p.progetto} (${p.effort}%)
          </div>
        `).join('')}
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;
}

window.setPresetDuration = function(mode) {
  const startEl = document.getElementById('modalDataInizio');
  const endEl = document.getElementById('modalScadenza');
  if (!startEl || !endEl) return;

  const today = new Date();
  let startDate = startEl.value ? new Date(startEl.value) : today;
  if (isNaN(startDate.getTime())) startDate = today;

  const startISO = startDate.toISOString().slice(0, 10);
  startEl.value = startISO;

  let endDate = new Date(startDate);
  if (mode === 'yearEnd') {
    endDate = new Date(startDate.getFullYear(), 11, 31);
  } else if (typeof mode === 'number') {
    endDate.setMonth(endDate.getMonth() + mode);
  }

  const endISO = endDate.toISOString().slice(0, 10);
  endEl.value = endISO;
  showToast(`Durata impostata: dal ${startISO} al ${endISO}`);
};

/* ----------------------------------------------------
   EXCEL FILE UPLOAD & IMPORT HANDLERS (.xlsx, .xls)
---------------------------------------------------- */
let pendingImportProjects = [];
let pendingImportFileName = '';

function initExcelFileHandlers() {
  const topbarBtn = document.getElementById('topbarUploadExcelBtn');
  const topbarInput = document.getElementById('topbarExcelFileInput');
  const projectsBtn = document.getElementById('projectsUploadExcelBtn');

  if (topbarBtn && topbarInput) {
    topbarBtn.addEventListener('click', () => topbarInput.click());
    topbarInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleExcelFileInput(e.target.files[0]);
      }
    });
  }

  if (projectsBtn && topbarInput) {
    projectsBtn.addEventListener('click', () => topbarInput.click());
  }

  initCoordinatorModalEvents();
}

function initCoordinatorModalEvents() {
  const closeBtn = document.getElementById('closeCoordinatorModal');
  const cancelBtn = document.getElementById('cancelCoordinatorBtn');
  const confirmBtn = document.getElementById('confirmCoordinatorBtn');
  const selectEl = document.getElementById('coordinatorSelectInput');
  const customGroup = document.getElementById('customCoordinatorGroup');

  if (closeBtn) closeBtn.addEventListener('click', closeCoordinatorModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeCoordinatorModal);

  if (selectEl) {
    selectEl.addEventListener('change', () => {
      if (selectEl.value === '__NEW__') {
        customGroup.style.display = 'block';
        const customInput = document.getElementById('customCoordinatorInput');
        if (customInput) customInput.focus();
      } else {
        customGroup.style.display = 'none';
      }
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', processCoordinatorImportConfirm);
  }
}

function openCoordinatorModal(importedList, fileName, colMapReport) {
  pendingImportProjects = importedList;
  pendingImportFileName = fileName;

  const modal = document.getElementById('coordinatorModal');
  const countEl = document.getElementById('coordinatorModalCount');
  const fileNameEl = document.getElementById('coordinatorModalFileName');
  const selectEl = document.getElementById('coordinatorSelectInput');
  const customGroup = document.getElementById('customCoordinatorGroup');
  const customInput = document.getElementById('customCoordinatorInput');

  if (countEl) countEl.textContent = importedList.length;
  if (fileNameEl) fileNameEl.textContent = fileName;
  if (customInput) customInput.value = '';
  if (customGroup) customGroup.style.display = 'none';

  // --- Render column mapping preview ---
  const previewEl = document.getElementById('colMappingPreview');
  const mappedEl = document.getElementById('colMappingMapped');
  const missingEl = document.getElementById('colMappingMissing');
  if (previewEl && colMapReport) {
    const mapped = colMapReport.mapped;   // [{field, header, score}]
    const missing = colMapReport.missing; // [fieldName]

    const FIELD_LABELS = {
      progetto: 'Progetto', stato: 'Stato', effort: 'Effort %',
      risorsa: 'Risorsa', reparto: 'Reparto', descrizione: 'Descrizione',
      criticita: 'Criticità', scadenza: 'Scadenza',
      data_inizio: 'Data Inizio', avanzamento: 'Avanzamento %'
    };

    let mappedHtml = '';
    if (mapped.length > 0) {
      mappedHtml = mapped.map(m => {
        const isExact = m.score === 'exact';
        const icon = isExact ? '✅' : (m.score === 'keyword' ? '🔍' : '🔤');
        const extra = m.header !== FIELD_LABELS[m.field] ? `&nbsp;<span style="opacity:0.6;">← "${m.header}"</span>` : '';
        return `<div style="line-height:1.8;">${icon} <strong>${FIELD_LABELS[m.field] || m.field}</strong>${extra}</div>`;
      }).join('');
    }

    let missingHtml = '';
    if (missing.length > 0) {
      const missingStr = missing.map(f => FIELD_LABELS[f] || f).join(', ');
      missingHtml = `<div style="color:var(--mp95-orange,#f59e0b); margin-top:0.3rem;">⚠️ Non rilevato: <em>${missingStr}</em> (saranno lasciati vuoti)</div>`;
    }

    if (mappedEl) mappedEl.innerHTML = mappedHtml;
    if (missingEl) missingEl.innerHTML = missingHtml;
    previewEl.style.display = 'block';
  } else if (previewEl) {
    previewEl.style.display = 'none';
  }

  // Extract list of known PMs from OFFICIAL_COORDINATORS, projects & coordinatorResources
  const pmsSet = new Set();
  getAllCoordinators().forEach(c => pmsSet.add(c.name));
  projects.forEach(p => { if (p.pm && p.pm.trim()) pmsSet.add(p.pm.trim()); });
  Object.keys(coordinatorResources).forEach(pm => {
    if (pm.trim()) pmsSet.add(pm.trim());
  });

  selectEl.innerHTML = '';
  selectEl.innerHTML += `<option value="">-- Seleziona un Coordinatore Esistente --</option>`;
  pmsSet.forEach(pm => {
    const matchOfficial = OFFICIAL_COORDINATORS.find(c => c.name.toLowerCase() === pm.toLowerCase());
    const label = matchOfficial ? `${pm} (${matchOfficial.reparto})` : pm;
    selectEl.innerHTML += `<option value="${pm}">${label}</option>`;
  });
  selectEl.innerHTML += `<option value="__NEW__">+ Inserisci Nuovo Coordinatore...</option>`;

  if (modal) modal.classList.add('active');
}

function closeCoordinatorModal() {
  const modal = document.getElementById('coordinatorModal');
  if (modal) modal.classList.remove('active');
  pendingImportProjects = [];
  pendingImportFileName = '';

  // Reset file inputs
  const topbarInput = document.getElementById('topbarExcelFileInput');
  if (topbarInput) topbarInput.value = '';
  const fileInput = document.getElementById('importFileInput');
  if (fileInput) fileInput.value = '';
}

async function processCoordinatorImportConfirm() {
  const selectEl = document.getElementById('coordinatorSelectInput');
  const customInput = document.getElementById('customCoordinatorInput');

  let chosenPm = selectEl.value;
  if (chosenPm === '__NEW__') {
    chosenPm = customInput ? customInput.value.trim() : '';
  }

  if (!chosenPm || chosenPm === '') {
    alert("Per favore seleziona un Coordinatore esistente o inserisci un nome valido.");
    return;
  }

  if (pendingImportProjects.length === 0) {
    alert("Nessun dato da importare.");
    closeCoordinatorModal();
    return;
  }

  // Set chosen PM on all imported items
  pendingImportProjects.forEach(p => {
    p.pm = chosenPm;
  });

  // Perform client-side MERGE / APPEND into projects array
  let maxIdNum = 0;
  projects.forEach(p => {
    const match = (p.id || '').match(/^PRJ-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxIdNum) maxIdNum = num;
    }
  });

  let addedCount = 0;
  let updatedCount = 0;

  pendingImportProjects.forEach(impPrj => {
    const existingIndex = projects.findIndex(p =>
      (p.id && impPrj.id && p.id === impPrj.id) ||
      (p.progetto.trim().toLowerCase() === impPrj.progetto.trim().toLowerCase() && p.pm.trim().toLowerCase() === chosenPm.toLowerCase())
    );

    if (existingIndex >= 0) {
      // Update existing project
      projects[existingIndex] = {
        ...projects[existingIndex],
        ...impPrj,
        id: projects[existingIndex].id, // Keep existing ID
        pm: chosenPm
      };
      updatedCount++;
    } else {
      // Insert new project with unique ID
      maxIdNum++;
      const newId = `PRJ-${String(maxIdNum).padStart(3, '0')}`;
      projects.push({
        ...impPrj,
        id: newId,
        pm: chosenPm
      });
      addedCount++;
    }
  });

  // Sync to Neon PostgreSQL DB via API
  try {
    await fetch('/api/projects/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'merge',
        projects: pendingImportProjects
      })
    });
  } catch (err) {
    console.log("Synced to LocalStorage.");
  }

  // Ensure coordinator exists in coordinatorResources
  if (!coordinatorResources[chosenPm]) {
    coordinatorResources[chosenPm] = [];
  }

  saveState();
  const fileName = pendingImportFileName;
  closeCoordinatorModal();

  const pmProjects = getProjectsForCoordinator(chosenPm);
  const totalEffort = pmProjects.reduce((acc, p) => acc + (p.effort || 0), 0);

  if (totalEffort > 100) {
    showToast(`⚠️ Importato per ${chosenPm}! Effort totale: ${totalEffort}% (In overload del +${totalEffort - 100}%)`);
  } else {
    showToast(`File '${fileName}' importato per ${chosenPm}! (${addedCount} nuovi, ${updatedCount} aggiornati)`);
  }
}

/* ----------------------------------------------------
   SMART FUZZY COLUMN DETECTION — Auto-mapper for Excel import
---------------------------------------------------- */

/**
 * Normalizes a string for fuzzy comparison:
 * lowercases, removes accents, strips special chars.
 */
function normalizeKey(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s]/g, ' ')   // special chars -> space
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Levenshtein edit distance between two strings.
 * Returns the number of single-character edits needed.
 */
function levenshteinDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

/**
 * Semantic alias dictionary.
 * Each field maps to an array of known aliases (normalized).
 */
const COLUMN_ALIAS_MAP = {
  progetto:    ['progetto', 'nome progetto', 'project', 'nome attivita', 'attivita', 'titolo', 'project name', 'name', 'oggetto', 'nome', 'descrizione progetto', 'activity', 'task'],
  stato:       ['stato', 'status', 'fase', 'stato avanzamento', 'state', 'situazione', 'condizione'],
  effort:      ['effort', 'effort %', '% effort', 'impegno', '% impegno', 'allocazione', '% allocazione', 'carico', 'workload', 'fte %', 'percentuale', 'perc', 'occupazione', 'quota', 'effort percentuale'],
  risorsa:     ['risorsa', 'risorsa coinvolta', 'resource', 'persona', 'membro', 'utente', 'assegnatario', 'nome risorsa', 'collaboratore', 'nominativo'],
  reparto:     ['reparto', 'area', 'team', 'dipartimento', 'department', 'unit', 'business unit', 'bu', 'divisione', 'settore', 'struttura'],
  descrizione: ['descrizione', 'description', 'dettaglio', 'note', 'notes', 'commento', 'abstract', 'sommario', 'sintesi', 'info'],
  criticita:   ['criticita', 'criticita', 'blocco', 'problema', 'dipendenza', 'issue', 'risk', 'rischio', 'impedimento', 'ostacolo', 'priorita', 'priority'],
  scadenza:    ['scadenza', 'fine', 'data fine', 'deadline', 'end date', 'data scadenza', 'entro', 'data termine', 'data chiusura'],
  data_inizio: ['inizio', 'data inizio', 'start', 'start date', 'data avvio', 'dal', 'apertura', 'data apertura'],
  avanzamento: ['avanzamento', 'completamento', '% completamento', 'progress', 'done %', 'percent done', 'avanzamento %', '% avanzamento', 'completato']
};

/**
 * Given an array of raw header strings (from the file),
 * returns a colMap object: { fieldName: rawHeader, ... }
 * and a colMapReport: { mapped: [{field, header, score}], missing: [field] }
 */
function detectColumnMapping(headers) {
  const colMap = {};
  const usedHeaders = new Set();

  const normHeaders = headers.map(h => ({ raw: h, norm: normalizeKey(h) }));

  // Priority order: exact > keyword > levenshtein
  for (const [field, aliases] of Object.entries(COLUMN_ALIAS_MAP)) {
    let bestMatch = null;
    let bestScore = null;

    for (const { raw, norm } of normHeaders) {
      if (usedHeaders.has(raw)) continue;

      // 1. Exact match against any alias
      if (aliases.includes(norm)) {
        bestMatch = { raw, score: 'exact' };
        break;
      }

      // 2. Keyword containment: any alias word appears in the header
      const headerWords = norm.split(' ');
      const aliasHit = aliases.some(alias => {
        const aliasWords = alias.split(' ');
        return aliasWords.every(w => headerWords.includes(w));
      });
      if (aliasHit && (!bestScore || bestScore === 'levenshtein')) {
        bestMatch = { raw, score: 'keyword' };
        bestScore = 'keyword';
      }

      // 3. Levenshtein — only for short strings to avoid false positives
      if (!bestMatch && norm.length <= 20) {
        const minDist = Math.min(...aliases.map(a => levenshteinDistance(norm, a)));
        if (minDist <= 2) {
          if (!bestScore) {
            bestMatch = { raw, score: 'levenshtein' };
            bestScore = 'levenshtein';
          }
        }
      }
    }

    if (bestMatch) {
      colMap[field] = bestMatch.raw;
      usedHeaders.add(bestMatch.raw);
    }
  }

  // Build report
  const mapped = Object.entries(colMap).map(([field, header]) => ({
    field,
    header,
    score: (() => {
      const norm = normalizeKey(header);
      const aliases = COLUMN_ALIAS_MAP[field] || [];
      if (aliases.includes(norm)) return 'exact';
      const headerWords = norm.split(' ');
      const aliasHit = aliases.some(alias => alias.split(' ').every(w => headerWords.includes(w)));
      return aliasHit ? 'keyword' : 'levenshtein';
    })()
  }));
  const missing = Object.keys(COLUMN_ALIAS_MAP).filter(f => !colMap[f]);

  return { colMap, colMapReport: { mapped, missing } };
}

/**
 * Maps a single spreadsheet row to a project object using the detected column map.
 */
function mapRowToProject(row, colMap) {
  const get = (field, defaultVal = '') => {
    const header = colMap[field];
    if (!header) return defaultVal;
    const val = row[header];
    return (val !== undefined && val !== null) ? val : defaultVal;
  };

  const progettoVal  = String(get('progetto', '')).trim();
  const statoVal     = String(get('stato', 'In corso')).trim() || 'In corso';
  const risorsaVal   = String(get('risorsa', '')).trim();
  const repartoVal   = String(get('reparto', '')).trim();
  const descrizioneVal = String(get('descrizione', '')).trim();
  const criticitaVal = String(get('criticita', '')).trim();
  const scadenzaVal  = String(get('scadenza', '')).trim();
  const inizioVal    = String(get('data_inizio', '')).trim();
  const avanzVal     = get('avanzamento', 0);

  // Effort: strip %, parse float
  let effortRaw = get('effort', 0);
  let effortNum = 0;
  if (typeof effortRaw === 'number') {
    effortNum = Math.round(effortRaw);
  } else {
    const cleaned = String(effortRaw).replace('%', '').replace(',', '.').trim();
    effortNum = Math.round(parseFloat(cleaned)) || 0;
  }

  // Avanzamento: strip %
  let avanzNum = 0;
  if (typeof avanzVal === 'number') {
    avanzNum = Math.round(avanzVal);
  } else {
    const cleaned = String(avanzVal).replace('%', '').replace(',', '.').trim();
    avanzNum = Math.round(parseFloat(cleaned)) || 0;
  }

  return {
    progetto:     progettoVal,
    stato:        statoVal,
    effort:       effortNum,
    risorsa:      risorsaVal || null,
    reparto:      repartoVal || null,
    descrizione:  descrizioneVal || null,
    criticita:    criticitaVal || null,
    scadenza:     scadenzaVal || null,
    data_inizio:  inizioVal || null,
    avanzamento:  avanzNum
  };
}

function handleExcelFileInput(file) {
  if (!file) return;

  ensureSheetJSLoaded(() => {
    const reader = new FileReader();

    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      reader.onload = async function(e) {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Read rows keeping original headers
          const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

          if (!Array.isArray(rawRows) || rawRows.length === 0) {
            alert('Il file Excel caricato risulta vuoto o non leggibile.');
            return;
          }

          // Extract headers from first row
          const headers = Object.keys(rawRows[0]);

          // Smart column detection
          const { colMap, colMapReport } = detectColumnMapping(headers);

          // Parse rows using the detected mapping
          const importedProjects = [];
          rawRows.forEach(row => {
            const project = mapRowToProject(row, colMap);
            if (project.progetto && project.progetto.length > 0) {
              importedProjects.push(project);
            }
          });

          if (importedProjects.length > 0) {
            openCoordinatorModal(importedProjects, file.name, colMapReport);
          } else {
            const foundCols = headers.join(', ');
            alert(`Nessun progetto valido trovato nel file Excel.\n\nColonne trovate nel file: ${foundCols}\n\nAssicurati che ci sia almeno una colonna con il nome del progetto (es. "Progetto", "Nome Attività", "Project").`);
          }
        } catch (err) {
          console.error('Excel import error:', err);
          alert('Errore nella lettura del file Excel: ' + err.message);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      handleImportFileText(file);
    }
  });
}

function ensureSheetJSLoaded(callback) {
  if (typeof XLSX !== 'undefined') {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
  script.onload = callback;
  script.onerror = () => {
    alert("Impossibile caricare la libreria XLSX per leggere i file Excel. Verificare la connessione internet.");
  };
  document.head.appendChild(script);
}

/* ----------------------------------------------------
   REPORTS & EXPORT VIEW
---------------------------------------------------- */
function initReportsView() {
  document.getElementById('exportCsvBtn').addEventListener('click', exportCSV);
  document.getElementById('exportJsonBtn').addEventListener('click', exportJSON);

  const fileInput = document.getElementById('importFileInput');
  const triggerBtn = document.getElementById('triggerImportBtn');

  if (triggerBtn && fileInput) {
    triggerBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleExcelFileInput(e.target.files[0]);
      }
    });
  }
}

function exportCSV() {
  const headers = 'ID,Progetto,Reparto,Stato,PM,Risorsa,Effort %,Avanzamento %,Effort Previsto (gg/u),Effort Residuo (gg/u),Scadenza,Stato Tempistiche,Descrizione,Criticità';
  let csvContent = "data:text/csv;charset=utf-8," + headers + "\n";
  projects.forEach(p => {
    const scad = p.scadenza ? String(p.scadenza).slice(0, 10) : '';
    csvContent += `"${p.id}","${p.progetto}","${p.reparto || ''}","${p.stato}","${p.pm}","${p.risorsa || ''}",${p.effort},${p.avanzamento || 0},${p.effort_previsto || 0},${p.effort_residuo || 0},"${scad}","${p.stato_tempistiche || 'In linea'}","${(p.descrizione || '').replace(/"/g, "''")}","${(p.criticita || '').replace(/"/g, "''")}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `MP95_DIGITAL_PROGETTI_EFFORT_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Esportazione CSV/Excel MP95 completata!');
}

function exportJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", `MP95_DIGITAL_PROGETTI_EFFORT_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Esportazione JSON MP95 completata!');
}

function handleImportFileText(file) {
  const reader = new FileReader();
  reader.onload = async function(evt) {
    try {
      const content = evt.target.result;
      if (file.name.endsWith('.json')) {
        const imported = JSON.parse(content);
        if (Array.isArray(imported)) {
          projects = imported;
          await syncBatchToNeon(projects);
          saveState();
          showToast('Importazione JSON eseguita con successo su DB Neon!');
        }
      } else {
        const lines = content.split('\n').filter(l => l.trim().length > 0);
        let maxIdNum = 0;
        projects.forEach(p => {
          const match = (p.id || '').match(/^PRJ-(\d+)$/);
          if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxIdNum) maxIdNum = num;
          }
        });
        const imported = [];
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(',').map(p => p.replace(/^"|"$/g, '').trim());
          if (parts.length >= 4) {
            let rowId = parts[0];
            if (!rowId || !rowId.startsWith('PRJ-')) {
              maxIdNum++;
              rowId = `PRJ-${String(maxIdNum).padStart(3, '0')}`;
            }
            imported.push({
              id: rowId,
              progetto: parts[1],
              stato: parts[2],
              pm: parts[3],
              effort: parseInt(parts[4]) || 0
            });
          }
        }
        if (imported.length > 0) {
          projects = imported;
          await syncBatchToNeon(projects);
          saveState();
          showToast('Importazione CSV eseguita con successo su DB Neon!');
        }
      }
    } catch (err) {
      alert('Errore nel formato del file caricato.');
    }
  };
  reader.readAsText(file);
}

async function syncBatchToNeon(projectsList) {
  try {
    await fetch('/api/projects/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectsList)
    });
  } catch (e) {
    console.log("Synced to LocalStorage.");
  }
}

/* ----------------------------------------------------
   MODALS & CRUD
---------------------------------------------------- */
function initModals() {
  document.getElementById('addProjectBtn').addEventListener('click', openAddProjectModal);
  document.getElementById('closeProjectModal').addEventListener('click', closeProjectModal);
  document.getElementById('cancelProjectBtn').addEventListener('click', closeProjectModal);
  document.getElementById('projectForm').addEventListener('submit', handleSaveProject);
  initProjectModalDropdowns();

  const addRowBtn = document.getElementById('addResourceRowBtn');
  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => addResourceRow('', 10));
  }
}

function initProjectModalDropdowns() {
  const pmSelect = document.getElementById('modalPm');
  const repartoSelect = document.getElementById('modalReparto');

  if (!pmSelect) return;

  pmSelect.addEventListener('change', () => {
    const selectedPm = pmSelect.value;
    const foundCoord = OFFICIAL_COORDINATORS.find(c => c.name.toLowerCase() === selectedPm.toLowerCase());
    if (foundCoord && repartoSelect) {
      const targetReparto = foundCoord.reparto;
      const options = Array.from(repartoSelect.options);
      const matchedOpt = options.find(opt => opt.value.toLowerCase() === targetReparto.toLowerCase());
      if (matchedOpt) repartoSelect.value = matchedOpt.value;
    }
    // Update all resource select dropdowns to match new PM's team
    updateAllResourceRowSelects(selectedPm);
  });
}

function populateModalPmOptions(selectedPmValue) {
  const pmSelect = document.getElementById('modalPm');
  if (!pmSelect) return;

  pmSelect.innerHTML = `<option value="">-- Seleziona Coordinatore (PM) --</option>`;

  OFFICIAL_COORDINATORS.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = `${c.name} (${c.reparto})`;
    if (selectedPmValue && c.name.toLowerCase() === selectedPmValue.toLowerCase()) {
      opt.selected = true;
    }
    pmSelect.appendChild(opt);
  });

  const uniquePms = [...new Set(projects.map(p => sanitizeProjectPM(p.pm)))];
  uniquePms.forEach(pmName => {
    if (!pmName) return;
    const existsInOfficial = OFFICIAL_COORDINATORS.some(c => c.name.toLowerCase() === pmName.toLowerCase());
    if (!existsInOfficial) {
      const opt = document.createElement('option');
      opt.value = pmName;
      opt.textContent = `${pmName} (PM Esterno)`;
      if (selectedPmValue && pmName.toLowerCase() === selectedPmValue.toLowerCase()) {
        opt.selected = true;
      }
      pmSelect.appendChild(opt);
    }
  });
}

function updateAllResourceRowSelects(pmName) {
  const cleanPm = sanitizeProjectPM(pmName);
  const teamResources = coordinatorResources[cleanPm] || [];
  const rows = document.querySelectorAll('#resourceRowsContainer .resource-row');

  rows.forEach(row => {
    const selectEl = row.querySelector('.resource-select');
    if (!selectEl) return;
    const currentVal = selectEl.value;

    selectEl.innerHTML = `<option value="">-- Nessuna / Da Assegnare --</option>`;
    let isMatched = false;

    teamResources.forEach(r => {
      const rName = typeof r === 'string' ? r : r.name;
      const rRole = typeof r === 'object' && r.role ? ` (${r.role})` : '';
      const selected = currentVal && rName.toLowerCase() === currentVal.toLowerCase() ? 'selected' : '';
      if (selected) isMatched = true;
      selectEl.innerHTML += `<option value="${rName}" ${selected}>${rName}${rRole}</option>`;
    });

    const customSelected = currentVal && !isMatched && currentVal !== '' ? 'selected' : '';
    selectEl.innerHTML += `<option value="__CUSTOM__" ${customSelected}>+ Inserisci Altra Risorsa...</option>`;
  });
}

function addResourceRow(selectedRisorsa = '', effortVal = 10) {
  const container = document.getElementById('resourceRowsContainer');
  if (!container) return;

  const currentPm = (document.getElementById('modalPm') || {}).value || '';
  const cleanPm = sanitizeProjectPM(currentPm);
  const teamResources = coordinatorResources[cleanPm] || [];

  const row = document.createElement('div');
  row.className = 'resource-row';
  row.style.cssText = 'display:grid; grid-template-columns: 2fr 1fr auto; gap:0.5rem; align-items:center; background:rgba(255,255,255,0.02); padding:0.4rem 0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);';

  let optionsHtml = `<option value="">-- Nessuna / Da Assegnare --</option>`;
  let isMatched = false;

  teamResources.forEach(r => {
    const rName = typeof r === 'string' ? r : r.name;
    const rRole = typeof r === 'object' && r.role ? ` (${r.role})` : '';
    const selected = selectedRisorsa && rName.toLowerCase() === selectedRisorsa.toLowerCase() ? 'selected' : '';
    if (selected) isMatched = true;
    optionsHtml += `<option value="${rName}" ${selected}>${rName}${rRole}</option>`;
  });

  const customSelected = selectedRisorsa && !isMatched && selectedRisorsa !== '' ? 'selected' : '';
  optionsHtml += `<option value="__CUSTOM__" ${customSelected}>+ Inserisci Altra Risorsa...</option>`;

  row.innerHTML = `
    <div>
      <select class="form-control resource-select" style="font-size:0.85rem;">
        ${optionsHtml}
      </select>
      <input type="text" class="form-control resource-custom-input" placeholder="Nome risorsa custom..." style="display:${selectedRisorsa && !isMatched ? 'block' : 'none'}; margin-top:0.35rem; font-size:0.85rem;" value="${selectedRisorsa && !isMatched ? selectedRisorsa : ''}">
    </div>
    <div>
      <input type="number" class="form-control resource-effort-input" min="0" max="100" value="${effortVal}" placeholder="Effort %" style="font-size:0.85rem;">
    </div>
    <div>
      <button type="button" class="btn btn-secondary btn-sm remove-resource-row-btn" style="color:var(--danger); border-color:var(--danger); padding:0.4rem 0.6rem;" title="Rimuovi risorsa">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  container.appendChild(row);

  const selectEl = row.querySelector('.resource-select');
  const customEl = row.querySelector('.resource-custom-input');
  const effortEl = row.querySelector('.resource-effort-input');
  const removeBtn = row.querySelector('.remove-resource-row-btn');

  selectEl.addEventListener('change', () => {
    if (selectEl.value === '__CUSTOM__') {
      customEl.style.display = 'block';
      customEl.focus();
    } else {
      customEl.style.display = 'none';
    }
  });

  effortEl.addEventListener('input', recalculateProjectTotalEffort);

  removeBtn.addEventListener('click', () => {
    if (container.children.length > 1) {
      row.remove();
      recalculateProjectTotalEffort();
    } else {
      showToast('Attenzione: lascia almeno 1 risorsa o assegnala successivamente.');
      row.remove();
      recalculateProjectTotalEffort();
    }
  });

  recalculateProjectTotalEffort();
}

function recalculateProjectTotalEffort() {
  const inputs = document.querySelectorAll('.resource-effort-input');
  let total = 0;
  inputs.forEach(input => {
    total += parseInt(input.value || '0') || 0;
  });
  const display = document.getElementById('modalTotalProjectEffortDisplay');
  if (display) {
    display.textContent = `${total}%`;
  }
}

function renderAllResourceRowsForPm(pmName, initialAllocations = []) {
  const container = document.getElementById('resourceRowsContainer');
  if (!container) return;
  container.innerHTML = '';

  if (initialAllocations.length > 0) {
    initialAllocations.forEach(alloc => {
      addResourceRow(alloc.risorsa || '', alloc.effort || 10);
    });
  } else {
    addResourceRow('', 10);
  }
}

window.openCreateProjectModal = function() {
  openAddProjectModal();
};

function openAddProjectModal() {
  document.getElementById('modalProjectTitle').textContent = "Aggiungi Progetto MP95";
  document.getElementById('modalProjectId').value = "";
  document.getElementById('modalProgetto').value = "";
  document.getElementById('modalStato').value = "In corso";
  document.getElementById('modalAvanzamento').value = "0";

  populateModalPmOptions("");
  renderAllResourceRowsForPm("", []);

  document.getElementById('modalReparto').value = "";
  document.getElementById('modalEffortPrevisto').value = "";
  document.getElementById('modalEffortResiduo').value = "";
  const todayISO = new Date().toISOString().slice(0, 10);
  const dataInizioEl = document.getElementById('modalDataInizio');
  if (dataInizioEl) dataInizioEl.value = todayISO;
  document.getElementById('modalScadenza').value = "";
  document.getElementById('modalStatoTempistiche').value = "In linea";
  document.getElementById('modalDescrizione').value = "";
  document.getElementById('modalCriticita').value = "";
  document.getElementById('projectModal').classList.add('active');
}

window.openEditProjectModal = function(id) {
  const prj = projects.find(p => p.id === id);
  if (!prj) return;

  document.getElementById('modalProjectTitle').textContent = "Modifica Progetto MP95";
  document.getElementById('modalProjectId').value = prj.id;
  document.getElementById('modalProgetto').value = prj.progetto;
  document.getElementById('modalStato').value = prj.stato;
  document.getElementById('modalAvanzamento').value = prj.avanzamento || 0;

  populateModalPmOptions(prj.pm);

  // Render resource row for the target project entry
  renderAllResourceRowsForPm(prj.pm, [{ risorsa: prj.risorsa, effort: prj.effort }]);

  document.getElementById('modalReparto').value = prj.reparto || '';
  document.getElementById('modalEffortPrevisto').value = prj.effort_previsto || '';
  document.getElementById('modalEffortResiduo').value = prj.effort_residuo || '';
  
  const startRaw = prj.data_inizio ? String(prj.data_inizio).slice(0, 10) : '';
  const dataInizioEl = document.getElementById('modalDataInizio');
  if (dataInizioEl) dataInizioEl.value = startRaw;

  const scadRaw = prj.scadenza ? String(prj.scadenza).slice(0, 10) : '';
  document.getElementById('modalScadenza').value = scadRaw;
  document.getElementById('modalStatoTempistiche').value = prj.stato_tempistiche || 'In linea';
  document.getElementById('modalDescrizione').value = prj.descrizione || '';
  document.getElementById('modalCriticita').value = prj.criticita || '';

  document.getElementById('projectModal').classList.add('active');
};

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
}

async function handleSaveProject(e) {
  e.preventDefault();
  const id = document.getElementById('modalProjectId').value;
  const progetto = document.getElementById('modalProgetto').value.trim();
  const stato = document.getElementById('modalStato').value;
  const pm = document.getElementById('modalPm').value.trim();
  const reparto = document.getElementById('modalReparto').value || null;
  const descrizione = document.getElementById('modalDescrizione').value.trim() || null;
  const effort_previsto = parseFloat(document.getElementById('modalEffortPrevisto').value) || 0;
  const effort_residuo = parseFloat(document.getElementById('modalEffortResiduo').value) || 0;
  const avanzamento = parseInt(document.getElementById('modalAvanzamento').value) || 0;
  const dataInizioEl = document.getElementById('modalDataInizio');
  const data_inizio = dataInizioEl ? dataInizioEl.value || null : null;
  const scadenza = document.getElementById('modalScadenza').value || null;
  const stato_tempistiche = document.getElementById('modalStatoTempistiche').value || 'In linea';
  const criticita = document.getElementById('modalCriticita').value.trim() || null;

  // Extract allocations from dynamic rows
  const rowEls = document.querySelectorAll('#resourceRowsContainer .resource-row');
  const allocations = [];
  rowEls.forEach(row => {
    const sel = row.querySelector('.resource-select');
    const cust = row.querySelector('.resource-custom-input');
    const eff = row.querySelector('.resource-effort-input');

    let rName = sel ? sel.value : '';
    if (rName === '__CUSTOM__' && cust) {
      rName = cust.value.trim();
    }
    const rEffort = parseInt(eff ? eff.value : '0') || 0;
    if (rName) {
      allocations.push({ risorsa: rName, effort: rEffort });
    }
  });

  if (allocations.length === 0) {
    allocations.push({ risorsa: null, effort: 0 });
  }

  // Calculate maximum existing numeric ID to prevent ID collisions
  let maxIdNum = 0;
  projects.forEach(p => {
    const match = (p.id || '').match(/^PRJ-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxIdNum) maxIdNum = num;
    }
  });

  const savedProjects = [];

  if (id) {
    // Editing an existing project row: update target project entry in place
    const existingIndex = projects.findIndex(p => p.id === id);
    if (existingIndex >= 0) {
      const firstAlloc = allocations[0];
      const updatedPrj = {
        ...projects[existingIndex],
        progetto,
        stato,
        pm,
        effort: firstAlloc.effort,
        risorsa: firstAlloc.risorsa,
        reparto,
        descrizione,
        effort_previsto,
        effort_residuo,
        avanzamento,
        data_inizio,
        scadenza,
        stato_tempistiche,
        criticita
      };
      projects[existingIndex] = updatedPrj;
      savedProjects.push(updatedPrj);

      // If extra resource rows were added, create new project entries for them
      for (let i = 1; i < allocations.length; i++) {
        const alloc = allocations[i];
        maxIdNum++;
        const newId = `PRJ-${String(maxIdNum).padStart(3, '0')}`;
        const newObj = {
          id: newId,
          progetto,
          stato,
          pm,
          effort: alloc.effort,
          risorsa: alloc.risorsa,
          reparto,
          descrizione,
          effort_previsto,
          effort_residuo,
          avanzamento,
          data_inizio,
          scadenza,
          stato_tempistiche,
          criticita
        };
        projects.push(newObj);
        savedProjects.push(newObj);
      }
    }
  } else {
    // Creating a brand new project
    for (let i = 0; i < allocations.length; i++) {
      const alloc = allocations[i];
      maxIdNum++;
      const newId = `PRJ-${String(maxIdNum).padStart(3, '0')}`;
      const newObj = {
        id: newId,
        progetto,
        stato,
        pm,
        effort: alloc.effort,
        risorsa: alloc.risorsa,
        reparto,
        descrizione,
        effort_previsto,
        effort_residuo,
        avanzamento,
        data_inizio,
        scadenza,
        stato_tempistiche,
        criticita
      };
      projects.push(newObj);
      savedProjects.push(newObj);
    }
  }

  try {
    await fetch('/api/projects/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(savedProjects)
    });
  } catch (err) { console.log("Saved local."); }

  // Sync resource back to coordinatorResources
  allocations.forEach(alloc => {
    if (alloc.risorsa && pm) {
      if (!coordinatorResources[pm]) {
        coordinatorResources[pm] = [];
      }
      const existingRes = coordinatorResources[pm].find(r => (typeof r === 'string' ? r : r.name).toLowerCase() === alloc.risorsa.toLowerCase());
      if (existingRes) {
        if (typeof existingRes === 'object') {
          if (!existingRes.projects) existingRes.projects = [];
          if (!existingRes.projects.includes(progetto)) existingRes.projects.push(progetto);
        }
      } else {
        coordinatorResources[pm].push({
          name: alloc.risorsa,
          role: 'Specialista IT',
          projects: [progetto]
        });
      }
    }
  });

  saveState();
  closeProjectModal();
  showToast(`Progetto "${progetto}" salvato con successo!`);
}

window.deleteProject = async function(id) {
  if (confirm('Sei sicuro di voler eliminare questo progetto?')) {
    projects = projects.filter(p => p.id !== id);
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    } catch (e) { console.log("Deleted local."); }
    saveState();
    showToast('Progetto eliminato dal DB Neon.');
  }
};

/* ----------------------------------------------------

   TOAST NOTIFICATION
---------------------------------------------------- */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--success);"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
