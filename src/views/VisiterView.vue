<template>
  <section class="section section-start">
    <h2 class="decorated-title-left">{{ t('visiter.schedule.title') }}</h2>
    <div class="content-row">
      <div class="text-block">
        <p><Calendar class="icon-inline" /> {{ t('visiter.schedule.open') }}</p>
        <p><Clock class="icon-inline" /> {{ t('visiter.schedule.hours') }}</p>
        <p><Hourglass class="icon-inline" /> {{ t('visiter.schedule.time') }}</p>
      </div>
      <div class="image-block">
        <img src="../assets/img/ventadour_peinture.jpg" alt="Peinture ancienne du château" />
        <p class="caption">Les ruines du château de Ventadour,<br />tableau de Jules Thibon</p>
      </div>
    </div>
  </section>


  <section class="section">
    <h2 class="decorated-title-left">{{ t('visiter.price.title') }}</h2>
    <div class="content-row">
      <div class="text-block">
        <p><Euro class="icon-inline" /> {{ t('visiter.price.standard') }}</p>
        <p><Baby class="icon-inline" /> {{ t('visiter.price.kids') }}</p>
        <p><HandCoins class="icon-inline" />{{ t('visiter.price.donate') }}</p>
      </div>
      <div class="image-block">
        <img src="../assets/img/ventadour_1818.jpg" alt="Dessin du château 1818" />
        <p class="caption">Le château en 1818,<br />vu par A. Joly de la Vaubignon</p>
      </div>
    </div>
  </section>

  <section class="section last-section">
    <h2 class="decorated-title-left">{{ t('visiter.access.title') }}</h2>
    <div class="text-block site-access">
      <p>{{ t('visiter.access.text') }}</p>
    </div>

    <div class="image-row">
      <img src="../assets/img/parking.png" alt="Accès route" />
      <img src="../assets/img/ventadour04.jpg" alt="Château entrée" />
    </div>

    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.432273808353!2d4.284567074738612!3d44.6699496860828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b4dd97b33d63f1%3A0xd27fada33e61887c!2sCh%C3%A2teau%20de%20Ventadour!5e0!3m2!1sfr!2sus!4v1751485908511!5m2!1sfr!2sus"
        width="100%"
        height="300"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Calendar, Clock, Euro, Baby, BadgeCheck, HandCoins, Hourglass } from 'lucide-vue-next';

const { t } = useI18n()

</script>

<style scoped>
.section {
  padding: 1rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
}
.section-start {
  margin-top: 2rem;
}

.content-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;
}

.image-block {
  max-width: 400px;
  text-align: center;
}

.image-block img {
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.caption {
  font-size: 1rem;
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
}

.text-block {
  line-height: 3;
  font-size: 17px;
  font-weight: bold;
  color: #444;
  margin-top: 40px;
}

.image-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.image-row img {
  max-width: 300px;
  border-radius: 4px;
}

.last-section {
  padding-bottom: 3rem;
}

.icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: middle;
  margin-right: 0.4em;
  stroke: #444;
}

.icon-inline {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.1em;
  margin-right: 0.3em;
  stroke: #666;
}

.site-access {
  line-height: 2rem;
}

.map-container {
  margin-top: 1.5rem;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.decorated-title-left {
  position: relative;
  margin-bottom: 0rem;
  padding-bottom: 0rem;
  display: inline-block;
}

@media screen and (max-width: 850px) {
  .content-row {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
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
  .text-block {
    margin-top: 0;
  }

  .image-block {
    max-width: 100%;
  }

  .image-row {
    justify-content: center;
  }
}
</style>
