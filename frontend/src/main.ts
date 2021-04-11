import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Meta from './components/AppMeta.vue'

import './registerServiceWorker.js'
import './assets/styles/index.css'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)
app.use(createPinia())

app.component('Meta', Meta)

app.mount('#app')
