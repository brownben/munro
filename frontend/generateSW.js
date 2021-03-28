const { generateSW } = require('rollup-plugin-workbox')

generateSW({
  swDest: './dist/service-worker.js',
  globDirectory: './dist',
  globPatterns: ['**/*.{html,json,js,css,woff2,png,svg,txt}'],

  cacheId: 'munro-precache',
  sourcemap: false,
  inlineWorkboxRuntime: true,
  mode: 'production',

  navigateFallback: '/index.html',
  navigateFallbackDenylist: [/.*\/api\/.*/, /sitemap.txt/],

  runtimeCaching: [
    {
      urlPattern: /^https:\/\/munroleagues.com\/api\/.*/,
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
