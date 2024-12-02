import express from 'express';
import connectToDB from '../functions/connectDb.js';
import auth from '../middleware/auth.js';
import { ObjectId } from 'mongodb';

const formationRoutes = express();

// Exemple de format JSON d'une formation dans la base de donnée
{
    id: "String"
    name: "String"
    filière: "String" // Générale et technologique ou professionel
    data: "Array<Object>" // Le format de la data dépend de la filière
    etablissement: "Array<String>" // List d'ids des établissement
    flyerLink: "String" // Id du flyer correspondant
}

// Routes GET

formationRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // On se connect à la base de donnée et on récupère la collection formations
        const db = await connectToDB();
        const collectionFormations = db.collection('Formations');

        // On fait la requêtes pour récupérer la formation qui correspond à l'id passer en paramètre
        if (id) {
            const query = { '_id': new ObjectId(id) };
            console.log(query);
            const formation = await collectionFormations.findOne(query);
            if (formation) res.status(200).json(formation);
            else res.status(404).json({ message: "Aucune formation trouvé pour cet id" });
        } else throw "L'id de la formations est obligatoire";
    } catch (err) {
        res.status(500).json({ message: `Une erreur interne est survenue dans la récupération d'une formation : ${err}` });
    }
});

formationRoutes.get('', async (req, res) => {
    try {
        // On se connect à la base de donnée et on récupère la collection formation
        const db = await connectToDB();
        const collectionFormations = db.collection('Formations');

        // On fait la requête pour récupérer la liste de toute les formations
        const cursor = collectionFormations.find();
        const formations = await cursor.toArray();

        // Ensuite on calcule le nombre de page en sachant qu'il y a maximum 20 élément par page
        if (formations.length > 0) {
            const nbrPage = Math.ceil(formations.length / 20); // On arrondie à l'entier superieur pour avoir le nbr de page
            const formationsSlice = formations.slice(0, 20); // On ne garde les 20 éléments correspondant à la page
        } else res.status(404).json({ message: "Aucune formations trouvée" });

    } catch (err) {
        res.status(500).json({ message: `Une erreur interne est survenue dans la récupération des formations : ${err}` });
    }
});

// Routes PUT

formationRoutes.put('/:id', [auth], async (req, res) => {
    const { id } = req.params;
    try {
        // Modification de la formation avec les nouvelles données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la modification d'une formation : ${err}` });
    }
});

// Routes POST

formationRoutes.post('/add', [auth], async (req, res) => {
    try {
        // Création de la formation avec les données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la création d'une formation : ${err}` });
    }
});

// Routes DELETE

formationRoutes.delete('/:id', [auth], async (req, res) => {
    const { id } = req.params;
    try {
        // Suppression de la formation avec les nouvelles données
        res.status(200).json('OK');
    } catch (err) {
        res.status(500).json({ message: `Une erreur est survenue pendant la suppression d'une formation : ${err}` });
    }
});

export default formationRoutes;