<template>
  <!-- Hero Section -->
  <section class="hero-slider">
    <div
      class="slider-track"
      ref="trackRef"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(img, i) in loopedImages"
        :key="i"
        class="slide"
        :style="{ backgroundImage: `url(${img})` }"
      ></div>
    </div>
    <div class="hero-overlay">
      <div class="hero-text-wrapper">
        <h1>
            <span class="hero-sub">{{ t('home.hero.subtitle') }}</span><br>
            <span class="hero-main">{{ t('home.hero.title') }}</span>
        </h1>
          <p class="hero-tagline">{{ t('home.hero.tagline') }}</p>
      </div>
    </div>
  </section>

  <section class="pre-intro text-neutral">
    <p><em>{{ t('home.preintro') }}</em></p>
  </section>

  <!-- Intro Section -->
  <section class="intro">
    <div class="intro-block">
      <img src="../assets/img/ventadour_peinture.jpg" alt="Peinture château">
      <div class="text">
        <h2 class="decorated-title-left">{{ t('home.intro1.title') }}</h2>
          <p class="lettrine-simple">{{ t('home.intro1.p1') }}</p>
          <p>{{ t('home.intro1.p2') }}</p>
          <p>{{ t('home.intro1.p3') }}</p>
          <p>{{ t('home.intro1.p4') }}</p>
          <p>{{ t('home.intro1.p5') }}</p>
          <p>{{ t('home.intro1.p6') }}</p>
      </div>
    </div>
    <div class="intro-block reverse">
      <div class="text">
          <h2 class="decorated-title-left">{{ t('home.intro2.title') }}</h2>
          <p class="lettrine-simple">{{ t('home.intro2.p1') }}</p>
          <p>{{ t('home.intro2.p2') }}</p>
          <p>{{ t('home.intro2.p3') }}</p>
          <p>{{ t('home.intro2.p4') }}</p>
          <p>{{ t('home.intro2.p5') }}</p>
          <RouterLink to="/decouvrir">
            <button class="btn-en-savoir-plus">{{ t('home.intro2.button') }}</button>
          </RouterLink>

      </div>
      <img src="../assets/img/bénévolat.jpg" alt="Photo château actuel">
    </div>

  </section>

  <section class="icons">
    <RouterLink to="/visiter" class="icon" aria-label="Voir les horaires">
      <img src="../assets/ico/clock.svg" alt="Horaires" />
    </RouterLink>

    <RouterLink to="/actualites" class="icon" aria-label="Voir les actualités">
      <img src="../assets/ico/news.svg" alt="Actualités" />
    </RouterLink>

    <RouterLink :to="{ path: '/visiter', hash: '#price' }" class="icon" aria-label="Voir les tarifs">
      <img src="../assets/ico/euro.svg" alt="Tarifs" />
    </RouterLink>
  </section>


  <!-- Events Section -->
  <section class="events">
    <h2 class="decorated-title-center">{{ t('home.events.section_title') }}</h2>
    <div class="event-list">
      <div class="event">
        <img src="../assets/img/coracier.jpg" alt="Blason">
        <div>
          <h3><i>{{ t('home.events.1.title') }}</i></h3>
          <p>{{ t('home.events.1.desc') }}Lorem</p>
        </div>
      </div>
      <div class="event">
        <img src="../assets/img/rempart.png" alt="Logo Rempart">
        <div>
          <h3><i>{{ t('home.events.2.title') }}</i></h3>
          <p>{{ t('home.events.2.desc') }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Avis Section -->
  <section class="avis">
    <h2>{{ t('home.avis.title') }}</h2>

    <div class="avis-content">
      <div class="stars">
        {{ '★'.repeat(avisList[currentAvisIndex].stars) }}
      </div>

      <p class="auteur">{{ avisList[currentAvisIndex].auteur }}</p>
      <p class="texte" v-html="avisList[currentAvisIndex].texte.replace(/\n/g, '<br>')"></p>
    </div>

  </section>

</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const images = [
  new URL('../assets/img/hero3.JPG', import.meta.url).href,
  new URL('../assets/img/hero2.jpg', import.meta.url).href,
  new URL('../assets/img/hero4.jpg', import.meta.url).href
]

const avisList = [
  {
    auteur: 'Yoann Ridez',
    texte: `Un accueil très chaleureux et pro par la compagnie théâtrale moyen âge.
De belles démonstrations, une visite intéressante, détaillée sans lasser un auditoire familial.`,
    stars: 5
  },
  {
    auteur: 'Brigitte Verrier.',
    texte: `Il vaut le détour, visite hors saison si on veut un peu de calme, mais il faut avoir de bonnes chaussures pour monter le sentier pavé sur 400 m de long et 100 m de dénivelé.
Ne cherchez pas d'accès voiture il n'y en a pas !
Un splendide château médiéval restauré depuis 50 ans, à voir absolument si on aimes les vieilles pierres.`,
    stars: 5
  },
  {
    auteur: 'Alex Carbonnel',
    texte: `Superbe visite, très bien accueilli, les enfants ce sont régalés avec les animations et nous avons découverts pleins d’anecdotes. A faire !`,
    stars: 4
  },
  {
    auteur: 'Dominique T',
    texte: 'Château en cour de rénovation, de grandes avancées en été faites. La visite guidée a été très intéressante. Vos dons seront utiles pour continuer de le restaurer.',
    stars: 5
  }
]

const currentAvisIndex = ref(0)

const nextAvis = () => {
  currentAvisIndex.value = (currentAvisIndex.value + 1) % avisList.length
}
const prevAvis = () => {
  currentAvisIndex.value =
    (currentAvisIndex.value - 1 + avisList.length) % avisList.length
}

const currentIndex = ref(0)
const trackRef = ref(null)
let intervalId

const loopedImages = computed(() => [...images, images[0]]) // duplique la 1re image à la fin
let avisInterval


onMounted(() => {
  avisInterval = setInterval(nextAvis, 8000)
  intervalId = setInterval(() => {
    currentIndex.value++
    const totalSlides = images.length

    if (currentIndex.value > totalSlides) {
      const track = trackRef.value
      if (track) {
        track.style.transition = 'none'
        track.style.transform = `translateX(0%)`
        currentIndex.value = 1
        void track.offsetWidth
        setTimeout(() => {
          track.style.transition = 'transform 1.2s ease-in-out'
        }, 50)
      }
    }
  }, 10000)
})

onUnmounted(() => {
  clearInterval(intervalId)
  clearInterval(avisInterval)
})
</script>


<style scoped>
.hero-slider {
  position: relative;
  overflow: hidden;
  height: 78vh;
}

.slider-track {
  display: flex;
  height: 100%;
  transition: transform 1.2s ease-in-out;
  will-change: transform;
}

.slide {
  flex: 0 0 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  text-align: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.2));
}

