const twoDigits = (d: number) => String(d).padStart(2, '0')

export const getCurrentDate = (): string => {
  const date = new Date()
  return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(
    date.getDate()
  )}`
}

export const displayDate = (date: string) => {
  return date.split('-').reverse().join('/')
}
