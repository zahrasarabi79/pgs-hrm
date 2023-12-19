import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './store/store';
import baseApi from './apis/baseApi';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
// interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
//   preloadedState?: PreloadedState<RootState>;
//   store?: AppStore;
// }

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: rootReducer,
      middleware(getDefaultMiddleware) {
        // const baseApiMiddleware = baseApi.middleware;
        return getDefaultMiddleware().concat([baseApi.middleware]);
      },
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
