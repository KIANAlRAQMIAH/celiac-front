import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const reservationApi = createApi({
    reducerPath: 'reservationApi',
    tagTypes: ['reservation'],
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            headers.set('Accept-Language', 'ar');
            headers.set('Authorization', `Bearer ${localStorage.getItem('admintoken')!}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getClinces: builder.query<any, void>({
            query: () => ({
                url: `clinics`,
            }),
            providesTags: ['reservation'],
        }),
        getClinincDayesByMonth: builder.query<any, { currentMonth: string; clinicId: string }>({
            query: ({ currentMonth, clinicId }) => ({
                url: `calendar-days/list?clinic_id=${clinicId}&month=${currentMonth}`,
            }),
            providesTags: ['reservation'],
        }),

        addFaq: builder.mutation<any, { question: string; answer: string }>({
            query: (faqData) => ({
                url: `faqs`,
                method: 'POST',
                body: faqData,
            }),
            invalidatesTags: ['reservation'],
        }),
        enableDayes: builder.mutation<any, { dates: string[]; clinic_id: string |undefined }>({
            query: (formData) => ({
                url: `calendar-days/enable-days`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['reservation'],
        }),
        updateFaq: builder.mutation<any, { FileId: number; question: string; answer: string }>({
            query: ({ FileId, ...faqData }) => ({
                url: `faqs/${FileId}`,
                method: 'PUT',
                body: faqData,
            }),
            invalidatesTags: ['reservation'],
        }),

        deleteFaqById: builder.mutation({
            query: (FileId) => ({
                url: `faqs/${FileId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useAddFaqMutation, useDeleteFaqByIdMutation, useGetClincesQuery, useUpdateFaqMutation, useEnableDayesMutation, useGetClinincDayesByMonthQuery } = reservationApi;
export default reservationApi;
