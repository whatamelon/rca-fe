import dayjs from 'dayjs'

export const formatKoreanDate = (date: string | null): string => {
  if (date == null) return '-'
  if (date === '-') return '-'
  if (date === '') return '-'
  return dayjs(date).format('M월 D일')
}
