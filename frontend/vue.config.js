module.exports = {
  outputDir: '../backend/dist/static',
  assetsDir: './',
  indexPath: '../index.html',
  publicPath: '/static',
  pwa: {
    name: 'Munro Leagues',
    themeColor: '#b80bda',
    msTileColor: '#b80bda',
    manifestOptions: {
      'name': 'Munro Leagues',
      'short_name': 'Munro',
      'description': 'Fast and Easy Results System for Orienteering Leagues by Munro, a simple way to calculate the results for orienteering leagues, with search and sort features',
      'display': 'standalone',
      'start_url': '/',
      'background_color': '#b80bda',
      'theme_color': '#b80bda',
      'scope': '/',
      'icons': [
        {
          'src': '/static/MunroLogo-48.png',
          'sizes': '48x48',
          'type': 'image/png',
        },
        {
          'src': '/static/MunroLogo-72.png',
          'sizes': '72x72',
          'type': 'image/png',
        },
        {
          'src': '/static/MunroLogo-96.png',
          'sizes': '96x96',
          'type': 'image/png',
        },
        {
          'src': '/static/MunroLogo-128.png',
          'sizes': '128x128',
          'type': 'image/png',
        },
        {
          'src': '/static/MunroLogo-144.png',
          'sizes': '144x144',
          'type': 'image/png',
        },
        {
          'src': '/static/MunroLogo-152.png',
          'sizes': '152x152',
          'type': 'image/png',
        },
        {
          'src': '/static/MunroLogo-192.png',
          'sizes': '192x192',
          'type': 'image/png',
        },
        {
          'src': '/static/MunroLogo-256.png',
          'sizes': '256x256',
          'type': 'image/png',
        },
        {
          'src': '/static/MunroLogo-384.png',
          'sizes': '384x384',
          'type': 'image/png',
        },
        {
          'src': '/static/MunroLogo-512.png',
          'sizes': '512x512',
          'type': 'image/png',
        },
      ],
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
        handler: 'NetworkFirst',
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
        handler: 'NetworkFirst',
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
