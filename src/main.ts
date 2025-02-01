import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/index.css'
import App from './App.vue'

// Configure Pinia
const pinia = createPinia()

// Create and mount the app
const app = createApp(App)

app.use(pinia)
app.mount('#app')
