import express from 'express';
import auth from '../middleware/auth.js';

const lyceeRoutes = express();

// Routes GET

lyceeRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Récupération d'un lycée
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur interne est survenue dans la récupération d'un lycée : ${err}` });
    }
});

lyceeRoutes.get('', async (req, res) => {
    try {
        // Récupération de la liste de tout les lycées
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des lycées : ${err}` });
    }
});

// Routes PUT

lyceeRoutes.put('/:id', [auth], async (req, res) => {
    const { id } = req.params;
    try {
        // Modification d'un lycée avec les nouvelles données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la modification d'un lycée : ${err}` });
    }
});

// Routes POST

lyceeRoutes.post('/add', [auth], async (req, res) => {
    try {
        // Création d'un lycée' avec les données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la création d'un lycée : ${err}` });
    }
});

// Routes DELETE
lyceeRoutes.delete('/:id', [auth], async (req, res) => {
    const { id } = req.params;
    try {
        // Suppression dun lycée avec les nouvelles données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la suppression d'un lycée : ${err}` });
    }
});

export default lyceeRoutes;
