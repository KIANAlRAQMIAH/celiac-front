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

const AdminsApi = createApi({
    reducerPath: 'AdminsApi',
    tagTypes: ['changeStatus', 'postAdmins'],
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getRoles: builder.query<any, void>({
            query: () => ({
                url: `roles?page=0&limit=0&withoutRelation=0`,
            }),
            providesTags: ['changeStatus', 'postAdmins'],
        }),
        getAdmins: builder.query<any, { pageNumber: any; selectedRoleId1: any }>({
            query: ({ pageNumber, selectedRoleId1 }) => ({
                url: `admins?role=${selectedRoleId1}&page=${pageNumber}`,
            }),
            providesTags: ['changeStatus', 'postAdmins'],
        }),
        toggleActiveAdminAById: builder.mutation({
            query: ({ admin_id }) => ({
                url: `admins/change-activation/${admin_id}`,
                method: 'POST',
            }),
            invalidatesTags: ['changeStatus'],
        }),
        addAdmin: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: `admins`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['postAdmins'],
        }),
        updateAdminById: builder.mutation<any, { id: number, formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `admins/${id}`,
                method: 'POST',
                body: formData,
                params: {
                    _method: 'PUT',
                  },
            }),
            invalidatesTags: ['postAdmins'],
        }),
        deleteAdminById: builder.mutation({
            query: (id) => ({
                url: `admins/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useToggleActiveAdminAByIdMutation,
    useGetAdminsQuery,
    useAddAdminMutation,
    useUpdateAdminByIdMutation,
    useGetRolesQuery,
    useDeleteAdminByIdMutation,
} = AdminsApi;
export default AdminsApi;
