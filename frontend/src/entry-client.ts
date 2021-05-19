import { createApp } from './main'
import './registerServiceWorker.js'

const { app, router } = createApp()

router.isReady().then(() => {
  app.mount('#app')
})
