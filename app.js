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

function sanitizeProjectPM(pm) {
  if (!pm) return 'Serena Lacorte';
  const str = pm.trim();
  const lower = str.toLowerCase();

  if (lower.includes('aurora') || lower.includes('serena')) return 'Serena Lacorte';
  if (lower.includes('daniele') || lower.includes('valerio')) return 'Valerio Andreuccioli';
  if (lower.includes('federico') || lower.includes('stefano')) return 'Stefano Giovannella';
  if (lower.includes('francesca') || lower.includes('emanuela')) return 'Emanuela Raschellà';
  if (lower.includes('lara')) return 'Lara Tini Brunozzi';
  if (lower.includes('alessia') || lower.includes('francesco')) return 'Francesco Di Legge';

  const matched = OFFICIAL_COORDINATORS.find(c => c.name.toLowerCase() === lower);
  if (matched) return matched.name;

  return str;
}

// App State
let projects = (JSON.parse(localStorage.getItem('mp95_projects')) || [...INITIAL_PROJECTS]).map(p => ({
  ...p,
  pm: sanitizeProjectPM(p.pm)
}));
let coordinatorResources = JSON.parse(localStorage.getItem('mp95_resources')) || DEFAULT_COORDINATOR_RESOURCES;

// DOM Load
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initNavigation();
  initProjectsView();
  initCoordinatorsView();
  initTimelineView();
  initReportsView();
  initModals();
  initExcelFileHandlers();

  // Load from Neon DB API if available
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


// Sync data from Neon DB
async function fetchFromNeonDB() {
  try {
    const resPrj = await fetch('/api/projects');
    if (resPrj.ok) {
      const data = await resPrj.json();
      if (Array.isArray(data) && data.length > 0) {
        projects = data.map(p => ({
          ...p,
          pm: sanitizeProjectPM(p.pm)
        }));
        localStorage.setItem('mp95_projects', JSON.stringify(projects));
      }
    }

    const resResources = await fetch('/api/resources');
    if (resResources.ok) {
      const resData = await resResources.json();
      if (Object.keys(resData).length > 0) {
        coordinatorResources = resData;
        localStorage.setItem('mp95_resources', JSON.stringify(coordinatorResources));
      }
    }
  } catch (err) {
    console.log("Using LocalStorage offline cache.");
  } finally {
    refreshAllViews();
  }
}

// Save State Local + Neon DB
function saveState() {
  localStorage.setItem('mp95_projects', JSON.stringify(projects));
  localStorage.setItem('mp95_resources', JSON.stringify(coordinatorResources));
  refreshAllViews();
}

