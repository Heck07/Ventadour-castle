<!-- components/ScrollToTop.vue -->
<template>
  <button
    class="scroll-to-top"
    @click="scrollToTop"
    v-show="isVisible"
    aria-label="Remonter en haut"
  >
    ▲
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const toggleVisibility = () => {
  isVisible.value = window.scrollY > 200
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility)
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #333;
  color: #819650;
  border: none;
  padding: 10px 12px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: opacity 0.3s;
}
.scroll-to-top:hover {
  background: #555;
}
</style>
