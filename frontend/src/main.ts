import { createApp } from 'vue'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'
import store from './store'
import Meta from './components/AppMeta.vue'

import './registerServiceWorker.js'
import './assets/styles/index.css'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)
app.use(store)

app.component('Meta', Meta)

app.mount('#app')
