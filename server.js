/**
 * Local Express Development Server for TrackMaster MP95
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const apiApp = require('./api/index.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API endpoints
app.use('/', apiApp);

// Static frontend files
app.use(express.static(__dirname));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Backend Server MP95 attivo sulla porta ${PORT}`);
    console.log(`🔗 Connesso al DB Neon PostgreSQL: ${process.env.PGHOST}`);
  });
}

module.exports = app;
