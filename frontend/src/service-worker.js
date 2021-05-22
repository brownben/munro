import { registerRoute, setCatchHandler } from 'workbox-routing'
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies'
import { precacheAndRoute, matchPrecache } from 'workbox-precaching'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

precacheAndRoute(['/index.html'])

registerRoute(
  new RegExp('/api/'),
  new NetworkFirst({
    networkTimeoutSeconds: 5,
    cacheName: 'api',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
)

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
)

registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
)

registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
)

setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document')
    return matchPrecache('/index.html')

  return Response.error()
})
