import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithInterceptor from "./handler";

export const committeeApi = createApi({
  reducerPath: 'committeeApi',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['carts'],
  endpoints: (builder) => ({
    getCommittees: builder.query<any, void>({
      query: () => ({
        url: 'committees',
        method: 'GET',
      }),
    }),
    getCommitteeById: builder.query({
      query: (id) => ({
        url: `committees/${id}`,
        method: 'GET',
      }),
    }),
    getBoardMembers: builder.query<any, void>({
      query: () => ({
        url: 'members/board-of-directors',
        method: 'GET',
      }),
    }),
    GetStrategicPartnerships: builder.query<any, void>({
      query: () => ({
        url: 'strategic-partnership',
        method: 'GET',
      }),
    }),
    getAssembly: builder.query<any, void>({
      query: () => ({
        url: 'members/general-assembly',
        method: 'GET',
      }),
    }),
    getEvents: builder.query<any, void>({
      query: () => ({
        url: 'events',
        method: 'GET',
      }),
    }),
    getEvent: builder.query({
      query: (id) => ({
        url: `events/${id}`,
        method: 'GET',
      }),
    }),
    getDonnations: builder.query<any, void>({
      query: () => ({
        url: 'donations',
        method: 'GET',
      }),
    }),
    addToCart: builder.mutation<void, any>({
      query: (formData) => ({
        url: `donations/add-to-cart`,
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['carts']
    }),
    updateCart: builder.mutation<void, any>({
      query: (formData) => ({
        url: `donations/update-cart`,
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['carts']
    }),
    removeFromCart: builder.mutation<void, { donation_id: number }>({
      query: ({ donation_id }) => ({
        url: `donations/remove-from-cart/${donation_id}`,
        method: 'post',
      }),
      invalidatesTags: ['carts']
    }),
    handlePayment: builder.mutation<void, void>({
      query: () => ({
        url: 'donations/place-order',
        method: 'POST',
      }),
      invalidatesTags: ['carts']
    }),
    GetCart: builder.query<any, void>({
      query: () => ({
        url: 'donations/cart',
        method: 'GET',
      }),
      providesTags: ['carts']
    }),
  }),
});

export const { useHandlePaymentMutation, useGetEventQuery, useGetEventsQuery, useRemoveFromCartMutation, useUpdateCartMutation, useGetCartQuery, useAddToCartMutation, useGetDonnationsQuery, useGetStrategicPartnershipsQuery, useGetCommitteesQuery, useGetCommitteeByIdQuery, useGetBoardMembersQuery, useGetAssemblyQuery } = committeeApi;
