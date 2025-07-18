<template>
  <section class="section">
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
          <p>{{ truncate(item.content, 200) }}</p>
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
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()
const news = ref([])

const formatDate = (str) => {
  const d = new Date(str)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const truncate = (text, length) => {
  return text.length > length ? text.slice(0, length) + '…' : text
}

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/api/news')
  news.value = res.data
})
</script>

<style scoped>
.section {
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  object-position: center;
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



@media screen and (max-width: 800px) {
  .news-card {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .news-content {
    order: 1;
    text-align: left;
    width: 100%;
  }

  .news-card img {
    order: 2;
    width: 100%;
    max-height: 250px;
    object-position: center top;
  }
}
</style>
