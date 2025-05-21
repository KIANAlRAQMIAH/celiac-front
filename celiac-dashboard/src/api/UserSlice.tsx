import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryWithInterceptor from './handler';

// Define the base URL
const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithInterceptor,
    endpoints: (builder) => ({
        getUsers: builder.query<any, any>({
            query: (page) => `users?page=${page}&&keyword=${"512345673"}`,
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
    }),
});


export const { useGetUsersQuery, useDeleteUserByIdMutation, useToggleActiveUserByIdMutation } = userApi;
export default userApi;
