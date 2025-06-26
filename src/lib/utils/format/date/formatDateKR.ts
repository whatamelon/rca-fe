export const formatDateKR = (date: string | null): string => {
  if (date == null) return '-'
  if (date === '-') return '-'
  if (date === '') return '-'
  return `${date.substring(0, 4)}년 ${date.substring(5, 7)}월 ${date.substring(8, 10)}일`
}
