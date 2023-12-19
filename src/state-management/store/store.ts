'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import modalSlice from '@/state-management/slices/modalSlice';
import authReducer from '@/state-management/slices/authSlice';
import snackbarSlice from '@/state-management/slices/snackbar';
import organizationLevelReducer from '@/state-management/slices/organizationLevelSlice';
import baseApi from '@/state-management/apis/baseApi';
import employeesSlice from '@/state-management/slices/employeesSlice';
import userSlice from '@/state-management/slices/userSlice';
import roleSlice from '@/state-management/slices/roleSlice';
import structureApi from '@/state-management/slices/structureSlice';
import hierarchySlice from '@/state-management/slices/hierarchySlice';
import workflowSlice from '@/state-management/slices/workflowSlice';
import sidebarElementTypeReducer from '@/state-management/slices/sidebarElementTypeSlice';
import popoverReducer from '@/state-management/slices/popoverSlice';
import propertiesReducer from '@/state-management/slices/propertiesSlice';
import rangeElementsReducer from '@/state-management/slices/rangeElementsSlice';
import cardFormPropertyReducer from '@/state-management/slices/cardFormPropertySlice';
import conditionalValueReducer from '@/state-management/slices/conditionalValueSlice';
import workflowStatusSlice from '@/state-management/slices/workflowStatusSlice';

export const rootReducer = combineReducers({
  modalSlice: modalSlice,
  snackbarSlice,
  auth: authReducer,
  employeesSlice,
  userSlice,
  roleSlice,
  structureApi,
  hierarchySlice,
  organizationLevelName: organizationLevelReducer,
  popover: popoverReducer,
  properties: propertiesReducer,
  sidebarElementType: sidebarElementTypeReducer,
  rangeElement: rangeElementsReducer,
  cardFormProperties: cardFormPropertyReducer,
  conditionalValue: conditionalValueReducer,
  workflow: workflowSlice,
  workflowStatusSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat([
      baseApi.middleware,
    ]);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);

export default store;
