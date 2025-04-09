import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/tasks",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: "/",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...task }) => ({
        url: `/${id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
