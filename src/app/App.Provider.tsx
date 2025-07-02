'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { KCategoryKey, KClientProvider } from 'k-client';
import { KReactProvider } from '@krotohmi/k-react';
import AppApi from '~/app.api';
import ReduxStore from '~/redux/redux.store';

const queryClient = new QueryClient();

interface IProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: IProps) => {
  return (
    <ReduxProvider store={ReduxStore}>
      <QueryClientProvider client={queryClient}>
        <KReactProvider api={AppApi}>
          <KClientProvider module={KCategoryKey.Listening}>
            {children}
          </KClientProvider>
        </KReactProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default AppProvider;