import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            headers.set('Accept-Language', 'ar');
            const token = localStorage.getItem('admintoken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        window.location.href = "/";
    }

    return result;
};

const InquiriesApi = createApi({
    reducerPath: 'InquiriesApi',
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getInquiries: builder.query<any, any>({
            query: (currentPage) => ({
                url: `medical-consulting?page=${currentPage}`,
            }),
        }),
        deleteInquiriesById: builder.mutation({
            query: (id) => ({
                url: `medical-consulting/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetInquiriesQuery,
  useDeleteInquiriesByIdMutation
} = InquiriesApi;
export default InquiriesApi;
