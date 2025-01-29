import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../connexion/connexionSelector';

// import { URL_API_FILMS } from '../../utils/config';

// Actions asynchrones avec gestion des erreurs POUR LES DATA LOCAL
// export const loadInfos = createAsyncThunk(
//     'film/loadFilms',
//     async (_, { rejectWithValue }) => {
//       try {
//         const response = await fetch('/assets/json/data.json');

//         if (!response.ok) {
//           throw new Error(`Erreur HTTP: ${response.status}`);
//         }

//         const data = await response.json(); // Conversion en JSON
//         // console.log("Données chargées :", data);
//         return data; // Retourne les données du fichier JSON
//       } catch (error) {
//         console.error("Erreur lors du chargement des données :", error);
//         return rejectWithValue(
//           "L'application est actuellement indisponible, veuillez réessayer ultérieurement."
//         );
//       }
//     }
//   );


// LOAD LYCEE 
export const loadEtablissement = createAsyncThunk(
  'lycee/loadLycee',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_LINK + '/lycee');

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json(); // Conversion en JSON
      // console.log("Données chargées des lycées :", data);
      return data; // Retourne les données du fichier JSON
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      return rejectWithValue(
        "L'application est actuellement indisponible, veuillez réessayer ultérieurement."
      );
    }
  }
);

// LOAD LYCEE 
export const loadFormation = createAsyncThunk(
  'lycee/loadFormation',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_LINK + `/formation/all`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json(); // Conversion en JSON
      // console.log("Données chargées des formation :", data);
      return data; // Retourne les données du fichier JSON
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      return rejectWithValue(
        "L'application est actuellement indisponible, veuillez réessayer ultérieurement."
      );
    }
  }
);

export const editContent = createAsyncThunk(
  'formation/editContent',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(process.env.REACT_APP_API_LINK + "/formation/editContent", data); // revoir URL pour avoir une variable et non en entier
      return response.data;
    } catch (error) {
      return rejectWithValue("erreur lors de la modification du contenu");
    }
  }
);


export const addFormation = createAsyncThunk(
  'formation/addFormation',
  async (data, { rejectWithValue, getState }) => {
    try {
      const newFormation = await axios.post(process.env.REACT_APP_API_LINK + "/formation/add", data, { headers: { "x-auth-token": getState().connexion.token } });
      return newFormation.data;
    } catch (error) {
      return rejectWithValue("erreur lors de la création de la formation");
    }
  }
);

export const editFormation = createAsyncThunk(
  'formation/editFormation',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {_id, content, ...cleanedData } = data;

      const patchedFormation = await axios.patch(process.env.REACT_APP_API_LINK + `/formation/edit/${data._id}`, cleanedData, { headers: { "x-auth-token": getState().connexion.token } });
      return patchedFormation.data;
    } catch (error) {
      return rejectWithValue("erreur lors de la modification de la formation");
    }
  }
);

export const deleteFormation = createAsyncThunk(
  'formation/deleteFormation',
  async (id, { rejectWithValue, getState }) => {
    try {
      await axios.delete(process.env.REACT_APP_API_LINK + `/formation/${id}`, { headers: { "x-auth-token": getState().connexion.token } });
      return id;
    } catch (error) {
      return rejectWithValue("erreur lors de la création de la formation");
    }
  }
);

export const addEtablissement = createAsyncThunk(
  'etablissement/addEtablissement',
  async (data, { rejectWithValue, getState }) => {
    try {
      const newFormation = await axios.post(process.env.REACT_APP_API_LINK + "/etablissement/addEtablissement", data, { headers: { "x-auth-token": getState().connexion.token } });
      return newFormation.data;
    } catch (error) {
      return rejectWithValue("erreur lors de la création de l'établissement");
    }
  }
);

export const deleteEtablissement = createAsyncThunk(
  'etablissement/deleteEtablissement',
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(process.env.REACT_APP_API_LINK + `/etablissement/deleteEtablissement/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue("erreur lors de la suppression de l'établissement");
    }
  }
);