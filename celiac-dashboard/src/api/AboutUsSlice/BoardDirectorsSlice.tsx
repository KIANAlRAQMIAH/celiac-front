import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'https://celiac-backend.oc.kian.work/dashboard/v1/';



const boardApi = createApi({
  reducerPath: 'boardApi',
  tagTypes: ['postMember','postFile'],
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
    getBoardMembers: builder.query<any, { page?: number, keyword?: string }>({
        query: ({ page = 1, keyword = '' }) => `board-of-directories/members?page=${page}&filters%5Bkeyword%5D=${keyword}`,
        providesTags: ['postMember'],
    }),
    addBoardMember: builder.mutation<any, any>({
        query: ( formData ) => ({
          url: `board-of-directories/members`,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: ['postMember'],
      }),
      updateBoardMember: builder.mutation<any, { Id: number; formData: any }>({
        query: ({ Id, formData}) => ({
          url: `board-of-directories/members/${Id}`,
          method: 'POST',
          body: formData,
          params: {
            _method: 'PUT',
          },
        }),
        invalidatesTags: ['postMember'],
      }),

      deleteMemberById: builder.mutation({
      query: (MEMId) => ({
        url: `/board-of-directories/members/${MEMId}`,
        method: 'DELETE',
      }),
    }),

    getDirectorFiles: builder.query<any, void>({
        query: () => ({
          url: `board-of-directories/files`,
        }),
        providesTags:['postFile']
      }),
      addDirectorFiles: builder.mutation<any, any>({
        query: ( formData ) => ({
          url: `board-of-directories/files`,
          method: 'POST',
          body: formData,
        }),
        invalidatesTags: ['postFile'],
      }),
      updateFileDirector: builder.mutation<any, { fileId: number; formData: any }>({

        query: ({ fileId, formData}) => ({
          url: `board-of-directories/files/${fileId}`,
          method: 'POST',
          body: formData,
          params: {
            _method: 'PUT',
          },
        }),
        invalidatesTags: ['postFile'],
      }),

      deleteFileById: builder.mutation({
        query: (FileId) => ({
          url: `/board-of-directories/files/${FileId}`,
          method: 'DELETE',
        }),
      }),
  }),

})

export const { useUpdateFileDirectorMutation,useGetBoardMembersQuery, useDeleteMemberByIdMutation,useAddBoardMemberMutation,useUpdateBoardMemberMutation,useGetDirectorFilesQuery,useAddDirectorFilesMutation,useDeleteFileByIdMutation } = boardApi;
export default boardApi;
