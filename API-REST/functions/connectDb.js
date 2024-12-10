import { MongoClient } from "mongodb";

// URI de connexion à MongoDB
const uri = "mongodb://admin:test@127.0.0.1:27018/";

// Nom de la base de données
const dbName = "DataLyceeMayenne";

// Fonction pour se connecter à la base de données
export default async function connectToDB() {
  try {
    // Création d'un client MongoDB
    const client = new MongoClient(uri);

    // Connexion au serveur MongoDB
    await client.connect();

    // Sélection de la base de données
    const db = client.db(dbName);

    // On peut retourner l'objet db si tu veux effectuer des opérations supplémentaires
    return db;

  } catch (error) {
    console.error("Erreur lors de la connexion à MongoDB : ", error);
  }
}