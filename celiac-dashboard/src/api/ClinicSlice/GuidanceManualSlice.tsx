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

const GuidanceManualApi= createApi({
  reducerPath: 'GuidanceManualApi',
  tagTypes: ['postGuidance'],

  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    getGuidanceManual: builder.query<any, any>({
        query: ({currentPage}) => ({
          url: `guidance-manual?page=${currentPage}`,
        }),
        providesTags: ['postGuidance'],
     }),
      addGuidanceManual: builder.mutation<any, any>({
        query: ( formData ) => ({
          url: `guidance-manual`,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: ['postGuidance'],
      }),
      updateGuidanceManual: builder.mutation<any, { id: number ,formData: any }>({
        query: ({ id, formData}) => ({
          url: `guidance-manual/${id}`,
          method: 'POST',
          body: formData,
          params: {
            _method: 'PUT',
          },
        }),
        invalidatesTags: ['postGuidance'],
      }),
      deleteGuidanceManualById: builder.mutation({
        query: (FileId) => ({
          url: `translated-books/${FileId}`,
          method: 'DELETE',
        }),
      }),

  }),
});


export const {useGetGuidanceManualQuery ,useAddGuidanceManualMutation ,useUpdateGuidanceManualMutation ,useDeleteGuidanceManualByIdMutation} = GuidanceManualApi;
export default GuidanceManualApi;
