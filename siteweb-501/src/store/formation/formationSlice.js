import { createSlice } from '@reduxjs/toolkit';
import { loadInfos } from './formationAsyncAction';
import { selectCurrentPage } from './formationSelector';

const formationSlice = createSlice({
  name: 'formations',
  initialState: {
    formations: [],
    etablissement: [],
    filteredFormations: [],
    filteredEtablissements: [],
    selectedFormations: [],
    selectedCategorie: null,
    loading: false,
    errors: null,
    currentPage: null,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilteredEtablissements: (state, action) => {
      console.log("Données filtrées des établissements : ", action.payload);
      state.filteredEtablissements = action.payload;
    },
    addContent: (state, action) => {
      const { formationId, newElement } = action.payload;
    
      const formationIndex = state.formations.findIndex(f => f.id === formationId);
    
      if (formationIndex === -1) {
        console.error(`Formation avec l'ID "${formationId}" introuvable`);
        return;
      }
    
      const formation = state.formations[formationIndex];
      const formationCopy = JSON.parse(JSON.stringify(formation));
    
      if (formationCopy?.content) {
        formationCopy.content.push(newElement);
        state.formations[formationIndex] = formationCopy;
      } else {
        console.error("Erreur : Le contenu de la formation est manquant ou invalide.");
      }
    },
    setFilteredFormations: (state, action) => {
      console.log("Données filtrées des formations : ", action.payload);
      state.filteredFormations = action.payload;
    },
    moveContent: (state, action) => {
      const { formationId, indexFrom, indexTo } = action.payload;

      const formationIndex = state.formations.findIndex(f => f.id === formationId);

      if (formationIndex === -1) {
        console.error(`Formation avec l'ID "${formationId}" introuvable`);
        return;
      }

      const formation = state.formations[formationIndex];
      const formationCopy = JSON.parse(JSON.stringify(formation));

      if (formationCopy?.content) {
        const content = formationCopy.content;
        const [movedItem] = content.splice(indexFrom, 1);
        content.splice(indexTo, 0, movedItem);
        state.formations[formationIndex] = formationCopy;
      } else {
        console.error("Erreur: Le contenu de la formation est manquant ou invalide.");
      }
    },
    editContent: (state, action) => {
      const { formationId, index, newValue } = action.payload;

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
    addFormationToFilter: (state, action) => {
      const formation = action.payload;
      const selectedFormations = [...state.selectedFormations];

      console.log(selectedFormations);

      const formationIndex = selectedFormations.findIndex(f => f.id === formation.id);
      if (formationIndex === -1) {
        selectedFormations.push(formation); 
      } else {
        selectedFormations.splice(formationIndex, 1); 
      }

      state.selectedFormations = selectedFormations;

      console.log(selectedFormations);
      console.log(state.etablissement)
      if (selectedFormations.length === 0) {
        state.filteredEtablissements = state.etablissement; 
      } else {
        state.filteredEtablissements = state.etablissement.filter(etablissement =>
          selectedFormations.every(formation =>
            formation.etablissements.includes(etablissement.nom)
          )
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInfos.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadInfos.fulfilled, (state, action) => {
      const data = action.payload;

      const formations = data.filter(item =>
        ['options', 'techno', 'generale', 'pro'].includes(item.type)
      );

      const etablissements = data.filter(item => item.type === 'etablissement');
      console.log(formations)
      console.log(etablissements)
      state.formations = formations;
      state.etablissement = etablissements;
      state.filteredEtablissements  =etablissements;

      console.log("load formation : ", state.formations);
      console.log("load etablissement", state.etablissement);
      state.loading = false;
    })
    .addCase(loadInfos.rejected, (state, action) => {
      state.loading = false;
    })
  }
});

export const {
  setFormations,
  setEtablissements,
  initializeData,
  moveContent,
  editContent,
  deleteContent,
  setFilteredEtablissements,
  addContent,
  addFormationToFilter,
  setCurrentPage,
  setFilteredFormations
} = formationSlice.actions;

export default formationSlice.reducer;
