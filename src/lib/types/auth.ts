/** 로그인 세션 type 입니다. */
export type LoginSession = { accessToken: string }
/** 로그인 request type 입니다. */
export type LoginRequest = {
  aid: string
  apw: string
}
/** 로그인 response type 입니다. */
export type SignResponse = {
  adminId: number
  accessToken: string
  adminClass: string
}

/** 계정 정보입니다. */
export type AdminInfoType = {
  id: string
  password: string
  adminId: number
  adminClass: string
}
