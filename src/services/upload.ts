import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UploadResponse {
  originalname: string;
  filename: string;
  location: string;
}

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_FAKESTORE_BASE_URL,
  }),
  tagTypes: ["Files"],

  endpoints: (builder) => ({
    //  SINGLE FILE UPLOAD
    uploadFile: builder.mutation<UploadResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "/files/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    //  MULTIPLE FILE UPLOAD
    uploadFiles: builder.mutation<UploadResponse[], File[]>({
      query: (files) => {
        const formData = new FormData();

        files.forEach((file) => {
          formData.append("file", file); // IMPORTANT: still "file"
        });

        return {
          url: "/files/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useUploadFileMutation,
  useUploadFilesMutation,
} = uploadApi;