/**
 * ==============================================================================
 * @fileoverview appSlice
 * @desc redux toolkit slice를 이용한 예시 파일
 * @module appSlice
 * ==============================================================================
 */

import type { PayloadAction } from '@reduxjs/toolkit'

import { ActiveBrandType } from '@/lib/types/app'

import { createAppSlice } from '../createAppSlice'

// state 정의
const initialState = {
  activeBrand: {
    code: '10',
    name: 'Kolon',
    branddomain: 'kolon',
    filterUrlName: 'orm',
    korName: '오엘오',
  },
  openGlobalNavBar: true,
  isGlobalLoading: false,
}

// app slice 생성
export const appSlice = createAppSlice({
  name: 'app',
  initialState,
  reducers: (create) => ({
    setActiveBrand: create.reducer((state, action: PayloadAction<ActiveBrandType>) => {
      state.activeBrand = action.payload
    }),
    setOpenGlobalNavBar: create.reducer((state, action: PayloadAction<boolean>) => {
      state.openGlobalNavBar = action.payload
    }),
    setIsGlobalLoading: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isGlobalLoading = action.payload
    }),
  }),
  selectors: {
    getActiveBrand: (state) => state.activeBrand,
    getOpenGlobalNavBar: (state) => state.openGlobalNavBar,
    getIsGlobalLoading: (state) => state.isGlobalLoading,
  },
})

// setter, getter export
export const { setActiveBrand, setOpenGlobalNavBar, setIsGlobalLoading } = appSlice.actions
export const { getActiveBrand, getOpenGlobalNavBar, getIsGlobalLoading } = appSlice.selectors

export default appSlice.reducer
