import { ObjectId } from "mongodb";
import connectToDB from "./connectDb.js"

async function findEtablissementByIds(ids) {
    try {
        // Connexion à la base de données
        const db = await connectToDB();

        // Rechercher les établissements dans la collection
        const etablissements = await db.collection("Etablissement").find({
            _id: { $in: ids.map((id) => new ObjectId(id)) },
        }).toArray();
  
        return etablissements;
    } catch (error) {
        console.log(error);
        return [];
  }
}

/**
 * Vérifie que l'objet formation est valide.
 * @param {Object} formation - L'objet formation à vérifier.
 * @param {Function} findEtablissementByIds - Fonction pour rechercher les établissements dans la base de données.
 * @returns {Promise<{ valid: boolean, error: string[] }>} - Résultat de la vérification.
 */
export async function checkFormation(formation) {
  const error = [];
  const validFilieres = ["Professionel", "technologique", "generale", "option"];
  const invalidIds = formation.etablissement.filter((id) => !ObjectId.isValid(id));
  const foundEtablissements = await findEtablissementByIds(formation.etablissement);
  const foundIds = foundEtablissements.map((etab) => etab._id.toString());
  const missingIds = formation.etablissement.filter((id) => !foundIds.includes(id));

  // Vérification du champ "name"
  if (!formation.name || typeof formation.name !== "string") {
    error.push("Le champ 'name' est requis et doit être une chaîne de caractères.");
  }else if(!formation.filiere || !validFilieres.includes(formation.filiere)){
    error.push(`Le champ 'filiere' est requis et doit être l'une des valeurs suivantes : ${validFilieres.join(", ")}.`);
  }else if (!Array.isArray(formation.etablissement) || formation.etablissement.length === 0) {
    error.push("Le champ 'etablissement' est requis et doit être une liste d'identifiants.");
  }else if (invalidIds.length > 0) {
    error.push(`Les identifiants suivants ne sont pas valides : ${invalidIds.join(", ")}.`);
  }else if(missingIds.length > 0){
    error.push(`Les identifiants suivants n'existent pas dans la collection Etablissement : ${missingIds.join(", ")}.`);
  }

  return {
    valid: error.length === 0,
    error,
  };
}