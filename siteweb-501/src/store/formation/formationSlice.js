import { createSlice } from '@reduxjs/toolkit';

const formationSlice = createSlice({
  name: 'formations',
  initialState: {
    formations: [],  // Stocke les formations récupérées dans data.js
    loading: false,
    errors: null,
  },
  reducers: {
    setFormations: (state, action) => {
      console.log("Données envoyées au state : ", action.payload);
      state.formations = action.payload;
    },
    moveContent: (state, action) => {
      const { formationId, indexFrom, indexTo } = action.payload;
      
      // Recherche de la formation par son id
      const formationIndex = state.formations.findIndex(f => f.id === formationId);
      
      if (formationIndex === -1) {
        console.error(`Formation avec l'ID "${formationId}" introuvable`);
        return;
      }

      console.log(JSON.parse(JSON.stringify(state.formations)))
      console.log(formationId)
      console.log(formationIndex)

      const formation = state.formations[formationIndex];

      // Déproxyification de l'objet formation
      const formationCopy = JSON.parse(JSON.stringify(formation)); // Crée une copie sans proxy

      console.log("formationCopy (déréférencée) : ", formationCopy);

      // Vérification que 'content' existe bien dans la formation
      if (formationCopy?.content) {
        const content = formationCopy.content;
        console.log("content avant modification : ", content);

        // Manipulation du contenu (déplacement de l'élément)
        const [movedItem] = content.splice(indexFrom, 1); // Suppression de l'élément à l'indexFrom
        content.splice(indexTo, 0, movedItem); // Insertion de l'élément à l'indexTo

        console.log("content après modification : ", content);
        
        // Mise à jour de la formation dans le tableau formations
        state.formations[formationIndex] = formationCopy;
      } else {
        console.error("Erreur: Le contenu de la formation est manquant ou invalide.");
      }
    }
  }
});

export const { setFormations, moveContent } = formationSlice.actions;
export default formationSlice.reducer;
