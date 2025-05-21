import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    // Define the baseQuery with headers and base URL
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

    // Execute the request
    let result = await baseQuery(args, api, extraOptions);

    // Handle unauthorized errors (401)
    if (result.error && result.error.status === 401) {
        // Redirect to login page on 401 error
        window.location.href = "/";
    }

    return result;
};

const committessApi = createApi({
    reducerPath: 'committessApi',
    tagTypes: ['Committees', 'StrategicPartnerships', 'Memberships', 'CooperativeTraining', 'Volunteer', 'Permissions', 'Positions', 'CommitteeMembers', 'Files'],
    baseQuery: baseQueryWithReauth,

    endpoints: (builder) => ({
        // Committees
        getCommittees: builder.query<any, void>({
            query: () => ({
                url: `committees`,
            }),
            providesTags: ['Committees'],
        }),
        getCommitteeMembers: builder.query<any, any>({
            query: ({ committeeId = 1, keyword = '' }) => `committees/members/${committeeId}?filters%5Bkeyword%5D=quibusdam`,
            providesTags: ['CommitteeMembers'],
        }),
        addCommitteeMember: builder.mutation<any, any>({
            query: ({ committeeId, formData }) => ({
                url: `committees/members/${committeeId}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['CommitteeMembers'],
        }),
        updateCommitteeMember: builder.mutation<any, { memberId: number; committeeId: string; formData: any }>({
            query: ({ memberId, committeeId, formData }) => ({
                url: `committees/members/${committeeId}/${memberId}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['CommitteeMembers'],
        }),
        deleteCommitteeMemberById: builder.mutation({
            query: (MEMId) => ({
                url: `committees/members/${MEMId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CommitteeMembers'],
        }),

        // Strategic Partnerships
        GetStrategicPartnerships: builder.query<any, { page: number }>({
            query: (page) => ({
                url: `strategic-partnerships?page=${page}`,
            }),
            providesTags: ['StrategicPartnerships'],
        }),
        AddStrategicPartnerships: builder.mutation<any, any>({
            query: (formData) => ({
                url: `strategic-partnerships`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['StrategicPartnerships'],
        }),
        UpdateStrategicPartnerships: builder.mutation<any, any>({
            query: ({ id, formData }) => ({
                url: `strategic-partnerships/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['StrategicPartnerships'],
        }),
        DeleteStrategicPartnerships: builder.mutation<any, any>({
            query: ({ id }) => ({
                url: `strategic-partnerships/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['StrategicPartnerships'],
        }),

        // Memberships
        GetMemberships: builder.query<any, { page: number }>({
            query: (page) => ({
                url: `memberships?page=${page}`,
            }),
            providesTags: ['Memberships'],
        }),
        GetMembershipRequests: builder.query<any, { page: number }>({
            query: (page) => ({
                url: `membership-requests?page=${page}`,
            }),
            providesTags: ['Memberships'],
        }),
        AddMemberShip: builder.mutation<any, any>({
            query: (formData) => ({
                url: `memberships`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Memberships'],
        }),
        updateMemberShip: builder.mutation<any, { id: number; type: string; price: string; names: string[] }>({
            query: ({ id, ...patch }) => ({
                url: `memberships/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['Memberships'],
        }),
        AcceptMembershipReq: builder.mutation({
            query: ({ id, status }) => ({
                url: `accept-cooperative-training/${id}`,
                method: 'post',
                body: status
            }),
            invalidatesTags: ['Memberships'],
        }),
        RejectMembershipReq: builder.mutation({
            query: ({ id, status }) => ({
                url: `reject-cooperative-training/${id}`,
                method: 'post',
                body: status
            }),
            invalidatesTags: ['Memberships'],
        }),

        // Cooperative Training
        GetCooperativetraining: builder.query<any, { page: number }>({
            query: (page) => ({
                url: `cooperative-training?page=${page}`,
            }),
            providesTags: ['CooperativeTraining'],
        }),
        GetCooperativetrainingAccepted: builder.query<any, { page: number }>({
            query: (page) => ({
                url: `cooperative-training-accepted?page=${page}`,
            }),
            providesTags: ['CooperativeTraining'],
        }),
        DeleteCooperativetraining: builder.mutation<any, any>({
            query: ({ id }) => ({
                url: `cooperative-training/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CooperativeTraining'],
        }),
        AcceptCooperativetraining: builder.mutation({
            query: ({ id, status }) => ({
                url: `accept-cooperative-training/${id}`,
                method: 'post',
                body: status
            }),
            invalidatesTags: ['CooperativeTraining'],
        }),
        RejectCooperativetraining: builder.mutation({
            query: ({ id, status }) => ({
                url: `reject-cooperative-training/${id}`,
                method: 'post',
                body: status
            }),
            invalidatesTags: ['CooperativeTraining'],
        }),

        // Volunteer
        GetVolunteer: builder.query<any, { page: number }>({
            query: (page) => ({
                url: `volunteer_request?page=${page}`,
            }),
            providesTags: ['Volunteer'],
        }),
        GetVolunteerAccepted: builder.query<any, { page: number }>({
            query: (page) => ({
                url: `volunteer_request?page=${page}&accepted=true`,
            }),
            providesTags: ['Volunteer'],
        }),
        AcceptVolunteer: builder.mutation({
            query: ({ id, status }) => ({
                url: `accept-volunteer_request/${id}`,
                method: 'post',
                body: status
            }),
            invalidatesTags: ['Volunteer'],
        }),
        RejectVolunteer: builder.mutation({
            query: ({ id, status }) => ({
                url: `reject-volunteer_request/${id}`,
                method: 'post',
                body: status
            }),
            invalidatesTags: ['Volunteer'],
        }),
        // Permissions
        getPermissions: builder.query<any, void>({
            query: () => ({
                url: `permissions`,
            }),
            providesTags: ['Permissions'],
        }),

        // Positions
        getPositions: builder.query<any, void>({
            query: () => ({
                url: `positions`,
            }),
            providesTags: ['Positions'],
        }),

        // Files
        getDirectorFiles: builder.query<any, void>({
            query: () => ({
                url: `board-of-directories/files`,
            }),
            providesTags: ['Files'],
        }),
        addDirectorFiles: builder.mutation<any, any>({
            query: (formData) => ({
                url: `board-of-directories/files`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Files'],
        }),
        updateFileDirector: builder.mutation<any, { fileId: number; formData: any }>({
            query: ({ fileId, formData }) => ({
                url: `board-of-directories/files/${fileId}`,
                method: 'POST',
                body: formData,
                params: {
                    _method: 'PUT',
                },
            }),
            invalidatesTags: ['Files'],
        }),
        deleteFileById: builder.mutation({
            query: (FileId) => ({
                url: `/board-of-directories/files/${FileId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Files'],
        }),
    }),
});

export const {
    // Committees
    useGetCommitteesQuery,
    useGetCommitteeMembersQuery,
    useAddCommitteeMemberMutation,
    useUpdateCommitteeMemberMutation,
    useDeleteCommitteeMemberByIdMutation,

    // Strategic Partnerships
    useGetStrategicPartnershipsQuery,
    useAddStrategicPartnershipsMutation,
    useUpdateStrategicPartnershipsMutation,
    useDeleteStrategicPartnershipsMutation,

    // Memberships
    useGetMembershipsQuery,
    useAddMemberShipMutation,
    useUpdateMemberShipMutation,
    useGetMembershipRequestsQuery,
    useAcceptMembershipReqMutation,
    useRejectMembershipReqMutation,

    // Cooperative Training
    useGetCooperativetrainingQuery,
    useGetCooperativetrainingAcceptedQuery,
    useDeleteCooperativetrainingMutation,
    useAcceptCooperativetrainingMutation,
    useRejectCooperativetrainingMutation,

    // Volunteer
    useGetVolunteerAcceptedQuery,
    useGetVolunteerQuery,
    useAcceptVolunteerMutation,
    useRejectVolunteerMutation,
    // Permissions
    useGetPermissionsQuery,

    // Positions
    useGetPositionsQuery,

    // Files
    useGetDirectorFilesQuery,
    useAddDirectorFilesMutation,
    useUpdateFileDirectorMutation,
    useDeleteFileByIdMutation
} = committessApi;

export default committessApi;
