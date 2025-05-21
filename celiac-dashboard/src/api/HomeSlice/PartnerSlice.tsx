import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const PartnersApi = createApi({
  reducerPath: 'PartnersApi',
  tagTypes: ['postPartner'],
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
    getPartners: builder.query<any,void>({
        query: () => `partners`,
        providesTags: ['postPartner'],
    }),
    addPartner: builder.mutation<any, any>({
        query: ( formData ) => ({
          url: `partners`,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: ['postPartner'],
      }),
      updatePartner: builder.mutation<any, { Id: number; formData: any }>({
        query: ({ Id, formData}) => ({
          url: `partners/${Id}`,
          method: 'POST',
          body: formData,
          params: {
            _method: 'PUT',
          },
        }),
        invalidatesTags: ['postPartner'],
      }),

      deletePartner: builder.mutation({
      query: (MEMId) => ({
        url: `partners/${MEMId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {useAddPartnerMutation ,useDeletePartnerMutation ,useGetPartnersQuery ,useUpdatePartnerMutation} = PartnersApi;
export default PartnersApi;
