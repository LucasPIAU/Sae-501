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