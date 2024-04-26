const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./app.vue', './pages/**/*.vue', './components/**/*.vue'],

  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },

      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },

        main: {
          50: 'var(--main-50)',
          100: 'var(--main-100)',
          200: 'var(--main-200)',
          300: 'var(--main-300)',
          400: 'var(--main-400)',
          500: 'var(--main-500)',
          600: 'var(--main-600)',
          700: 'var(--main-700)',
          800: 'var(--main-800)',
          900: 'var(--main-900)',
        },

        red: {
          500: '#EF4444',
          600: '#DC2626',
        },
      },

      animation: {
        fadeIn: 'fadeIn 100ms ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
