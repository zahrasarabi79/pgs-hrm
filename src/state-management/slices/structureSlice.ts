import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPermissions } from '@/public/utility-functions';
import { StructureRes, StructuresRes } from '@/state-management/apis/types';
import { getStructure, getStructures } from '@/state-management/apis/structureApi';
// this slice is used to update the reFetched items to use in components
const initialState: { allDataPermissions: IPermissions; singleItemPermissions: IPermissions } = {
  allDataPermissions: {},
  singleItemPermissions: {},
};

const structureSlice = createSlice({
  name: 'structureSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all structure
    builder.addMatcher<PayloadAction<StructuresRes>>(
      getStructures.matchFulfilled,
      (state, { payload }) => {
        state.allDataPermissions = payload.permissions;
      },
    );
    // get structure
    builder.addMatcher<PayloadAction<StructureRes>>(
      getStructure.matchFulfilled,
      (state, { payload }) => {
        state.singleItemPermissions = payload.permissions;
      },
    );
  },
});

export default structureSlice.reducer;
