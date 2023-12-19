import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPermissions } from '@/public/utility-functions';
import { WorkflowStatusesRes, workflowStatusRes } from '@/state-management/apis/types';
import { getAllWorkflowStatuses, getWorkflowStatus } from '@/state-management/apis/workflowApi';
// this slice is used to update the reFetched items to use in components
const initialState: { allDataPermissions: IPermissions; singleItemPermissions: IPermissions } = {
  allDataPermissions: {},
  singleItemPermissions: {},
};

const workflowStatusSlice = createSlice({
  name: 'workflowStatusSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all workflow data
    builder.addMatcher<PayloadAction<WorkflowStatusesRes>>(
      getAllWorkflowStatuses.matchFulfilled,
      (state, { payload }) => {
        state.allDataPermissions = payload.permissions;
      },
    );
    // get  workflow data
    builder.addMatcher<PayloadAction<workflowStatusRes>>(
      getWorkflowStatus.matchFulfilled,
      (state, { payload }) => {
        state.singleItemPermissions = payload.permissions;
      },
    );
  },
});

export default workflowStatusSlice.reducer;
