<template>
  <section class="section">
    <h2 class="decorated-title-center">{{ t('event.title') }}</h2>

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
          <p><em>{{ event.date }}</em></p>
          <p>{{ truncate(event.content, 200) }}</p>
        </div>
      </article>
    </router-link>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const events = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/api/events')
  events.value = res.data
})

const truncate = (text, length) => {
  return text.length > length ? text.slice(0, length) + '…' : text
}
</script>

<style scoped>
.section {
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.event-preview {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
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

/* Responsive */
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
