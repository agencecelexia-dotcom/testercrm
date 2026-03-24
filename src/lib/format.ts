/**
 * Format a number as EUR currency using French locale.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

/**
 * Format a Date (or date string) using French locale.
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('fr-FR').format(d)
}

/**
 * Format a French phone number into the standard XX XX XX XX XX pattern.
 * Strips all non-digit characters, handles +33 prefix, and groups into pairs.
 */
export function formatPhone(phone: string): string {
  let digits = phone.replace(/\D/g, '')

  // Convert international +33 prefix to leading 0
  if (digits.startsWith('33') && digits.length === 11) {
    digits = '0' + digits.slice(2)
  }

  // Group into pairs: 06 12 34 56 78
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(?=\d)/g, '$1 ').trim()
  }

  // Return cleaned string if it doesn't match expected length
  return phone
}

/**
 * Format a decimal value as a percentage using French locale.
 * e.g. 0.153 → "15,3 %"
 */
export function formatPercent(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)
}
