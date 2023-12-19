import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getEmployees, getEmployee } from '@/state-management/apis/employeeApi';
import { IPermissions } from '@/public/utility-functions';
import { EmployeeRes, EmployeesRes } from '@/state-management/apis/types';
// this slice is used to update the reFetched items to use in components
const initialState: { allDataPermissions: IPermissions; singleItemPermissions: IPermissions } = {
  allDataPermissions: {},
  singleItemPermissions: {},
};

const employeesSlice = createSlice({
  name: 'employeesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all employees
    builder.addMatcher<PayloadAction<EmployeesRes>>(
      getEmployees.matchFulfilled,
      (state, { payload }) => {
        state.allDataPermissions = payload.permissions;
      },
    );
    // get employee
    builder.addMatcher<PayloadAction<EmployeeRes>>(
      getEmployee.matchFulfilled,
      (state, { payload }) => {
        state.singleItemPermissions = payload.permissions;
      },
    );
  },
});

export default employeesSlice.reducer;
