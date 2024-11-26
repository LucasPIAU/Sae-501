const express = require('express');

const formationRoutes = express();


// Exemple de format JSON d'une formation dans la base de donnée
{
    id: "String"
    name: "String"
    filière: "String" // Générale et technologique ou professionel
    data: "Object" // Le format de la data dépend de la filière 
}

// Exemple de data pour une formation pro
{
    categorie: "String"
    options: "Array" // Liste des options possible si il y en as sinon null
    etablissement: "Array" // Liste d'id des établissement qui propose cette formation
    metierExercer: "Array" // Liste de je sais pas quoi j'ai rien compris
    lieuxExercices: "Array" // Liste des métier possible suite à cette formation
    poursuitesEtude: "Array" // Liste des poursuites d'études possible avec cette formation
}



// Routes GET

formationRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Récupération d'une formation
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({message: `Une erreur interne est survenue dans la récupération d'une formation : ${err}`});
    }
});

formationRoutes.get('', async (req, res) => {
    try {
        // récupération de la liste de toutes les formations
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({message: `Une erreur interne est survenue dans la récupération des formations : ${err}`});
    }
});

// Routes PUT

formationRoutes.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Modification de la formation avec les nouvelles données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({message: `Une erreur est survenue pendant la modification d'une formation : ${err}`});
    }
});

// Routes POST

formationRoutes.post('/add', async (req, res) => {
    try {
        // Création de la formation avec les données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({message: `Une erreur est survenue pendant la création d'une formation : ${err}`});
    }
});

// Routes DELETE

formationRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Suppression de la formation avec les nouvelles données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({message: `Une erreur est survenue pendant la suppression d'une formation : ${err}`});
    }
});

module.exports = formationRoutes;