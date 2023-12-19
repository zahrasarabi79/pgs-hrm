import baseApi from '@/state-management/apis/baseApi';
import {
  AddHierarchyReq,
  HierarchiesRes,
  HierarchyBriefRes,
  HierarchyRes,
  UpdateHierarchyReq,
} from '@/state-management/apis/types';
import { setOpenSnackbar } from '@/state-management/slices/snackbar';
import { handleErrorMessage } from '@/components/shared/errorMessage';

const hierarchyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addHierarchy: builder.mutation<{ success: boolean }, AddHierarchyReq>({
      query: (newHierarchy) => ({
        url: 'v1/hrm/organizational-hierarchies',
        method: 'POST',
        body: newHierarchy,
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
      invalidatesTags: ['Hierarchy'],
    }),
    updateHierarchy: builder.mutation<{ success: boolean }, UpdateHierarchyReq>({
      query: (newHierarchy) => ({
        url: `v1/hrm/organizational-hierarchies/${newHierarchy.id}`,
        method: 'PATCH',
        body: newHierarchy,
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
      invalidatesTags: ['Hierarchy'],
    }),
    getHierarchies: builder.query<HierarchiesRes, number>({
      query: (page: number) => `v1/hrm/organizational-hierarchies?page=${page}`,
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
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
      providesTags: ['Hierarchy'],
    }),
    getHierarchy: builder.query<HierarchyRes, string>({
      query: (id: string) => `v1/hrm/organizational-hierarchies/${id}`,
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
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
      providesTags: ['Hierarchy'],
    }),
    deleteHierarchy: builder.mutation<void, string>({
      query: (hierarchyId) => ({
        url: `v1/hrm/organizational-hierarchies/${hierarchyId}`,
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
      invalidatesTags: ['Hierarchy'],
    }),
    getHierarchiesBrief: builder.query<HierarchyBriefRes, void>({
      query: () => `v1/organizational-hierarchy-brief`,
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
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
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHierarchiesQuery,
  useAddHierarchyMutation,
  useUpdateHierarchyMutation,
  useGetHierarchyQuery,
  useDeleteHierarchyMutation,
  useGetHierarchiesBriefQuery,
} = hierarchyApi;

export default hierarchyApi;

export const { getHierarchies, getHierarchy } = hierarchyApi.endpoints;
