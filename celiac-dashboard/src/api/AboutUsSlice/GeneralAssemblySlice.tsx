import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';


const generalAssemblyApi = createApi({
  reducerPath: 'generalAssemblyApi',
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
    getGeneralMembers: builder.query<any,{ page?: number, keyword?: string }>({
        query: ({ page = 1, keyword = '' }) => `general-assembly/members?page=${page}&?filters%5Bkeyword%5D=deleniti`,
        providesTags: ['postGeneralMember'],
    }),
    addGeneralMember: builder.mutation<any, any>({
        query: ( formData ) => ({
          url: `general-assembly/members`,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: ['postGeneralMember'],
      }),
      updateGeneralMember: builder.mutation<any, { Id: number; formData: any }>({
        query: ({ Id, formData}) => ({
          url: `general-assembly/members/${Id}`,
          method: 'POST',
          body: formData,
          params: {
            _method: 'PUT',
          },
        }),
        invalidatesTags: ['postGeneralMember'],
      }),

      deleteGeneralMemberById: builder.mutation({
      query: (MEMId) => ({
        url: `general-assembly/members/${MEMId}`,
        method: 'DELETE',
      }),
    }),
  //  .....Files for General Members.....
    getGeneralFiles: builder.query<any, void>({
        query: () => ({
          url: `general-assembly/files`,
        }),
        providesTags:['postGeneralFile']
      }),
      addGeneralFiles: builder.mutation<any, any>({
        query: ( formData ) => ({
          url: `general-assembly/files`,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: ['postGeneralFile'],
      }),
      updateGeneralFile: builder.mutation<any, { fileId: number; formData: any }>({

        query: ({ fileId, formData}) => ({
          url: `general-assembly/files/${fileId}`,
          method: 'POST',
          body: formData,
          params: {
            _method: 'PUT',
          },
        }),
        invalidatesTags: ['postGeneralFile'],
      }),

      deleteGeneralFileById: builder.mutation({
        query: (FileId) => ({
          url: `general-assembly/files/${FileId}`,
          method: 'DELETE',
        }),
      }),

  }),
});


export const {useGetGeneralMembersQuery ,useDeleteGeneralMemberByIdMutation ,useAddGeneralMemberMutation ,useUpdateGeneralMemberMutation ,useGetGeneralFilesQuery,useAddGeneralFilesMutation ,useDeleteGeneralFileByIdMutation ,useUpdateGeneralFileMutation} = generalAssemblyApi;
export default generalAssemblyApi;
