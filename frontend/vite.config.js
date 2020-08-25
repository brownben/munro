export default {
  port: 8080,
  open: true,
  alias: { '/@/': require('path').resolve(__dirname, './src') },

  outDir: '../backend/dist/static',
  assetsDir: './',
  base: '/static',

  sourcemap: true,
}
