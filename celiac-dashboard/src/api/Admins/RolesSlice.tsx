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

const rolesApi = createApi({
    reducerPath: 'rolesApi',
    tagTypes: ['changeStatus', 'postRoles'],
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        getRoles: builder.query<any, any>({
            query: (currentPage) => ({
                url: `roles?page=${currentPage}`,
            }),
            providesTags: ['changeStatus', 'postRoles'],
        }),
        getPermissions: builder.query<any, void>({
            query: () => ({
                url: `permissions`,
            }),
            providesTags: ['changeStatus', 'postRoles'],
        }),
        toggleActiveRoleById: builder.mutation({
            query: ({ role_id }) => ({
                url: `roles/change-activation/${role_id}`,
                method: 'POST',
            }),
            invalidatesTags: ['changeStatus'],
        }),
        addRole: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: `roles`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['postRoles'],
        }),
        updateRoleById: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `roles/${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    'Content-Type': 'application/json', 
                },
            }),
            invalidatesTags: ['postRoles'],
        }),

        deleteRoleById: builder.mutation({
            query: (id) => ({
                url: `roles/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {

    useGetRolesQuery,
    useToggleActiveRoleByIdMutation,
    useGetPermissionsQuery,
    useAddRoleMutation,
    useUpdateRoleByIdMutation,
    useDeleteRoleByIdMutation
} = rolesApi;
export default rolesApi;
