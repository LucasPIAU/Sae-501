const express = require('express');

const formationRoutes = express();

formationRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        
    } catch (err) {
        res.status(500).json({message: `Une erreur interne est survenue dans la récupération d'une formation : ${err}`});
    }
});

module.exports = formationRoutes;