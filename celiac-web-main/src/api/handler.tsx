import {
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { modelActions } from "@/store/modelSlice";


const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://celiac-backend.oc.kian.work/api/v1/",
    prepareHeaders(headers) {
      const token = localStorage.getItem("celiacToken");
      if (token) {
        const convertedToken = JSON.parse(token);

        headers.set("Authorization", `Bearer ${convertedToken}`);
      }

      headers.set("Accept", "application/json");
      headers.set("Accept-Language", "ar");

      return headers;
    },
  });
  const { dispatch } = api;
  const result = await baseQuery(args, api, extraOptions);
  console.log(result);

  if (result.error?.status === 401) {
    dispatch(modelActions.openModel());
  }

  return result;
};

export default baseQueryWithInterceptor;
