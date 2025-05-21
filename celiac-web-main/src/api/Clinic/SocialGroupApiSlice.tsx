import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ClinicSocialApi = createApi({
  reducerPath: 'ClinicSocialApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://celiac-backend.oc.kian.work/api/v1/'
  }),
  endpoints: (builder) => ({
    getSocialContact: builder.query<any, void>({
      query: () => ({
        url: 'clinic-settings',
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
    PatientAwareness: builder.query<any, void>({
      query: (contentType) => ({
        url: `patient-awareness?contentType=${contentType}`,
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
  })
})
export const { useGetSocialContactQuery, usePatientAwarenessQuery } = ClinicSocialApi;
