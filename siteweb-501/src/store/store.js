import { configureStore } from '@reduxjs/toolkit';
import formationReducer from './formation/formationSlice';

const store = configureStore({
  reducer: {
    formations: formationReducer
  },  
  });

export default store;