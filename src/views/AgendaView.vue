<template>
  <section class="section">

    <!-- Événements -->
    <h2 class="decorated-title-center">{{ t('event.title') }}</h2>
    <div class="event-list">
      <router-link
        v-for="event in events"
        :key="event.id"
        :to="`/evenements/${event.id}`"
        custom
        v-slot="{ navigate }"
      >
        <article class="event-preview" @click="navigate">
          <img
            v-if="event.images?.length"
            :src="`http://localhost:3001${event.images[event.previewImageIndex || 0]}`"
            :alt="event.title"
          />
          <div class="event-details">
            <h3>{{ event.title }}</h3>
            <p class="date">{{ event.date }}</p>
            <p>{{ truncate(event.content, 200) }}</p>
          </div>
        </article>
      </router-link>
    </div>

     <!-- Actualités -->
    <h2 class="decorated-title-center">{{ t('actu.title') }}</h2>
    <div class="news-list">
      <router-link
        v-for="item in news"
        :key="item.id"
        :to="`/actualites/${item.id}`"
        class="news-card"
      >
        <div class="news-content">
          <h3>{{ item.title }}</h3>
          <p class="date">{{ formatDate(item.date || item.createdAt) }}</p>
          <p>{{ truncate(item.content, 400) }}</p>
        </div>
        <img
          v-if="item.featuredImage"
          :src="`http://localhost:3001${item.featuredImage}`"
          alt="Image actualité"
          class="image-full"
        />
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const news = ref([])
const events = ref([])

const formatDate = (str) => {
  const d = new Date(str)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const truncate = (text, length) => {
  return text?.length > length ? text.slice(0, length) + '…' : text
}

onMounted(async () => {
  const newsRes = await axios.get('http://localhost:3001/api/news')
  news.value = newsRes.data

  const eventsRes = await axios.get('http://localhost:3001/api/events')
  events.value = eventsRes.data
})
</script>

<style scoped>
.section {
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

/* --- ACTUALITÉS --- */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
}

.news-card {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 4px;
  transition: border-color 0.3s ease-in-out;
  align-items: flex-start;
}

.news-card:hover {
  border-color: rgba(0, 0, 0, 1);
  transform: scale(1.01);
}

.news-card img {
  max-width: 180px;
  min-width: 120px;
  border-radius: 4px;
  object-fit: cover;
}

.news-content {
  flex: 1;
}

.news-content h3 {
  font-size: 1.7rem;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.news-content .date {
  font-size: 0.85rem;
  font-style: italic;
  margin-bottom: 0.7rem;
  color: #555;
}

/* --- ÉVÉNEMENTS --- */
.event-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.event-preview {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  transition: border-color 0.3s ease-in-out;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.event-preview:hover {
  border-color: black;
  transform: scale(1.01);
}

.event-preview img {
  max-width: 150px;
  border-radius: 4px;
  object-fit: cover;
}

.event-details {
  flex: 1;
}

.event-details h3 {
  font-size: 1.7rem;
  margin: 0 0 0.5rem;
  font-weight: bold;
}

.event-details p {
  margin: 0.2rem 0;
}

.date {
  font-size: 0.85rem;
  font-style: italic;
  color: #555;
}

/* --- RESPONSIVE --- */
@media screen and (max-width: 800px) {
  .news-card {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .news-card img {
    width: 100%;
    max-height: 250px;
    object-position: center top;
  }

  .news-content {
    width: 100%;
    text-align: left;
  }
}

@media screen and (max-width: 500px) {
  .event-preview {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .event-details {
    text-align: left;
    width: 100%;
  }

  .event-preview img {
    width: 100%;
    max-height: 250px;
    object-position: top center;
  }
}
</style>
