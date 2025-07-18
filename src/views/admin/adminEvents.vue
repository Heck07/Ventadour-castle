<template>
  <div class="admin-container">
    <router-link to="/admin/dashboard" class="back-button">← Retour au tableau de bord</router-link>

    <h2>Gestion des événements</h2>

    <button @click="toggleForm" class="toggle-button">
      {{ showForm ? 'Fermer le formulaire' : 'Ajouter un événement' }}
    </button>

    <div class="form-section" v-if="showForm || editId">
      <form @submit.prevent="submitEvent" class="admin-form">
        <input v-model="form.title" type="text" placeholder="Titre" required />
        <input
          type="text"
          placeholder="Ex : Chaque dimanche du 14/07/2025 au 28/08/2025"
          v-model="form.date"
        />
        <textarea v-model="form.content" placeholder="Description de l’événement" required></textarea>

        <label>Image principale</label>
        <input type="file" @change="handleMainImageUpload" accept="image/*" />

        <label>Autres images (optionnelles)</label>
        <input type="file" multiple @change="handleExtraImagesUpload" accept="image/*" />

        <label>Index image de couverture</label>
        <input type="number" min="0" v-model.number="form.previewImageIndex" />

        <div v-if="preview">
          <h4>Prévisualisation :</h4>
          <h3>{{ form.title }}</h3>
          <p><em>{{ form.date }}</em></p>
          <p>{{ form.content }}</p>
          <img v-if="previewMainImage" :src="previewMainImage" style="max-width: 200px;" />
        </div>

        <button type="submit">{{ editId ? 'Modifier' : 'Ajouter' }}</button>
        <button type="button" class="cancel" v-if="editId" @click="resetForm">Annuler</button>
      </form>
    </div>

    <div class="news-list">
      <div v-if="eventList.length === 0">Aucun événement enregistré.</div>

      <div v-for="event in eventList" :key="event.id" class="news-card-admin">
        <img
          v-if="event.images?.length"
          :src="`http://localhost:3001${event.images[event.previewImageIndex || 0]}`"
          alt="Image événement"
        />
        <div class="news-content">
          <h3>{{ event.title }}</h3>
          <p class="date">{{ event.date }}</p>
          <p>{{ truncate(event.content, 200) }}</p>

          <div class="actions">
            <button @click="edit(event)">Modifier</button>
            <button class="cancel" @click="confirmDelete(event.id)">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const eventList = ref([])
const showForm = ref(false)
const preview = ref(false)
const previewMainImage = ref(null)
const editId = ref(null)

const token = localStorage.getItem('token')

const form = ref({
  title: '',
  date: '',
  content: '',
  coverImage: null,
  extraImages: [],
  previewImageIndex: 0
})

const fetchEvents = async () => {
  const res = await axios.get('http://localhost:3001/api/events')
  eventList.value = res.data
}

onMounted(fetchEvents)

const toggleForm = () => {
  showForm.value = !showForm.value
  resetForm()
}

const submitEvent = async () => {
  const data = new FormData()
  data.append('title', form.value.title)
  data.append('date', form.value.date)
  data.append('content', form.value.content)
  data.append('previewImageIndex', form.value.previewImageIndex)

  if (form.value.coverImage) {
    data.append('coverImage', form.value.coverImage)
  }

  for (const img of form.value.extraImages) {
    data.append('extraImages', img)
  }

  const url = editId.value
    ? `http://localhost:3001/api/events/${editId.value}`
    : 'http://localhost:3001/api/events'

  const method = editId.value ? 'put' : 'post'

  await axios[method](url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  resetForm()
  fetchEvents()
}

const resetForm = () => {
  form.value = {
    title: '',
    date: '',
    content: '',
    coverImage: null,
    extraImages: [],
    previewImageIndex: 0
  }
  previewMainImage.value = null
  preview.value = false
  editId.value = null
}

const edit = (event) => {
  form.value.title = event.title
  form.value.date = event.date
  form.value.content = event.content
  form.value.previewImageIndex = event.previewImageIndex || 0
  previewMainImage.value = `http://localhost:3001${event.images?.[form.value.previewImageIndex]}` || null
  preview.value = true
  editId.value = event.id
  showForm.value = true
}

const confirmDelete = async (id) => {
  if (!confirm('Supprimer cet événement ?')) return

  await axios.delete(`http://localhost:3001/api/events/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  fetchEvents()
}

const handleMainImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.value.coverImage = file
    previewMainImage.value = URL.createObjectURL(file)
    preview.value = true
  }
}

const handleExtraImagesUpload = (e) => {
  form.value.extraImages = Array.from(e.target.files)
}

const truncate = (text, length) => {
  return text.length > length ? text.slice(0, length) + '…' : text
}
</script>

<style scoped>
.admin-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
}



h2 {
  text-align: center;
  font-size: 2rem;
  color: black;
}

.toggle-button {
  margin: 1rem auto 2rem;
  display: block;
  background-color: #2c7be5;
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.toggle-button:hover {
  background-color: #1b5fcc;
}

.form-section {
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.news-card-admin {
  display: flex;
  gap: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 6px;
  background: white;
}

.news-card-admin img {
  max-width: 150px;
  border-radius: 4px;
}

.news-content {
  flex: 1;
}

.news-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
}

textarea {
  height: 5rem;
}

.news-content .date {
  font-size: 0.85rem;
  font-style: italic;
  color: #666;
  margin-bottom: 0.8rem;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button[type="submit"] {
  background-color: #2c7be5;
  color: white;
}

button[type="submit"]:hover {
  background-color: #1b5fcc;
}

button.cancel {
  background-color: #ccc;
  color: #333;
}

button.cancel:hover {
  background-color: #aaa;
}

@media screen and (max-width: 500px) {
  .news-card-admin {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .news-card-admin img {
    max-width: 100%;
    height: auto;
  }

  .news-content {
    text-align: left;
    width: 100%;
  }

  .actions {
    justify-content: center;
    flex-wrap: wrap;
  }

  .news-content h3 {
    font-size: 1.3rem;
  }

  .news-content .date {
    text-align: center;
  }
}
</style>
