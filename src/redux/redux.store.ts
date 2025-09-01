import { configureStore } from '@reduxjs/toolkit';
import { KReducers } from '@krotohmi/client';

const ReduxStore = configureStore({
  reducer: {
    ...KReducers,
  },
});

export default ReduxStore;
