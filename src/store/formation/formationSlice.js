import { createSlice } from '@reduxjs/toolkit';
import { loadEtablissement, loadFormation } from './formationAsyncAction';

const formationSlice = createSlice({
  name: 'formations',
  initialState: {
    formations: [], // Stocke les formations (options, techno, generale, pro)
    etablissement: [], // Stocke les établissements
    filteredFormations: [],
    selectedFormations: [],
    loading: false,
    errors: null,
    currentPage: null,
    currentEtablissement: null,
    filteredEtablissements: [],
  },
  reducers: {
    setFormations: (state, action) => {
      // console.log("Données envoyées au state : ", action.payload);
      state.formations = action.payload;
    },
    setEtablissements: (state, action) => {
      // console.log("Données des établissements envoyées au state : ", action.payload);
      state.etablissement = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentEtablissement: (state, action) => {
      state.currentEtablissement = action.payload;
      // console.log(state.currentEtablissement);
    },
    setFilteredEtablissements: (state, action) => {
      // console.log("Données filtrées des établissements : ", action.payload);
      state.filteredEtablissements = action.payload;
    },
    addContent: (state, action) => {
      const { formationId, newElement } = action.payload;

      console.log("formationId : ",formationId);
      console.log("newElement : ", newElement);
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
      // console.log("Données filtrées des formations : ", action.payload);
      state.filteredFormations = action.payload;
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
    addFormationToFilter: (state, action) => {
      const formation = action.payload;
      const selectedFormations = [...state.selectedFormations]; // Copie pour éviter des références directes
      const etablissementsArray = [...state.etablissement]; // Déproxiage explicite
    
      // Si la formation est déjà sélectionnée, la retirer
      const formationIndex = selectedFormations.findIndex(f => f.id === formation.id);
      if (formationIndex === -1) {
        selectedFormations.push(formation); // Ajouter la formation
      } else {
        selectedFormations.splice(formationIndex, 1); // Retirer la formation
      }
    
      // Mettre à jour la liste des formations sélectionnées dans le state
      state.selectedFormations = selectedFormations;
    
      // Filtrer les établissements en fonction des formations sélectionnées
      if (selectedFormations.length !== 0) {
        console.log("selectedFormations :", selectedFormations);
        console.log("etablissementsArray :", JSON.stringify(etablissementsArray, null, 2));
    
        // Filtrer les établissements qui contiennent toutes les formations sélectionnées
        state.filteredEtablissements = etablissementsArray.filter(etablissement =>
          selectedFormations.every(formation =>
            formation.etablissement.includes(etablissement.name) // Comparaison correcte
          )
        );
    
        console.log("filtrerEtablissement : ", state.filteredEtablissements);
      } else {
        // Réinitialiser les établissements filtrés si aucune formation n'est sélectionnée
        state.filteredEtablissements = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadEtablissement.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadEtablissement.fulfilled, (state, action) => {
      const etablissements = action.payload;
      console.log("etablissements : ", etablissements)
      state.etablissement = etablissements;
      state.loading = false;
    })
    .addCase(loadEtablissement.rejected, (state, action) => {
      state.loading = false;
    })
    .addCase(loadFormation.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadFormation.fulfilled, (state, action) => {
      const separedFormations = action.payload;
  
      console.log("Contenu de action.payload pour formation :", separedFormations);
  
      const mergedFormations = [...(separedFormations.formationsPro || []), ...(separedFormations.formationsTechno || []),...(separedFormations.optionsGenerale || []), ...(separedFormations.optionsSeconde || [])];
      // console.log("Les formations fusionnées :", mergedFormations);
  
      state.formations = mergedFormations;
      state.loading = false;
    })
    .addCase(loadFormation.rejected, (state, action) => {
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
  setFilteredEtablissements,
  addContent,
  addFormationToFilter,
  setCurrentPage,
  setFilteredFormations,
  setCurrentEtablissement
} = formationSlice.actions;

// Exporter le reducer
export default formationSlice.reducer;