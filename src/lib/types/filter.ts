export type FeatureComponentFilterProps = {
  useFlag: boolean
  setUseFlag: (value: boolean) => void
  inputValue: string
  setInputValue: (value: string) => void
  selectedItem: string
  setSelectedItem: (value: string) => void
  searchData: () => void
  resetFilter: () => void
}

export type Cat3 = {
  index: number // 인덱스
  name: string // 이름
  code: string // 코드
  thumbnail?: string // 썸네일 (선택적)
}

// Cat2 (2단계 카테고리)
export type Cat2 = {
  index: number // 인덱스
  name: string // 이름
  code: string // 코드
  cat3?: Cat3[] // 3단계 카테고리 배열
}

// Cat1 (1단계 카테고리)
export type Cat1 = {
  name: string // 이름
  code: string // 코드
  cat2?: Cat2[] // 2단계 카테고리 배열
  cat2List?: Cat2[] // 2단계 카테고리 리스트
}

// 전체 데이터 구조
export type CategoryData = {
  cat1?: Cat1[] // 1단계 카테고리 배열
  list?: Cat1[] // 1단계 카테고리 리스트
}

// 필터의 기본 구조
export type Filter = {
  code: string
  name: string
  selectMode: 'single' | 'multi'
}

// 브랜드 리스트 항목
export type FilterBrandItem = {
  name: string
  nameKr: string
  code: string
  isNew: boolean
}

// 등급 리스트 항목
export type FilterGradeItem = {
  name: string
  code: string
}

// 계절 리스트 항목
export type FilterSeasonItem = {
  name: string
  code: string
}

// 유형 리스트 항목
export type FilterTypeItem = {
  name: string
  code: string
}

// 가격 리스트 항목
export type FilterPriceItem = {
  name: string
  code: string
}

// 색상 리스트 항목
export type FilterColorItem = {
  name: string
  code: string
  colorValue: string // 색상 값 (16진수)
}

// 골프 리스트 항목
export type FilterGolfItem = {
  name: string
  code: string
}

export type FilterSizeItem = {
  name: string // 사이즈 이름 (예: XS, S, M 등)
  code: string // 사이즈 코드
}

// 사이즈 리스트 항목
export type SizeCategory = {
  name: string // 카테고리 이름 (예: 상의/아우터/원피스)
  list: FilterSizeItem[] // 사이즈 리스트
}
// 전체 데이터 구조
export type FilterData = {
  usedFilter: Filter[] // 사용된 필터 목록

  cat?: {
    list: Cat1[]
  }

  brand?: {
    list: FilterBrandItem[]
  }

  grade?: {
    list: FilterGradeItem[]
  }

  season?: {
    list: FilterSeasonItem[]
  }

  type?: {
    selectMode: 'single' | 'multi'
    list: FilterTypeItem[]
  }

  price?: {
    selectMode: 'single' | 'multi'
    list: FilterPriceItem[]
  }

  color?: {
    selectMode: 'single' | 'multi'
    list: FilterColorItem[]
  }

  golf?: {
    selectMode: 'single' | 'multi'
    list: FilterGolfItem[]
  }

  size?: {
    selectMode: 'single' | 'multi'
    list: SizeCategory[]
  }
}
