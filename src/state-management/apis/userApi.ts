import { UserAccountRes, AddAndUpdateUserReq } from '@/state-management/apis/types';
import { setOpenSnackbar } from '@/state-management/slices/snackbar';
import { handleErrorMessage } from '@/components/shared/errorMessage';
import baseApi from '@/state-management/apis/baseApi';

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create account for employee
    createUser: builder.mutation<void, { body: AddAndUpdateUserReq; employeeId: string }>({
      query: ({ body, employeeId }) => ({
        url: `v1/admin/employees/${employeeId}/account`,
        method: 'PUT',
        body: body,
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
            const errorMessage = handleErrorMessage(error?.error.status, 'کاربر');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<void, { body: AddAndUpdateUserReq; employeeId: string }>({
      query: ({ body, employeeId }) => ({
        url: `v1/admin/employees/${employeeId}/account`,
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
            const errorMessage = handleErrorMessage(error?.error.status, 'کاربر');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['User'],
    }),
    //  Get employee account
    getUserAccount: builder.query<UserAccountRes, string>({
      query: (employeeId) => ({
        url: `v1/admin/employees/${employeeId}/account`,
      }),

      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserAccountQuery, useCreateUserMutation, useUpdateUserMutation } = employeeApi;
export const { getUserAccount } = employeeApi.endpoints;
export default employeeApi;
