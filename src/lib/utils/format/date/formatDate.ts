export const formatDate = (date: string | null): string => {
  if (date == null) return '-'
  if (date === '-') return '-'
  if (date === '') return '-'
  return date.substring(0, 10)
}
