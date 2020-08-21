import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import Meta from './components/Meta.vue'

import './registerServiceWorker.js'
import './assets/styles/main.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.component('Meta', Meta)
app.mount('#app')
