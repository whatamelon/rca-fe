import dynamicIconImports from 'lucide-react/dynamicIconImports'

/** 로그인 세션 type 입니다. */
type IconName = keyof typeof dynamicIconImports

export type LoginSession = { accessToken: string; refreshToken: string }

export type HeaderDtoType = {
  title: string
  id: string
  isDepth: boolean
}

export type ActiveBrandType = {
  code: string
  name: string
  branddomain: string
  filterUrlName: string
  korName: string
}

export type HeaderProps = {
  back?: boolean
  id?: string
  title?: string
  backRoute?: string
  closeFunction?: () => void
}

/**
 * Navigation menu 에서 사용하는 type입니다.
 */
export type NavigationType = {
  name: string
  route: string
  icon?: IconName
  subMenus?: NavigationType[]
  subMenusOpen?: boolean
}
