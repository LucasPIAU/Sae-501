const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const lyceeRoutes = require('./routes/lycee.js');
const formationRoutes = require('./routes/formation.js');

// Utilisation de cors pour permettre les requêtes Cross-Origin
app.use(cors());

// Middleware pour parser les données JSON envoyées dans les requêtes
app.use(bodyParser.json());

app.use('/lycee', lyceeRoutes);
app.use('/formation', formationRoutes);

// Lancer le serveur sur le port 3001
const port = 3001;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});