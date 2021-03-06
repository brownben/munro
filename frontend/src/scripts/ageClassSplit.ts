const getAgeGenderFromAgeClass = (ageClass: string | undefined) => {
  let gender = ''
  let age = 0
  if (ageClass) {
    const regexMatch = ageClass.match(/([MWmwfFDH]?)(U?)([0-9]*)/)
    if (['M', 'H'].includes(regexMatch?.[1]?.toUpperCase() ?? '')) gender = 'M'
    else if (['W', 'F', 'D'].includes(regexMatch?.[1]?.toUpperCase() ?? ''))
      gender = 'W'
    else gender = ''
    age = parseInt(regexMatch?.[3] ?? '0', 10)
  }
  return { age, gender }
}

export const eventResultWithAgeGender = (
  result: EventResult
): EventResultWithAgeGender => {
  const { age, gender } = getAgeGenderFromAgeClass(result?.ageClass)
  return { ...result, age, gender } as EventResultWithAgeGender
}

export const leagueResultWithAgeGender = (
  result: LeagueResult
): LeagueResultWithAgeGender => {
  const { age, gender } = getAgeGenderFromAgeClass(result?.ageClass)
  return { ...result, age, gender } as LeagueResultWithAgeGender
}
