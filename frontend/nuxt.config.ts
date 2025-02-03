import tailwindcss from '@tailwindcss/vite'

const title = 'Munro'
const description =
  'League Results. Sorted with Munro. Sports League Results Calculated Quick and Easily, with Results Sorting and Filtering Options'
const url = 'https://munroleagues.com'
const theme = '#b80bda'
const image = 'https://munroleagues.com/social.png'
const imageAlt = 'Munro Leagues Logo - Hills Shaped as an "M"'

export default {
  build: {
    transpile: ['@headlessui/vue'],
  },

  css: ['~/assets/main.css'],

  typescript: {
    shim: false,
    strict: true,
  },

  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.includes('-'),
        },
      },
    },
    plugins: [tailwindcss()],

    css: { transformer: 'lightningcss' },
    build: { cssMinify: 'lightningcss' },
  },

  app: {
    head: {
      title,
      htmlAttrs: { lang: 'en-GB' },
      meta: [
        { name: 'description', content: description },
        {
          name: 'keywords',
          content:
            'leagues, results, orienteering,  sporting results, sports, scotland,  munro, munro leagues, munro league results, munro orienteering',
        },
        { name: 'theme-color', content: theme },

        { property: 'og:sitename', content: 'Munro Leagues' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { property: 'og:type', content: 'website' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: 'munroleagues' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:url', content: url },
        { name: 'twitter:image', content: image },
        { name: 'twitter:image:alt', content: imageAlt },
      ],
      link: [
        {
          rel: 'shortcut icon',
          href: '/MunroLogoNoBG-512.png',
          type: 'image/png',
        },
        { rel: 'icon', href: '/MunroLogoNoBG-512.png' },
        { rel: 'apple-touch-icon', href: '/MunroLogo-512.png' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
      style: [
        {
          children:
            '@font-face{font-family:Inter var;font-style:normal;font-weight:100 900;font-display:swap;src:url(/Inter.var.woff2) format("woff2");font-named-instance:"Regular"}',
        },
      ],
    },
  },

  nitro: {
    vercel: {
      config: {
        routes: [
          {
            src: '/sitemap.txt',
            dest: 'https://munro.up.railway.app/sitemap.txt',
          },
          {
            src: '/api/(?<location>.*)',
            dest: 'https://munro.up.railway.app/$location',
          },
        ],
      },
    },
  },

  modules: ['@nuxt/eslint'],
}
