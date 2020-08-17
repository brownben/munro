const { generateSW } = require('rollup-plugin-workbox')

generateSW({
  swDest: '../backend/dist/static/service-worker.js',
  globDirectory: '../backend/dist',
  globPatterns: ['**/*.{html,json,js,css,woff2,png,svg,txt}'],

  cacheId: 'munro-precache',
  sourcemap: false,
  inlineWorkboxRuntime: true,
  mode: 'production',

  navigateFallback: '/static/index.html',
  runtimeCaching: [
    {
      urlPattern: /^http:\/\/munro-leagues.herokuapp.com\/api\/.*/,
      handler: 'NetworkFirst',
      options: {
        networkTimeoutSeconds: 5,
        cacheName: 'munro-api-cache',
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
}).writeBundle()
