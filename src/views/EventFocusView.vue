<template>
  <section class="section" v-if="event">
    <h2>{{ event.title }}</h2>
    <p class="subtitle">{{ event.date }}</p>
    <div class="line-separator"></div>

    <div
      v-for="(block, i) in pairedBlocks"
      :key="i"
      class="event-section"
      :class="{ reverse: i % 2 === 1 }"
    >
      <img
        v-if="block.image"
        :src="`http://localhost:3001${block.image}`"
        :alt="`Illustration ${i + 1}`"
      />
      <div class="event-text">
        <p v-for="(p, j) in block.paragraphs" :key="j">{{ p }}</p>
      </div>
    </div>
  </section>
  <div class="section" v-else>Chargement de l’événement…</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const event = ref(null)

onMounted(async () => {
  const id = route.params.id
  const res = await axios.get(`http://localhost:3001/api/events/${id}`)
  event.value = res.data
})

const pairedBlocks = computed(() => {
  if (!event.value) return []

  const paragraphs = event.value.content?.split('\n').filter(p => p.trim()) || []
  const images = event.value.images || []

  const groupSize = Math.ceil(paragraphs.length / (images.length || 1))
  const blocks = []

  for (let i = 0; i < images.length; i++) {
    blocks.push({
      image: images[i],
      paragraphs: paragraphs.slice(i * groupSize, (i + 1) * groupSize),
    })
  }

  if (images.length * groupSize < paragraphs.length) {
    blocks.push({
      image: null,
      paragraphs: paragraphs.slice(images.length * groupSize),
    })
  }

  return blocks
})
</script>

<style scoped>
.section {
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  font-size: 2.7rem;
  color: black;
}

.subtitle {
  text-align: center;
  font-style: italic;
  margin-top: 0.5rem;
}

.line-separator {
  border-top: 1px solid #aaa;
  margin: 1rem auto 2rem;
  width: 80%;
}

.event-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 3rem;
}

.event-section.reverse {
  flex-direction: row-reverse;
}

.event-text {
  flex: 1;
  min-width: 250px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-section img {
  width: 100%;
  max-width: 280px;
  flex-shrink: 0;
  border-radius: 4px;
  object-fit: cover;
  display: block;
  transition: max-width 0.3s ease;
}

.event-section p {
  flex: 1;
  min-width: 250px;
  max-width: 450px;
  text-align: justify;
}


@media screen and (max-width: 800px) {
  .event-section {
    flex-direction: column;
    align-items: center;
    text-align: left;
  }

  .event-section.reverse {
    flex-direction: column;
  }

  .event-section img {
    max-width: 100%;
    margin-bottom: 1rem;
  }

  .event-text {
    width: 100%;
  }
}
  
</style>
