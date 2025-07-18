<template>
  <div class="timeline-container">
    <h2 class="timeline-title">{{ t('timeline.title') }}</h2>
    <div class="timeline-grid">
      <div class="timeline-line"></div>

      <div
        v-for="(event, index) in events"
        :key="index"
        class="timeline-item"
        :class="[
          index % 2 === 0 ? 'top' : 'bottom',
          'timeline-item',
          index % 2 === 0 ? 'left' : 'right'
        ]"      >
        <div class="content-box">
          <div class="event-date">{{ t(`timeline.events.${index}.date`) }}</div>
          <div class="event-title">{{ t(`timeline.events.${index}.title`) }}</div>
          <div class="event-desc">{{ t(`timeline.events.${index}.desc`) }}</div>
        </div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// La structure `events` sert uniquement à itérer sur le nombre d’éléments
const events = Array.from({ length: 10 })
</script>

<style scoped>
.timeline-container {
  padding: 2rem 1rem;
  max-width: 100%;
  margin-bottom: 3rem;
}
.timeline-title {
  text-align: center;
  font-size: 2.7rem;
  color: #768652;
  text-shadow: 1px 1px 3px #3e442866;
  margin-bottom: 3rem;
}

.timeline-title::after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background-color: rgba(153, 149, 149, 0.55);
  margin: 0.6rem auto 0 auto; /* centrée horizontalement */
}

.timeline-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  position: relative;
width: 100%;
max-width: 1200px; /* ou la valeur que tu veux */
margin: 0 auto;  
gap: 0.3rem;
  align-items: center;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 5%;
  width: 90%;
  height: 5px;
  border-radius: 3px;
  border: 1px solid #8b5e3c;
  background-color: #8b5e3c56;
  transform: translateY(-50%);
  z-index: 0;
}

.timeline-item {
  position: relative;
  padding: 0rem 3rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timeline-item.top {
  grid-row: 1;
  transform: translateX(-10%); /* décalage visuel à droite */
}
.timeline-item.bottom {
  flex-direction: column-reverse;
  transform: translateX(10%); /* décalage visuel à droite */
  grid-row: 3;
}
.content-box {
  background: #fdfaf6;
  border: 1px solid #c4b79b;
  border-radius: 0.5rem;
  padding: 0.7rem;
  text-align: center;
  width: 100%;
  height: 120px;
  width: 150px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.event-date {
  font-weight: bold;
  color: #5c4434;
  margin-bottom: 0.2rem;
}
.event-title {
  font-weight: 600;
}
.event-desc {
  font-size: 0.85rem;
  color: #333;
}
.dot {
  width: 6px;
  height: 6px;
  background-color: #5c4434;
  border: 3px solid #fdfaf6;
  border-radius: 50%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem
}

@media screen and (max-width: 1000px) {
  .timeline-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    position: relative;
  }

  .timeline-line {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background-color: #8b5e3c56;
    border: none;
  }

  .timeline-item {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    padding: 0;
    /* Ne pas écraser le transform ici — il est utilisé pour .left/.right */
  }

  /* ✅ Zigzag gauche/droite en responsive */
  .timeline-item.left {
    transform: translateX(-10%);
  }

  .timeline-item.right {
    transform: translateX(10%);
  }

  /* Supprime le positionnement grid-row des grands écrans */
  .timeline-item.top,
  .timeline-item.bottom {
    grid-row: auto;
  }

  .content-box {
    width: 80%;
    max-width: 300px;
    text-align: left;
  }

  .dot {
    display: none;
  }
}

/* Très petit écran : recentre tout */
@media screen and (max-width: 450px) {
  .timeline-item.left,
  .timeline-item.right {
    transform: none;
  }
}

</style>
