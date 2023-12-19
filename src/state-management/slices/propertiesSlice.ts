import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

interface Element {
  id: string;
  uniqueName: string;
  type: string;
  properties?: any;
  validations?: any;
}

export interface IPropertiesState {
  openProperties: boolean;
  propertyType: string;
  currentIndex: number;
  id: string;
  listId: string;
  elementProperties: { [x: string]: Element[] };
}

const initialState: IPropertiesState = {
  openProperties: true,
  propertyType: '',
  currentIndex: 0,
  id: '',
  listId: '',
  elementProperties: {
    [uuid()]: [],
  },
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setOpenProperties: (state, action: PayloadAction<IPropertiesState['openProperties']>) => {
      state.openProperties = action.payload;
    },
    setElementInfo: (
      state,
      action: PayloadAction<Pick<IPropertiesState, 'propertyType' | 'id' | 'currentIndex'>>,
    ) => {
      state.propertyType = action.payload.propertyType;
      state.id = action.payload.id;
      state.currentIndex = action.payload.currentIndex;
    },
    setListId: (state, action: PayloadAction<Pick<IPropertiesState, 'listId'>>) => {
      state.listId = action.payload.listId;
    },
    addElementProperties: (
      state,
      action: PayloadAction<Pick<IPropertiesState, 'elementProperties'>>,
    ) => {
      state.elementProperties = action.payload.elementProperties;
    },
    updateElementProperties: (state, action: PayloadAction<Element>) => {
      const { id, properties, validations, uniqueName } = action.payload;
      const elementIndex = state.elementProperties[state.listId].findIndex(
        (element: Element) => element.id === id,
      );
      if (elementIndex !== -1) {
        state.elementProperties[state.listId][elementIndex].properties = {
          ...state.elementProperties[state.listId][elementIndex].properties,
          ...properties,
        };
        state.elementProperties[state.listId][elementIndex].validations = {
          ...state.elementProperties[state.listId][elementIndex].validations,
          ...validations,
        };
        state.elementProperties[state.listId][elementIndex] = {
          ...state.elementProperties[state.listId][elementIndex],
          uniqueName,
        };
      }
    },
    deleteElementProperties: (state, action: PayloadAction<string>) => {
      const elementIdToDelete = action.payload;

      // Find the index of the element with the given ID
      const elementIndex = state.elementProperties[state.listId].findIndex(
        (element: Element) => element.id === elementIdToDelete,
      );

      // If the element with the given ID is found, remove it
      if (elementIndex !== -1) {
        state.elementProperties[state.listId].splice(elementIndex, 1);
      }
    },
  },
});

export const {
  setOpenProperties,
  setListId,
  addElementProperties,
  updateElementProperties,
  setElementInfo,
  deleteElementProperties,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;
