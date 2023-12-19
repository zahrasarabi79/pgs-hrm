import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPermissions } from '@/public/utility-functions';
import { UserAccountRes } from '@/state-management/apis/types';
import { getUserAccount } from '@/state-management/apis/userApi';
// this slice is used to update the reFetched items to use in components
const initialState: { allDataPermissions: IPermissions; singleItemPermissions: IPermissions } = {
  allDataPermissions: {},
  singleItemPermissions: {},
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get user data
    builder.addMatcher<PayloadAction<UserAccountRes>>(
      getUserAccount.matchFulfilled,
      (state, { payload }) => {
        state.singleItemPermissions = payload.permissions;
      },
    );
  },
});

export default userSlice.reducer;
