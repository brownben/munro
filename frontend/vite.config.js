export default {
  port: 8080,
  alias: { '/@/': require('path').resolve(__dirname, './src') },

  outDir: '../backend/dist/static',
  assetsDir: './',
  base: '/static',

  sourcemap: true,
}
