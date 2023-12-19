import baseApi from '@/state-management/apis/baseApi';

const uploadFileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<void, File>({
      query: (file) => ({
        url: 'v1/hrm/employees/upload',
        method: 'POST',
        body: {
          filename: file.name,
          contentType: file.type,
          size: file.size,
        },
      }),
    }),
    uploadLogoImage: builder.mutation<void, File>({
      query: (file) => ({
        url: 'v1/hrm/organizational-structures/upload',
        method: 'POST',
        body: {
          filename: file.name,
          contentType: file.type,
          size: file.size,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUploadImageMutation, useUploadLogoImageMutation } = uploadFileApi;

export default uploadFileApi;
