// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'focus-within-pseudo-class': false,
      },
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'advanced',
    }),
  ],
}
