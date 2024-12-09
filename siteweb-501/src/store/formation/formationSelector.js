export const selectFormations = (state) => state.formations.formations;
export const selectFilteredFormations = (state) => state.formations.filteredFormations;
export const selectEtablissements = (state) => state.formations.etablissement;
export const selectFilteredEtablissements = (state) => state.formations.filteredEtablissements;
export const selectLoading = (state) => state.formations.loading;
export const selectError = (state) => state.formations.errors;
export const selectCurrentPage = (state) => state.formation.currentPage;
export const selectedCategorie = (state) => state.formations.selectedCategorie;
