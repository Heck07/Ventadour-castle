<template>
  <section class="section" v-if="article">
    <h2 class="title">{{ article.title }}</h2>
    <p class="date">{{ formatDate(article.date || article.createdAt) }}</p>

    <div
      v-for="(block, i) in pairedContent"
      :key="i"
      class="article-block"
      :class="{ reverse: i % 2 === 1 }"
    >
      <img
        v-if="block.image"
        :src="`http://localhost:3001${block.image}`"
        :alt="`Illustration ${i + 1}`"
      />
      <div class="paragraphs">
        <p v-for="(p, j) in block.paragraphs" :key="j">{{ p }}</p>
      </div>
    </div>
  </section>
  <div v-else class="section">Chargement de l’article…</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const article = ref(null)

const formatDate = (str) => {
  const d = new Date(str)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

// Répartit les paragraphes équitablement entre les images
const pairedContent = computed(() => {
  if (!article.value) return []

  const paragraphs = article.value.content?.split('\n').filter(p => p.trim() !== '') || []
  const images = article.value.images || []

  const blockCount = Math.max(paragraphs.length, images.length)
  const blocks = []

  const groupSize = Math.ceil(paragraphs.length / (images.length || 1))
  for (let i = 0; i < images.length; i++) {
    blocks.push({
      image: images[i],
      paragraphs: paragraphs.slice(i * groupSize, (i + 1) * groupSize)
    })
  }

  // Si plus de texte que d’images, ajoute le reste sans image
  if (images.length * groupSize < paragraphs.length) {
    blocks.push({
      image: null,
      paragraphs: paragraphs.slice(images.length * groupSize)
    })
  }

  return blocks
})

onMounted(async () => {
  const id = route.params.id
  const res = await axios.get(`http://localhost:3001/api/news/${id}`)
  article.value = res.data
})
</script>

<style scoped>
.section {
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 2.7rem;
  color: black;
}

.date {
  text-align: center;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.article-block {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.article-block.reverse {
  flex-direction: row-reverse;
}


.article-block img {
  max-width: 300px;
  border-radius: 4px;
  flex-shrink: 0;
}

.paragraphs {
  flex: 1;
  min-width: 200px;
}

@media screen and (max-width: 700px) {
  .article-block {
    flex-direction: column;
    align-items: center;
    text-align: left;
  }

  .article-block.reverse {
    flex-direction: column; /* override la version row-reverse */
  }

  .article-block img {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
    display: block;
  }

  .paragraphs {
    width: 100%;
  }
}

</style>