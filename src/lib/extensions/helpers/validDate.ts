export function isValidDate(date: string) {
  if (typeof date !== 'string') return false

  return !isNaN(Date.parse(date))
}
