<template>
  <div v-if="show" class="language-transition">
    <img src="../assets/logo.svg" alt="Logo" class="logo" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)

function triggerTransition() {
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 2000)
}

defineExpose({ triggerTransition })
</script>

<style scoped>
.language-transition {
  position: fixed;
  inset: 0;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeInOut 2s ease-in-out;
}

.logo {
  width: 500px;
  height: auto;
  animation: pop 1s ease-in-out;
  filter: invert(1);
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes pop {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); }
}

@media screen and (max-width: 1000px) {
    .logo {
      width: 400px;
  }
}

@media screen and (max-width: 600px) {
    .logo {
      width: 300px;
  }
}

@media screen and (max-width: 400px) {
    .logo {
      width: 225px;
  }
}
</style>
