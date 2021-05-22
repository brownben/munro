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
      preset: ['advanced', { colormin: false }],
    }),
  ],
}
