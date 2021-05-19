import { createApp } from './main'
import { renderToString, SSRContext } from '@vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

import { getStyle } from './setThemes'

export async function render(url: string, manifest: Record<string, string[]>) {
  // Headless UI doesn't properly support Vue SSR yet
  // We mock window.addEventListener, so it will render on the server without error
  globalThis.window = {} as Window & typeof globalThis
  globalThis.window.addEventListener = () => {}

  const { app, router, head } = createApp()

  router.push(url)
  await router.isReady()

  const ctx: SSRContext = {}
  const html = await renderToString(app, ctx)
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  const { headTags } = renderHeadToString(head)

  return [html, preloadLinks, headTags]
}

export const getTheme = (query: Record<string, string>) => {
  if (query.theme) return `<style>:root {${getStyle(query.theme)}}</style>`
  return ''
}

const renderPreloadLinks = (
  modules: Set<string>,
  manifest: Record<string, string[]>
) => {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files)
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
  })
  return links
}

const renderPreloadLink = (file: string) => {
  if (file.endsWith('.js'))
    return `<link rel="modulepreload" crossorigin href="${file}">`
  else if (file.endsWith('.css'))
    return `<link rel="stylesheet" href="${file}">`
  else return ''
}
