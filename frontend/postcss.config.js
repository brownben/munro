// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-preset-env')({ stage: 1 }),
    require('postcss-url'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'advanced',
    }),
  ],
}
