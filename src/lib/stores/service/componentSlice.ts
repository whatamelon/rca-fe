import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import { ApiError } from 'next/dist/server/api-utils'

import { ActiveBrandType } from '@/lib/types/app'
import {
  ComponentCreateRequest,
  ComponentResponseType,
  ComponentUpdateOrderRequest,
  ComponentUpdateRequest,
} from '@/lib/types/component'
import { CommonResponse } from '@/lib/types/global'

import { contentApiSlice } from './contentSlice'

// fetchBaseQuery 로 fetch를 함 -> HTTP 요청을 단순화
// prepareHeaders : 모든 요청에 헤더를 삽입
export const componentApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/components`,
    // headers: { 'Brand-Domain': 'orm' },'
    // prepareHeaders : 모든 요청에 headers를 삽입
    prepareHeaders: (headers, api) => {
      const states = api.getState() as { app: { activeBrand: ActiveBrandType } }
      headers.set('Brand-Domain', states.app.activeBrand.branddomain)

      const accessToken = getCookie('accessToken')
      if (accessToken && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }) as unknown as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
  reducerPath: 'ComponentApi',
  tagTypes: ['Component', 'ComponentList'],
  endpoints: (build) => ({
    // pageCode 를 통해 컴포넌트 리스트 조회 = HOME
    getComponentList: build.query<CommonResponse<ComponentResponseType[]>, string>({
      query: (pageCode) => ({
        url: `/${pageCode}`,
        method: 'GET',
      }),
      providesTags: (result, error, params) => [{ type: 'ComponentList', params }],
    }),
    getComponentId: build.query<CommonResponse<ComponentResponseType>, string>({
      query: (componentId) => ({
        url: `/home/${componentId}`,
        method: 'GET',
      }),
      providesTags: (result, error, params) => [{ type: 'Component', params }],
    }),

    createComponent: build.mutation<CommonResponse<void>, ComponentCreateRequest>({
      query: (params) => ({
        url: `/${params.pageCode}`,
        method: 'POST',
        body: JSON.stringify(params),
      }),
      invalidatesTags: ['ComponentList'],
      // onQueryStarted: (arg, api) => {
      //   api.queryFulfilled.then(() => {
      //     api.dispatch(contentApiSlice.util.invalidateTags([{ type: 'Content', id: 'all' }]))
      //   })
      // },
    }),
    updateComponent: build.mutation<CommonResponse<void>, ComponentUpdateRequest>({
      query: (params) => ({
        url: `/${params.componentId}`,
        method: 'PUT',
        body: JSON.stringify(params),
      }),
      invalidatesTags: ['ComponentList', { type: 'Component', id: 'all' }],
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          api.dispatch(contentApiSlice.util.resetApiState())
          // api.dispatch(componentApiSlice.util.resetApiState())
          // api.dispatch(componentApiSlice.util.invalidateTags([{ type: 'Component', id: arg.componentId }]))
        })
      },
    }),
    updateComponentOrder: build.mutation<CommonResponse<void>, ComponentUpdateOrderRequest>({
      query: (params) => ({
        url: `/${params.pageCode}/order`,
        method: 'PUT',
        body: JSON.stringify(params),
      }),
      invalidatesTags: ['ComponentList'],
    }),
    deleteComponent: build.mutation<CommonResponse<void>, string>({
      query: (componentId) => ({
        url: `/${componentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ComponentList'],
    }),
  }),
})

// endpoint 기반으로 자동으로 이름이 생성됨.
export const {
  useGetComponentListQuery,
  useGetComponentIdQuery,
  useCreateComponentMutation,
  useUpdateComponentMutation,
  useUpdateComponentOrderMutation,
  useDeleteComponentMutation,
} = componentApiSlice
