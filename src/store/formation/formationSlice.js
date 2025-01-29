import { createSlice } from '@reduxjs/toolkit';
import { loadEtablissement, loadFormation, editContent, deleteFormation, addFormation, editFormation } from './formationAsyncAction';

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
    etablissementFilter: [],
    formationFilter: [],
    filterMotClef: '',
    filterCity: '',
    filterRange: 20,
    etablissementFilter: [],
  },
  reducers: {
    setFormations: (state, action) => {
      state.formations = action.payload;
    },
    setEtablissements: (state, action) => {
      state.etablissement = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentEtablissement: (state, action) => {
      state.currentEtablissement = action.payload;
    },
    setEtablissementsFilter: (state, action) => {
      state.etablissementFilter = action.payload;
    },
    setFormationFilter: (state, action) => {
      state.formationFilter = action.payload;
    },
    setMotClef(state, action) {
      state.filterMotClef = action.payload;
    },
    setFilterRange(state, action) {
      state.filterRange = action.payload;
    },
    setFilterCity(state, action) {
      state.filterCity = action.payload;
    },
    // addContent: (state, action) => {
    //   const { formationId, newElement } = action.payload;

    //   const formationIndex = state.formations.findIndex(f => f.id === formationId);

    //   if (formationIndex === -1) {
    //     console.error(`Formation avec l'ID "${formationId}" introuvable`);
    //     return;
    //   }

    //   const formation = state.formations[formationIndex];
    //   const formationCopy = JSON.parse(JSON.stringify(formation));

    //   if (formationCopy?.content) {
    //     formationCopy.content.push(newElement);
    //     state.formations[formationIndex] = formationCopy;
    //   } else {
    //     console.error("Erreur : Le contenu de la formation est manquant ou invalide.");
    //   }
    // },
    setFilteredFormations: (state, action) => {
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
    // editContent: (state, action) => {
    //   const { formationId, index, newValue } = action.payload;

    //   // Recherche de la formation par son id
    //   const formationIndex = state.formations.findIndex(f => f.id === formationId);

    //   if (formationIndex === -1) {
    //     console.error(`Formation avec l'ID "${formationId}" introuvable`);
    //     return;
    //   }

    //   const formation = state.formations[formationIndex];
    //   const formationCopy = JSON.parse(JSON.stringify(formation));

    //   if (formationCopy?.content && formationCopy.content[index] !== undefined) {
    //     formationCopy.content[index] = newValue; // Mise à jour de l'élément
    //     state.formations[formationIndex] = formationCopy;
    //   } else {
    //     console.error("Erreur: L'élément à modifier est manquant ou invalide.");
    //   }
    // },
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

        const mergedFormations = [];
        Object.keys(separedFormations).forEach((key) => {
          if (Array.isArray(separedFormations[key])) {
            mergedFormations.push(...separedFormations[key]);
          }
        });

        state.formations = mergedFormations;
        state.loading = false;
      })
      .addCase(loadFormation.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(editContent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editContent.fulfilled, (state, action) => {
        const { formationId, newElement } = action.payload;

        const formationIndex = state.formations.findIndex(f => f._id === formationId);

        if (formationIndex === -1) {
          console.error(`Formation avec l'ID "${formationId}" introuvable`);
          return;
        }

        const formation = state.formations[formationIndex];

        console.log("mettre a jour le store : ", formation);
      })
      .addCase(deleteFormation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFormation.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload
      })
      .addCase(deleteFormation.fulfilled, (state, action) => {
        state.loading = false;
        state.formations = state.formations.filter(
          (formation) => formation._id !== action.payload
        );
      })
      .addCase(addFormation.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(addFormation.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(addFormation.fulfilled, (state, action) => {
        state.loading = false;
        state.formations.push(action.payload.data);
      })
      .addCase(editFormation.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(editFormation.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(editFormation.fulfilled, (state, action) => {
        state.loading = false;
        state.formations = state.formations.filter(
          (formation) => formation._id !== action.payload.data._id
        );
        state.formations.push(action.payload.data);
      })
  }
});

// Exporter les actions
export const {
  setFormations,
  setEtablissements,
  initializeData,
  moveContent,
  deleteContent,
  setFilteredEtablissements,
  addFormationToFilter,
  setCurrentPage,
  setFilteredFormations,
  setCurrentEtablissement,
  setFormationFilter,
  setEtablissementsFilter,
  setMotClef,
  setFilterCity,
  setFilterRange
} = formationSlice.actions;

// Exporter le reducer
export default formationSlice.reducer;