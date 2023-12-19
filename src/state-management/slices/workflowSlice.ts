import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPermissions } from '@/public/utility-functions';
import { WorkflowRes, WorkflowsRes } from '@/state-management/apis/types';
import { getWorkflow, getWorkflows } from '@/state-management/apis/workflowApi';
// this slice is used to update the reFetched items to use in components
const initialState: { allDataPermissions: IPermissions; singleItemPermissions: IPermissions } = {
  allDataPermissions: {},
  singleItemPermissions: {},
};

const workflowSlice = createSlice({
  name: 'workflowSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all users data
    builder.addMatcher<PayloadAction<WorkflowsRes>>(
      getWorkflows.matchFulfilled,
      (state, { payload }) => {
        state.allDataPermissions = payload.permissions;
      },
    );
    // get  user data
    builder.addMatcher<PayloadAction<WorkflowRes>>(
      getWorkflow.matchFulfilled,
      (state, { payload }) => {
        state.singleItemPermissions = payload.permissions;
      },
    );
  },
});

export default workflowSlice.reducer;
