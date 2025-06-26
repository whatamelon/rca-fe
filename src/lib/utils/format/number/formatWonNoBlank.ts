export const formatWonNoBlank = (value: number | string) => {
  if (!value) return '0'
  return Number(value).toLocaleString()
}
