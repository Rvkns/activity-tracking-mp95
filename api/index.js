/**
 * Serverless API Handler for Vercel & Express - Connected to Neon PostgreSQL
 * TrackMaster MP95
 */

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Neon PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Helper route handler to accept both /api/projects and /projects
const router = express.Router();

// 1. GET /projects - Retrieve all projects
router.get('/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, progetto, stato, pm, effort FROM mp95_projects ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Errore durante il recupero dei progetti dal DB Neon.' });
  }
});

// 2. POST /projects - Create a new project
router.post('/projects', async (req, res) => {
  const { id, progetto, stato, pm, effort } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO mp95_projects (id, progetto, stato, pm, effort) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, progetto, stato, pm, parseInt(effort) || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Errore durante la creazione del progetto.' });
  }
});

// 3. PUT /projects/:id - Update an existing project
router.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { progetto, stato, pm, effort } = req.body;
  try {
    const result = await pool.query(
      'UPDATE mp95_projects SET progetto = $1, stato = $2, pm = $3, effort = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
      [progetto, stato, pm, parseInt(effort) || 0, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Progetto non trovato.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Errore durante l\'aggiornamento del progetto.' });
  }
});

// 4. DELETE /projects/:id - Delete a project
router.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM mp95_projects WHERE id = $1', [id]);
    res.json({ message: 'Progetto eliminato con successo.' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Errore durante l\'eliminazione del progetto.' });
  }
});

// 5. POST /projects/batch - Replace/Sync array of projects (for Excel Upload)
router.post('/projects/batch', async (req, res) => {
  const projectsList = req.body;
  if (!Array.isArray(projectsList)) {
    return res.status(400).json({ error: 'Formato payload non valido.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM mp95_projects');

    for (let i = 0; i < projectsList.length; i++) {
      const p = projectsList[i];
      const prjId = p.id || `PRJ-${String(i + 1).padStart(3, '0')}`;
      await client.query(
        'INSERT INTO mp95_projects (id, progetto, stato, pm, effort) VALUES ($1, $2, $3, $4, $5)',
        [prjId, p.progetto, p.stato, p.pm, parseInt(p.effort) || 0]
      );
    }
    await client.query('COMMIT');
    res.json({ message: `Sincronizzati ${projectsList.length} progetti con il DB Neon!` });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Batch update error:', err);
    res.status(500).json({ error: 'Errore durante la sincronizzazione batch con il DB Neon.' });
  } finally {
    client.release();
  }
});

// 6. GET /resources - Retrieve coordinator resources
router.get('/resources', async (req, res) => {
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
    res.status(500).json({ error: 'Errore durante il recupero delle risorse.' });
  }
});

// 7. POST /resources - Add a new resource for a coordinator
router.post('/resources', async (req, res) => {
  const { coordinator_name, resource_name, role, assigned_projects } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO mp95_coordinator_resources (coordinator_name, resource_name, role, assigned_projects) VALUES ($1, $2, $3, $4) RETURNING *',
      [coordinator_name, resource_name, role || 'Specialista IT', assigned_projects || []]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating resource:', err);
    res.status(500).json({ error: 'Errore durante la creazione della risorsa.' });
  }
});

// Mount router on both / and /api
app.use('/api', router);
app.use('/', router);

module.exports = app;
