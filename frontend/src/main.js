import { createApp } from 'vue'
import vueHeadful from 'vue-headful'

import App from './App.vue'
import router from './router'
import auth from './authentication.js'
import messageStore from './messageStore.js'

import './assets/styles/tailwind.pcss'
import './registerServiceWorker'

const app = createApp(App)
app.use(router)
app.component('VueHeadful', vueHeadful)
app.config.globalProperties.$auth = auth
app.config.globalProperties.$messages = messageStore
app.mount('#app')
