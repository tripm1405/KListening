import { configureStore } from '@reduxjs/toolkit';
import { KReducers } from 'k-client';

const ReduxStore = configureStore({
  reducer: {
    ...KReducers,
  },
});

export default ReduxStore;
