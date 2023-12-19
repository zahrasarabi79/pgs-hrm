import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  OrganizationLevelRes,
  OrganizationLevelsRes,
  StaticText,
} from '@/state-management/apis/types';
import { IPermissions } from '@/public/utility-functions';
import {
  getOrganizationLevel,
  getOrganizationLevels,
} from '@/state-management/apis/organizationLevelApi';
export interface OrganizationState {
  name: StaticText;
  allDataPermissions?: IPermissions;
  singleItemPermissions?: IPermissions;
}
const initialState: OrganizationState = {
  name: { _: 'StaticText', value: '' },
  allDataPermissions: {},
  singleItemPermissions: {},
};

const organizationLevelSlice = createSlice({
  name: 'organizationLevelSlice',
  initialState,
  reducers: {
    setOrganizationLevel: (state, action: PayloadAction<OrganizationState>) => {
      state.name = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    // get all organization level data
    builder.addMatcher<PayloadAction<OrganizationLevelsRes>>(
      getOrganizationLevels.matchFulfilled,
      (state, { payload }) => {
        state.allDataPermissions = payload.permissions;
      },
    );
    // get organization data
    builder.addMatcher<PayloadAction<OrganizationLevelRes>>(
      getOrganizationLevel.matchFulfilled,
      (state, { payload }) => {
        state.singleItemPermissions = payload.permissions;
      },
    );
  },
});

export const { setOrganizationLevel } = organizationLevelSlice.actions;

export default organizationLevelSlice.reducer;
