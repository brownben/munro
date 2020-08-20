import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import Meta from './components/Meta.vue'

import auth from './authentication.js'

import './registerServiceWorker.js'
import './assets/styles/main.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.component('Meta', Meta)
app.config.globalProperties.$auth = auth
app.mount('#app')
