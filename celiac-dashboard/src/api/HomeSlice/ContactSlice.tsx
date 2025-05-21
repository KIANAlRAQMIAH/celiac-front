import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const contactApi = createApi({
  reducerPath: 'contactApi',
  tagTypes: ['updateContactInfo'],
  baseQuery: fetchBaseQuery({
     baseUrl,
     prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem("admintoken")!}`);
      headers.set("Accept", "application/json");
      headers.set("Accept-Language", "ar");
        return headers;
      },
    }),

  endpoints: (builder) => ({
    getContactInfo: builder.query<any,void>({
        query: () => `general-settings`,
        providesTags: ['updateContactInfo'],
    }),
    updateContactInfo: builder.mutation<any, Partial<{ email: string, address: string, phone: string, phone1: string, tiktok: string, twitter: string, youtube: string, whatsapp:string , facebook:string  }>>({
        query: (formData) => ({
            url: `general-settings`,
            method: 'PUT',
            body: formData,
        }),
        invalidatesTags: ['updateContactInfo'],
    }),
    getContactFeedBack: builder.query<any,any>({
        query: (page) => `contacts?page=${page}`,

    }),
    deleteContactById: builder.mutation({
        query: (userId) => ({
            url: `contacts/${userId}`,
            method: 'DELETE',
        }),
    }),
  }),

})

export const {useGetContactInfoQuery ,useUpdateContactInfoMutation,useGetContactFeedBackQuery ,useDeleteContactByIdMutation } = contactApi;
export default contactApi
