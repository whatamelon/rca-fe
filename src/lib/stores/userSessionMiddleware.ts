import { Middleware } from '@reduxjs/toolkit'
import { setCookie } from 'cookies-next'
import { toast } from 'sonner'

import { setLoginState } from './slice/authSlice'
/**
 * 유저 세션을 확인하는 미들웨어.
 * 성공했을 때, userSession을 저장한다.
 * 실패했을 때, 401 에러가 발생하면 refreshToken을 사용해서 accessToken을 재발급 받는다.
 * refreshToken이 만료되었을 때, 로그인 페이지로 이동한다.
 */

const resetAndGoToLogin = (next) => {
  toast.error('세션이 만료되어 로그아웃되었습니다.')
  next(setLoginState({ accessToken: '' }))

  setCookie('recent-route', window.location.pathname)
  // 로그인 페이지로 이동
  window.location.replace('/login')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userSessionMiddleware: Middleware = () => (next) => (action: any) => {
  if (action.type.endsWith('rejected')) {
    // 401 에러 처리
    if (action.payload?.data.code === 'A001') {
      resetAndGoToLogin(next)
    } else if (action.payload?.data.code === 'A002') {
      resetAndGoToLogin(next)
    } else {
      return next(action)
    }
  }

  return next(action)
}
