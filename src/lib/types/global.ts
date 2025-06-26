/** 공통으로 사용하는 코드 type 입니다. */
export type GlobalCode = {
  name: string
  code: string
}

/** paging response */
export type PaginationRequest = {
  page: number
  limit: number
}

export type PaginationProps = {
  first: boolean
  last: boolean
  limit: number
  page: number
  totalPage: number
}

/** paging response */
export type PaginationResponse<T> = {
  content: T
  count: {
    listCount: number
    totalCount: number
  }
  page: PaginationProps
}

/** Search paging response */
export type SearchPaginationResponse<T> = {
  content?: T
  count?: {
    listCount: number
    totalCount: number
  }
  params?: string[]
  page: PaginationProps
}

export type ComponentPaginationRequest = {
  componentId: string
} & PaginationRequest

export type ComponentTemplate = {
  alias: string
  schema: unknown
  templateId: number
  type: string
  url: string
  version: string
}

/** component response */
export type ComponentResponse<T> = {
  componentId: number
  name: string
  contents: {
    title: string
    body: string
    prodIds: Array<string>
    contentsId: string
  }
  template: ComponentTemplate
  data: PaginationResponse<T>
  createdAt: string
  lastModifiedAt: string
  contentsLastModifiedAt: string
  contentsCount: number
}

export type ComponentResponseTransform<T> = {
  title: string
  body: string
  data: PaginationResponse<T>
}

/** 유저 세션 정보를 받아옵니다. */
export type UserSession = {
  cartCount: number
  salesCount: number
  tokenValid: boolean
}

/** 공통 response type 입니다. */
export type CommonResponse<T> = {
  content?: T | null
  data: T | null
  code: 'R000' | 'A001' | 'A002' | 'A003' | 'A004' | 'C001' | 'C002' | 'D001' | 'D002'
  info: string | null
}
/**
 * # 성공
R001/Request Successful

# 실패
A001/401 Unauthorized
A002/403 Forbidden
A003/아이디가 존재하지 않습니다.
A004/비밀번호가 일치하지 않습니다.

C001/필수값 누락
C002/허용되지 않은 값

D001/500 Internal Server Error
D002/DB Exception
 */

/** 공통 에러 response type 입니다. */
export type CommonError = {
  data: string | undefined
  statusCode: number
  code?: number
  message: string
}

/** api 에러 type입니다. */
export type ApiError = {
  status: number
  data: CommonError
}

export type CodeNameObjectType = {
  code: string
  name: string
  placeholder?: string
}

export type RecordStringArrayType = Record<string, string>[]

export type SortType = {
  empty: boolean
  unsorted: boolean
  sorted: boolean
}

export type PageableType = {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  sort: SortType
  unpaged: boolean
  totalCount?: number
}

export type ListType<T> = {
  contents: T
  pageable: PageableType
  totalCount: number
}
