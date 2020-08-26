const twoDigits = (number: number): string => {
  if (number.toString().length < 2) return `0${number.toString()}`
  else return number.toString()
}

export const elapsedTime = (totalTimeInSeconds: number): string => {
  if (typeof totalTimeInSeconds !== 'number') return totalTimeInSeconds
  else if (totalTimeInSeconds === 0) return ''
  const timeInMinutes = Math.floor(totalTimeInSeconds / 60)
  const timeInSeconds = Math.abs(totalTimeInSeconds % 60)
  return `${twoDigits(timeInMinutes)}:${twoDigits(timeInSeconds)}`
}
