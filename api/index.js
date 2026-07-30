/**
 * Serverless API Handler for Vercel & Express - Connected to Neon PostgreSQL
 * TrackMaster MP95 — with extended project fields
 */

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const FALLBACK_DB_URL = "postgresql://neondb_owner:npg_cNRTYLP60BUz@ep-misty-base-al00ws0j-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require";

function getPool() {
  const connectionString = process.env.DATABASE_URL || FALLBACK_DB_URL;
  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
}

// 1. GET /api/projects - Retrieve all projects (all fields)
app.get(['/api/projects', '/projects'], async (req, res) => {
  const pool = getPool();
  try {
    const result = await pool.query(
      `SELECT id, progetto, stato, pm, effort,
              risorsa, descrizione, effort_previsto, effort_residuo,
              avanzamento, scadenza, stato_tempistiche, criticita
       FROM mp95_projects ORDER BY id ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: err.message || 'Errore durante il recupero dei progetti dal DB Neon.' });
  } finally {
    await pool.end();
  }
});

// 2. POST /api/projects - Create a new project
app.post(['/api/projects', '/projects'], async (req, res) => {
  const {
    id, progetto, stato, pm, effort,
    risorsa, descrizione, effort_previsto, effort_residuo,
    avanzamento, scadenza, stato_tempistiche, criticita
  } = req.body;
  const pool = getPool();
  try {
    const result = await pool.query(
      `INSERT INTO mp95_projects
         (id, progetto, stato, pm, effort, risorsa, descrizione,
          effort_previsto, effort_residuo, avanzamento, scadenza,
          stato_tempistiche, criticita)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       RETURNING *`,
      [
        id, progetto, stato, pm, parseInt(effort) || 0,
        risorsa || null, descrizione || null,
        parseFloat(effort_previsto) || 0, parseFloat(effort_residuo) || 0,
        parseInt(avanzamento) || 0, scadenza || null,
        stato_tempistiche || 'In linea', criticita || null
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: err.message || 'Errore durante la creazione del progetto.' });
  } finally {
    await pool.end();
  }
});

// 3. PUT /api/projects/:id - Update an existing project
app.put(['/api/projects/:id', '/projects/:id'], async (req, res) => {
  const { id } = req.params;
  const {
    progetto, stato, pm, effort,
    risorsa, descrizione, effort_previsto, effort_residuo,
    avanzamento, scadenza, stato_tempistiche, criticita
  } = req.body;
  const pool = getPool();
  try {
    const result = await pool.query(
      `UPDATE mp95_projects SET
         progetto = $1, stato = $2, pm = $3, effort = $4,
         risorsa = $5, descrizione = $6,
         effort_previsto = $7, effort_residuo = $8,
         avanzamento = $9, scadenza = $10,
         stato_tempistiche = $11, criticita = $12,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $13
       RETURNING *`,
      [
        progetto, stato, pm, parseInt(effort) || 0,
        risorsa || null, descrizione || null,
        parseFloat(effort_previsto) || 0, parseFloat(effort_residuo) || 0,
        parseInt(avanzamento) || 0, scadenza || null,
        stato_tempistiche || 'In linea', criticita || null,
        id
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Progetto non trovato.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: err.message || 'Errore durante l\'aggiornamento del progetto.' });
  } finally {
    await pool.end();
  }
});

// 4. DELETE /api/projects/:id - Delete a project
app.delete(['/api/projects/:id', '/projects/:id'], async (req, res) => {
  const { id } = req.params;
  const pool = getPool();
  try {
    await pool.query('DELETE FROM mp95_projects WHERE id = $1', [id]);
    res.json({ message: 'Progetto eliminato con successo.' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: err.message || 'Errore durante l\'eliminazione del progetto.' });
  } finally {
    await pool.end();
  }
});

// 5. POST /api/projects/batch - Replace/Sync array of projects (for Excel Upload)
app.post(['/api/projects/batch', '/projects/batch'], async (req, res) => {
  const projectsList = req.body;
  if (!Array.isArray(projectsList)) {
    return res.status(400).json({ error: 'Formato payload non valido.' });
  }

  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM mp95_projects');

    for (let i = 0; i < projectsList.length; i++) {
      const p = projectsList[i];
      const prjId = p.id || `PRJ-${String(i + 1).padStart(3, '0')}`;
      await client.query(
        `INSERT INTO mp95_projects
           (id, progetto, stato, pm, effort, risorsa, descrizione,
            effort_previsto, effort_residuo, avanzamento, scadenza,
            stato_tempistiche, criticita)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        [
          prjId, p.progetto, p.stato, p.pm, parseInt(p.effort) || 0,
          p.risorsa || null, p.descrizione || null,
          parseFloat(p.effort_previsto) || 0, parseFloat(p.effort_residuo) || 0,
          parseInt(p.avanzamento) || 0, p.scadenza || null,
          p.stato_tempistiche || 'In linea', p.criticita || null
        ]
      );
    }
    await client.query('COMMIT');
    res.json({ message: `Sincronizzati ${projectsList.length} progetti con il DB Neon!` });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Batch update error:', err);
    res.status(500).json({ error: err.message || 'Errore durante la sincronizzazione batch con il DB Neon.' });
  } finally {
    client.release();
    await pool.end();
  }
});

// 6. GET /api/resources - Retrieve coordinator resources
app.get(['/api/resources', '/resources'], async (req, res) => {
  const pool = getPool();
  try {
    const result = await pool.query('SELECT * FROM mp95_coordinator_resources ORDER BY id ASC');
    
    const grouped = {};
    result.rows.forEach(r => {
      if (!grouped[r.coordinator_name]) {
        grouped[r.coordinator_name] = [];
      }
      grouped[r.coordinator_name].push({
        name: r.resource_name,
        role: r.role,
        projects: r.assigned_projects || []
      });
    });
    res.json(grouped);
  } catch (err) {
    console.error('Error fetching resources:', err);
    res.status(500).json({ error: err.message || 'Errore durante il recupero delle risorse.' });
  } finally {
    await pool.end();
  }
});

// 7. POST /api/resources - Add a new resource for a coordinator
app.post(['/api/resources', '/resources'], async (req, res) => {
  const { coordinator_name, resource_name, role, assigned_projects } = req.body;
  const pool = getPool();
  try {
    const result = await pool.query(
      'INSERT INTO mp95_coordinator_resources (coordinator_name, resource_name, role, assigned_projects) VALUES ($1, $2, $3, $4) RETURNING *',
      [coordinator_name, resource_name, role || 'Specialista IT', assigned_projects || []]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating resource:', err);
    res.status(500).json({ error: err.message || 'Errore durante la creazione della risorsa.' });
  } finally {
    await pool.end();
  }
});

module.exports = app;
