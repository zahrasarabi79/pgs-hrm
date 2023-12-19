import baseApi from '@/state-management/apis/baseApi';
import {
  AddOrganizationLevelReq,
  OrganizationLevelRes,
  OrganizationLevelsRes,
  UpdateOrganizationLevel,
} from '@/state-management/apis/types';
import { setOpenSnackbar } from '@/state-management/slices/snackbar';
import { handleErrorMessage } from '@/components/shared/errorMessage';

const organizationLevelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrganizationLevel: builder.mutation<{ success: boolean }, AddOrganizationLevelReq>({
      query: (body) => ({
        url: 'v1/hrm/positions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Organization-level'],
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
            const errorMessage = handleErrorMessage(error?.error.status, 'سمت سازمانی');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
    }),
    updateOrganizationLevel: builder.mutation<void, UpdateOrganizationLevel>({
      query: (body) => ({
        url: `v1/hrm/positions/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Organization-level'],
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
            const errorMessage = handleErrorMessage(error?.error.status, 'سمت سازمانی');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
    }),
    getOrganizationLevels: builder.query<OrganizationLevelsRes, number>({
      query: (page: number) => ({
        url: 'v1/hrm/positions',
        params: {
          page,
        },
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'سمت سازمانی');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['Organization-level'],
    }),
    getOrganizationLevel: builder.query<OrganizationLevelRes, string>({
      query: (id) => ({
        url: `v1/hrm/positions/${id}`,
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'سمت سازمانی');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['Organization-level'],
    }),
    deleteOrganizationLevel: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/hrm/positions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organization-level'],
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
            const errorMessage = handleErrorMessage(error?.error.status, 'سمت سازمانی');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
    }),
    getOrganizationLevelsBrief: builder.query<OrganizationLevelsRes, void>({
      query: () => ({
        url: 'v1/position-brief',
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'سمت سازمانی');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['Organization-level'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrganizationLevelsQuery,
  useAddOrganizationLevelMutation,
  useUpdateOrganizationLevelMutation,
  useGetOrganizationLevelQuery,
  useDeleteOrganizationLevelMutation,
  useGetOrganizationLevelsBriefQuery,
} = organizationLevelApi;

export default organizationLevelApi;

export const { getOrganizationLevels, getOrganizationLevel } = organizationLevelApi.endpoints;
