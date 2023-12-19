import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '@/state-management/slices/authSlice';
import Cookies from 'js-cookie';
import axios from 'axios';
import { RootState } from '@/state-management/store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
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
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_AUTH}/v1/auth/refresh` as string, {
    refresh_token: Cookies.get('refresh_token'),
  });

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

const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    'Hierarchy',
    'Organization-level',
    'Role',
    'Structure',
    'Employee',
    'User',
    'WorkflowStatus',
    'Workflow',
    'SidebarItems',
    'Profile',
  ],
  endpoints: () => ({}),
});

export default baseApi;
