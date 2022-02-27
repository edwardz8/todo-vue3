import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Dialog } from 'quasar'
import App from './App.vue'
import router from './router'
import store from './store/index'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

const app = createApp(App)

app.use(Quasar, {
    plugins: { Dialog }
})

app.use(createPinia())
app.use(router)
app.use(store)
app.mount('#app')
