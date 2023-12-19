import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPermissions } from '@/public/utility-functions';
import { OneRoleRes, RoleRes } from '@/state-management/apis/types';
import { getRole, getRoles } from '@/state-management/apis/roleApi';
// this slice is used to update the reFetched items to use in components
const initialState: { allDataPermissions: IPermissions; singleItemPermissions: IPermissions } = {
  allDataPermissions: {},
  singleItemPermissions: {},
};

const roleSlice = createSlice({
  name: 'roleSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all users data
    builder.addMatcher<PayloadAction<RoleRes>>(getRoles.matchFulfilled, (state, { payload }) => {
      state.allDataPermissions = payload.permissions;
    });
    // get  user data
    builder.addMatcher<PayloadAction<OneRoleRes>>(getRole.matchFulfilled, (state, { payload }) => {
      state.singleItemPermissions = payload.permissions;
    });
  },
});

export default roleSlice.reducer;
