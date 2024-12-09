const { MongoClient } = require('mongodb');
const fs = require('fs');

const url = 'mongodb://localhost:27017';
const dbName = 'DataLyceeMayenne';

async function loadJSONData(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Erreur de lecture du fichier ${filePath}:`, err);
        throw err;
    }
}

async function importData() {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);

        const collections = [
            { name: 'etablissements', file: './json/etablissements.json' },
            { name: 'formationPro', file: './json/pro.json' },
            { name: 'formationsTechno', file: './json/techno.json' },
            { name: 'options-generale', file: './json/opt-generale.json' },
            { name: 'option-seconde', file: './json/opt-seconde.json' },
        ];

        for (const { name, file } of collections) {
            const data = await loadJSONData(file);
            const collection = db.collection(name);
            await collection.deleteMany({});
            const result = await collection.insertMany(data);
            console.log(`${result.insertedCount} documents insérés dans la collection ${name}`);
        }

        console.log('Données importées avec succès!');
    } catch (err) {
        console.error('Erreur lors de l\'importation des données:', err);
    } finally {
        await client.close();
    }
}

importData();
