import { configureStore } from '@reduxjs/toolkit';
import formationReducer from './formation/formationSlice';
import connexionReducer from './connexion/connexionSlice';

const store = configureStore({
  reducer: {
    formations: formationReducer,
    connexion: connexionReducer,
  },  
  });

export default store;