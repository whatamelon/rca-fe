import { CodeNameObjectType } from './global'

// UI 컴포넌트 타입
export type FilterCheckboxProps = {
  title?: string
  items: CodeNameObjectType[]
  selectedItems: string[]
  isNotEntire?: boolean
  setValue: (value: string[]) => void
  className: string
}

export type FilterCheckboxTextfieldProps = {
  title?: string
  items: { code: string; name: string }[]
  selectedItems: string[]
  searchModel: string | number
  textfieldIndex: number
  isButton?: boolean
  buttonText?: string
  setValue: (value: string[]) => void
  updateValue: (value: string | number) => void
  buttonClick?: () => void
  className: string
}

export type FilterMultipleSelectProps<T> = {
  title: string
  useDepth: number
  oneList: T[]
  selectedOne: string
  setOneValue: (value: string) => void
  setOnePlaceholder: string
  twoList?: T[]
  selectedTwo?: string
  setTwoValue?: (value: string) => void
  setTwoPlaceholder?: string
  threeList?: T[]
  selectedThree?: string
  setThreeValue?: (value: string) => void
  setThreePlaceholder?: string
  className: string
}

export type FilterFileProps = {
  title: string
  prevFileURL?: string
  body: string
  retryBody: string
  validFunction: (file: File) => boolean // API 호출 전 유효성 검사 함수
  setValue: (file: File) => void // 파일 업로드 시 파일 저장 함수
  className: string
}

export type FilterImageProps = {
  title: string
  prevImgURL?: string
  setValue: (value: File) => void
  className: string
  accept?: string
}

export type RadioProps = {
  title?: string
  items: { code: string; name: string }[]
  selectedItem: string | null
  isLine?: boolean
  setValue: (value: string) => void
  className: string
}

export type RadioTextfieldProps = {
  title?: string
  placeholder?: string
  maxLength?: number
  items: Record<string, string>[]
  selectedItem: string
  searchModel: string
  textfieldIndex: number
  setValue: (value: string) => void
  updateValue: (value: string) => void
  className: string
  seperatedValues?: boolean // setValue, updateValue 함수 분리 여부
}

export type FilterTextfieldProps = {
  title: string
  placeholder: string
  searchModel: string
  suffix?: string
  maxLength?: number
  typePassword?: boolean
  updateValue: (value: string) => void
  className?: string
  disabled?: boolean
}

export type FilterTextareaProps = {
  title: string
  placeholder: string
  searchModel: string
  maxLength?: number
  updateValue: (value: string) => void
  className?: string
  rows?: number
}

export type FilterSelectedTextfieldProps = {
  title: string
  placeholder: string
  searchModel: string
  suffix?: string
  maxLength?: number
  updateValue: (value: string) => void
  className: string
  items: CodeNameObjectType[]
  selectedItem: string
  setValue: (value: string) => void
}

export type FilterSelectProps = {
  title: string
  placeholder?: string
  items: CodeNameObjectType[]
  selectedItem: string
  setValue: (value: string) => void
  className?: string
  triggerWidth?: string
}

/**
 * calendar에서 사용하는 DateType 입니다.
 */
type DateType = {
  selectedDate: string
  date: string
}

export type FilterDatePickerProps = {
  title: string
  dates: Record<string, string>
  dateList: Record<string, string>[]
  setValue: (value: DateType) => void
  className?: string
}

export type DateRangeType = {
  from: Date
  to: Date
}

export type ExtendDateRangeType = DateRangeType & {
  selectedRange: string
}

export type FilterDateRangeProps = {
  title: string
  dates: ExtendDateRangeType
  dateList: Record<string, string>[]
  setValue: (value: ExtendDateRangeType) => void
  className?: string
}

export type LinkIdProps = {
  id?: string
  className?: string
  route: string
  typeCode?: string
}

export type ListCellProps = {
  title?: string
  children?: React.ReactNode
  body?: string
  isTooltip?: {
    isVisible: boolean
    text: string
  }
}

export type ListCellBigProps = {
  title?: string
  children?: React.ReactNode
  body?: string
}

export type EmptyNavProps = {
  title?: string
  totalCnt?: number
  isBetween?: boolean
  children?: React.ReactNode
}

export type CanDuplicateMultipleTextProps = {
  items: string[]
  where: string
  useType: string
  placeHolder: string
  textHidden?: boolean
  className?: string
  add: (text: string) => void
  remove: (text: string) => void
}

// API 응답 타입
export type ComponentContentResponseType = {
  useFlag: string
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
  prodIds: string
}

// API 응답 타입
export type ComponentResponseType = {
  componentId: number
  typeCode: string
  typeName: string
  title: string
  subtitle: string
  useFlag: boolean
  orderIdx: number
  contentIds: string
  crDate: string
  upDate: string
}

// API 요청 타입
export type ComponentCrudBaseType = {
  typeCode?: string
  title?: string
  subtitle?: string
  contentIds?: string
}

export type ComponentCreateRequest = ComponentCrudBaseType & {
  pageCode: string
}

export type ComponentUpdateRequest = ComponentCrudBaseType & {
  useFlag: boolean
  componentId: number
}

export type ComponentUpdateOrderRequest = {
  componentIds: string
  pageCode: string
}

export type ComponentTypeCode = 'BS' | 'MB' | 'QB' | 'BL' | 'EL' | 'SB' | 'RL' | 'CL'

export type ComponentTypeItemType = {
  code: ComponentTypeCode
  name: string
  usedTags?: string[]
  providePreivew?: boolean
}
