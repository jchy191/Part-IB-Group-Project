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
    getOverview: builder.query({
      query: (pid) => `markers/overview/${pid}/`,
      providesTags: ['Comments'],
      transformResponse: (response: any) => response.data.attributes,
    }),
    getLocation: builder.query({
      query: (pid) => `locations/${pid}/`,
      transformResponse: (response: any) => response.data,
    }),
    addLocation: builder.mutation({
      query: ({ placeId, ...data }) => ({
        url: 'locations/',
        method: 'PUT',
        body: { pid: placeId, ...data },
      }),
    }),
    addNewComment: builder.mutation({
      query: (data) => ({
        url: 'entries/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comments'],
    }),
    reportComment: builder.mutation({
      query: ({ id, count }) => ({
        url: `entries/${id}/`,
        method: 'PUT',
        body: { reported: count },
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
  useLazyGetLocationQuery,
  useAddLocationMutation,
  useGetAllMarkersQuery,
  useGetCommentsQuery,
  useGetOverviewQuery,
} = commentsApi;
