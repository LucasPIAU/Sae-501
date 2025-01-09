import cors from 'cors';
import express from 'express';
import lyceeRoutes from './routes/lycee.js';
import formationRoutes from './routes/formation.js';
import authRoutes from './routes/auth.js';

const app = express();

// Utilisation de cors pour permettre les requêtes Cross-Origin
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/lycee', lyceeRoutes);
app.use('/api/formation', formationRoutes);
app.use('/api/auth', authRoutes);

// Lancer le serveur sur le port 3001
const port = 3001;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});