import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const treatmentApi= createApi({
  reducerPath: 'treatmentApi',
  tagTypes: ['postTreatment'],
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
    getTreatment: builder.query<any,void>({
        query: () => ({
          url: `information-about-treatment`,
        }),
        providesTags: ['postTreatment'],
     }),

     updateTreatment: builder.mutation<any,any>({
        query: (formData) => ({
            url: `information-about-treatment`,
            method: 'POST',
            body: formData,
            params: {
                _method: 'PUT',
              },
        }),
        invalidatesTags: ['postTreatment'],
    }),

  }),
});


export const { useGetTreatmentQuery ,useUpdateTreatmentMutation} = treatmentApi;
export default treatmentApi;
