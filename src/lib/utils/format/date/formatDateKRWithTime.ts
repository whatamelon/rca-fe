export const formatDateKRWithTime = (date: string | null): string => {
  if (date == null) return '-'
  if (date === '-') return '-'
  if (date === '') return '-'
  const hour = parseInt(date.substring(11, 13), 10)
  let hourWord = ''
  if (hour < 12) hourWord = ` 오전 ${hour}시`
  else hourWord = ` 오후 ${Math.abs(12 - hour)}시`

  return `${date.substring(0, 4)}.${date.substring(5, 7)}.${date.substring(8, 10)}${hourWord}`
}
