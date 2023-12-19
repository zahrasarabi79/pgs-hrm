import baseApi from '@/state-management/apis/baseApi';
import { handleErrorMessage } from '@/components/shared/errorMessage';
import { setOpenSnackbar } from '@/state-management/slices/snackbar';
import {
  AddRoleReq,
  OneRoleRes,
  Permissions,
  RoleRes,
  RoleTreeRes,
  UpdateRoleReq,
} from '@/state-management/apis/types';

const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRole: builder.mutation<{ success: boolean }, AddRoleReq>({
      query: (body) => ({
        url: `v1/hrm/organizational-structures/${body.organizationalStructureId}/roles`,
        method: 'POST',
        body: {
          positionId: body.positionId,
          rank: +body.rank,
          requiredEmployeesCount: +body.requiredEmployeesCount,
          description: body.description,
        },
      }),
      invalidatesTags: ['Role'],
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
            const errorMessage = handleErrorMessage(error?.error.status, 'نقش');
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
    updateRole: builder.mutation<void, UpdateRoleReq>({
      query: (body) => ({
        url: `v1/hrm/roles/${body.id}`,
        method: 'PATCH',
        body: {
          organizationalStructureId: body.organizationalStructureId,
          positionId: body.positionId,
          rank: +body.rank,
          requiredEmployeesCount: +body.requiredEmployeesCount,
          description: body.description,
        },
      }),
      invalidatesTags: ['Role'],
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
            const errorMessage = handleErrorMessage(error?.error.status, 'نقش');
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
    getRoles: builder.query<RoleRes, number>({
      query: (page) => ({
        url: 'v1/hrm/roles',
        params: { page },
      }),
      providesTags: ['Role'],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'نقش');
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
    getRole: builder.query<OneRoleRes, string>({
      query: (id) => ({
        url: `v1/hrm/roles/${id}`,
      }),
      providesTags: ['Role'],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'نقش');
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
    getPermissions: builder.query<Permissions, string>({
      query: (roleId) => ({
        url: `v1/admin/roles/${roleId}/permissions`,
      }),
      providesTags: ['Role'],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'نقش');
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
    updatePermissions: builder.mutation<
      void,
      { roleId: string; selected: { name: string; service: string }[] }
    >({
      query: (body) => ({
        url: `v1/admin/roles/${body.roleId}/permissions`,
        method: 'PATCH',
        body: { selected: body.selected },
      }),
      invalidatesTags: ['Role'],
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
            const errorMessage = handleErrorMessage(error?.error.status, 'دسترسی');
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

    getRolesTree: builder.query<RoleTreeRes, void>({
      query: () => ({
        url: 'v1/role-tree',
      }),
      providesTags: ['Role'],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'نقش');
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
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/hrm/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
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
            const errorMessage = handleErrorMessage(error?.error.status, 'نقش');
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
  }),
});

export const {
  useGetRolesQuery,
  useAddRoleMutation,
  useDeleteRoleMutation,
  useGetRolesTreeQuery,
  useUpdateRoleMutation,
  useGetRoleQuery,
  useGetPermissionsQuery,
  useUpdatePermissionsMutation,
} = roleApi;

export default roleApi;
export const { getRoles, getRole } = roleApi.endpoints;
