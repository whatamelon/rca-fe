/* eslint-disable object-curly-newline */
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiError } from 'next/dist/server/api-utils'

import { CategoryData, FilterData } from '@/lib/types/filter'

// fetchBaseQuery 로 fetch를 함 -> HTTP 요청을 단순화
// prepareHeaders : 모든 요청에 헤더를 삽입
export const filterApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://s3.ap-northeast-2.amazonaws.com/saas-img.the-relay.kr/data`,
  }) as unknown as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
  reducerPath: 'FilterApi',
  tagTypes: ['Filters', 'Categories'],
  endpoints: (build) => ({
    getFilters: build.query<FilterData, string>({
      query: (params) => ({
        url: `/filter/${params}.json`,
        method: 'GET',
      }),
      providesTags: (params) => [{ type: 'Filters', params }],
    }),
    getCategory: build.query<CategoryData, void>({
      query: () => ({
        url: `/category/categoryData.json`,
        method: 'GET',
      }),
      providesTags: () => ['Categories'],
    }),
  }),
})

// endpoint 기반으로 자동으로 이름이 생성됨.
export const { useGetFiltersQuery, useGetCategoryQuery } = filterApiSlice
