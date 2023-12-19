import baseApi from '@/state-management/apis/baseApi';
import { ProfileRes } from '@/state-management/apis/types';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/v1/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SidebarItems', 'Profile'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/v1/auth/logout',
        method: 'POST',
      }),
    }),
    getProfile: builder.query<ProfileRes, void>({
      query: () => ({
        url: `v1/auth/me`,
      }),
      providesTags: ['Profile'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetProfileQuery } = authApi;

export default authApi;
