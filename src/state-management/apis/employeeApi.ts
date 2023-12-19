import baseApi from '@/state-management/apis/baseApi';
import {
  EmployeesRes,
  EmployeeRes,
  AddEmployeeReq,
  UpdateEmployeeReq,
} from '@/state-management/apis/types';
import { setOpenSnackbar } from '@/state-management/slices/snackbar';
import { handleErrorMessage } from '@/components/shared/errorMessage';

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeesRes, number>({
      query: (page: number) => `v1/hrm/employees?page=${page}`,
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, ' کارمندان');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['Employee'],
    }),
    addEmployee: builder.mutation<{ success: boolean }, AddEmployeeReq>({
      query: (newStructure) => ({
        url: 'v1/hrm/employees',
        method: 'POST',
        body: newStructure,
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'success',
                message: 'درخواست شما با موفقیت ثبت شد',
              }),
            );
          })
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'کارمندان');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['Employee'],
    }),
    getEmployee: builder.query<EmployeeRes, string>({
      query: (id) => ({
        url: `v1/hrm/employees/${id}`,
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, ' کارمندان');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['Employee'],
    }),
    updateEmployee: builder.mutation<void, { body: UpdateEmployeeReq; id: string }>({
      query: ({ body, id }) => ({
        url: `v1/hrm/employees/${id}`,
        method: 'PATCH',
        body: body,
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'success',
                message: 'درخواست شما با موفقیت ویرایش شد',
              }),
            );
          })
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'کارمندان');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['Employee'],
    }),
    deleteEmployee: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/hrm/employees/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'success',
                message: 'درخواست شما با موفقیت حذف شد',
              }),
            );
          })
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'کارمندان ');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['Employee'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;

export default employeeApi;

export const { getEmployees, getEmployee } = employeeApi.endpoints;
