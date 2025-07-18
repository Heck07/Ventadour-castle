<template>
  <div class="section">
    <router-link to="/admin/dashboard" class="back-button">← Retour au tableau de bord</router-link>

    <h2>Messages reçus</h2>
    <ul v-if="messages.length">
      <li v-for="msg in messages" :key="msg.id" class="card" :class="{ read: msg.read }">
        <p><strong>De :</strong> {{ msg.name }} ({{ msg.email }})</p>
        <p><strong>Sujet :</strong> {{ msg.subject || '—' }}</p>
        <p><strong>Message :</strong> {{ msg.message }}</p>
        <p class="date">{{ formatDate(msg.date) }}</p>
        <div class="actions">
          <button @click="toggleRead(msg)">
            {{ msg.read ? 'Marquer comme non lu' : 'Marquer comme lu' }}
          </button>
          <button @click="deleteMessage(msg.id)" class="delete">Supprimer</button>
        </div>
      </li>
    </ul>
    <p v-else>Aucun message reçu.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const messages = ref([])

async function fetchMessages() {
  const res = await fetch('http://localhost:3001/api/contact')
  messages.value = await res.json()
}

async function toggleRead(msg) {
  const newState = !msg.read
  const res = await fetch(`http://localhost:3001/api/contact/${msg.id}/read`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read: newState })
  })
  if (res.ok) {
    msg.read = newState
  }
}

async function deleteMessage(id) {
  if (!confirm('Supprimer ce message ?')) return
  const res = await fetch(`http://localhost:3001/api/contact/${id}`, { method: 'DELETE' })
  if (res.ok) {
    messages.value = messages.value.filter(m => m.id !== id)
  }
}

onMounted(fetchMessages)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('fr-FR')
}
</script>

<style scoped>
.section {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #fdfdfd;
}
.card.read {
  background: #eee;
  opacity: 0.8;
}
.date {
  font-size: 0.9rem;
  color: #666;
}
.actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
button {
  padding: 0.4rem 0.8rem;
  border: none;
  background: #333;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}
button.delete {
  background: #b30000;
}
button:hover {
  opacity: 0.9;
}
</style>
