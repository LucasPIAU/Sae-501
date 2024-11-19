const express = require('express');

const lyceeRoutes = express();

lyceeRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        
    } catch (err) {
        res.status(500).json({message: `Une erreur interne est survenue dans la récupération d'un lycee : ${err}`});
    }
});

module.exports = lyceeRoutes;