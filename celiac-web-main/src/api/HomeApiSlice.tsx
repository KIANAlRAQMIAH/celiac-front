import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ContactFormData {
  
  name: string;
  phone: number;
  country_code: any;
  email: string;
  message: string;
}


export const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://celiac-backend.oc.kian.work/api/v1/'
  }),

  endpoints: (builder) => ({
    getCountries: builder.query<any, void>({

      query: () => ({
        url: 'countries',
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
    GetHomeBanner: builder.query<any, void>({
      query: () => ({
        url: 'countries',
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
    getHomePage: builder.query<any, void>({
      query: () => ({
        url: 'home',
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
    postContactUs: builder.mutation<any, ContactFormData>({
      query: (formData) => ({
        url: 'contact-us',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': 'ar', 
        },
        body: formData, 
      }),
    }),
    
    


  })
})
export const { useGetCountriesQuery, useGetHomePageQuery, usePostContactUsMutation} = homeApi;
