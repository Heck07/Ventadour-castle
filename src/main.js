import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import './assets/main.css'

Promise.all([
  fetch('/Ventadour-castle/fr.json').then((res) => res.json()),
  fetch('/Ventadour-castle/en.json').then((res) => res.json())
]).then(([fr, en]) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: { fr, en }
  })

  const app = createApp(App)
  app.use(router)
  app.use(i18n)
  app.mount('#app')
})
