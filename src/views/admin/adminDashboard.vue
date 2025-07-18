<template>
  <div class="admin-dashboard">
    <h1>Tableau de bord</h1>

    <div class="links">
      <router-link to="/admin/news" class="link-card">
        📰 Gérer les actualités
      </router-link>

      <router-link to="/admin/events" class="link-card">
        📅 Gérer les événements
      </router-link>

      <router-link to="/admin/contact" class="link-card">
        📅 Messages visiteurs
      </router-link>
    </div>

    <div class="visitor-counter">
      <p class="label">👁️ Visiteurs</p>
      <p class="count">{{ visitorCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      visitorCount: 0
    }
  },
  mounted() {
    fetch('/api/visits')
      .then(res => res.json())
      .then(data => {
        this.visitorCount = data.count
      })
      .catch(err => console.error('Erreur compteur visiteurs :', err))
  }
}
</script>

<style scoped>
.admin-dashboard {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.admin-dashboard h1 {
  font-size: 2.7rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

@media (min-width: 600px) {
  .links {
    flex-direction: row;
  }
}

.link-card {
  display: block;
  text-decoration: none;
  color: white;
  background-color: #659ae0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  font-size: 18px;
    width: 150px;

  text-align: center;
  transition: background-color 0.3s ease;
}

.link-card:hover {
  background-color: #9db7e0;
}

.visitor-counter {
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  display:flex;
  flex-direction: column;
  align-items: center;
}

.label {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.count {
  font-size: 32px;
  font-weight: bold;
  color: #222;
}
</style>
