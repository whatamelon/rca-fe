import dayjs from 'dayjs'

export const formatDaysRemain = (date: string | null): string => {
  if (date == null) return '-'
  if (date === '-') return '-'
  if (date === '') return '-'

  const onlyDate = date.substring(0, 10)
  const dueDate = dayjs(onlyDate).add(1, 'day')

  const dateDiff = dueDate.diff(dayjs(), 'd')
  if (dateDiff === 0) {
    return '오늘까지만'
  }
  return `${dateDiff.toString()}일 뒤`
}
