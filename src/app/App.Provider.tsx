'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import KClient, { KCategoryKey } from '@krotohmi/client';
import KReact from '@krotohmi/react';
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
        <KReact.Provider api={AppApi}>
          <KClient.Provider module={KCategoryKey.Listening}>
            {children}
          </KClient.Provider>
        </KReact.Provider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default AppProvider;