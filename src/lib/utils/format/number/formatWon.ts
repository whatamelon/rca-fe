export const formatWon = (value: number | string) => {
  if (!value) return ''
  return Number(value).toLocaleString()
}
