import { configureStore } from '@reduxjs/toolkit';
import { KReducers } from @krotohmi/k-client';

const ReduxStore = configureStore({
  reducer: {
    ...KReducers,
  },
});

export default ReduxStore;
