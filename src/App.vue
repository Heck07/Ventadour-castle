<template>
  <div class="min-h-screen flex flex-col">
    <LanguageTransition ref="langTransition" />
    <AppHeader />
    <main :style="{ paddingTop: headerHeight }" class="flex-grow">
      <div v-viewer>
        <router-view />
      </div>
      <ScrollToTop />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import LanguageTransition from './components/LanguageTransition.vue'
import ScrollToTop from './components/ScrollToTop.vue'

import { ref, provide, onMounted, onUnmounted } from 'vue'

const headerHeight = ref('22vh')

function updateHeaderHeight() {
  const header = document.querySelector('.header-main')
  if (header) {
    headerHeight.value = `${header.offsetHeight}px`
  }
}

onMounted(() => {
  updateHeaderHeight()
  window.addEventListener('resize', updateHeaderHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeaderHeight)
})
const langTransition = ref()
provide('langTransition', langTransition) // Fournit la référence au composant

</script>

<style scoped>


@media screen and (max-width: 1200px) {
  main {
    padding-top: 18vh;
  }
}

@media screen and (max-width: 1000px) {
  main {
    padding-top: 15vh;
  }
}
</style>
