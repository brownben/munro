module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html', './src/**/*.vue'],
  dark: false,
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },

      fontFamily: {
        heading: ['Josefin Sans', 'sans-serif'],
      },

      boxShadow: {
        outline: '0 0 0 3px var(--main-300, #f0abfc)',
        'outline-white': '0 0 0 3px rgba(255, 255, 255, 0.65)',
        'outline-red': '0 0 0 3px rgba(248, 113, 113, 0.65)',
      },

      lineHeight: {
        12: '3rem',
        14: '3.5rem',
      },

      inset: {
        '-5': '-1.25rem',
      },

      maxHeight: {
        112: '28rem',
      },

      fontSize: {
        '7xl': '4.5rem',
      },

      borderRadius: {
        xl: '1rem',
        shape: '0.5rem 0 0.5rem 0',
        'shape-xl': '1rem 0 1rem 0',
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

      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: '"Josefin Sans", sans-serif',
            },
            h2: {
              fontFamily: '"Josefin Sans", sans-serif',
            },
            h3: {
              fontFamily: '"Josefin Sans", sans-serif',
            },
            h4: {
              fontFamily: '"Josefin Sans", sans-serif',
            },
            strong: {
              fontFamily: '"Josefin Sans", sans-serif',
            },
          },
        },
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
}
