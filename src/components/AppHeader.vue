<template>
  <header class="header-main">
    <div class="logo-zone">
      <router-link to="/">
        <img class="logo" src="../assets/logo.svg" alt="Logo" />
      </router-link>
    </div>

    <!-- Bouton burger -->
    <button v-if="showBurger" class="burger-btn" @click="toggleMenu">
      <span :class="{ open: isMenuOpen }"></span>
      <span :class="{ open: isMenuOpen }"></span>
      <span :class="{ open: isMenuOpen }"></span>
    </button>

    <!-- Menu desktop -->
    <nav v-if="!showBurger" class="nav-zone">
      <router-link to="/decouvrir">{{ t('nav.discover') }}</router-link>
      <router-link to="/visiter">{{ t('nav.visit') }}</router-link>
      <router-link to="/evenements">{{ t('nav.events') }}</router-link>
      <router-link to="/actualites">{{ t('nav.news') }}</router-link>
      <router-link to="/participer">{{ t('nav.participate') }}</router-link>
      <router-link to="/contact">{{ t('nav.contact') }}</router-link>
    </nav>

    <!-- Menu mobile -->
    <div class="mobile-menu" :class="{ open: isMenuOpen }">
      <nav class="mobile-nav">
        <router-link @click="toggleMenu" to="/decouvrir">{{ t('nav.discover') }}</router-link>
        <router-link @click="toggleMenu" to="/visiter">{{ t('nav.visit') }}</router-link>
        <router-link @click="toggleMenu" to="/evenements">{{ t('nav.events') }}</router-link>
        <router-link @click="toggleMenu" to="/actualites">{{ t('nav.news') }}</router-link>
        <router-link @click="toggleMenu" to="/participer">{{ t('nav.participate') }}</router-link>
        <router-link @click="toggleMenu" to="/contact">{{ t('nav.contact') }}</router-link>

        <div class="mobile-lang">
          <img src="../assets/ico/french.png" alt="Français" class="lang-icon" :class="{ active: selectedLang === 'fr' }" @click="setLang('fr')" />
          <img src="../assets/ico/english.png" alt="English" class="lang-icon" :class="{ active: selectedLang === 'en' }" @click="setLang('en')" />
        </div>
      </nav>
    </div>

    <!-- Langues desktop -->
    <div v-if="!showBurger" class="lang-zone">
      <img src="../assets/ico/french.png" alt="Français" class="lang-icon" :class="{ active: selectedLang === 'fr' }" @click="setLang('fr')" />
      <img src="../assets/ico/english.png" alt="English" class="lang-icon" :class="{ active: selectedLang === 'en' }" @click="setLang('en')" />
    </div>
  </header>
</template>

<script setup>
import { ref, watch, inject, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const langTransition = inject('langTransition')

const selectedLang = ref(locale.value)
const isMenuOpen = ref(false)

const windowWidth = ref(0)
const windowHeight = ref(0)

const isPortrait = computed(() => windowHeight.value > windowWidth.value)
const showBurger = computed(() => windowWidth.value < 1024 || isPortrait.value)

function updateWindowSize() {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
}

onMounted(() => {
  updateWindowSize()
  window.addEventListener('resize', updateWindowSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize)
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function setLang(lang) {
  if (selectedLang.value !== lang) {
    selectedLang.value = lang
  }
  isMenuOpen.value = false
}

watch(selectedLang, async (newLang, oldLang) => {
  if (newLang !== oldLang && langTransition?.value?.triggerTransition) {
    langTransition.value.triggerTransition()
    await new Promise((resolve) => setTimeout(resolve, 300))
  }
  locale.value = newLang
})
</script>

<style scoped>
.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: clamp(15vh, 4.5vh + 7rem, 22vh);
  background-color: rgba(206, 183, 151, 0.6);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 0;
}

.logo-zone {
  margin-left: 30px;
}

.logo {
  height: clamp(9vh, 2vh + 5rem, 17vh);
}

.nav-zone {
  display: flex;
  gap: clamp(0.7rem, 1.5vw, 2.5rem);
  justify-content: center;
  flex: 1;
}

.nav-zone a {
  color: white;
  font-size: clamp(1rem, 0.8vw + 0.5rem, 2rem);
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-zone a:hover {
  color: rgba(0, 0, 0, 0.55);
}

.lang-zone {
  margin-right: 30px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-icon {
  width: clamp(25px, 1vw + 10px, 40px);
  height: auto;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.lang-icon:hover {
  opacity: 1;
  transform: scale(1.05);
}

.lang-icon.active {
  border: 2px solid white;
  border-radius: 50%;
  opacity: 1;
}

.burger-btn {
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1101;
}

.burger-btn span {
  width: 25px;
  height: 3px;
  background-color: white;
  transition: all 0.3s ease;
}

.burger-btn span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.burger-btn span.open:nth-child(2) {
  opacity: 0;
}
.burger-btn span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* MENU MOBILE */
.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(206, 183, 151, 0.98);
  backdrop-filter: blur(8px);
  z-index: 1100;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.mobile-menu.open {
  display: flex;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  font-size: 1.4rem;
}

.mobile-nav a {
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.mobile-nav a:hover {
  color: rgba(0, 0, 0, 0.55);
}

.mobile-lang {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

/* Active links */
.nav-zone .router-link-active,
.mobile-nav .router-link-active {
  color: #000 !important;
}


</style>
