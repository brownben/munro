import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import Meta from './components/Meta.vue'

import './registerServiceWorker.js'
import './assets/styles/index.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.component('Meta', Meta)
app.mount('#app')
