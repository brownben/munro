module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue'],

  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    fontFamily: {
      heading: ['Josefin Sans', 'sans-serif'],
      body: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
    },

    borderRadius: {
      none: '0',
      sm: '.125rem',
      md: '.25rem',
      lg: '.5rem',
      xl: '1rem',
    },

    extend: {
      colors: {
        grey: '#e5e8ed',
        purple: {
          50: '#F3E5F5',
          100: '#E1BEE7',
          200: '#CE93D8',
          300: '#BA68C8',
          400: ' #AB47BC',
          500: ' #9C27B0',
          600: ' #8E24AA',
          700: ' #7B1FA2',
          800: ' #6A1B9A',
          900: ' #4A148C',
        },
        main: {
          veryLight: 'hsl(290, 45%, 93%)',
          light: 'hsl(290, 50%, 80%)',
          'light-hover': '#CD5EE4',
          lighter: '#C134DE',
          default: 'hsl(290, 90%, 45%)',
          darker: '#A202C4',
          dark: '#75028D',
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
