import dayjs from 'dayjs'

export const formatDaysRemainToday = (date: string | null): string => {
  if (date == null) return '-'
  if (date === '-') return '-'
  if (date === '') return '-'

  const onlyDate = date.substring(0, 10)
  const diffs = dayjs(onlyDate).add(1, 'day').diff(dayjs(), 'd')

  if (diffs === 0) {
    return '중'
  }
  return `종료`
}
