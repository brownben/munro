const fs = require('fs')
const path = require('path')

const resolve = (p) => path.resolve(__dirname, p)

const serverEntryPoint = fs.readFileSync(
  resolve('./dist/server/entry-server.js')
)
const baseHTML = fs.readFileSync(resolve('./dist/index.html'))
const manifest = fs.readFileSync(resolve('./dist/ssr-manifest.json'))

const ssrFunction = `
module.exports = async (req, res) => {
  try {
    const url = req.url

    const [appHtml, preloadLinks, metaTags] = await render(url, manifest)

    const html = template
      .replace('<!--meta-tags-->', metaTags)
      .replace('<!--preload-links-->', preloadLinks)
      .replace('<!--app-html-->', appHtml)

    res.status(200).send(html)
  } catch (e) {
    console.log(e.stack)
    res.status(500).send(e.stack)
  }
}
`

const file = `
${serverEntryPoint}
const template = \`${baseHTML}\`
const manifest = ${manifest}
${ssrFunction}
`

fs.writeFileSync(resolve('./api/index.js'), file)
