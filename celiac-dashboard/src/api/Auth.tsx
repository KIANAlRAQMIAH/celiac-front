import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL
const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

// Define the user API slice
const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Accept-Language', 'ar');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        Adminlogin: builder.mutation<any, any>({
            query: (formData) => ({
                url: `login`,
                method: 'POST',
                body: formData,
            }),
        }),
        ForgetPassword: builder.mutation<any, any>({
            query: (formData) => ({
                url: `reset-password/email-validation`,
                method: 'POST',
                body: formData,
            }),
        }),

        verifyCode: builder.mutation<any, any>({
            query: (code) => ({
                url: 'reset-password/send-code',
                method: 'POST',
                body: code,
            }),
        }),

        ResetPassword: builder.mutation<any, any>({
            query: (formData) => ({
                url: `reset-password/change-password`,
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

// Export the generated hooks and the API slice
export const { useAdminloginMutation, useForgetPasswordMutation, useResetPasswordMutation, useVerifyCodeMutation } = authApi;
export default authApi;
