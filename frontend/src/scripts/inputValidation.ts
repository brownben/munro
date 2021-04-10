export type ValidatorFunction = (value: string) => boolean

export type Validator = {
  message: string
  func: ValidatorFunction
}

export const RequiredField = (
  fieldName: string,
  select: boolean = false
): Validator => ({
  message: `Please ${select ? 'select' : 'enter'} ${fieldName}.`,
  func: (value: string) => !!value,
})

export const IsValidEmail = (): Validator => ({
  message: `Please enter a valid email address.`,
  func: (value: string) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    ),
})

export const IsValidTime = (): Validator => ({
  message: `Please enter a time in the form MM:SS`,
  func: (value: string) => /^[0-9]{1,}:[0-9]{2}$/.test(value),
})

export const IsValidURLParameter = (fieldName: string): Validator => ({
  message: `Please enter ${fieldName} without slashes (/, \\)`,
  func: (value: string) => !value.includes('/') && !value.includes('\\'),
})

export const IsValidJSON = (fieldName: string): Validator => ({
  message: `Please enter ${fieldName} as valid JSON`,
  func: (value: string) => {
    if (!value) return true

    try {
      JSON.parse(value)
      return true
    } catch {
      return false
    }
  },
})
