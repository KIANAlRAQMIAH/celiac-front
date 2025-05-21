import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const scientificResearchApi= createApi({
  reducerPath: 'scientificResearchApi',
  tagTypes: ['postScientific'],
  baseQuery: fetchBaseQuery({
     baseUrl,
     prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Accept-Language", "ar");
      headers.set("Authorization", `Bearer ${localStorage.getItem("admintoken")!}`);
        return headers;
      },
    }),
  endpoints: (builder) => ({
    getScientificResearches: builder.query<any,any>({
        query: (pageNumber) => ({
          url: `scientific-researches?page=${pageNumber}`,
        }),
        providesTags: ['postScientific'],
     }),
      addScientific: builder.mutation<any, any>({
        query: ( formData ) => ({
          url: `scientific-researches`,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: ['postScientific'],
      }),
      updateScientific: builder.mutation<any, { FileId: number; formData: any }>({
        query: ({ FileId, formData}) => ({
          url: `scientific-researches/${FileId}`,
          method: 'POST',
          body: formData,
          params: {
            _method: 'PUT',
          },
        }),
        invalidatesTags: ['postScientific'],
      }),

      deleteScientificById: builder.mutation({
        query: (FileId) => ({
          url: `scientific-researches/${FileId}`,
          method: 'DELETE',
        }),
      }),

  }),
});


export const { useGetScientificResearchesQuery, useDeleteScientificByIdMutation ,useAddScientificMutation ,useUpdateScientificMutation } = scientificResearchApi;
export default scientificResearchApi;
