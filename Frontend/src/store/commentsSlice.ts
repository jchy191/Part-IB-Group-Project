import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { PayloadAction } from '@reduxjs/toolkit';

// Define a service using a base URL and expected endpoints
export const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (pid) => `markers/${pid}/`,
      providesTags: ['Comments'],
      transformResponse: (response: any) => response.data
        .map((entry) => ({ id: entry.id, ...entry.attributes })),
    }),
    addNewComment: builder.mutation({
      query: (x) => ({
        url: 'entries/',
        method: 'POST',
        body: x,
      }),
      invalidatesTags: ['Comments'],
    }),
    reportComment: builder.mutation({
      query: (id) => ({
        url: `entries/${id}/`,
        method: 'PUT',
        body: { reported: true },
      }),
      invalidatesTags: ['Comments'],
    }),
    getAllMarkers: builder.query({
      query: () => 'markers/overview/',
      providesTags: ['Comments'],
      transformResponse: (response: any) => response.data.map((marker) => marker.attributes),
    }),
  }),
});

export const {
  useLazyGetCommentsQuery,
  useAddNewCommentMutation,
  useReportCommentMutation,
  useGetAllMarkersQuery,
  useGetCommentsQuery,
} = commentsApi;
