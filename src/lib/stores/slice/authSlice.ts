/**
 * ==============================================================================
 * @fileoverview authSlice
 * @desc redux toolkit slice를 이용한 예시 파일
 * @module auth/authSlice
 * ==============================================================================
 */

import type { PayloadAction } from '@reduxjs/toolkit'
import { deleteCookie, setCookie } from 'cookies-next'
import { PURGE } from 'redux-persist'

import { AdminInfoType, LoginSession } from '@/lib/types/auth'
import { createAppSlice } from '../createAppSlice'

// state 정의
const initialState = {
  isLoggedIn: false,
  adminInfo: {
    id: '',
    password: '',
    adminId: 0,
    adminClass: '',
  },
}

// app slice 생성
export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    setLoginState: create.reducer((state, action: PayloadAction<LoginSession>) => {
      if (action.payload.accessToken) {
        setCookie('accessToken', action.payload.accessToken, { maxAge: 43200 })
        state.isLoggedIn = true
      } else {
        deleteCookie('accessToken')
        state.isLoggedIn = false
      }
    }),
    setAdminInfo: create.reducer((state, action: PayloadAction<AdminInfoType>) => {
      state.adminInfo = action.payload
    }),
  }),
  selectors: {
    getLoginState: (state) => state.isLoggedIn,
    getAdminInfo: (state) => state.adminInfo,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  },
})

// setter, getter export
export const { setLoginState, setAdminInfo } = authSlice.actions
export const { getLoginState, getAdminInfo } = authSlice.selectors

export default authSlice.reducer
