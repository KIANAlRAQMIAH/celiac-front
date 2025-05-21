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

const PatientAwarenessApi = createApi({
    reducerPath: 'PatientAwarenessApi',
    tagTypes: ['postpatient'],
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getPatientAwareness: builder.query<any, any>({
            query: ({ type, contentTypeApi, articleTypeApi, pageNumber }) => {

              const queryParams = new URLSearchParams();

              queryParams.append('type', type);
              if (contentTypeApi !== 0) {
                queryParams.append('contentType', contentTypeApi);
              }
              if (articleTypeApi !== 0) {
                queryParams.append('articleType', articleTypeApi);
              }
              queryParams.append('page', pageNumber);

              return {
                url: `patient-awareness?${queryParams.toString()}`,
              };
            },
            providesTags: ['postpatient'],
          }),

        addPatientAwareness: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: `patient-awareness`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['postpatient'],
        }),
        updatePatientAwareness: builder.mutation<any, { id: number, formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `patient-awareness/${id}`,
                method: 'POST',
                body: formData,
                params: {
                    _method: 'PUT',
                  },
            }),
            invalidatesTags: ['postpatient'],
        }),
        deletePatientById: builder.mutation({
            query: (id) => ({
                url: `patient-awareness/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
useGetPatientAwarenessQuery,
   useAddPatientAwarenessMutation,
   useDeletePatientByIdMutation,
   useUpdatePatientAwarenessMutation,
} = PatientAwarenessApi;
export default PatientAwarenessApi;
