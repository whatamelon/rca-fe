export const formatDateFullForUTC = (date: string | null): string => {
  if (date == null) return '-'
  if (date === '-') return '-'
  if (date === '') return '-'
  return `${date.substring(0, 10)}  ${date.substring(11, 19)}`
}
