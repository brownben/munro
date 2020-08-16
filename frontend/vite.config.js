// if (process.env.NODE_ENV === 'production') module.exports = production
export default {
  port: 8080,
  open: true,
  alias: { '/@/': require('path').resolve(__dirname, './src') },

  outDir: '../backend/dist/static',
  assetsDir: './',
  base: '/static',
}
