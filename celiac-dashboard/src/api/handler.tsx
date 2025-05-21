import {
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";


const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://celiac-backend.oc.kian.work/dashboard/v1/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Accept-Language", "ar");
      headers.set("Authorization", `Bearer ${localStorage.getItem("admintoken")!}`);

      return headers;
  },
  });
  const { dispatch, } = api;
  const result = await baseQuery(args, api, extraOptions);
  console.log(result);

  if (result.error?.status === 401) {
    localStorage.removeItem("admintoken");
    window.location.href = "/";
  }

  return result;
};

export default baseQueryWithInterceptor;
