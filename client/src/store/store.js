import { configureStore } from '@reduxjs/toolkit';
import appUserReducer from './appUserSlice.js';  

const store = configureStore({
  reducer: {
    appUser: appUserReducer,  // Add appUser slice to the store
  },
});

export default store;
