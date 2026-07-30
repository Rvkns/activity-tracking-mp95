/**
 * Activity & Resource Tracking Application Logic - MP95 (Media Point 95)
 * Connected directly to Neon PostgreSQL Backend API & LocalStorage Fallback
 */

const INITIAL_PROJECTS = [
  { id: "PRJ-001", progetto: "Boe mensa-IT-Digital", stato: "Manutenzione", pm: "Aurora Parisi (TMI External)", effort: 1 },
  { id: "PRJ-002", progetto: "Intouch-IT-Digital", stato: "Manutenzione", pm: "Aurora Parisi (TMI External)", effort: 1 },
  { id: "PRJ-003", progetto: "NRC-IT-Digital - TOYOTA", stato: "In corso", pm: "Aurora Parisi (TMI External)", effort: 5 },
  { id: "PRJ-004", progetto: "NRC-IT-Digital - LEXUS", stato: "In corso", pm: "Aurora Parisi (TMI External)", effort: 5 },
  { id: "PRJ-005", progetto: "Paperless-IT-Digital", stato: "In corso", pm: "Aurora Parisi (TMI External)", effort: 5 },
  { id: "PRJ-006", progetto: "WIDE-IT-Digital", stato: "In corso", pm: "Aurora Parisi (TMI External)", effort: 25 },
  { id: "PRJ-007", progetto: "Franchise-IT-Digital", stato: "In corso", pm: "Aurora Parisi (TMI External)", effort: 10 },
  { id: "PRJ-008", progetto: "Rinnovi Digitali-IT-Digital", stato: "Terminato", pm: "Aurora Parisi (TMI External)", effort: 0 },
  { id: "PRJ-009", progetto: "CMS - gestione ticket secondo livello-IT-Digital", stato: "In corso", pm: "Daniele De Dominicis (TMI External)", effort: 30 },
  { id: "PRJ-010", progetto: "CMS-IT-Digital", stato: "In corso", pm: "Daniele De Dominicis (TMI External)", effort: 70 },
  { id: "PRJ-011", progetto: "Dismissione Halley-IT-Corporate", stato: "Stand by", pm: "Daniele De Dominicis (TMI External)", effort: 0 },
  { id: "PRJ-012", progetto: "Flag usato akita-IT-Digital", stato: "Da iniziare", pm: "Daniele De Dominicis (TMI External)", effort: 10 },
  { id: "PRJ-013", progetto: "Sailpoint-IT-Digital", stato: "In corso", pm: "Federico Arte (TMI External)", effort: 40 },
  { id: "PRJ-014", progetto: "Service Now-IT-Digital", stato: "Manutenzione", pm: "Federico Arte (TMI External)", effort: 2 },
  { id: "PRJ-015", progetto: "WayTo Apps-IT-Digital", stato: "Manutenzione", pm: "Federico Arte (TMI External)", effort: 5 },
  { id: "PRJ-016", progetto: "WayTo-IT-Digital", stato: "Manutenzione", pm: "Federico Arte (TMI External)", effort: 10 },
  { id: "PRJ-017", progetto: "Service Now 2.0-IT-Digital", stato: "In corso", pm: "Federico Arte (TMI External)", effort: 5 },
  { id: "PRJ-018", progetto: "Repository per Product Quality", stato: "In corso", pm: "Federico Arte (TMI External)", effort: 10 },
  { id: "PRJ-019", progetto: "AI LAB", stato: "In corso", pm: "Federico Arte (TMI External)", effort: 15 },
  { id: "PRJ-020", progetto: "ACT AS A BSS PARTNER - Survey-IT-Digital", stato: "Attività periodica", pm: "Francesca Rozzi (TMI External)", effort: 15 },
  { id: "PRJ-021", progetto: "Digital Finance - Controlling-IT-Digital", stato: "In corso", pm: "Francesca Rozzi (TMI External)", effort: 15 },
  { id: "PRJ-022", progetto: "Digital Sales-IT-Digital", stato: "In corso", pm: "Francesca Rozzi (TMI External)", effort: 35 },
  { id: "PRJ-023", progetto: "Procedura Service Now-IT-Digital", stato: "Terminato", pm: "Francesca Rozzi (TMI External)", effort: 100 },
  { id: "PRJ-024", progetto: "Digital Finance - Purchasing-IT-Digital", stato: "In corso", pm: "Francesca Rozzi (TMI External) - Aurora Parisi (TMI External)", effort: 20 },
  { id: "PRJ-025", progetto: "TED-IT-Digital", stato: "Manutenzione", pm: "Francesca Rozzi (TMI External) - Aurora Parisi (TMI External)", effort: 20 },
  { id: "PRJ-026", progetto: "BRiT WayDoc-IT-Digital", stato: "Terminato", pm: "Serena Lacorte (TMI External)", effort: 20 },
  { id: "PRJ-027", progetto: "Calendario chiusure-IT-Digital", stato: "In corso", pm: "Serena Lacorte (TMI External)", effort: 0 },
  { id: "PRJ-028", progetto: "DEALER RISK-IT-Digital", stato: "Attività periodica", pm: "Serena Lacorte (TMI External)", effort: 1 },
  { id: "PRJ-029", progetto: "Backlog Bearit -IT-Digital", stato: "In corso", pm: "Serena Lacorte (TMI External)", effort: 20 },
  { id: "PRJ-030", progetto: "MIA - KPI Dealer-IT-Digital", stato: "In corso", pm: "Serena Lacorte (TMI External)", effort: 20 },
  { id: "PRJ-031", progetto: "OWE-IT-Digital", stato: "Attività periodica", pm: "Serena Lacorte (TMI External)", effort: 0 },
  { id: "PRJ-032", progetto: "Riaddebbiti/fatturazione-IT-Digital", stato: "Attività periodica", pm: "Serena Lacorte (TMI External)", effort: 10 },
  { id: "PRJ-033", progetto: "Warehouse channel -IT-Digital", stato: "Manutenzione", pm: "Serena Lacorte (TMI External)", effort: 30 },
  { id: "PRJ-034", progetto: "WayTo Kinto-IT-Digital", stato: "Manutenzione", pm: "Serena Lacorte (TMI External)", effort: 5 },
  { id: "PRJ-035", progetto: "WayTo-IT-Digital", stato: "Manutenzione", pm: "Serena Lacorte (TMI External)", effort: 15 },
  { id: "PRJ-036", progetto: "Service Now Flotte -IT-Digital", stato: "In corso", pm: "Serena Lacorte (TMI External)", effort: 15 }
];

