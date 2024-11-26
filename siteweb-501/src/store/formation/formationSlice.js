import { createSlice } from '@reduxjs/toolkit';
import { loadInfos } from './formationAsyncAction';

const formationSlice = createSlice({
  name: 'formations',
  initialState: {
    formations: [], // Stocke les formations (options, techno, generale, pro)
    etablissement: [], // Stocke les établissements
    filteredEtablissements: [], // Contient les établissements filtrés
    loading: false,
    errors: null,
  },
  reducers: {
    setFormations: (state, action) => {
      console.log("Données envoyées au state : ", action.payload);
      state.formations = action.payload;
    },
    setEtablissements: (state, action) => {
      console.log("Données des établissements envoyées au state : ", action.payload);
      state.etablissement = action.payload;
    },
    setFilteredEtablissements: (state, action) => {
      console.log("Données filtrées des établissements : ", action.payload);
      state.filteredEtablissements = action.payload;
    },
    moveContent: (state, action) => {
      const { formationId, indexFrom, indexTo } = action.payload;

      // Recherche de la formation par son id
      const formationIndex = state.formations.findIndex(f => f.id === formationId);

      if (formationIndex === -1) {
        console.error(`Formation avec l'ID "${formationId}" introuvable`);
        return;
      }

      const formation = state.formations[formationIndex];
      const formationCopy = JSON.parse(JSON.stringify(formation)); // Crée une copie sans proxy

      if (formationCopy?.content) {
        const content = formationCopy.content;
        const [movedItem] = content.splice(indexFrom, 1); // Suppression de l'élément à l'indexFrom
        content.splice(indexTo, 0, movedItem); // Insertion de l'élément à l'indexTo
        state.formations[formationIndex] = formationCopy;
      } else {
        console.error("Erreur: Le contenu de la formation est manquant ou invalide.");
      }
    },
    editContent: (state, action) => {
      const { formationId, index, newValue } = action.payload;

      // Recherche de la formation par son id
      const formationIndex = state.formations.findIndex(f => f.id === formationId);

      if (formationIndex === -1) {
        console.error(`Formation avec l'ID "${formationId}" introuvable`);
        return;
      }

      const formation = state.formations[formationIndex];
      const formationCopy = JSON.parse(JSON.stringify(formation));

      if (formationCopy?.content && formationCopy.content[index] !== undefined) {
        formationCopy.content[index] = newValue; // Mise à jour de l'élément
        state.formations[formationIndex] = formationCopy;
      } else {
        console.error("Erreur: L'élément à modifier est manquant ou invalide.");
      }
    },
    deleteContent: (state, action) => {
      const { formationId, index } = action.payload;

      // Recherche de la formation par son id
      const formationIndex = state.formations.findIndex(f => f.id === formationId);

      if (formationIndex === -1) {
        console.error(`Formation avec l'ID "${formationId}" introuvable`);
        return;
      }

      const formation = state.formations[formationIndex];
      const formationCopy = JSON.parse(JSON.stringify(formation));

      if (formationCopy?.content && formationCopy.content[index] !== undefined) {
        formationCopy.content.splice(index, 1); // Suppression de l'élément
        state.formations[formationIndex] = formationCopy;
      } else {
        console.error("Erreur: L'élément à supprimer est manquant ou invalide.");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInfos.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadInfos.fulfilled, (state, action) => {
      const data = action.payload;

      // Filtrer les formations par types
      const formations = data.filter(item =>
        ['options', 'techno', 'generale', 'pro'].includes(item.type)
      );

      // Filtrer les établissements
      const etablissements = data.filter(item => item.type === 'etablissement');
      console.log(formations)
      console.log(etablissements)
      // Mettre à jour le state
      state.formations = formations;
      state.etablissement = etablissements;

      console.log(state.formations);
      console.log(state.etablissement);
      state.loading = false;
    })
    .addCase(loadInfos.rejected, (state, action) => {
      state.loading = false;
    })
  }
});

// Exporter les actions
export const {
  setFormations,
  setEtablissements,
  initializeData,
  moveContent,
  editContent,
  deleteContent,
  setFilteredEtablissements
} = formationSlice.actions;

// Exporter le reducer
export default formationSlice.reducer;
