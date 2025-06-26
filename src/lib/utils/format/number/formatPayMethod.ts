export const formatPayMethod = (value: string) => {
  if (!value) return '-'
  switch (value) {
    case 'card':
      return '신용/체크카드'
    case 'vbank':
      return '가상계좌'
    case 'kakaopay':
      return '카카오페이'
    default:
      return value
  }
}
