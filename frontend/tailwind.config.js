module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue'],

  theme: {
    extend: {
      fontFamily: {
        heading: ['Josefin Sans', 'sans-serif'],
      },

      boxShadow: {
        outline: '0 0 0 3px rgba(213, 61, 245, 0.5)',
        'outline-white': '0 0 0 3px rgba(255, 255, 255, 0.65)',
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
          50: 'hsl(290, 20%, 98%)',
          100: 'hsl(290, 15.8%, 96.3%)',
          200: 'hsl(290, 13%, 91%)',
          300: 'hsl(290, 12.5%, 84.3%)',
          400: 'hsl(290, 11%, 66.1%)',
          500: 'hsl(290, 8.9%, 46.1%)',
          600: 'hsl(290, 13.8%, 34.1%)',
          700: 'hsl(290, 19.1%, 26.7%)',
          800: 'hsl(290, 26%, 19.6%)',
          900: 'hsl(290, 35.3%, 13.3%)',
        },

        main: {
          default: '#B80BDA',
          1: '#FEFAFF',
          50: '#FAE7FE',
          100: '#F8DDFD',
          200: '#F2C0FC',
          300: '#E489F5',
          400: '#D53DF5',
          500: '#B80BDA',
          600: '#A202C4',
          700: '#8502A1',
          800: '#5A046C',
          900: '#380B41',
        },
      },
    },

    typography: (theme) => ({
      default: {
        css: {
          color: theme('colors.gray.700'),
          '[class~="lead"]': {
            color: theme('colors.gray.700'),
          },
          a: {
            color: theme('colors.main.700'),
          },
          h1: {
            fontFamily: '"Josefin Sans", sans-serif',
            color: theme('colors.main.900'),
          },
          h2: {
            fontFamily: '"Josefin Sans", sans-serif',
            color: theme('colors.main.900'),
          },
          h3: {
            fontFamily: '"Josefin Sans", sans-serif',
            color: theme('colors.main.900'),
          },
          h4: {
            fontFamily: '"Josefin Sans", sans-serif',
            color: theme('colors.main.900'),
          },
          strong: {
            fontFamily: '"Josefin Sans", sans-serif',
            color: theme('colors.gray.900'),
          },
          blockquote: {
            borderLeftColor: theme('colors.main.100'),
            color: theme('colors.main.900'),
          },
          'ol > li::before': {
            color: theme('colors.gray.600'),
          },
          'ul > li::before': {
            color: theme('colors.gray.400'),
          },
          hr: {
            borderColor: theme('colors.gray.300'),
          },
          'figure figcaption': {
            color: theme('colors.gray.600'),
          },
          code: {
            color: theme('colors.gray.900'),
          },
          pre: {
            color: theme('colors.gray.200'),
            backgroundColor: theme('colors.gray.800'),
          },
          thead: {
            color: theme('colors.gray.900'),
            borderBottomColor: theme('colors.gray.400'),
          },
          'tbody tr': {
            borderBottomColor: theme('colors.gray.300'),
          },
        },
      },
    }),
  },

  variants: {
    border: ({ after }) => after(['checked']),
    backgroundColor: ({ after }) => after(['checked', 'group-hover']),
    opacity: ({ after }) => after(['group-hover']),
  },

  plugins: [require('@tailwindcss/typography')],

  future: {
    removeDeprecatedGapUtilities: true,
  },
}
