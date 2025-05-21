import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const aboutAssociationApi = createApi({
  reducerPath: 'aboutAssociationApi',
  tagTypes: ['postAssociation'],
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
    getAssociation: builder.query<any,void>({
        query: () => `about-settings`,
        providesTags: ['postAssociation'],
    }),

    updateAssociation: builder.mutation<any, Partial<{ association_about_title: string, association_about_description: string, establishment_of_the_association: string, association_visions: string, association_message: string, association_objectives: string, association_values: string }>>({
        query: (formData) => ({
            url: `about-settings`,
            method: 'PUT',
            body: formData,
        }),
        invalidatesTags: ['postAssociation'],
    }),


  }),

})

export const { useGetAssociationQuery ,useUpdateAssociationMutation} = aboutAssociationApi;
export default aboutAssociationApi
