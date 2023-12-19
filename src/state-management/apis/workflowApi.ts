import {
  AddWorkflowReq,
  createWorkflowStatusReq,
  UpdateFlowUpdate,
  WorkflowRes,
  WorkflowsRes,
  WorkflowStatusesRes,
  workflowStatusRes,
} from '@/state-management/apis/types';
import { setOpenSnackbar } from '@/state-management/slices/snackbar';
import { handleErrorMessage } from '@/components/shared/errorMessage';
import baseApi from '@/state-management/apis/baseApi';

const workflowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWorkflowStatus: builder.mutation<{ success: boolean }, createWorkflowStatusReq>({
      query: (body) => ({
        url: `v1/bpms/workflow/status`,
        method: 'POST',
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
            const errorMessage = handleErrorMessage(error?.error.status, 'وضعیت');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['WorkflowStatus'],
    }),
    updateWorkflowStatus: builder.mutation<void, { body: createWorkflowStatusReq; id: string }>({
      query: ({ body, id }) => ({
        url: `v1/bpms/workflow/status/${id}`,
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
            const errorMessage = handleErrorMessage(error?.error.status, 'وضعیت');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['WorkflowStatus'],
    }),
    getWorkflowStatus: builder.query<workflowStatusRes, string>({
      query: (workflowStatusId) => ({
        url: `v1/bpms/workflow/status/${workflowStatusId}`,
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'فرایند');
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
    getAllWorkflowStatuses: builder.query<WorkflowStatusesRes, number>({
      query: (page: number) => `/v1/bpms/workflow/status?page=${page}`,
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'وضعیت');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['WorkflowStatus'],
    }),
    deleteWorkflowStatus: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/bpms/workflow/status/${id}`,
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
            const errorMessage = handleErrorMessage(error?.error.status, 'وضعیت ');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['WorkflowStatus'],
    }),
    getWorkflows: builder.query<WorkflowsRes, number>({
      query: (page: number) => ({
        url: `v1/bpms/workflow?page=${page}`,
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'فرایند');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['Workflow'],
    }),
    getWorkflow: builder.query<WorkflowRes, string>({
      query: (workflowId) => ({
        url: `/v1/bpms/workflow/${workflowId}`,
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, 'فرایند');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      providesTags: ['Workflow'],
    }),
    addWorkflow: builder.mutation<{ success: boolean }, AddWorkflowReq>({
      query: (body) => ({
        url: `v1/bpms/workflow`,
        method: 'POST',
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
            const errorMessage = handleErrorMessage(error?.error.status, 'فرایند ');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['Workflow'],
    }),
    updateWorkflow: builder.mutation<void, UpdateFlowUpdate>({
      query: (body) => ({
        url: `v1/bpms/workflow/${body.workflowId}`,
        method: 'PATCH',
        body,
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
            const errorMessage = handleErrorMessage(error?.error.status, 'فرایند ');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['Workflow'],
    }),
    deleteWorkflow: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/bpms/workflow/${id}`,
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
            const errorMessage = handleErrorMessage(error?.error.status, 'فرایند ');
            dispatch(
              setOpenSnackbar({
                open: true,
                type: 'error',
                message: errorMessage,
              }),
            );
          });
      },
      invalidatesTags: ['Workflow'],
    }),
    getWorkflowStatusBrief: builder.query<workflowStatusRes, void>({
      query: () => ({
        url: `v1/bpms/workflow/status/brief`,
      }),
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {})
          .catch((error) => {
            const errorMessage = handleErrorMessage(error?.error.status, ' فرایند');
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
  useCreateWorkflowStatusMutation,
  useUpdateWorkflowStatusMutation,
  useGetWorkflowStatusQuery,
  useGetAllWorkflowStatusesQuery,
  useDeleteWorkflowStatusMutation,
  useGetWorkflowsQuery,
  useAddWorkflowMutation,
  useGetWorkflowStatusBriefQuery,
  useDeleteWorkflowMutation,
  useUpdateWorkflowMutation,
  useGetWorkflowQuery,
} = workflowApi;

export default workflowApi;
export const { getWorkflow, getWorkflows, getWorkflowStatus, getAllWorkflowStatuses } =
  workflowApi.endpoints;
