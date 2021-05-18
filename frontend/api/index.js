const fs = require('fs')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

const resolve = (p) => path.resolve(__dirname, p)

const indexProd = isProd
  ? fs.readFileSync(resolve('dist/index.html'), 'utf-8')
  : ''

const manifest = isProd ? require('dist/ssr-manifest.json') : {}

let vite

modules.export = async (req, res) => {
  try {
    const url = req.originalUrl

    const template = indexProd
    const render = require(resolve('dist/server/entry-server.js')).render

    const [appHtml, preloadLinks, metaTags] = await render(url, manifest)

    const html = template
      .replace(`<!--meta-tags-->`, metaTags)
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
}
