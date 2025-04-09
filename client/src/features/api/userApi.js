import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
