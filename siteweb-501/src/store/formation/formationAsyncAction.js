import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { URL_API_FILMS } from '../../utils/config';

// Actions asynchrones avec gestion des erreurs
export const loadInfos = createAsyncThunk(
    'film/loadFilms',
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch('/assets/json/data.json');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
  
        const data = await response.json(); // Conversion en JSON
        // console.log("Données chargées :", data);
        return data; // Retourne les données du fichier JSON
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        return rejectWithValue(
          "L'application est actuellement indisponible, veuillez réessayer ultérieurement."
        );
      }
    }
  );

// export const addFilm = createAsyncThunk(
//   'film/addFilm',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(URL_API_FILMS, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue("Le titre du film existe déjà.");
//     }
//   }
// );

// export const deleteFilm = createAsyncThunk(
//   'film/deleteFilm',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${URL_API_FILMS}/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue("Le film à supprimer n'existe plus.");
//     }
//   }
// );

// export const updateFilm = createAsyncThunk(
//   'film/updateFilm',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${URL_API_FILMS}/${id}`, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue("Erreur de mise à jour du film.");
//     }
//   }
// );

// export const saveFilm = createAsyncThunk(
//   'film/saveFilm', 
//   async ({ filmData, id }, { dispatch }) => {
//     if (id) {
//       return dispatch(updateFilm({ id, data: filmData }));
//     } else {
//       return dispatch(addFilm(filmData));
//     }
//   });


    