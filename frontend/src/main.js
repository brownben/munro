import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import Meta from '/@/components/Meta.vue'
import auth from './authentication.js'
import messageStore from './messageStore.js'

import './assets/styles/tailwind.css'
import './registerServiceWorker.js'

const app = createApp(App)
app.use(router)
app.component('Meta', Meta)
app.config.globalProperties.$auth = auth
app.config.globalProperties.$messages = messageStore
app.mount('#app')
