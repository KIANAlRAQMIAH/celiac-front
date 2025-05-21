import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';


const governanceApi = createApi({
  reducerPath: 'governanceApi',
  tagTypes: ['postGeneralMember','postGeneralFile'],
  baseQuery: fetchBaseQuery({
     baseUrl,

     prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Accept-Language", "ar");
      headers.set("Authorization", `Bearer ${localStorage.getItem("admintoken")!}`);

        return headers;
      },
    }),

  endpoints: (builder) => ({
  //  .....Files for governance files.....
   getGovernanceLists: builder.query<any, void>({
    query: () => ({
      url: `governance-lists`,
    }),
    providesTags:['postGeneralFile']
  }),
    getGovernanceFiles: builder.query<any, any>({
        query: (id) => ({
          url: `governance-lists/files/${id}`,
        }),
        providesTags:['postGeneralFile']
      }),
      addGovernanceFiles: builder.mutation<any, any>({
        query: ( formData ) => ({
          url: `governance-lists/files`,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: ['postGeneralFile'],
      }),
      updateGovernanceFile: builder.mutation<any, { fileId: number; formData: any }>({

        query: ({ fileId, formData}) => ({
          url: `governance-lists/files/${fileId}`,
          method: 'POST',
          body: formData,
          params: {
            _method: 'PUT',
          },
        }),
        invalidatesTags: ['postGeneralFile'],
      }),

      deleteGovernanceFileById: builder.mutation({
        query: (FileId) => ({
          url: `governance-lists/files/${FileId}`,
          method: 'DELETE',
        }),
      }),

  }),
});


export const {useGetGovernanceListsQuery,useGetGovernanceFilesQuery , useAddGovernanceFilesMutation ,useDeleteGovernanceFileByIdMutation ,useUpdateGovernanceFileMutation} = governanceApi;
export default governanceApi;
