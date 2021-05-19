interface ThemeGray {
  '--gray-50': string
  '--gray-100': string
  '--gray-200': string
  '--gray-300': string
  '--gray-400': string
  '--gray-500': string
  '--gray-600': string
  '--gray-700': string
  '--gray-800': string
  '--gray-900': string
}

interface Theme extends ThemeGray {
  '--main-50': string
  '--main-100': string
  '--main-200': string
  '--main-300': string
  '--main-400': string
  '--main-500': string
  '--main-600': string
  '--main-700': string
  '--main-800': string
  '--main-900': string
}

const purpleTheme: Theme = {
  '--main-50': '#fdf4ff',
  '--main-100': '#fae8ff',
  '--main-200': '#f5d0fe',
  '--main-300': '#f0abfc',
  '--main-400': '#e879f9',
  '--main-500': '#d946ef',
  '--main-600': '#c026d3',
  '--main-700': '#a21caf',
  '--main-800': '#86198f',
  '--main-900': '#701a75',
  '--gray-50': 'hsl(290, 20%, 98%)',
  '--gray-100': 'hsl(290, 15.8%, 96.3%)',
  '--gray-200': 'hsl(290, 13%, 91%)',
  '--gray-300': 'hsl(290, 12.5%, 84.3%)',
  '--gray-400': 'hsl(290, 11%, 66.1%)',
  '--gray-500': 'hsl(290, 8.9%, 46.1%)',
  '--gray-600': 'hsl(290, 13.8%, 34.1%)',
  '--gray-700': 'hsl(290, 19.1%, 26.7%)',
  '--gray-800': 'hsl(290, 26%, 19.6%)',
  '--gray-900': 'hsl(290, 35.3%, 13.3%)',
}

const warmGray: ThemeGray = {
  '--gray-50': '#FAFAF9',
  '--gray-100': '#F5F5F4',
  '--gray-200': '#E7E5E4',
  '--gray-300': '#D6D3D1',
  '--gray-400': '#A8A29E',
  '--gray-500': '#78716C',
  '--gray-600': '#57534E',
  '--gray-700': '#44403C',
  '--gray-800': '#292524',
  '--gray-900': '#1C1917',
}

const coolGray: ThemeGray = {
  '--gray-50': '#F8FAFC',
  '--gray-100': '#F1F5F9',
  '--gray-200': '#E2E8F0',
  '--gray-300': '#CBD5E1',
  '--gray-400': '#94A3B8',
  '--gray-500': '#64748B',
  '--gray-600': '#475569',
  '--gray-700': '#334155',
  '--gray-800': '#1E293B',
  '--gray-900': '#0F172A',
}

const grayTheme: Theme = {
  '--main-50': '#F8FAFC',
  '--main-100': '#F1F5F9',
  '--main-200': '#E2E8F0',
  '--main-300': '#CBD5E1',
  '--main-400': '#94A3B8',
  '--main-500': '#64748B',
  '--main-600': '#475569',
  '--main-700': '#334155',
  '--main-800': '#1E293B',
  '--main-900': '#0F172A',
  ...warmGray,
}

const redTheme: Theme = {
  '--main-50': '#FEF2F2',
  '--main-100': '#FEE2E2',
  '--main-200': '#FECACA',
  '--main-300': '#FCA5A5',
  '--main-400': '#F87171',
  '--main-500': '#EF4444',
  '--main-600': '#DC2626',
  '--main-700': '#B91C1C',
  '--main-800': '#991B1B',
  '--main-900': '#7F1D1D',
  ...warmGray,
}

const ukEliteLeagueTheme: Theme = {
  '--main-50': '#FFF1F1',
  '--main-100': '#FFE1E1',
  '--main-200': '#FFC9C9',
  '--main-300': '#FFA2A2',
  '--main-400': '#FF7070',
  '--main-500': '#FF5757',
  '--main-600': '#EE2B2B',
  '--main-700': '#D41111',
  '--main-800': '#A70D0E',
  '--main-900': '#900C0C',
  ...warmGray,
}

const blueTheme: Theme = {
  '--main-50': '#F0F9FF',
  '--main-100': '#E0F2FE',
  '--main-200': '#BAE6FD',
  '--main-300': '#7DD3FC',
  '--main-400': '#38BDF8',
  '--main-500': '#0EA5E9',
  '--main-600': '#0284C7',
  '--main-700': '#0369A1',
  '--main-800': '#075985',
  '--main-900': '#0C4A6E',
  ...coolGray,
}

const greenTheme: Theme = {
  '--main-50': '#F0FDF4',
  '--main-100': '#DCFCE7',
  '--main-200': '#BBF7D0',
  '--main-300': '#86EFAC',
  '--main-400': '#4ADE80',
  '--main-500': '#22C55E',
  '--main-600': '#16A34A',
  '--main-700': '#15803D',
  '--main-800': '#166534',
  '--main-900': '#14532D',
  ...coolGray,
}

const orangeTheme: Theme = {
  '--main-50': '#FFF7ED',
  '--main-100': '#FFEDD5',
  '--main-200': '#FED7AA',
  '--main-300': '#FDBA74',
  '--main-400': '#FB923C',
  '--main-500': '#F97316',
  '--main-600': '#EA580C',
  '--main-700': '#C2410C',
  '--main-800': '#9A3412',
  '--main-900': '#7C2D12',
  ...warmGray,
}

const cyanTheme: Theme = {
  '--main-50': '#F0FDFA',
  '--main-100': '#CCFBF1',
  '--main-200': '#99F6E4',
  '--main-300': '#5EEAD4',
  '--main-400': '#2DD4BF',
  '--main-500': '#14B8A6',
  '--main-600': '#0D9488',
  '--main-700': '#0F766E',
  '--main-800': '#115E59',
  '--main-900': '#134E4A',
  ...coolGray,
}

const pinkTheme: Theme = {
  '--main-50': '#FDF2F8',
  '--main-100': '#FCE7F3',
  '--main-200': '#FBCFE8',
  '--main-300': '#F9A8D4',
  '--main-400': '#F472B6',
  '--main-500': '#EC4899',
  '--main-600': '#DB2777',
  '--main-700': '#BE185D',
  '--main-800': '#9D174D',
  '--main-900': '#831843',
  ...warmGray,
}

const themes: Record<string, Theme> = {
  default: purpleTheme,
  purple: purpleTheme,
  blue: blueTheme,
  green: greenTheme,
  red: redTheme,
  orange: orangeTheme,
  cyan: cyanTheme,
  pink: pinkTheme,
  gray: grayTheme,
  grey: grayTheme,
  ukEliteLeague: ukEliteLeagueTheme,
}

export default (themeName: string): string => {
  const theme = themes[themeName] ?? purpleTheme

  if (!import.meta.env.SSR) {
    for (const [name, value] of Object.entries(theme))
      document.body.style.setProperty(name, value)
  }

  return theme['--main-600']
}

export const getStyle = (themeName: string): string => {
  const theme = themes[themeName] ?? purpleTheme
  let style = ''

  for (const [name, value] of Object.entries(theme))
    style += `${name}: ${value};`

  return style
}
