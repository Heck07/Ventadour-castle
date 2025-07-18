import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import DecouvrirView from '../views/DecouvrirView.vue'
import EventView from '../views/EventView.vue'
import EventFocusView from '../views/EventFocusView.vue'
import ActuView from '../views/ActuView.vue'
import ActuFocusView from '../views/ActuFocusView.vue'
import ContactView from '../views/ContactView.vue'
import ParticiperView from '../views/ParticiperView.vue'
import VisiterView from '../views/VisiterView.vue'
import AdminLogin from '../views/admin/adminLogin.vue'
import AdminNews from '../views/admin/adminNews.vue'
import AdminEvents from '../views/admin/adminEvents.vue'
import AdminDashboard from '../views/admin/adminDashboard.vue'
import adminMessages from '../views/admin/adminMessages.vue'
import AdminMessages from '../views/admin/adminMessages.vue'
import MentionsLegalesView from '../views/MentionsLegalesView.vue'


// 👇 Auth guard
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token) next('/admin')
  else next()
}

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/decouvrir', name: 'Decouvrir', component: DecouvrirView },
  { path: '/evenements', name: 'Evenements', component: EventView },
  { path: '/evenements/:id', name: 'EventDetail', component: EventFocusView },
  { path: '/actualites', name: 'Actualites', component: ActuView },
  { path: '/actualites/:id', name: 'ActuDetail', component: ActuFocusView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/participer', name: 'Participer', component: ParticiperView },
  { path: '/visiter', name: 'Visiter', component: VisiterView },
   { path: '/mentions-legales', name: 'MentionsLegales', component: MentionsLegalesView },
  { path: '/admin', component: AdminLogin },
  { path: '/admin/news', component: AdminNews, beforeEnter: requireAuth },
  { path: '/admin/events', component: AdminEvents, beforeEnter: requireAuth },
  { path: '/admin/dashboard', component: AdminDashboard, beforeEnter: requireAuth },
  { path: '/admin/contact', component: AdminMessages, beforeEnter: requireAuth },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0 }
  }
})


export default router
