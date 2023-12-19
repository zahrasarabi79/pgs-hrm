'use client';
import * as React from 'react';
import { FC, ReactNode } from 'react';
import FormBuilderDrawer from '@/form-builder/components/FormBuilderDrawer';
import { Provider } from 'react-redux';
import store from '@/state-management/store/store';

export const LayoutWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <FormBuilderDrawer>{children}</FormBuilderDrawer>
    </Provider>
  );
};
