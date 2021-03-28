module.exports = {
  plugins: [
    require('@tailwindcss/jit'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'focus-within-pseudo-class': false,
      },
    }),
    require('autoprefixer'),
  ],
}
