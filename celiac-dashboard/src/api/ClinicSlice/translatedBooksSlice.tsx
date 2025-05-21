import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const TranslatedBooksApi= createApi({
  reducerPath: 'TranslatedBooksApi',
  tagTypes: ['postBooks'],
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
    getTranslatedBooks: builder.query<any, any>({
        query: (pageNumber) => ({
          url: `translated-books?page=${pageNumber}`,
        }),
        providesTags: ['postBooks'],
     }),
      addBooks: builder.mutation<any, any>({
        query: ( formData ) => ({
          url: `translated-books`,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: ['postBooks'],
      }),
      updateBooks: builder.mutation<any, { FileId: number; formData: any }>({
        query: ({ FileId, formData}) => ({
          url: `translated-books/${FileId}`,
          method: 'POST',
          body: formData,
          params: {
            _method: 'PUT',
          },
        }),
        invalidatesTags: ['postBooks'],
      }),

      deleteBooksById: builder.mutation({
        query: (FileId) => ({
          url: `translated-books/${FileId}`,
          method: 'DELETE',
        }),
      }),

  }),
});


export const { useAddBooksMutation ,useDeleteBooksByIdMutation ,useGetTranslatedBooksQuery ,useUpdateBooksMutation } = TranslatedBooksApi;
export default TranslatedBooksApi;
