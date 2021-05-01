export type ValidatorFunction = (value: string) => boolean

export type Validator = {
  message: string
  func: ValidatorFunction
  fieldProperties: Record<string, string | boolean>
}

export const RequiredField = (
  fieldName: string,
  select = false
): Validator => ({
  message: `Please ${select ? 'select' : 'enter'} ${fieldName}.`,
  func: (value: string) => !!value,
  fieldProperties: { required: true },
})

export const IsValidEmail = (): Validator => ({
  message: `Please enter a valid email address.`,
  func: (value: string) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    ),
  fieldProperties: {
    pattern:
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
  },
})

export const IsValidTime = (): Validator => ({
  message: `Please enter a time in the form MM:SS`,
  func: (value: string) => /^[0-9]{1,}:[0-9]{2}$/.test(value),
  fieldProperties: { pattern: '^[0-9]{1,}:[0-9]{2}$' },
})

export const IsValidURLParameter = (fieldName: string): Validator => ({
  message: `Please enter ${fieldName} without slashes (/, \\)`,
  func: (value: string) => !value.includes('/') && !value.includes('\\'),
  fieldProperties: { pattern: '[^\\/]+' },
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
  fieldProperties: {},
})