const DEFAULT_COORDINATOR_RESOURCES = {
  "Aurora Parisi (TMI External)": [
    { name: "Marco Rossi", role: "Senior Fullstack Dev", projects: ["WIDE-IT-Digital", "Franchise-IT-Digital"] },
    { name: "Laura Conti", role: "UI/UX Designer", projects: ["Paperless-IT-Digital", "NRC-IT-Digital - TOYOTA"] },
    { name: "Stefano Rinaldi", role: "QA Engineer", projects: ["Boe mensa-IT-Digital", "Intouch-IT-Digital"] }
  ],
  "Daniele De Dominicis (TMI External)": [
    { name: "Giuseppe Neri", role: "Backend Lead", projects: ["CMS-IT-Digital", "CMS - gestione ticket secondo livello-IT-Digital"] },
    { name: "Elena Moretti", role: "DBA Specialist", projects: ["CMS-IT-Digital", "Flag usato akita-IT-Digital"] }
  ],
  "Federico Arte (TMI External)": [
    { name: "Matteo Galli", role: "DevOps Engineer", projects: ["Sailpoint-IT-Digital", "Service Now 2.0-IT-Digital"] },
    { name: "Alessia Fontana", role: "AI Specialist", projects: ["AI LAB", "Repository per Product Quality"] }
  ],
  "Francesca Rozzi (TMI External)": [
    { name: "Davide Palmieri", role: "Financial Consultant", projects: ["Digital Finance - Controlling-IT-Digital", "Digital Sales-IT-Digital"] },
    { name: "Chiara Ferri", role: "Solution Architect", projects: ["ACT AS A BSS PARTNER - Survey-IT-Digital", "Procedura Service Now-IT-Digital"] }
  ],
  "Francesca Rozzi (TMI External) - Aurora Parisi (TMI External)": [
    { name: "Gianluca Martini", role: "Integration Lead", projects: ["Digital Finance - Purchasing-IT-Digital", "TED-IT-Digital"] }
  ],
  "Serena Lacorte (TMI External)": [
    { name: "Roberto Gatti", role: "System Engineer", projects: ["Warehouse channel -IT-Digital", "MIA - KPI Dealer-IT-Digital"] },
    { name: "Simona D'Amico", role: "Data Analyst", projects: ["Backlog Bearit -IT-Digital", "BRiT WayDoc-IT-Digital"] }
  ]
};

