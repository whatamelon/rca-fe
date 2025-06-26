export const formatPhone = (phone: string) => {
  if (!phone) return '0'

  const cleaned = phone.replace(/[^0-9]/g, '')

  if (cleaned.startsWith('02')) {
    if (cleaned.length === 9) {
      return cleaned.replace(/^(\d{2})(\d{3})(\d{4})$/, '$1-$2-$3')
    }
    if (cleaned.length === 10) {
      return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1-$2-$3')
    }
  } else if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')
  }

  return phone
}
