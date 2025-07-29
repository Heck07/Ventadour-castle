import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import HistoireView from '../views/HistoireView.vue'
import AgendaView from '../views/AgendaView.vue'
import EventFocusView from '../views/EventFocusView.vue'
import ActuFocusView from '../views/ActuFocusView.vue'
import ContactView from '../views/ContactView.vue'
import AssociationView from '../views/AssociationView.vue'
import VisiterView from '../views/VisiterView.vue'
import AdminLogin from '../views/admin/adminLogin.vue'
import AdminNews from '../views/admin/adminNews.vue'
import AdminEvents from '../views/admin/adminEvents.vue'
import AdminDashboard from '../views/admin/adminDashboard.vue'
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
  { path: '/histoire', name: 'Histoire', component: HistoireView },
  { path: '/agenda', name: 'Agenda', component: AgendaView },
  { path: '/evenements/:id', name: 'EventDetail', component: EventFocusView },
  { path: '/actualites/:id', name: 'ActuDetail', component: ActuFocusView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/association', name: 'Association', component: AssociationView },
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
  // 🕘 1. Si navigation arrière/avant, restore la position sauvegardée
  if (savedPosition) {
    return savedPosition;
  }

  // 🪝 2. Si un hash (#...), scroll vers l'ancre avec un offset
  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const el = document.querySelector(to.hash);
        if (el) {
          const yOffset = -180; // Ajuste en fonction de ton header
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        resolve();
      }, 300); // attends que le DOM soit prêt
    });
  }

  // 🔝 3. Sinon, scroll en haut de page
  return { top: 0 };
}
})


export default router