.hero-text-wrapper {
  max-width: 90%;
  padding: 1rem 2rem;
  border-radius: 12px;
}

.hero-sub {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 2.5vw + 0.5rem, 4rem);
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  margin-bottom: -3rem;
  display: block;
}

.hero-main {
  font-family: 'Playfair Display', serif;
  font-size: clamp(4rem, 4vw + 1rem, 5rem);
  font-weight: 700;
  color: white;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
}

.hero-tagline {
  font-family: 'Libre Baskerville', serif;
  font-size: clamp(1rem, 1.2vw, 1.4rem);
  color: rgba(255, 255, 255, 0.85);
  margin-top: 1rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.pre-intro {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-color: rgba(153, 149, 149, 0.55);
}

.pre-intro p {
  font-size: 1.2rem;
  font-weight: 600;
  color: white; 
}
.intro {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(1rem, 5vw, 10rem);
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 0px;
}
.intro-block {
  display: flex;
  align-items: start;
  gap: 2rem;
  margin-top: 1.5rem;
}

.reverse {
    margin-bottom: 3rem;

}

.intro-block .text {
  position: relative; /* nécessaire pour que le bouton soit positionné par rapport à ce bloc */
}

.intro-block img {
  height: 100%;
  object-fit: cover;
  max-height: 400px;
  display: flex;
  aspect-ratio: 3 / 4;
}

.intro-block h2 {
  font-size: clamp(2.3rem, 4vw, 3rem);
  margin: 0;
  margin-bottom: 3vh;
  color: #768652;
  text-shadow: 1px 1px 3px #3e442844;
}

.intro-block p {
  margin: 0.5rem 0;
  font-size: clamp(0.95rem, 14px + 0.3rem, 1.2rem);
}

button {
  margin-top: 1rem;
}

.icons {
  display: flex;
  flex-wrap: wrap;                  
  width: 100%;
}

.icon {
  flex: 1 1 33.33%;                  /* Occupe ~1/3 de la largeur, en grandissant/rétrécissant au besoin */
  display: flex;
  height: 42vh;
  justify-content: center;
  align-items: center;               /* Centre le contenu (icône) horizontalement et verticalement */
  /* Couleurs de fond distinctes pour chaque colonne */
  /* (Exemple de 3 couleurs différentes) */
}

.icon {
  background: #ceb797a9;
  position: relative;
  overflow: hidden;                  /* Cache d'éventuels dépassements (icône agrandie) */
  transition: background-color 0.3s ease;  /* Transition douce pour le changement de fond */
}

.icon img {
  max-width: 100%;
  height: 17vh;
  transform-origin: center center; 
  transition: transform 0.3s ease;  
}

.icon:hover { 
  background: #ceb79780; 
}  

.icon:hover img {
  transform: scale(1.13);          
}

@media (max-width: 768px) {
  .icon { flex: 1 1 50%; }          /* Deux colonnes sur les écrans moyens */
}
@media (max-width: 480px) {
  .icon { flex: 1 1 100%; }         /* Une colonne sur les petits écrans (mobile) */
}

.events {
  gap: 10rem;
  padding: 2rem;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 3em; /* espace vertical entre les blocs */
}


.events h3 {
  font-size: clamp(1.8rem, 4vw, 2rem);
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0;
}

.events h2{
  font-size: clamp(2.3rem, 4vw, 3rem)
}

.events p {
  margin-top: clamp(0.95rem, 1vw + 0.3rem, 1.2rem);
  margin-bottom: 0;
}

.event {
  display: flex;
  align-items: center; /* au lieu de center */
  justify-content: flex-start;
  gap: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0rem 1rem;
  height: 10rem;
  max-height: 10rem;
  max-width: 40rem;
  width: 100%;
  margin: 0 auto;
  transition: border-color 0.3s ease-in-out;
}

.event:hover {
  border-color: rgba(0, 0, 0, 1); /* Changement uniquement de la couleur */
  transform: scale(1.005); /* ✅ effet de zoom */
}

.event img {
  width: 120px;
}

.avis .texte {
    transition: opacity 0.4s ease;
    max-width: 700px;
    margin: 0 auto; 
    font-size: clamp(0.95rem, 1vw, 1.3rem);
}

.avis {
  text-align: center;
  padding: 2rem;
  padding-top: 0rem;
}

.avis-content {
  min-height: 30vh; /* ou une valeur testée selon ton contenu */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.avis h2 {
  font-size: clamp(2.3rem, 4vw, 3rem);
  margin-bottom: 0px;
  color: black;
  text-shadow: none;
}
.stars {
  font-size: clamp(1.2rem, 1.5vw, 2rem);
  color: gold;
}
.auteur {
  font-size: clamp(0.9rem, 1vw, 1.2rem);
  font-weight: bold;
  margin-top: 1rem;
}
.nav-arrows {
  margin-top: 1rem;
}
.nav-arrows button {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.decorated-title-left {
  position: relative;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #222;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.lettrine-simple::first-letter {
  font-size: 2em;
  font-weight: bold;
}

@media screen and (max-width: 1100px) {
  .intro {
    padding: 2rem 4rem; 
  }
}


/* --- INTRO responsive --- */
@media screen and (max-width: 900px) {
  .intro {
    padding: 2rem 2rem; 
  }
  .intro-block {
    flex-direction: column;
    text-align: center;

  }
  .intro-block.reverse {
    flex-direction: column-reverse;
  }
  .intro-block img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
  }
  .btn-en-savoir-plus {
    position: static;
    margin: 2rem auto 0 auto; /* espace au-dessus et centré horizontalement */
  }
  .decorated-title-left {
      text-align: center;
      display: block;
      width: 100%;
  }
    .decorated-title-left::after {
      left: 50%;
      transform: translateX(-50%);
  }
}

/* --- EVENTS responsive --- */
@media screen and (max-width: 730px) {
  .event {
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: auto;
    max-height: none;
    padding: 1.5rem;
    width: 90%;
  }

  .event img {
    width: 80px;
  }
}


@media screen and (max-width: 420px) {
  .event {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

}
</style>