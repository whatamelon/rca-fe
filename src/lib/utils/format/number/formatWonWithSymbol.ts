export const formatWonWithSymbol = (value: number | string) => {
  if (!value) return ''
  if (value.toString().indexOf('-') > -1) {
    return Number(value.toString().slice(1)).toLocaleString()
  }
  return `-${Number(value).toLocaleString()}`
}
