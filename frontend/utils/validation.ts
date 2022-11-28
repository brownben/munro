export interface Validator {
  checker: (value: string) => boolean
  message: string
  fieldProperties: Record<string, string>
}

export const defaultValidator = {
  checker: () => true,
  message: '',
  fieldProperties: {},
}

export const RequiredField = (
  fieldName: string,
  select = false
): Validator => ({
  message: `Please ${select ? 'select' : 'enter'} ${fieldName}.`,
  checker: (value: string) => !!value,
  fieldProperties: { required: 'true' },
})

export const IsValidEmail = {
  message: `Please enter a valid email address.`,
  checker: (value: string) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    ),
  fieldProperties: {
    required: 'true',
    type: 'email',
  },
}

export const IsValidTime = {
  message: `Please enter a time in the form MM:SS`,
  checker: (value: string) => /^[0-9]{1,}:[0-9]{2}$|^$/.test(value),
  fieldProperties: { pattern: '^[0-9]{1,}:[0-9]{2}$|^$' },
}

export const IsValidTimeRequired = {
  message: `Please enter a time in the form MM:SS`,
  checker: (value: string) => /^[0-9]{1,}:[0-9]{2}$/.test(value),
  fieldProperties: { pattern: '^[0-9]{1,}:[0-9]{2}$', required: 'true' },
}

export const IsValidURLParameter = (fieldName: string): Validator => ({
  message: `Please enter ${fieldName} without slashes (/, \\)`,
  checker: (value: string) =>
    !!value && !value.includes('/') && !value.includes('\\'),
  fieldProperties: { pattern: '[^\\/]+', required: 'true' },
})

export const IsValidOptionalURLParameter = (fieldName: string): Validator => ({
  message: `Please enter ${fieldName} without slashes (/, \\)`,
  checker: (value: string) => !value.includes('/') && !value.includes('\\'),
  fieldProperties: { pattern: '[^\\/]*' },
})

export const IsValidRequiredURL = {
  message: `Please enter a valid URL.`,
  checker: (value: string) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value),
  fieldProperties: {
    required: 'true',
    type: 'url',
  },
}

export const IsValidURL = {
  message: `Please enter a valid URL.`,
  checker: (value: string) =>
    /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value) || value == '',
  fieldProperties: {
    type: 'url',
  },
}

export const IsValidAgeClass = {
  message: `Please enter a valid age class.`,
  checker: (value: string) => /^[MW][0-9]+$/.test(value) || value == '',
  fieldProperties: {},
}

export const IsValidJSON = (fieldName: string): Validator => ({
  message: `Please enter ${fieldName} as valid JSON.`,
  checker: (value: string) => {
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
