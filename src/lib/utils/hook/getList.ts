import { ComponentTypeItemType } from '@/lib/types/component'

/**
 * 컴포넌트 타입 리스트
 * @returns 컴포넌트 타입 리스트
 * @returns code: 컴포넌트 타입 코드
 * @returns name: 컴포넌트 타입 이름
 * @returns usedTags: 컴포넌트 타입 사용 태그
 * @returns providePreivew: 컴포넌트 타입 미리보기 여부
 */
export const componentTypeItems: ComponentTypeItemType[] = [
  { code: 'BS', name: '바텀 시트', usedTags: ['actType', 'actData', 'imgLink'], providePreivew: true },
  {
    code: 'MB',
    name: '메인 배너',
    usedTags: ['title', 'titleColor', 'body', 'bodyColor', 'actType', 'actData', 'imgLink'],
    providePreivew: true,
  },
  { code: 'QB', name: '퀵 버튼', usedTags: ['title', 'actType', 'actData', 'imgLink'], providePreivew: true },
  { code: 'BL', name: '브랜드 리스트', usedTags: ['title', 'actType', 'actData', 'imgLink'], providePreivew: false },
  { code: 'EL', name: '기획전', usedTags: ['title', 'body', 'prodIds'], providePreivew: false },
  {
    code: 'SB',
    name: '서브 배너',
    usedTags: ['title', 'titleColor', 'body', 'bodyColor', 'actType', 'actData', 'imgLink'],
    providePreivew: true,
  },
  {
    code: 'CL',
    name: '카드 리스트',
    usedTags: [
      'title',
      'titleColor',
      'body',
      'bodyColor',
      'button',
      'buttonColor',
      'buttonBgColor',
      'bgColor',
      'actType',
      'actData',
      'imgLink',
    ],
    providePreivew: true,
  },
]

/**
 * 이동 경로 리스트
 * @returns 이동 경로 리스트
 * @returns code: 이동 경로 코드
 * @returns name: 이동 경로 이름
 * @returns placeholder: 이동 경로 플레이스홀더
 */
export const actTypeItems = [
  { code: 'none', name: '이동안함', placeholder: '아무곳도 가지 않습니다.' },
  { code: 'evpl', name: '기획전', placeholder: '기획전 ID를 입력해주세요.' }, // string list
  { code: 'prft', name: '필터링 방식-구매하기', placeholder: '필터값을 입력해주세요 ex)order=lastest::cat=200000' }, // textfield
  { code: 'menu', name: '서비스 메뉴 바로가기', placeholder: '이동할 메뉴를 입력해주세요. 가능) pckg,srev,prev,mypg' }, // select menu
  { code: 'ourl', name: '외부 URL 이동', placeholder: 'URL을 입력해주세요.' }, // textfield
]

/**
 * 색상 리스트
 * @returns 색상 리스트
 * @returns code: 색상 코드
 * @returns name: 색상 이름
 */
export const colorItems = [
  { code: '000000', name: '검정' },
  { code: 'ffffff', name: '흰색' },
  { code: '', name: '직접입력' },
]

/**
 * 컴포넌트 타입 별 활성화 인풋 리스트
 * @returns 컴포넌트 타입 별 활성화 인풋 리스트
 * @returns componentType: 컴포넌트 타입
 * @returns inputList: 활성화 인풋 리스트
 */
export const componentActiveInputList: ComponentTypeItemType[] = [
  {
    code: 'BS',
    name: '바텀 시트',
    usedTags: ['contentIds'],
  },
  {
    code: 'MB',
    name: '메인 배너',
    usedTags: ['contentIds'],
  },
  {
    code: 'QB',
    name: '퀵 버튼',
    usedTags: ['contentIds'],
  },
  {
    code: 'SB',
    name: '서브 배너',
    usedTags: ['contentIds'],
  },
  {
    code: 'BL',
    name: '브랜드 리스트',
    usedTags: ['title', 'subtitle', 'contentIds'],
  },
  {
    code: 'EL',
    name: '기획전',
    usedTags: ['title', 'subtitle', 'contentIds'],
  },
  {
    code: 'RL',
    name: '리뷰 리스트',
    usedTags: ['title'],
  },
]
