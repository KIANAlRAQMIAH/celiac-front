import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithInterceptor from "./handler";

interface ContactFormData {
    name: string;
    phone: number;
    country_code: any;
    email: string;
    message: string;
}

interface CancelReservationInput {
    id: string | number;
}
interface IDeleteReservationInput {
    deleteReservation: string | number;
}
export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: baseQueryWithInterceptor ,
    tagTypes: ['reservations'],
    endpoints: (builder) => ({
        getReservations: builder.query<any, void>({
            query: (page) => `reservations?page=${page}`,
            providesTags: ['reservations']
        }),
        cancelReservation: builder.mutation<void, CancelReservationInput>({
            query: (id) => ({
                url: `cancel-reservation/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['reservations']
        }),
        DeleteReservation: builder.mutation<void, IDeleteReservationInput>({
            query: (id) => ({
                url: `delete-reservation/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['reservations']
        }),
        NewRate: builder.mutation<void, CancelReservationInput>({
            query: (reservationData) => ({
                url: `evaluations/${reservationData?.id}`,
                method: 'PUT',
                body: reservationData
            }),
            invalidatesTags: ['reservations']
        }),
        ReservationRate: builder.mutation<void, CancelReservationInput>({
            query: (storeRate) => ({
                url: `evaluations`,
                method: 'POST',
                body: storeRate
            }),
            invalidatesTags: ['reservations']
        }),
        UpdateReservation: builder.mutation<void, { id: string; formData: any }>({
            query: (formData) => ({
                //@ts-ignore
                url: `update-reservation/${formData.clinic_id}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['reservations']
        
        }),
    })
});

export const { useUpdateReservationMutation, useReservationRateMutation, useNewRateMutation, useGetReservationsQuery, useCancelReservationMutation, useDeleteReservationMutation } = profileApi;
