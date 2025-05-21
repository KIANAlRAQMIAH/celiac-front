import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const committeesSpecialtiesApi = createApi({
  reducerPath: 'committeesSpecialtiesApi',
  tagTypes: ['postCommitties'],
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
    getCommitties: builder.query<any,void>({
        query: () => `committees`,
        providesTags: ['postCommitties'],
    }),

    updateCommitties: builder.mutation<any, Partial<any>>({
        query: (formData) => ({
            url: `/committees/update-all`,
            method: 'POST',
            body: formData,
        }),
        invalidatesTags: ['postCommitties'],
    }),


  }),

})

export const {  useGetCommittiesQuery ,useUpdateCommittiesMutation} = committeesSpecialtiesApi;
export default committeesSpecialtiesApi
