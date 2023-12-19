import baseApi from '@/state-management/apis/baseApi';
import { SidebarItemsRes } from '@/state-management/apis/types';

const sidebarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSidebarItems: builder.query<SidebarItemsRes, void>({
      query: () => ({
        url: `v1/sidebars/hrm`,
      }),
      providesTags: ['SidebarItems'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSidebarItemsQuery } = sidebarApi;

export default sidebarApi;
