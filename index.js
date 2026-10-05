const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// La base de datos vive en data/artists.json: la usa esta API y tambien
// la lee el front directamente cuando el sitio corre en GitHub Pages.
const artistsData = require('./data/artists.json');

app.use(cors());
app.use(express.json());

// Sirve el sitio (index.html, styles.css, script.js, img/, audio/, data/)
app.use(express.static(__dirname));

// ==========================================
//  RUTAS (API)
// ==========================================

// 1. Obtener TODOS los artistas
app.get('/api/artists', (req, res) => {
    res.json(artistsData);
});

// 2. Obtener UN artista por ID
app.get('/api/artists/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const artist = artistsData.find(a => a.id === id);

    if (artist) {
        res.json(artist);
    } else {
        res.status(404).json({ message: "Artista no encontrado" });
    }
});

// ==========================================
//          ENCENDER SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`\n🚀 Rockify en: http://localhost:${PORT}`);
    console.log(`📡 API de Artistas: http://localhost:${PORT}/api/artists\n`);
});
