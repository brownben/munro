module.exports = {
  outputDir: '../backend/dist/static',
  assetsDir: './',
  indexPath: '../index.html',
  publicPath: 'static',
  pwa: {
    name: 'Munro Leagues',
    themeColor: '#b80bda',
    msTileColor: '#b80bda',
    manifestOptions: {
      'short_name': 'Munro',
    },
    iconPaths: {
      favicon32: 'MunroLogo-32.png',
      favicon16: 'MunroLogo-16.png',
      appleTouchIcon: 'MunroLogo-152.png',
      maskIcon: 'MunroLogo.svg',
      msTileImage: 'MunroLogo-144.png',
    },
    workboxOptions: {
      runtimeCaching: [{
        urlPattern: new RegExp('^https://munro-leagues.herokuapp.com/api/.*'),
        handler: 'networkFirst',
        options: {
          networkTimeoutSeconds: 10,
          cacheName: 'munro-api-cache',
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: new RegExp('^https://munro-leagues.herokuapp.com/$'),
        handler: 'networkFirst',
        options: {
          networkTimeoutSeconds: 10,
          cacheName: 'munro-index-cache',
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      ],
    },
  },
}
