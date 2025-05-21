import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const aboutDiseaseApi= createApi({
  reducerPath: 'aboutDiseaseApi',
  tagTypes: ['postDisease'],
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
    getAboutDisease: builder.query<any,void>({
        query: () => ({
          url: `about-the-disease-settings`,
        }),
        providesTags: ['postDisease'],
     }),

     updateAboutDisease: builder.mutation<any,any>({
        query: (formData) => ({
            url: `about-the-disease-settings`,
            method: 'POST',
            body: formData,
            params: {
                _method: 'PUT',
              },
        }),
        invalidatesTags: ['postDisease'],
    }),

  }),
});


export const { useGetAboutDiseaseQuery ,useUpdateAboutDiseaseMutation} = aboutDiseaseApi;
export default aboutDiseaseApi;
