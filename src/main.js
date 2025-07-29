import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import './assets/main.css'

const base = import.meta.env.BASE_URL

Promise.all([
  fetch(`${base}fr.json`).then((res) => res.json()),
  fetch(`${base}en.json`).then((res) => res.json())
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
