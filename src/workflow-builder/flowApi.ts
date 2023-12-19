import baseApi from '@/state-management/apis/baseApi';
import { EmployeeRes, EmployeesRes, UpdateEmployeeReq } from '@/state-management/apis/types';
import { setOpenSnackbar } from '@/state-management/slices/snackbar';
import { handleErrorMessage } from '@/components/shared/errorMessage';
import { AddFlowReq } from '@/types/workflow-builder/formAdaptore';

const flowApi = baseApi.injectEndpoints({
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
    addFlow: builder.mutation<{ success: boolean }, { body: AddFlowReq; id: string }>({
      query: ({ body, id }) => ({
        url: `v1/bpms/workflow/${id}/flow`,
        method: 'PUT',
        body,
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
  useAddFlowMutation,
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = flowApi;

export default flowApi;

export const { getEmployees, getEmployee } = flowApi.endpoints;
