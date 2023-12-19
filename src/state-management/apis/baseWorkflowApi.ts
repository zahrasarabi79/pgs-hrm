import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '@/state-management/slices/authSlice';
import Cookies from 'js-cookie';
import axios from 'axios';
import { RootState } from '@/state-management/store/store';

const refresh_token = Cookies.get('refresh_token');

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_WORKFLOW_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access_token;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const refreshAccessToken = async (api: BaseQueryApi) => {
  const { data } = await axios.post(
    `https://dev-api-bpms.pouyagaranautomation.com/api/v1/auth/refresh`,
    {
      refresh_token,
    },
  );

  if (data?.data?.access_token || data?.data?.refresh_token) {
    api.dispatch(
      setCredentials({
        access_token: data?.data?.access_token,
        refresh_token: data?.data?.refresh_token,
      }),
    );
    return true;
  } else {
    return false;
  }
};

const baseQueryWithReAuth = async (args: string | FetchArgs, api: any, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Attempt to refresh the access token
    const refreshed = await refreshAccessToken(api);

    if (refreshed) {
      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const baseWorkflowApi = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['WorkflowStatus', 'Workflow'],
  endpoints: () => ({}),
});

export default baseWorkflowApi;
