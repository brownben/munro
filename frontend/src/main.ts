import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter } from './router'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import Meta from './components/AppMeta.vue'
import './assets/styles/index.css'

export const createApp = () => {
  const app = createSSRApp(App)
  const router = createRouter()
  const store = createPinia()
  const head = createHead()

  app.use(router)
  app.use(store)
  app.use(head)

  app.component('Meta', Meta)

  return { app, router, head, store }
}
