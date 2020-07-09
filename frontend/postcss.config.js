// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-url'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'advanced',
    }),
  ],
}