function refreshAllViews() {
  renderDashboard();
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

  const titles = {
    dashboard: { title: "Executive Dashboard", subtitle: "Panoramica generale dell'effort e delle attività dei coordinatori MP95" },
    projects: { title: "Gestione Progetti & Effort", subtitle: "Elenco completo dei progetti censiti con allocazioni percentuale" },
    coordinators: { title: "Carico di Lavoro & Risorse Coordinatori", subtitle: "Analisi della capacità, progetti e risorse gestite per ciascun PM" },
    timeline: { title: "Governance Temporale & Timeline", subtitle: "Monitoraggio della durata, pianificazione e calendario delle attività MP95" },
    reports: { title: "Reportistica & Import/Export", subtitle: "Esportazione report CSV/JSON e caricamento file Excel (.xlsx)" },
    wiki: { title: "Wiki & Guida Utente TrackMaster MP95", subtitle: "Manuale d'uso completo dell'applicazione e guida a tutte le funzionalità" }
  };

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
   DASHBOARD VIEW
---------------------------------------------------- */
function initDashboard() {
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

function renderPmWorkloadOverview() {
  const container = document.getElementById('pmWorkloadOverview');
  if (!container) return;

  const pmEfforts = {};
  projects.forEach(p => {
    const pm = sanitizeProjectPM(p.pm);
    if (!pmEfforts[pm]) {
      pmEfforts[pm] = { count: 0, totalEffort: 0 };
    }
    pmEfforts[pm].count += 1;
    pmEfforts[pm].totalEffort += (p.effort || 0);
  });

  container.innerHTML = '';
  Object.keys(pmEfforts).forEach(pmName => {
    const data = pmEfforts[pmName];
    const totalEffort = data.totalEffort;
    
    // Scale against CAP 120%
    const barPct = Math.min(Math.round((totalEffort / 120) * 100), 100);

    let statusText = `${totalEffort}% / 120%`;
    let colorStyle = 'var(--mp95-blue)';
    let bgStyle = 'linear-gradient(90deg, var(--mp95-blue), var(--success))';

    if (totalEffort > 120) {
      statusText = `${totalEffort}% / 120% ⚠️ Overload (+${totalEffort - 120}%)`;
      colorStyle = 'var(--danger)';
      bgStyle = 'var(--danger)';
    } else if (totalEffort > 100) {
      statusText = `${totalEffort}% / 120% ⚡ Straordinario (+${totalEffort - 100}%)`;
      colorStyle = 'var(--warning)';
      bgStyle = 'linear-gradient(90deg, var(--mp95-orange), var(--warning))';
    }

    const rowHtml = `
      <div style="display:flex; flex-direction:column; gap:0.4rem; padding:0.65rem 0.85rem; background:rgba(255,255,255,0.02); border-radius:var(--radius-md);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; font-size:0.9rem;">${pmName}</span>
          <span style="font-weight:800; font-size:0.82rem; color:${colorStyle};">
            ${statusText} (${data.count} prj)
          </span>
        </div>
        <div class="effort-progress-bg" title="Capacità base 100% + 20% Straordinario = CAP Max 120%">
          <div class="effort-progress-fill" style="width: ${barPct}%; background: ${bgStyle};"></div>
        </div>
      </div>
    `;
    container.innerHTML += rowHtml;
  });
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
  if (st.includes('terminato') || st.includes('completato')) return 'badge-terminato';
  if (st.includes('stand by') || st.includes('in attesa')) return 'badge-stand-by';
  if (st.includes('da iniziare') || st.includes('non avviato')) return 'badge-da-iniziare';
  return 'badge-periodica';
}

function getTempisticheClass(val) {
  const v = (val || '').toLowerCase();
  if (v === 'a rischio') return 'badge-a-rischio';
  if (v === 'in ritardo') return 'badge-in-ritardo';
  return 'badge-in-linea';
}

function getAvanzamentoClass(pct) {
  if (pct >= 100) return 'av-full';
  if (pct >= 60)  return 'av-good';
  if (pct >= 30)  return 'av-mid';
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
    tbody.innerHTML = `<tr><td colspan="12" style="text-align:center; padding:2rem; color:var(--text-muted);">Nessun progetto trovato</td></tr>`;
    return;
  }

  filtered.forEach(p => {
    const badgeClass = getBadgeClass(p.stato);
    const avPct = parseInt(p.avanzamento) || 0;
    const avClass = getAvanzamentoClass(avPct);
    const tempisticheLabel = p.stato_tempistiche || 'In linea';
    const tempisticheClass = getTempisticheClass(tempisticheLabel);
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
    const totalEffort = prjList.reduce((acc, p) => acc + (p.effort || 0), 0);

    // Scale against CAP 120%
    const barWidthPct = Math.min(Math.round((totalEffort / 120) * 100), 100);

    let gaugeColor = 'var(--text-main)';
    let fillGradient = 'linear-gradient(90deg, var(--mp95-blue), var(--success))';
    let statusBadge = '<span style="color:var(--success); font-weight:700;">🟢 Capacità Standard</span>';

    if (totalEffort > 120) {
      gaugeColor = 'var(--danger)';
      fillGradient = 'var(--danger)';
      statusBadge = `<span style="color:var(--danger); font-weight:800;">🔴 CAP 120% SUPERATO (+${totalEffort - 120}%)</span>`;
    } else if (totalEffort > 100) {
      gaugeColor = 'var(--warning)';
      fillGradient = 'linear-gradient(90deg, var(--mp95-orange), var(--warning))';
      statusBadge = `<span style="color:var(--warning); font-weight:700;">⚡ Straordinario (+${totalEffort - 100}%)</span>`;
    }

    const initials = pmName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const resources = coordinatorResources[pmName] || [];

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
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; font-weight:700;">
          <span>Effort Team (CAP 120%)</span>
          <span style="color: ${gaugeColor}; font-weight:800;">${totalEffort}% / 120%</span>
        </div>
        <div class="pm-capacity-bar" title="Base: 100% | Straordinario: +20% | Max CAP: 120%">
          <div class="pm-capacity-fill" style="width: ${barWidthPct}%; background: ${fillGradient};"></div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; margin-top:0.35rem;">
          <span style="color:var(--text-dim);">Std: 100%</span>
          ${statusBadge}
          <span style="color:var(--text-dim);">CAP: 120%</span>
        </div>
      </div>

      <div class="pm-stat-row">
        <span style="color:var(--text-muted);">Progetti Assegnati</span>
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
            <span><i class="fa-solid fa-users" style="color:var(--mp95-blue); margin-right:0.4rem;"></i> Risorse del Team (${resources.length})</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="pm-accordion-body">
            ${resources.length === 0 ? '<div style="font-size:0.82rem; color:var(--text-dim); margin-bottom:0.4rem;">Nessuna risorsa nel team</div>' : ''}
            ${resources.map((r, rIdx) => `
              <div class="pm-project-item" style="flex-direction:column; align-items:flex-start; gap:0.25rem; position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%; font-weight:700;">
                  <span><i class="fa-solid fa-user-check" style="color:var(--success); font-size:0.8rem;"></i> ${r.name}</span>
                  <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span style="font-size:0.75rem; color:var(--text-dim);">${r.role || 'Specialista'}</span>
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
            ${resources.length === 0 ? '<div style="font-size:0.82rem; color:var(--text-dim);">Nessuna risorsa censita</div>' : `
              <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">Seleziona Risorsa del Team:</label>
              <select class="resource-select-box" onchange="renderResourceProjects(this, '${encodeURIComponent(pmName)}')">
                <option value="">-- Scegli Risorsa --</option>
                ${resources.map((r, idx) => `<option value="${idx}">${r.name} (${r.role || 'Specialista'})</option>`).join('')}
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

window.openResourceModal = function(encodedPmName) {
  const pmName = decodeURIComponent(encodedPmName);
  document.getElementById('resourceCoordinatorInput').value = pmName;
  document.getElementById('resourceCoordinatorNameDisplay').textContent = pmName;
  document.getElementById('resourceNameInput').value = '';
  document.getElementById('resourceRoleInput').value = '';
  document.getElementById('resourceProjectsInput').value = '';
  document.getElementById('resourceModal').classList.add('active');
};

function closeResourceModal() {
  const modal = document.getElementById('resourceModal');
  if (modal) modal.classList.remove('active');
}

async function handleSaveResourceForm(e) {
  e.preventDefault();
  const pmName = document.getElementById('resourceCoordinatorInput').value;
  const name = document.getElementById('resourceNameInput').value.trim();
  const role = document.getElementById('resourceRoleInput').value.trim() || 'Specialista IT';
  const projectsStr = document.getElementById('resourceProjectsInput').value.trim();

  if (!name) return;

  const projectsArr = projectsStr ? projectsStr.split(',').map(p => p.trim()).filter(Boolean) : [];

  if (!coordinatorResources[pmName]) {
    coordinatorResources[pmName] = [];
  }

  const newRes = { name, role, projects: projectsArr };
  coordinatorResources[pmName].push(newRes);

  try {
    await fetch('/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coordinator_name: pmName,
        resource_name: name,
        role: role,
        assigned_projects: projectsArr
      })
    });
  } catch (err) {
    console.log("Saved LocalStorage.");
  }

  saveState();
  closeResourceModal();
  showToast(`Nuova risorsa ${name} aggiunta al team di ${pmName}!`);
}

window.deleteTeamResource = async function(encodedPmName, resourceIdx) {
  const pmName = decodeURIComponent(encodedPmName);
  if (!coordinatorResources[pmName] || !coordinatorResources[pmName][resourceIdx]) return;

  const resName = coordinatorResources[pmName][resourceIdx].name;
  if (!confirm(`Sei sicuro di voler rimuovere ${resName} dal team di ${pmName}?`)) return;

  coordinatorResources[pmName].splice(resourceIdx, 1);
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

  let html = `
    <div class="gantt-grid">
      <div class="gantt-header-row">
        <div>Coordinatore / Attività</div>
        ${months.map(m => `<div>${m} ${currentYear}</div>`).join('')}
      </div>
  `;

  const coordsToDisplay = OFFICIAL_COORDINATORS.filter(c => !pmFilterVal || c.name.toLowerCase().includes(pmFilterVal));

  coordsToDisplay.forEach(coord => {
    const pmName = coord.name;
    let pmProjects = getProjectsForCoordinator(pmName);

    if (statusFilterVal) {
      pmProjects = pmProjects.filter(p => p.stato.toLowerCase().includes(statusFilterVal));
    }

    if (pmProjects.length === 0) return;

    html += `
      <div class="gantt-coord-group">
        <div class="gantt-coord-title">
          <span><i class="fa-solid fa-user-tie"></i> ${pmName} (${coord.reparto})</span>
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
  container.innerHTML = html;
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

function openCoordinatorModal(importedList, fileName) {
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

  if (totalEffort > 120) {
    showToast(`⚠️ Importato per ${chosenPm}! Effort totale: ${totalEffort}% (Superato CAP Max del 120% con +${totalEffort - 100}% straordinario!)`);
  } else if (totalEffort > 100) {
    showToast(`⚡ Importato per ${chosenPm}! Effort totale: ${totalEffort}% / 120% (+${totalEffort - 100}% Straordinario).`);
  } else {
    showToast(`File '${fileName}' importato per ${chosenPm}! (${addedCount} nuovi, ${updatedCount} aggiornati)`);
  }
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

          const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

          if (!Array.isArray(rawRows) || rawRows.length === 0) {
            alert("Il file Excel caricato risulta vuoto o non leggibile.");
            return;
          }

          const importedProjects = [];
          rawRows.forEach((row, idx) => {
            const progettoVal = row['Progetto'] || row['progetto'] || row['Nome Progetto'] || row['Project'] || '';
            const statoVal = row['Stato'] || row['stato'] || row['Status'] || 'In corso';
            const effortVal = row['Effort %'] || row['Effort'] || row['effort'] || 0;
            const risorsaVal = row['Risorsa'] || row['risorsa'] || row['Risorsa Coinvolta'] || '';
            const descrizioneVal = row['Descrizione'] || row['descrizione'] || '';
            const repartoVal = row['Reparto'] || row['reparto'] || '';
            const criticitaVal = row['Criticità'] || row['criticita'] || row['Note'] || '';

            if (progettoVal && String(progettoVal).trim().length > 0) {
              importedProjects.push({
                progetto: String(progettoVal).trim(),
                stato: String(statoVal).trim(),
                effort: parseInt(effortVal) || 0,
                risorsa: String(risorsaVal).trim() || null,
                descrizione: String(descrizioneVal).trim() || null,
                reparto: String(repartoVal).trim() || null,
                criticita: String(criticitaVal).trim() || null
              });
            }
          });

          if (importedProjects.length > 0) {
            openCoordinatorModal(importedProjects, file.name);
          } else {
            alert("Nessun progetto valido trovato nel file Excel. Assicurati che ci sia almeno la colonna 'Progetto'.");
          }
        } catch (err) {
          console.error("Excel import error:", err);
          alert("Errore nella lettura del file Excel: " + err.message);
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
        const imported = [];
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(',').map(p => p.replace(/^"|"$/g, '').trim());
          if (parts.length >= 4) {
            imported.push({
              id: parts[0] || `PRJ-${String(i).padStart(3, '0')}`,
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
}

window.openCreateProjectModal = function() {
  openAddProjectModal();
};

function openAddProjectModal() {
  document.getElementById('modalProjectTitle').textContent = "Aggiungi Progetto MP95";
  document.getElementById('modalProjectId').value = "";
  document.getElementById('modalProgetto').value = "";
  document.getElementById('modalStato').value = "In corso";
  document.getElementById('modalEffort').value = "10";
  document.getElementById('modalAvanzamento').value = "0";
  document.getElementById('modalPm').value = "";
  document.getElementById('modalRisorsa').value = "";
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
  document.getElementById('modalEffort').value = prj.effort;
  document.getElementById('modalAvanzamento').value = prj.avanzamento || 0;
  document.getElementById('modalPm').value = prj.pm;
  document.getElementById('modalRisorsa').value = prj.risorsa || '';
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
  const effort = parseInt(document.getElementById('modalEffort').value) || 0;
  const pm = document.getElementById('modalPm').value.trim();
  const risorsa = document.getElementById('modalRisorsa').value.trim() || null;
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

  const payload = { progetto, stato, pm, effort, risorsa, reparto, descrizione,
    effort_previsto, effort_residuo, avanzamento, data_inizio, scadenza, stato_tempistiche, criticita };

  if (id) {
    const idx = projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      projects[idx] = { id, ...payload };
      try {
        await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) { console.log("Saved local."); }
      showToast('Progetto aggiornato nel DB Neon!');
    }
  } else {
    const nextNum = projects.length + 1;
    const newId = `PRJ-${String(nextNum).padStart(3, '0')}`;
    const newObj = { id: newId, ...payload };
    projects.push(newObj);
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObj)
      });
    } catch (err) { console.log("Saved local."); }
    showToast('Nuovo progetto salvato nel DB Neon!');
  }

  saveState();
  closeProjectModal();

  const targetPm = sanitizeProjectPM(pm);
  const pmProjects = getProjectsForCoordinator(targetPm);
  const totalEffort = pmProjects.reduce((acc, p) => acc + (p.effort || 0), 0);

  if (totalEffort > 120) {
    showToast(`⚠️ Progetto salvato! Effort di ${targetPm} ora al ${totalEffort}% (Superato CAP Max 120%!)`);
  } else if (totalEffort > 100) {
    showToast(`⚡ Progetto salvato! Effort di ${targetPm} in straordinario: ${totalEffort}% / 120%.`);
  } else {
    showToast('Progetto salvato con successo!');
  }
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
