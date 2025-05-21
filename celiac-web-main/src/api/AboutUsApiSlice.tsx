"use client"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutUsApi = createApi({
  reducerPath: 'aboutUsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://celiac-backend.oc.kian.work/api/v1/',
  }),
  endpoints: (builder) => ({
    getAboutUs: builder.query<any, void>({
      query: () => ({
        url: 'about',
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
    getOrganizationChart: builder.query<any, void>({
      query: () => ({
        url: 'members/organizational-structure',
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
   
    getGovAndTrans: builder.query<any, void>({
      query: () => ({
        url: 'governance-lists',
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
    getFilesBoardMember: builder.query<any, void>({
      query: () => ({
        url: 'files/meeting-board-of-directors',
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
    getFilesGeneralAssembly: builder.query<any, void>({
      query: () => ({
        url: 'files/meeting-general-assembly',
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
    getFilesOrganizationChart: builder.query<any, void>({
      query: () => ({
        url: 'files/meeting-organizational-structure',
        method: 'GET',
        headers: {
          'Accept-Language': 'ar',
        },
      }),
    }),
    
  }),
});

export const { useGetAboutUsQuery, useGetOrganizationChartQuery ,useGetGovAndTransQuery, useGetFilesBoardMemberQuery,useGetFilesGeneralAssemblyQuery, useGetFilesOrganizationChartQuery} = aboutUsApi;
