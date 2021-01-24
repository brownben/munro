const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue'],
  dark: false,
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

        main: colors.fuchsia,
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

  variants: {
    border: ({ after }) => after(['checked']),
    backgroundColor: ({ after }) => after(['checked', 'group-hover']),
    opacity: ({ after }) => after(['group-hover']),
  },

  plugins: [require('@tailwindcss/typography')],
}
