const twoDigits = (number: number): string => {
  if (number.toString().length < 2) return `0${number.toString()}`
  else return number.toString()
}

export const elapsedTime = (totalTimeInSeconds: number): string => {
  if (totalTimeInSeconds === 0) return ' '
  const timeInMinutes = Math.floor(totalTimeInSeconds / 60)
  const timeInSeconds = Math.abs(totalTimeInSeconds % 60)
  return `${twoDigits(timeInMinutes)}:${twoDigits(timeInSeconds)}`
}

export const timeToHTMLElapsed = (totalTimeInSeconds: number): string => {
  const timeInMinutes = Math.floor(totalTimeInSeconds / 60)
  const timeInSeconds = Math.abs(totalTimeInSeconds % 60)
  return `PT${timeInMinutes}M${timeInSeconds}S`
}
