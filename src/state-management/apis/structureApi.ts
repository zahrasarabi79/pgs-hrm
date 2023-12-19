import {
  AddStructureReq,
  StructureRes,
  StructuresRes,
  UpdateStructureReq,
  StructuresTreeRes,
} from '@/state-management/apis/types';
import { setOpenSnackbar } from '@/state-management/slices/snackbar';
import { handleErrorMessage } from '@/components/shared/errorMessage';
import baseApi from '@/state-management/apis/baseApi';

const structureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStructure: builder.mutation<{ success: boolean }, AddStructureReq>({
      query: (newStructure) => ({
        url: 'v1/hrm/organizational-structures',
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
            const errorMessage = handleErrorMessage(error?.error.status, 'ساختار');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['Structure'],
    }),
    addStructureWithSubset: builder.mutation<
      { success: boolean },
      { newStructure: AddStructureReq; id: string }
    >({
      query: ({ newStructure, id }) => ({
        url: `v1/hrm/organizational-structures/${id}/subsets
        `,
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
            const errorMessage = handleErrorMessage(error?.error.status, 'ساختار');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['Structure'],
    }),
    updateStructure: builder.mutation<void, UpdateStructureReq>({
      query: (newStructure) => ({
        url: `v1/hrm/organizational-structures/${newStructure.id}`,
        method: 'PATCH',
        body: newStructure,
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
            const errorMessage = handleErrorMessage(error?.error.status, 'سلسله مراتب');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['Structure'],
    }),
    getStructures: builder.query<StructuresRes, number>({
      query: (page: number) => `v1/hrm/organizational-structures?page=${page}`,
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'ساختار');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['Structure'],
    }),
    getStructure: builder.query<StructureRes, string>({
      query: (id: string) => `v1/hrm/organizational-structures/${id}/`,
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, ' ساختار ');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['Structure'],
    }),
    getStructureTree: builder.query<StructuresTreeRes, void>({
      query: () => `v1/organizational-structure-tree`,
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'ساختار');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['Structure'],
    }),
    deleteStructure: builder.mutation<void, string>({
      query: (structureId) => ({
        url: `v1/hrm/organizational-structures/${structureId}`,
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
            const errorMessage = handleErrorMessage(error?.error.status, 'ساختار ');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['Structure'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddStructureMutation, //creating structure with root organization-level
  useAddStructureWithSubsetMutation, //creating structure with non-root organization-level
  useGetStructuresQuery,
  useGetStructureTreeQuery, // Get all the organization-level tree
  useGetStructureQuery, // Get single structure-data ( for update )
  useUpdateStructureMutation,
  useDeleteStructureMutation,
} = structureApi;

export default structureApi;
export const { getStructures, getStructure } = structureApi.endpoints;
