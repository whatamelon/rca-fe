export const formatHcUseFlag = (useFlag: boolean) => {
  if (useFlag === null) return '-'
  if (useFlag === true) return '사용'
  if (useFlag === false) return '미사용'
}

export const formatHcDisplayFlag = (displayFlag: boolean) => {
  if (displayFlag === null) return '-'
  if (displayFlag === true) return '표시'
  if (displayFlag === false) return '숨김'
}

export const formatHcFormTypeFlag = (useFlag) => {
  if (useFlag === '') return '-'
  if (useFlag === '-') return '-'
  if (useFlag === null) return '-'
  if (useFlag === 'b1') return '메인배너'
  if (useFlag === 'b2') return '중단배너'
  if (useFlag === 'pd') return '팝업 다이얼로그'
  if (useFlag === 'im') return '이미지 썸네일'
  if (useFlag === 'pl') return '미리보기 리스트'
}

export const formatHcActType = (useFlag) => {
  if (useFlag === '') return '-'
  if (useFlag === '-') return '-'
  if (useFlag === null) return '-'
  if (useFlag === 'none') return '이동안함'
  if (useFlag === 'evpl') return '기획전'
  if (useFlag === 'prft') return '필터링 방식-구매하기'
  if (useFlag === 'evfo') return '필터링 방식-기획전'
  if (useFlag === 'menu') return '서비스 메뉴 바로가기'
  if (useFlag === 'ourl') return '외부 URL 이동'
}

export const formatContentsTypeName = (code: string) => {
  switch (code) {
    case 'BS':
      return '바텀시트'
    case 'MB':
      return '메인배너'
    case 'QB':
      return '퀵버튼'
    case 'BL':
      return '브랜드리스트'
    case 'EL':
      return '기획전'
    case 'SB':
      return '서브배너'
    case 'RL':
      return '리뷰리스트'
    case 'CL':
      return '카드리스트'
    default:
  }
}
