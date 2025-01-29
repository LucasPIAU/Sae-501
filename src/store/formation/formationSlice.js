import { createSlice } from '@reduxjs/toolkit';

import { loadEtablissement, loadFormation, addContent, deleteContent, saveContentOrder, editContent, deleteFormation, addFormation, editFormation, addEtablissement, editEtablissement, deleteEtablissement } from './formationAsyncAction';

const formationSlice = createSlice({
  name: 'formations',
  initialState: {
    formations: [], // Stocke les formations (options, techno, generale, pro)
    etablissement: [], // Stocke les établissements
    selectedFormations: [],
    loading: false,
    errors: null,
    currentPage: null,
    currentEtablissement: null,
    etablissementFilter: [],
    formationFilter: [],
    filterMotClef: '',
    filterCity: '',
    filterRange: 15,
    etablissementFilter: [],
    categoriesPro: [],
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
    setFilteredFormations: (state, action) => {
      state.filteredFormations = action.payload;
    },
    moveContent: (state, action) => {
      const { formationId, indexFrom, indexTo } = action.payload;

      const formation = state.formations.find((f) => f._id === formationId);
      if (formation && formation.content) {
        const [movedItem] = formation.content.splice(indexFrom, 1);
        formation.content.splice(indexTo, 0, movedItem);
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

        state.formations.forEach((formation) => {
          if (formation.type === "pro") {
            if (!state.categoriesPro.includes(formation.data.categorie)) {
              state.categoriesPro.push(formation.data.categorie);
            }
          }
        });

        state.loading = false;
      })
      .addCase(loadFormation.rejected, (state, action) => {
        state.loading = false;
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
      .addCase(addContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addContent.fulfilled, (state, action) => {
        const { formationId, newElement } = action.payload;

        // Rechercher la formation correspondante dans le store
        const formation = state.formations.find((f) => f._id === formationId);

        if (formation) {
          // Ajouter le nouvel élément à la fin du tableau "content"
          if (!formation.content) {
            formation.content = []; // Si "content" est vide, initialise-le
          }
          formation.content.push(newElement);
        } else {
          console.error(`Formation avec l'ID ${formationId} introuvable dans le store.`);
        }

        state.loading = false;
      })
    builder.addCase(deleteContent.fulfilled, (state, action) => {
      const { formationId, index } = action.payload;

      // Trouver la formation concernée
      const formation = state.formations.find((f) => f._id === formationId);

      if (formation && formation.content) {
        // Supprimer l'élément à l'index spécifié
        formation.content.splice(index, 1);
      }
    })
    builder.addCase(editContent.fulfilled, (state, action) => {
      const { formationId, index, newValue } = action.payload;

      // Trouver la formation concernée
      const formation = state.formations.find((f) => f._id === formationId);

      if (formation && formation.content) {
        // Vérifiez que l'index est valide
        if (index >= 0 && index < formation.content.length) {
          // Mettre à jour uniquement la propriété 'data' de l'élément
          formation.content[index] = {
            ...formation.content[index], // Conserver les autres propriétés de l'objet
            data: newValue, // Mettre à jour uniquement la propriété 'data'
          };
        } else {
          console.error(`Index ${index} est invalide pour la formation ${formationId}`);
        }
      } else {
        console.error(`Formation avec l'ID ${formationId} introuvable ou contenu inexistant.`);
      }
    })
    builder.addCase(saveContentOrder.fulfilled, (state, action) => {
      const { formationId, content } = action.payload;

      // Trouver la formation concernée
      const formation = state.formations.find((f) => f._id === formationId);

      if (formation) {
        // Mettre à jour le tableau `content` avec le nouvel ordre
        formation.content = content;
      }
    })
      .addCase(addEtablissement.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEtablissement.fulfilled, (state, action) => {
        state.etablissement.push(action.payload.data);
        state.loading = false;
      })
      .addCase(addEtablissement.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })      
      .addCase(editEtablissement.pending, (state) => {
        state.loading = true;
      })
      .addCase(editEtablissement.fulfilled, (state, action) => {
        state.etablissement = state.etablissement.filter(
          (etab) => etab._id !== action.payload.data._id
        );
        state.etablissement.push(action.payload.data);
        state.loading = false;
      })
      .addCase(editEtablissement.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(deleteEtablissement.fulfilled, (state, action) => {
        state.etablissement = state.etablissement.filter(
          (etab) => etab._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteEtablissement.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(deleteEtablissement.pending, (state) => {
        state.loading = true;
      })

  }
});

// Exporter les actions
export const {
  setFormations,
  setEtablissements,
  initializeData,
  moveContent,
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