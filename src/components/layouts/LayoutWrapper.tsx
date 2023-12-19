'use client';
import React, { FC, ReactNode } from 'react';
import { MuiTheme } from '@/theme/MuiTheme';
import { Provider } from 'react-redux';
import store from '@/state-management/store/store';
import { AppProvider } from '@/components/context/WorkflowProvider';

export const LayoutWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <MuiTheme>
        <AppProvider>{children}</AppProvider>
      </MuiTheme>
    </Provider>
  );
};
