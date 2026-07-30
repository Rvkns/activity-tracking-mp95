/**
 * Database Initialization & Migration Script for Neon PostgreSQL
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

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

const INITIAL_RESOURCES = [
  { coordinator: "Aurora Parisi (TMI External)", name: "Marco Rossi", role: "Senior Fullstack Dev", projects: ["WIDE-IT-Digital", "Franchise-IT-Digital"] },
  { coordinator: "Aurora Parisi (TMI External)", name: "Laura Conti", role: "UI/UX Designer", projects: ["Paperless-IT-Digital", "NRC-IT-Digital - TOYOTA"] },
  { coordinator: "Aurora Parisi (TMI External)", name: "Stefano Rinaldi", role: "QA Engineer", projects: ["Boe mensa-IT-Digital", "Intouch-IT-Digital"] },
  
  { coordinator: "Daniele De Dominicis (TMI External)", name: "Giuseppe Neri", role: "Backend Lead", projects: ["CMS-IT-Digital", "CMS - gestione ticket secondo livello-IT-Digital"] },
  { coordinator: "Daniele De Dominicis (TMI External)", name: "Elena Moretti", role: "DBA Specialist", projects: ["CMS-IT-Digital", "Flag usato akita-IT-Digital"] },
  
  { coordinator: "Federico Arte (TMI External)", name: "Matteo Galli", role: "DevOps Engineer", projects: ["Sailpoint-IT-Digital", "Service Now 2.0-IT-Digital"] },
  { coordinator: "Federico Arte (TMI External)", name: "Alessia Fontana", role: "AI Specialist", projects: ["AI LAB", "Repository per Product Quality"] },
  
  { coordinator: "Francesca Rozzi (TMI External)", name: "Davide Palmieri", role: "Financial Consultant", projects: ["Digital Finance - Controlling-IT-Digital", "Digital Sales-IT-Digital"] },
  { coordinator: "Francesca Rozzi (TMI External)", name: "Chiara Ferri", role: "Solution Architect", projects: ["ACT AS A BSS PARTNER - Survey-IT-Digital", "Procedura Service Now-IT-Digital"] },
  
  { coordinator: "Francesca Rozzi (TMI External) - Aurora Parisi (TMI External)", name: "Gianluca Martini", role: "Integration Lead", projects: ["Digital Finance - Purchasing-IT-Digital", "TED-IT-Digital"] },
  
  { coordinator: "Serena Lacorte (TMI External)", name: "Roberto Gatti", role: "System Engineer", projects: ["Warehouse channel -IT-Digital", "MIA - KPI Dealer-IT-Digital"] },
  { coordinator: "Serena Lacorte (TMI External)", name: "Simona D'Amico", role: "Data Analyst", projects: ["Backlog Bearit -IT-Digital", "BRiT WayDoc-IT-Digital"] }
];

async function initDatabase() {
  console.log("Inizializzazione Database Neon PostgreSQL in corso...");
  const client = await pool.connect();
  try {
    // 1. Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS mp95_projects (
        id VARCHAR(50) PRIMARY KEY,
        progetto VARCHAR(255) NOT NULL,
        stato VARCHAR(100) NOT NULL DEFAULT 'In corso',
        pm VARCHAR(255) NOT NULL,
        effort INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS mp95_coordinator_resources (
        id SERIAL PRIMARY KEY,
        coordinator_name VARCHAR(255) NOT NULL,
        resource_name VARCHAR(255) NOT NULL,
        role VARCHAR(255) DEFAULT 'Specialista IT',
        assigned_projects TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✓ Tabelle 'mp95_projects' e 'mp95_coordinator_resources' verificate/create.");

    // 2. Migration: add new columns if they don't exist (non-destructive)
    await client.query(`
      ALTER TABLE mp95_projects
        ADD COLUMN IF NOT EXISTS risorsa VARCHAR(255),
        ADD COLUMN IF NOT EXISTS descrizione TEXT,
        ADD COLUMN IF NOT EXISTS effort_previsto NUMERIC(6,1) DEFAULT 0,
        ADD COLUMN IF NOT EXISTS effort_residuo NUMERIC(6,1) DEFAULT 0,
        ADD COLUMN IF NOT EXISTS avanzamento INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS scadenza DATE,
        ADD COLUMN IF NOT EXISTS stato_tempistiche VARCHAR(50) DEFAULT 'In linea',
        ADD COLUMN IF NOT EXISTS criticita TEXT,
        ADD COLUMN IF NOT EXISTS reparto VARCHAR(100);
    `);
    console.log("✓ Migrazione nuove colonne completata (risorsa, descrizione, effort_previsto/residuo, avanzamento, scadenza, stato_tempistiche, criticita, reparto).");

    // 3. Check if projects exist
    const prjCheck = await client.query("SELECT COUNT(*) FROM mp95_projects");
    if (parseInt(prjCheck.rows[0].count) === 0) {
      console.log("Popolamento progetti iniziali (36 record)...");
      for (const p of INITIAL_PROJECTS) {
        await client.query(
          "INSERT INTO mp95_projects (id, progetto, stato, pm, effort) VALUES ($1, $2, $3, $4, $5)",
          [p.id, p.progetto, p.stato, p.pm, p.effort]
        );
      }
      console.log("✓ 36 progetti inseriti nel DB Neon!");
    } else {
      console.log(`✓ Tabella progetti contiene già ${prjCheck.rows[0].count} record.`);
    }

    // 3. Check if resources exist
    const resCheck = await client.query("SELECT COUNT(*) FROM mp95_coordinator_resources");
    if (parseInt(resCheck.rows[0].count) === 0) {
      console.log("Popolamento risorse iniziali coordinatori...");
      for (const r of INITIAL_RESOURCES) {
        await client.query(
          "INSERT INTO mp95_coordinator_resources (coordinator_name, resource_name, role, assigned_projects) VALUES ($1, $2, $3, $4)",
          [r.coordinator, r.name, r.role, r.projects]
        );
      }
      console.log("✓ Risorse coordinatori inserite nel DB Neon!");
    } else {
      console.log(`✓ Tabella risorse contiene già ${resCheck.rows[0].count} record.`);
    }

    console.log("\n✅ ALLINEAMENTO DATABASE NEON POSTGRESQL COMPLETATO CON SUCCESSO!");
  } catch (err) {
    console.error("❌ Errore durante l'inizializzazione del DB:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase, pool };
