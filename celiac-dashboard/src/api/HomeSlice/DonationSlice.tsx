import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const DonationApi = createApi({
    reducerPath: 'DonationApi',
    tagTypes: ['postDonates', 'banners'],
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
        getDonations: builder.query<any, void>({
            query: (page) => `donations?page=${page}`,
            providesTags: ['postDonates'],
        }),
        getDonationById: builder.query<any, number>({
            query: (id) => `donations/${id}`,
            providesTags: ['postDonates'],
        }),
        addDonate: builder.mutation<any, any>({
            query: (formData) => ({
                url: `donations`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['postDonates'],
        }),
        updateDonate: builder.mutation<any, { Id: number; formData: any }>({
            query: ({ Id, formData }) => ({
                url: `donations/${Id}`,
                method: 'POST',
                body: formData,
                params: {
                    _method: 'PUT',
                },
            }),
            invalidatesTags: ['postDonates'],
        }),
        deleteDonateById: builder.mutation({
            query: (userId) => ({
                url: `donations/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['postDonates'],
        }),
    }),
});

export const { useAddDonateMutation, useDeleteDonateByIdMutation, useGetDonationsQuery, useUpdateDonateMutation, useGetDonationByIdQuery } = DonationApi;
export default DonationApi;
