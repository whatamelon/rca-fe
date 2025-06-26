import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import { ApiError } from 'next/dist/server/api-utils'

import { ActiveBrandType } from '@/lib/types/app'
import { CommonResponse } from '@/lib/types/global'

import { LoginRequest, SignResponse } from '@/lib/types/auth'

// fetchBaseQuery 로 fetch를 함 -> HTTP 요청을 단순화
// prepareHeaders : 모든 요청에 헤더를 삽입
export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/admins`,
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
  reducerPath: 'AuthApi',
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    login: build.mutation<CommonResponse<SignResponse>, LoginRequest>({
      query: (params) => ({
        url: `/signin`,
        method: 'POST',
        body: JSON.stringify(params),
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: build.mutation<CommonResponse<void>, void>({
      query: (params) => ({
        url: `/signout`,
        method: 'POST',
        body: JSON.stringify(params),
      }),
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          // api.dispatch(myApiSlice.util.invalidateTags([{ type: 'MyInfo', id: 'all' }])) // 마이페이지 - 내 정보 관리 - 내 정보 데이터 갱신
        })
      },
    }),
  }),
})

// endpoint 기반으로 자동으로 이름이 생성됨.
export const { useLoginMutation, useLogoutMutation } = authApiSlice
