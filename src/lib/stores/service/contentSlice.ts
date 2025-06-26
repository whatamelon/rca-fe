import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import { ApiError } from 'next/dist/server/api-utils'

import { ActiveBrandType } from '@/lib/types/app'
import {
  ContentCreateRequest,
  ContentIdResponse,
  ContentListResponse,
  ContentRequest,
  ContentUpdateRequest,
} from '@/lib/types/contents'
import { CommonResponse, ListType } from '@/lib/types/global'

// fetchBaseQuery 로 fetch를 함 -> HTTP 요청을 단순화
// prepareHeaders : 모든 요청에 헤더를 삽입
export const contentApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/contents`,
    // prepareHeaders : 모든 요청에 headers를 삽입
    prepareHeaders: (headers, api) => {
      const states = api.getState() as { app: { activeBrand: ActiveBrandType } }
      headers.set('Brand-Domain', states.app.activeBrand.branddomain)

      const accessToken = getCookie('accessToken')
      if (accessToken && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }
      // headers.set('Brand-Domain', 'nsr')
      return headers
    },
  }) as unknown as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
  reducerPath: 'ContentApi',
  tagTypes: ['Content', 'ContentList'],
  endpoints: (build) => ({
    getContentList: build.query<CommonResponse<ListType<ContentListResponse[]>>, ContentRequest>({
      query: (params) => {
        const queryString = new URLSearchParams()
        if (params.page) queryString.set('page', params.page.toString())
        if (params.size) queryString.set('size', params.size.toString())
        if (params.typeCode) queryString.set('typeCode', params.typeCode)
        if (params.useFlag !== null && params.useFlag !== undefined) {
          queryString.set('useFlag', params.useFlag.toString())
        }
        if (params.searchType !== '') queryString.set('searchType', params.searchType)
        if (params.searchValue !== '') queryString.set('searchValue', params.searchValue)

        return {
          url: `?${queryString.toString()}`,
          method: 'GET',
        }
      },
      providesTags: (result, error, params) => [{ type: 'ContentList', params }],
    }),
    getContentId: build.query<CommonResponse<ContentIdResponse>, string>({
      query: (contentId) => ({
        url: `/${contentId}`,
        method: 'GET',
      }),
      providesTags: (result, error, params) => [{ type: 'Content', params }],
    }),

    createContent: build.mutation<CommonResponse<null>, ContentCreateRequest>({
      query: (params) => ({
        url: ``,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: [{ type: 'ContentList', id: 'all' }],
      // onQueryStarted: (arg, api) => {
      //   api.queryFulfilled.then(() => {
      //     // api.dispatch(myApiSlice.util.invalidateTags([{ type: 'MyInfo', id: 'all' }])) // 마이페이지 - 내 정보 관리 - 내 정보 데이터 갱신
      //   })
      // },
    }),
    updateContent: build.mutation<CommonResponse<void>, ContentUpdateRequest>({
      query: (params) => ({
        url: `/${params.contentId}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['ContentList', { type: 'Content', id: 'all' }],
      // onQueryStarted: (arg, api) => {
      //   api.queryFulfilled.then(() => {
      //     // api.dispatch(myApiSlice.util.invalidateTags([{ type: 'MyInfo', id: 'all' }])) // 마이페이지 - 내 정보 관리 - 내 정보 데이터 갱신
      //   })
      // },
    }),
    addContentImage: build.mutation<CommonResponse<string>, FormData>({
      query: (params) => ({
        url: `/image`,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: [{ type: 'Content', id: 'all' }],
    }),
  }),
})

// endpoint 기반으로 자동으로 이름이 생성됨.
export const {
  useGetContentListQuery,
  useLazyGetContentListQuery,
  useGetContentIdQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useAddContentImageMutation,
} = contentApiSlice
