/**
* 컨텐츠 리스트에서 사용하는 리스트들의 타입입니다.
*/

/** 바텀시트 리스트 type 입니다. */
export type ListBottomsheetType = {
  contentId: string
  useFlag: boolean
  displayFlag: boolean
  crDate: string
  upDate: string
  typeCode: string
  actType: string
  actData: string
  imgLink: string
}

/** 메인배너 리스트 type 입니다. */
export type ListMainBannerType = {
  contentId: string
  useFlag: boolean
  displayFlag: boolean
  crDate: string
  upDate: string
  typeCode: string
  title: string
  titleColor: string
  body: string
  bodyColor: string
  actType: string
  actData: string
  imgLink: string
}

/** 퀵버튼 리스트 type 입니다. */
export type ListQuickButtonType = {
  contentId: string
  useFlag: boolean
  displayFlag: boolean
  crDate: string
  upDate: string
  typeCode: string
  title: string
  actType: string
  actData: string
  imgLink: string
}

/** 브랜드리스트 리스트 type 입니다. */
export type ListBrandListType = {
  contentId: string
  useFlag: boolean
  displayFlag: boolean
  crDate: string
  upDate: string
  typeCode: string
  title: string
  actType: string
  actData: string
  imgLink: string
}

export type ListEventListType = {
  contentId: string
  useFlag: boolean
  displayFlag: boolean
  crDate: string
  upDate: string
  typeCode: string
  title: string
  body: string
  prodIds: string[]
}

export type ListSubBannerType = {
  contentId: string
  useFlag: boolean
  displayFlag: boolean
  crDate: string
  upDate: string
  typeCode: string
  title: string
  titleColor: string
  body: string
  bodyColor: string
  actType: string
  actData: string
  imgLink: string
}

export type ListCardLayoutType = {
  contentId: string
  useFlag: boolean
  displayFlag: boolean
  crDate: string
  upDate: string
  typeCode: string
  title: string
  titleColor: string
  body: string
  bodyColor: string
  button: string
  buttonColor: string
  buttonBgColor: string
  bgColor: string
}
