const twoDigits = (d: number) => String(d).padStart(2, '0')

export const elapsedTime = (totalTimeInSeconds: number): string => {
  if (totalTimeInSeconds === 0) return ''
  const timeInMinutes = Math.floor(totalTimeInSeconds / 60)
  const timeInSeconds = Math.abs(totalTimeInSeconds % 60)
  return `${twoDigits(timeInMinutes)}:${twoDigits(timeInSeconds)}`
}
