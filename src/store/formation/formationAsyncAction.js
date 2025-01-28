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


export const addContent = createAsyncThunk(
  'formation/addContent',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      console.log("je passe par la");
      let token = useSelector(selectToken);
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/formation/add/${data.formationId}/content`, 
        data,
        { headers: { "x-auth-token": token } }
      );      return response.data;
    } catch (error) {
      return rejectWithValue("erreur lors de l'ajout du contenu");
    }
  }
);

export const editContent = createAsyncThunk(
  'formation/editContent',
  async ({ formationId, index, newValue, formationType }, { rejectWithValue }) => {
      try {
          const response = await axios.put(
              `${process.env.REACT_APP_API_LINK}/formation/edit/${formationId}/content`,
              { index, newValue, formationType }
          );
          return { formationId, index, newValue };
      } catch (error) {
          return rejectWithValue("Erreur lors de l'édition du contenu");
      }
  }
);

export const deleteContent = createAsyncThunk(
  'formation/deleteContent',
  async ({ formationId, index, formationType }, { rejectWithValue }) => {
      try {
          const response = await axios.delete(
              `${process.env.REACT_APP_API_LINK}/formation/delete/${formationId}/content`,
              { data: { index, formationType } } // Envoie `index` et `formationType` dans le body
          );
          return { formationId, index };
      } catch (error) {
          return rejectWithValue("Erreur lors de la suppression du contenu");
      }
  }
);

export const saveContentOrder = createAsyncThunk(
  'formations/saveContentOrder',
  async ({ formationId, content }, { rejectWithValue }) => {
    try{
        let token = useSelector(selectToken);
      const response = await axios.put(`${process.env.REACT_APP_API_LINK}/formations/edit/${formationId}/content-order`, { headders:{"x-auth-token":token},content });
      return response.data;
    }catch (error) {
      return rejectWithValue("Erreur lors de la modif de l'ordre du contenu");
  }
  }
);

export const addFormation = createAsyncThunk(
  'formation/addFormation',
  async (data, { rejectWithValue }) => {
    try {
      const newFormation = await axios.post(process.env.REACT_APP_API_LINK + "/formation/addFormation", data);
      return newFormation.data;
    } catch (error) {
      return rejectWithValue("erreur lors de la création de la formation");
    }
  }
);

export const deleteFormation = createAsyncThunk(
  'formation/deleteFormation',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(process.env.REACT_APP_API_LINK + `/formation/deleteFormation/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue("erreur lors de la création de la formation");
    }
  }
);

export const addEtablissement = createAsyncThunk(
  'etablissement/addEtablissement',
  async (data, { rejectWithValue }) => {
    try {
      const newFormation = await axios.post(process.env.REACT_APP_API_LINK + "/etablissement/addEtablissement", data);
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