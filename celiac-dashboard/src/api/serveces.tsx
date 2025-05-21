import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryWithInterceptor from './handler';

// Define the base URL
const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const servicesApi = createApi({
    reducerPath: 'servicesApi',
    tagTypes: ["celiac-card" , "hiring", 'food-basket'],
    baseQuery: baseQueryWithInterceptor,
    endpoints: (builder) => ({
        getCeliacCards: builder.query<any, any>({
            query: ({ page }) => `celiac-cards?page=${page}`,
            providesTags: ['celiac-card'],
        }),
        getHajjRequests: builder.query<any, any>({
            query: ({ page }) => `hajj-requests?page=${page}`,
            providesTags: ['celiac-card'],
        }),

        rejecttJobReq: builder.mutation({
            query: ({ id, status }) => ({
                url: `reject-job-request-request/${id}`,
                method: 'post',
                body: status
            }),
            invalidatesTags: ['hiring'],
        }),
        acceptJobReq: builder.mutation({
            query: ({ id, status }) => ({
                url: `accept-job-request-request/${id}`,
                method: 'post',
                body: status
            }),
            invalidatesTags: ['hiring'],
        }),
        getPendingFoodBasket: builder.query<any, any>({
            query: (page) => `food-baskets?page=${page}`,
            providesTags: ['food-basket'],
        }),
        getAcceptFoodBasket: builder.query<any, any>({
            query: (page) => `accepted-food-baskets-requests?page=${page}`,
            providesTags: ['food-basket'],
        }),

        rejectFoodBasket: builder.mutation({
            query: ({ id, status }) => ({
                url: `reject-food-baskets-request/${id}`,
                method: 'POST',
                body: status
            }),
            invalidatesTags: ['food-basket'],
        }),
        acceptFoodBasket: builder.mutation({
            query: ({ id, status }) => ({
                url: `accept-food-baskets-request/${id}`,
                method: 'POST',
                body: status
            }),
            invalidatesTags: ['food-basket'],
        }),
        getCeliacCardOwners: builder.query<any, any>({
            query: ({ page }) => `cardOwners?page=${page}`,
            providesTags: ['celiac-card'],
        }),
        getAcceptHajjReq: builder.query<any, any>({
            query: ({ page }) => `accepted-hajj-requests?page=${page}`,
            providesTags: ['celiac-card'],
        }),
        getCeliacCardOwner: builder.query<any, any>({
            query: (id) => `celiac-cards/${id}`,
            providesTags: ['celiac-card'],
        }),
        getFoodbasketRequest: builder.query<any, any>({
            query: (id) => `food-baskets/${id}`,
            providesTags: ['celiac-card'],
        }),
        getCooperativeTrainingReqs: builder.query<any, any>({
            query: ({ page }) => `cooperative-training/?page=${page}`,
            providesTags: ['celiac-card'],
        }),
        acceptRejectCeliacCard: builder.mutation({
            query: ({ id, status }) => ({
                url: `celiac-cards/${id}`,
                method: 'PUT',
                body: status,
            }),
            invalidatesTags: ['celiac-card'],
        }),
        rejecttHajjReq: builder.mutation({
            query: ({ id, status }) => ({
                url: `reject-hajj-request/${id}`,
                method: 'post',
                body: status
            }),
            invalidatesTags: ['celiac-card'],
        }),
        acceptHajjReq: builder.mutation({
            query: ({ id, status }) => ({
                url: `accept-hajj-request/${id}`,
                method: 'post',
                body: status
            }),
            invalidatesTags: ['celiac-card'],
        }),
        getHajjSingleUser: builder.query<any, any>({
            query: (id) => `hajj-requests/${id}`,
            providesTags: ['celiac-card'],
        }),
        GetSingleVolunteer: builder.query<any, any>({
            query: (id) => `volunteer_request/${id}`,
            providesTags: ['celiac-card'],
        }),
        GetCooperativeUser: builder.query<any, any>({
            query: (id) => `cooperative-training/${id}`,
            providesTags: ['celiac-card'],
        }),
        deleteCeliacCard: builder.mutation({
            query: (deleteCategory) => ({
                url: `celiac-cards/${deleteCategory}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['celiac-card'],
        }),
        getPendingJops: builder.query<void, void>({
            query: () => ({
                url: `job-requests`,
            }),
            providesTags: ['hiring'],
        }),
        getAcceptingJops: builder.query<any, void>({
            query: () => `accepted-jobs`,
        }),


        toggleActiveUserById: builder.mutation({
            query: ({ userId }) => ({
                url: `/users/change-activation/${userId}`,
                method: 'POST',
            }),
        }),
        deleteUserById: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
        }),

        creatRecord: builder.mutation<any, { url: string; formData: any; inValid: string[] }>({
            query: ({ formData, url }) => ({
                url: `${url}`,
                method: 'POST',
                body: formData,
            }),
            //@ts-ignore
            invalidatesTags: (result, error, { inValid }: { inValid: string[] }) => {
                // Map the `inValid` array to a format expected by `invalidatesTags`

                return inValid;
            },

            // transformResponse: (response, meta) => {
            //     console.log(meta?.response?.status);
            //     return { status: meta?.response?.status, response };
            // },

            // transformErrorResponse: (response, meta) => {
            //     return { status: meta?.response?.status, response };
            // },
        }),

        getRecords: builder.query<
            unknown,
            {
                page?: number;
                per_page?: number;
                url: string;
                searchKeyword?: string;
                city_id?: string;
                developer_id?: string;
                area_id?: string;
                inValid: string[];
            }
        >({
            query: ({ page, per_page, url, searchKeyword, city_id, area_id, developer_id }) =>
                `${url}?${searchKeyword ? `query=${searchKeyword}` : ''}${city_id ? `&city_id=${city_id}` : ''}${area_id ? `&area_id=${area_id}` : ''}${
                    developer_id ? `&developer_id=${developer_id}` : ''
                }${per_page ? `&per_page=${per_page}&page=${page}` : ''}`,
            //@ts-ignore
            providesTags: (result, error, { inValid }: { inValid: string[] }) => {
                // Map the `inValid` array to a format expected by `invalidatesTags`
                console.log(inValid);
                return inValid;
            },
            keepUnusedDataFor: 0,
        }),

        findRecord: builder.query<any, any>({
            query: ({ id, url }) => `${url}/${id}`,
            keepUnusedDataFor: 0,
        }),

        editRecord: builder.mutation<any, { url: string; id: string; formData: any; headers?:any, inValid: string[]; method?: string }>({
            query: ({ formData, id, headers,url, method }) => ({
                url: `${url}/${id}`,
                method: `${method ? method : 'POST'}`,
                body: formData,
                headers:{
                    ...headers
                }
            }),

            //@ts-ignore
            invalidatesTags: (result, error, { inValid }: { inValid: string[] }) => {
                // Map the `inValid` array to a format expected by `invalidatesTags`
                console.log(inValid);
                return inValid;
            },

            // transformResponse: (response, meta) => {
            //     console.log(meta?.response?.status);
            //     return { status: meta?.response?.status, response };
            // },

            // transformErrorResponse: (response, meta) => {
            //     return { status: meta?.response?.status, response };
            // },
        }),

        deleteRecord: builder.mutation<any, { id: string; url: string; inValid: string[] }>({
            query: ({ id, url }) => ({
                url: `${url}/${id}`,
                method: 'DELETE',
            }),
            //@ts-ignore
            invalidatesTags: (result, error, { inValid }: { inValid: string[] }) => {
                // Map the `inValid` array to a format expected by `invalidatesTags`
                console.log(inValid);
                return inValid;
            },
            // transformResponse: (response, meta) => {
            //     console.log(meta?.response?.status);

            //     return { status: meta?.response?.status, response };
            // },
            // transformErrorResponse: (response, meta) => {
            //     return { status: meta?.response?.status, response };
            // },
        }),
    }),
});



export const {  useFindRecordQuery,
    useEditRecordMutation,
    useCreatRecordMutation,
    useGetRecordsQuery,
    useDeleteRecordMutation, useGetCooperativeUserQuery, useGetSingleVolunteerQuery, useGetFoodbasketRequestQuery, useGetCooperativeTrainingReqsQuery, useAcceptFoodBasketMutation, useGetAcceptFoodBasketQuery, useGetPendingFoodBasketQuery, useRejectFoodBasketMutation, useGetHajjSingleUserQuery, useGetHajjRequestsQuery, useGetCeliacCardOwnerQuery, useDeleteCeliacCardMutation, useGetCeliacCardOwnersQuery, useGetCeliacCardsQuery, useGetPendingJopsQuery, useDeleteUserByIdMutation, useToggleActiveUserByIdMutation, useGetAcceptingJopsQuery, useAcceptRejectCeliacCardMutation, useAcceptHajjReqMutation, useRejecttHajjReqMutation, useGetAcceptHajjReqQuery, useAcceptJobReqMutation, useRejecttJobReqMutation } = servicesApi;
export default servicesApi;
