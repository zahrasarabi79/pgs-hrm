import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPermissions } from '@/public/utility-functions';
import { HierarchiesRes, HierarchyRes } from '@/state-management/apis/types';
import { getHierarchies, getHierarchy } from '@/state-management/apis/hierarchyApi';
// this slice is used to update the reFetched items to use in components
const initialState: { allDataPermissions: IPermissions; singleItemPermissions: IPermissions } = {
  allDataPermissions: {},
  singleItemPermissions: {},
};

const hierarchySlice = createSlice({
  name: 'hierarchySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all hierarchy data
    builder.addMatcher<PayloadAction<HierarchiesRes>>(
      getHierarchies.matchFulfilled,
      (state, { payload }) => {
        state.allDataPermissions = payload.permissions;
      },
    );
    // get hierarchy data
    builder.addMatcher<PayloadAction<HierarchyRes>>(
      getHierarchy.matchFulfilled,
      (state, { payload }) => {
        state.singleItemPermissions = payload.permissions;
      },
    );
  },
});

export default hierarchySlice.reducer;
