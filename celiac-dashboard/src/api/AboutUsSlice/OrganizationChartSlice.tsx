import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const organiztionChartApi = createApi({
    reducerPath: 'organiztionChartApi',
    tagTypes: ['postOrganizationMember', 'postOrganizationFile'],
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
        getOrganizationMembers: builder.query<any, void>({
            query: (page) => `organizational-structure/members?filters%5Bkeyword%5D=ex&page=${page}`,
            providesTags: ['postOrganizationMember'],
        }),
        GetPositions: builder.query<any, void>({
            query: (page) => `positions`,
            // providesTags: ['postOrganizationMember'],
        }),
        addOrganizationMember: builder.mutation<any, any>({
            query: (formData) => ({
                url: `organizational-structure/members`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['postOrganizationMember'],
        }),
        updateOrganizationMember: builder.mutation<any, { Id: number; formData: any }>({
            query: ({ Id, formData }) => ({
                url: `organizational-structure/members/${Id}`,
                method: 'POST',
                body: formData,
                params: {
                    _method: 'PUT',
                },
            }),
            invalidatesTags: ['postOrganizationMember'],
        }),

        deleteOrganizationMemberById: builder.mutation({
            query: (MEMId) => ({
                url: `organizational-structure/members/${MEMId}`,
                method: 'DELETE',
            }),
        }),
        //  .....Files for Organization Members.....
        getOrganizationFiles: builder.query<any, void>({
            query: () => ({
                url: `organizational-structure/files`,
            }),
            providesTags: ['postOrganizationFile']
        }),
        addOrganizationFiles: builder.mutation<any, any>({
            query: (formData) => ({
                url: `organizational-structure/files`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['postOrganizationFile'],
        }),
        updateOrganizationFile: builder.mutation<any, { fileId: number; formData: any }>({

            query: ({ fileId, formData }) => ({
                url: `organizational-structure/files/${fileId}`,
                method: 'POST',
                body: formData,
                params: {
                    _method: 'PUT',
                },
            }),
            invalidatesTags: ['postOrganizationFile'],
        }),

        deleteOrganizationFileById: builder.mutation({
            query: (FileId) => ({
                url: `organizational-structure/files/${FileId}`,
                method: 'DELETE',
            }),
        }),

    }),
});


export const { useGetPositionsQuery, useAddOrganizationMemberMutation, useDeleteOrganizationMemberByIdMutation, useGetOrganizationMembersQuery, useUpdateOrganizationMemberMutation } = organiztionChartApi;
export default organiztionChartApi;
