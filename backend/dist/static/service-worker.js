/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
  "/static/precache-manifest.95917f025d2540448211aacb2d25eb6b.js"
);

workbox.core.setCacheNameDetails({prefix: "munro"});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https:\/\/munro-leagues.herokuapp.com\/api\/.*/, workbox.strategies.networkFirst({ "cacheName":"munro-api-cache","networkTimeoutSeconds":10, plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/munro-leagues.herokuapp.com\/$/, workbox.strategies.networkFirst({ "cacheName":"munro-index-cache","networkTimeoutSeconds":10, plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
