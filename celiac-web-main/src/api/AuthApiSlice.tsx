import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, LoginResponse } from "../types/AuthTypes";

interface RegisterCredentials {
  name: string;
  phone: string;
  email: string;
  birthdate: string;
  residency_number: string;
  is_saudi: boolean;
  password: string;
  password_confirmation: string;
  terms_and_conditions: boolean;
}

interface UserData {
  data: {
    data: {
      roles: string;
      roles_ids: number[];
      role_id: number | null;
      permissions: any; // You can specify the type of permissions if known
      avatar: string | null;
      id: number;
      accessToken: string;
      name: string;
      email: string;
      phone: string;
      last_update: string;
      is_active: boolean;
      active_class: string;
      active_status: string;
      code_for_test_only: any; // You can specify the type if known
    };
    status: number;
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://celiac-backend.oc.kian.work/api/v1",
    prepareHeaders: (headers, { getState }) => {
      // const token = localStorage.getItem("token");

      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("Accept-Language", "ar");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
    }),

    verify: builder.mutation<any, any>({
      query: (code) => ({
        url: "/verify",
        method: "POST",
        body: code,
      }),
    }),

    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    verifynumber: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/reset-password/phone-number-validation",
        method: "POST",
        body: credentials,
      }),
    }),

    verifyCode: builder.mutation<any, any>({
      query: (code) => ({
        url: "/reset-password/send-code",
        method: "POST",
        body: code,
      }),
    }),
    changePassword: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/reset-password/change-password",
        method: "POST",
        body: formData,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => "user",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useVerifyMutation,
  useVerifyCodeMutation,
  useVerifynumberMutation,
  useChangePasswordMutation,
} = authApi;
