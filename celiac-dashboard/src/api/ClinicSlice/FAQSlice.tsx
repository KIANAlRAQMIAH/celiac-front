import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const faqsApi= createApi({
  reducerPath: 'faqsApi',
  tagTypes: ['postFaq'],
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
    getFaqs: builder.query<any,any>({
        query: (pageNumber) => ({
          url: `faqs?page=${pageNumber}`,
        }),
        providesTags: ['postFaq'],
     }),
   

addFaq: builder.mutation<any, { question: string; answer: string }>({
    query: (faqData) => ({
        url: `faqs`,
        method: 'POST',
        body: faqData,
    }),
    invalidatesTags: ['postFaq'],
}),
updateFaq: builder.mutation<any, { FileId: number; question: string; answer: string }>({
    query: ({ FileId, ...faqData }) => ({
        url: `faqs/${FileId}`,
        method: 'PUT',
        body: faqData,
    }),
    invalidatesTags: ['postFaq'],
}),


      deleteFaqById: builder.mutation({
        query: (FileId) => ({
          url: `faqs/${FileId}`,
          method: 'DELETE',
        }),
      }),

  }),
});


export const { useAddFaqMutation ,useDeleteFaqByIdMutation ,useGetFaqsQuery ,useUpdateFaqMutation} = faqsApi;
export default faqsApi;
