import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const NewsApi = createApi({
    reducerPath: 'NewsApi',
    tagTypes: ['postNews', 'banners'],
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
        getNews: builder.query<any, void>({
            query: () => 'posts',
            providesTags: ['postNews'],
        }),
        addNew: builder.mutation<any, any>({
            query: (formData) => ({
                url: `posts`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['postNews'],
        }),
        updateNews: builder.mutation<any, { Id: number; formData: any }>({
            query: ({ Id, formData }) => ({
                url: `posts/${Id}`,
                method: 'POST',
                body: formData,
                params: {
                    _method: 'PUT',
                },
            }),
            invalidatesTags: ['postNews'],
        }),
        deleteNewById: builder.mutation({
            query: (userId) => ({
                url: `posts/${userId}`,
                method: 'DELETE',
            }),
        }),
        // banners Api
        GetBanners: builder.query<any, void>({
            query: () => 'banners',
            providesTags: ['banners'],
        }),
        AddNewBanner: builder.mutation<any, any>({
            query: (formData) => ({
                url: `banners`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['banners'],
        }),
        DeleteBanner: builder.mutation({
            query: (userId) => ({
                url: `banners/${userId}`,
                method: 'DELETE',
            }),
        }),
        EditBanner: builder.mutation<any, { Id: number; formData: any }>({
            query: ({ Id, formData }) => ({
                url: `banners/${Id}`,
                method: 'POST',
                body: formData,
                params: {
                    _method: 'PUT',
                },
            }),
            invalidatesTags: ['banners'],
        }),
        ChangeBannerStatus: builder.mutation({
            query: ({ userId }) => ({
                url: `banners/change-activation/${userId}`,
                method: 'POST',
            }),
            invalidatesTags: ['banners'],
        }),
    }),
});


export const { useGetNewsQuery, useAddNewMutation, useUpdateNewsMutation, useDeleteNewByIdMutation, useGetBannersQuery, useAddNewBannerMutation, useDeleteBannerMutation, useChangeBannerStatusMutation, useEditBannerMutation } = NewsApi;
export default NewsApi;
