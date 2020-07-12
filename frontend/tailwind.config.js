module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue'],

  theme: {
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
      mono: [
        'Menlo',
        'Monaco',
        ' Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },

    extend: {
      fontSize: {
        '25xl': '1.65rem',
        '35xl': '2rem',
        '45xl': '2.75rem',
      },

      borderRadius: {
        xl: '1rem',
        shape: '0.5rem 0 0.5rem 0',
        'shape-xl': '1rem 0 1rem 0',
      },

      opacity: {
        '10': '.1',
        '35': '.35',
      },

      colors: {
        main: {
          default: '#B80BDA',
          '50': '#FAE7FE',
          '100': '#F8DDFD',
          '200': '#F2C0FC',
          '300': '#E489F5',
          '400': '#D53DF5',
          '500': '#B80BDA',
          '600': '#A202C4',
          '700': '#8502A1',
          '800': '#5A046C',
          '900': '#380B41',
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
