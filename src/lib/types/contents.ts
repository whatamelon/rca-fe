export type ContentRequest = {
  typeCode: string
  page: number
  size: number

  // optional
  searchType?: string
  searchValue?: string
  useFlag?: boolean
}

export type ContentBaseDataType = {
  useFlag: boolean
  crDate: string
  upDate: string
  title: string
  titleColor: string
  body: string
  bodyColor: string
  button: string
  buttonColor: string
  buttonBgColor: string
  bgColor: string
  imgLink: string
  actType: string
  actData: string
}

export type ContentListResponse = ContentBaseDataType & {
  contentId: number
  displayFlag: boolean
  prodCount: string
}
export type ContentIdResponse = ContentBaseDataType & {
  prodIds: string
}

export type ContentCrudBaseType = {
  title?: string
  titleColor?: string
  body?: string
  bodyColor?: string
  button?: string
  buttonColor?: string
  buttonBgColor?: string
  bgColor?: string
  imgLink?: string
  actType?: string
  actData?: string
  prodIds?: string
}

export type ContentCreateRequest = ContentCrudBaseType & {
  typeCode: string
}

export type ContentUpdateRequest = ContentCrudBaseType & {
  useFlag: boolean
  contentId: number | string
}

export type ContentImageUploadRequest = {
  typeCode: string
  imageFiles: File[]
}