// App State
let projects = JSON.parse(localStorage.getItem('mp95_projects')) || [...INITIAL_PROJECTS];
let coordinatorResources = JSON.parse(localStorage.getItem('mp95_resources')) || DEFAULT_COORDINATOR_RESOURCES;

// DOM Load
document.addEventListener('DOMContentLoaded', async () => {
  initNavigation();
  initProjectsView();
  initCoordinatorsView();
  initReportsView();
  initModals();
  initResetData();
  initExcelFileHandlers();

  // Load from Neon DB API if available
  await fetchFromNeonDB();
});

// Sync data from Neon DB
async function fetchFromNeonDB() {
  try {
    const resPrj = await fetch('/api/projects');
    if (resPrj.ok) {
      const data = await resPrj.json();
      if (Array.isArray(data) && data.length > 0) {
        projects = data;
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
    const pm = p.pm.trim();
    if (!pmEfforts[pm]) {
      pmEfforts[pm] = { count: 0, totalEffort: 0 };
    }
    pmEfforts[pm].count += 1;
    pmEfforts[pm].totalEffort += (p.effort || 0);
  });

  container.innerHTML = '';
  Object.keys(pmEfforts).forEach(pmName => {
    const data = pmEfforts[pmName];
    const isOverload = data.totalEffort > 100;

    const rowHtml = `
      <div style="display:flex; flex-direction:column; gap:0.4rem; padding:0.65rem 0.85rem; background:rgba(255,255,255,0.02); border-radius:var(--radius-md);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; font-size:0.9rem;">${pmName}</span>
          <span style="font-weight:800; font-size:0.92rem; color:${isOverload ? 'var(--danger)' : 'var(--mp95-orange)'}">
            ${data.totalEffort}% effort (${data.count} prj)
          </span>
        </div>
        <div class="effort-progress-bg">
          <div class="effort-progress-fill" style="width: ${Math.min(data.totalEffort, 100)}%; background: ${isOverload ? 'var(--danger)' : 'linear-gradient(90deg, var(--mp95-orange), var(--mp95-blue))'};"></div>
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

  renderProjectsTable();
}

function populatePmFilterOptions() {
  const select = document.getElementById('pmFilter');
  if (!select) return;
  const pmsSet = new Set(projects.map(p => p.pm.trim()));
  
  const currentVal = select.value;
  select.innerHTML = `<option value="">Tutti i PM / Coordinatori</option>`;
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

  const filtered = projects.filter(p => {
    const matchesSearch = p.progetto.toLowerCase().includes(search) || p.pm.toLowerCase().includes(search) ||
      (p.risorsa || '').toLowerCase().includes(search);
    const matchesStatus = !statusFilter || p.stato.trim().toLowerCase() === statusFilter.toLowerCase();
    const matchesPm = !pmFilter || p.pm.trim() === pmFilter;
    const matchesTempistiche = !tempisticheFilter ||
      (p.stato_tempistiche || 'In linea').toLowerCase() === tempisticheFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPm && matchesTempistiche;
  });

  tbody.innerHTML = '';
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:2rem; color:var(--text-muted);">Nessun progetto trovato</td></tr>`;
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
   COORDINATORS VIEW
---------------------------------------------------- */
function initCoordinatorsView() {
  renderCoordinatorsGrid();
}

function renderCoordinatorsGrid() {
  const grid = document.getElementById('coordinatorsGrid');
  if (!grid) return;

  const pmMap = {};
  projects.forEach(p => {
    const pm = p.pm.trim();
    if (!pmMap[pm]) {
      pmMap[pm] = [];
    }
    pmMap[pm].push(p);
  });

  grid.innerHTML = '';
  Object.keys(pmMap).forEach((pmName, pmIndex) => {
    const prjList = pmMap[pmName];
    const totalEffort = prjList.reduce((acc, p) => acc + (p.effort || 0), 0);
    const activePrj = prjList.filter(p => p.stato.trim().toLowerCase() === 'in corso').length;

    let fillClass = '';
    if (totalEffort > 100) fillClass = 'overload';
    else if (totalEffort >= 80) fillClass = 'high';

    const initials = pmName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const resources = coordinatorResources[pmName] || [];

    const card = document.createElement('div');
    card.className = 'pm-card';

    card.innerHTML = `
      <div class="pm-header">
        <div class="pm-avatar">${initials}</div>
        <div class="pm-info">
          <h4>${pmName}</h4>
          <p>Coordinatore Progetti MP95</p>
        </div>
      </div>

      <div class="pm-capacity-gauge">
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700;">
          <span>Allocazione Effort Totale</span>
          <span style="color: ${totalEffort > 100 ? 'var(--danger)' : 'var(--text-main)'};">${totalEffort}% / 100%</span>
        </div>
        <div class="pm-capacity-bar">
          <div class="pm-capacity-fill ${fillClass}" style="width: ${Math.min(totalEffort, 100)}%;"></div>
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

        <!-- DROPDOWN 2: RISORSE DEL COORDINATORE -->
        <div class="pm-accordion" id="accordion-res-${pmIndex}">
          <div class="pm-accordion-header" onclick="toggleAccordion('accordion-res-${pmIndex}')">
            <span><i class="fa-solid fa-users" style="color:var(--mp95-blue); margin-right:0.4rem;"></i> Risorse del Coordinatore (${resources.length})</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="pm-accordion-body">
            ${resources.length === 0 ? '<div style="font-size:0.82rem; color:var(--text-dim);">Nessuna risorsa assegnata</div>' : ''}
            ${resources.map(r => `
              <div class="pm-project-item" style="flex-direction:column; align-items:flex-start; gap:0.25rem;">
                <div style="display:flex; justify-content:space-between; width:100%; font-weight:700;">
                  <span><i class="fa-solid fa-user-check" style="color:var(--success); font-size:0.8rem;"></i> ${r.name}</span>
                  <span style="font-size:0.75rem; color:var(--text-dim);">${r.role}</span>
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted);">
                  Target: ${r.projects ? r.projects.join(', ') : 'Nessun progetto'}
                </div>
              </div>
            `).join('')}
            <button class="btn btn-secondary btn-sm" style="margin-top:0.4rem;" onclick="promptAddResource('${encodeURIComponent(pmName)}')">
              <i class="fa-solid fa-user-plus"></i> Aggiungi Risorsa
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
              <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">Seleziona Risorsa:</label>
              <select class="resource-select-box" onchange="renderResourceProjects(this, '${encodeURIComponent(pmName)}')">
                <option value="">-- Scegli Risorsa --</option>
                ${resources.map((r, idx) => `<option value="${idx}">${r.name} (${r.role})</option>`).join('')}
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

window.promptAddResource = async function(encodedPmName) {
  const pmName = decodeURIComponent(encodedPmName);
  const name = prompt(`Inserisci Nome e Cognome della nuova risorsa per ${pmName}:`);
  if (!name || name.trim() === '') return;

  const role = prompt(`Inserisci il ruolo di ${name} (es. Fullstack Dev, QA Analyst, Data Engineer):`) || "Specialista IT";

  if (!coordinatorResources[pmName]) {
    coordinatorResources[pmName] = [];
  }

  const newRes = {
    name: name.trim(),
    role: role.trim(),
    projects: []
  };

  coordinatorResources[pmName].push(newRes);

  try {
    await fetch('/api/resources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coordinator_name: pmName,
        resource_name: newRes.name,
        role: newRes.role,
        assigned_projects: []
      })
    });
  } catch (e) {
    console.log("Saved to LocalStorage.");
  }

  saveState();
  showToast(`Nuova risorsa ${name} salvata nel DB Neon per ${pmName}!`);
};

/* ----------------------------------------------------
   EXCEL FILE UPLOAD & IMPORT HANDLERS (.xlsx, .xls)
---------------------------------------------------- */
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
            const pmVal = row['PM'] || row['pm'] || row['Coordinatore'] || row['PM / Coordinatore'] || 'Non Assegnato';
            const effortVal = row['Effort %'] || row['Effort'] || row['effort'] || 0;

            if (progettoVal && String(progettoVal).trim().length > 0) {
              importedProjects.push({
                id: `PRJ-${String(idx + 1).padStart(3, '0')}`,
                progetto: String(progettoVal).trim(),
                stato: String(statoVal).trim(),
                pm: String(pmVal).trim(),
                effort: parseInt(effortVal) || 0
              });
            }
          });

          if (importedProjects.length > 0) {
            projects = importedProjects;
            
            // Sync to Neon PostgreSQL DB via API
            try {
              await fetch('/api/projects/batch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projects)
              });
            } catch (err) {
              console.log("Synced to LocalStorage.");
            }

            saveState();
            showToast(`File Excel '${file.name}' sincronizzato con il DB Neon! Importati ${projects.length} progetti.`);
          } else {
            alert("Nessun progetto valido trovato nel file Excel. Assicurati che le colonne siano: Progetto, Stato, PM, Effort %.");
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
  const headers = 'ID,Progetto,Stato,PM,Risorsa,Effort %,Avanzamento %,Effort Previsto (gg/u),Effort Residuo (gg/u),Scadenza,Stato Tempistiche,Descrizione,Criticità';
  let csvContent = "data:text/csv;charset=utf-8," + headers + "\n";
  projects.forEach(p => {
    const scad = p.scadenza ? String(p.scadenza).slice(0, 10) : '';
    csvContent += `"${p.id}","${p.progetto}","${p.stato}","${p.pm}","${p.risorsa || ''}",${p.effort},${p.avanzamento || 0},${p.effort_previsto || 0},${p.effort_residuo || 0},"${scad}","${p.stato_tempistiche || 'In linea'}","${(p.descrizione || '').replace(/"/g, "''")}","${(p.criticita || '').replace(/"/g, "''")}"\n`;
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

function openAddProjectModal() {
  document.getElementById('modalProjectTitle').textContent = "Aggiungi Progetto MP95";
  document.getElementById('modalProjectId').value = "";
  document.getElementById('modalProgetto').value = "";
  document.getElementById('modalStato').value = "In corso";
  document.getElementById('modalEffort').value = "10";
  document.getElementById('modalAvanzamento').value = "0";
  document.getElementById('modalPm').value = "";
  document.getElementById('modalRisorsa').value = "";
  document.getElementById('modalEffortPrevisto').value = "";
  document.getElementById('modalEffortResiduo').value = "";
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
  document.getElementById('modalEffortPrevisto').value = prj.effort_previsto || '';
  document.getElementById('modalEffortResiduo').value = prj.effort_residuo || '';
  // scadenza comes as 'YYYY-MM-DD' from DB (possibly with timestamp)
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
  const descrizione = document.getElementById('modalDescrizione').value.trim() || null;
  const effort_previsto = parseFloat(document.getElementById('modalEffortPrevisto').value) || 0;
  const effort_residuo = parseFloat(document.getElementById('modalEffortResiduo').value) || 0;
  const avanzamento = parseInt(document.getElementById('modalAvanzamento').value) || 0;
  const scadenza = document.getElementById('modalScadenza').value || null;
  const stato_tempistiche = document.getElementById('modalStatoTempistiche').value || 'In linea';
  const criticita = document.getElementById('modalCriticita').value.trim() || null;

  const payload = { progetto, stato, pm, effort, risorsa, descrizione,
    effort_previsto, effort_residuo, avanzamento, scadenza, stato_tempistiche, criticita };

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
   RESET DATA
---------------------------------------------------- */
function initResetData() {
  document.getElementById('resetDataBtn').addEventListener('click', async () => {
    if (confirm('Sei sicuro di voler ripristinare i dati originali dal file Excel? Tutte le modifiche locali ed a DB andranno perse.')) {
      projects = [...INITIAL_PROJECTS];
      coordinatorResources = DEFAULT_COORDINATOR_RESOURCES;
      await syncBatchToNeon(projects);
      saveState();
      showToast('Dati ripristinati alla versione iniziale Excel ed allineati sul DB Neon!');
    }
  });
}

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
