<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import Timeline from '../components/Timeline.vue'
</script>

<template>
  <section class="section">
    <h2 class="decorated-title-center" v-html="t('decouvrir.section1.title')"></h2>
    <div class="row">
      <div class="text">
        <p class="lettrine-simple">{{ t('decouvrir.section1.p1') }}</p>
        <p>{{ t('decouvrir.section1.p2') }}</p>
        <p>{{ t('decouvrir.section1.p3') }}</p>
        <p>{{ t('decouvrir.section1.p4') }}</p>
        <p>{{ t('decouvrir.section1.p5') }}</p>
        <p>{{ t('decouvrir.section1.p6') }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="decorated-title-center">{{ t('decouvrir.section3.title') }}</h2>
    <div class="row">
      <img src="../assets/img/ventadour_old.jpg" alt="Château actuel" />
      <div class="text">
        <p class="lettrine-simple">{{ t('decouvrir.section3.p1') }}</p>
        <p>{{ t('decouvrir.section3.p2') }}</p>
        <p>{{ t('decouvrir.section3.p3') }}</p>
        <p>{{ t('decouvrir.section3.p4') }}</p>
        <p>{{ t('decouvrir.section3.p5') }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <h2 class="decorated-title-center">{{ t('decouvrir.section4.title') }}</h2>
    <div class="row reverse">
      <div class="text">
        <p class="lettrine-simple">{{ t('decouvrir.section4.p1') }}</p>
        <p>{{ t('decouvrir.section4.p2') }}</p>
        <p>{{ t('decouvrir.section4.p3') }}</p>
        <p>{{ t('decouvrir.section4.p4') }}</p>
        <p>{{ t('decouvrir.section4.p5') }}</p>
        <p>{{ t('decouvrir.section4.p6') }}</p>
      </div>
      <img src="../assets/img/bene_scout.jpg" alt="Scouts et bénévoles" />
    </div>
  </section>

  <section class="section">
    <h2 class="decorated-title-center">{{ t('decouvrir.section2.title') }}</h2>
    <div class="row">
      <img src="../assets/img/pottier.jpg" alt="Château ancien" />
      <div class="text">
        <p class="lettrine-simple">{{ t('decouvrir.section2.p1') }}</p>
        <p>{{ t('decouvrir.section2.p2') }}</p>
        <p>{{ t('decouvrir.section2.p3') }}</p>
        <p>{{ t('decouvrir.section2.p4') }}</p>
        <p>{{ t('decouvrir.section2.p5') }}</p>
      </div>
    </div>
  </section>

  <Timeline />
</template>


<style scoped>
.section {
  padding: 0.7rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

.section h2 {
  text-align: center;
  font-size: 2.7rem;
  margin-bottom: 1rem;

}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: stretch; /* ✅ important pour que .text prenne la hauteur de l'image */

}

.row img {
  max-width: 350px;
  max-height: 350px;
  height: auto;
  border-radius: 4px;
  border: 3px solid #ceb7979c;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* prendra la hauteur du parent */
  max-width: 600px;
}

.text p {
  margin-top: 0px;
}

.lettrine-simple::first-letter {
  font-size: 2em;
  font-weight: bold;
}
</style>
