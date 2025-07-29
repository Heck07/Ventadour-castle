<template>
  <section class="section">
    <h2 class="decorated-title-center">{{ t('participer.title2') }}</h2>
    <div class="association-bloc">
      <img src="../assets/img/association.jpg" alt="Logo Rempart" class="img-asso" />
      <div class="assocation-text">
        <h3 class="association-title">{{ t('participer.bloc3.title') }}</h3>
        <p>{{ t('participer.bloc3.p1') }}</p>
        <p>{{ t('participer.bloc3.p2') }}</p>
      </div>
    </div>
  </section>
    

  <section class="section">
    <h2 class="decorated-title-center">{{ t('participer.title') }}</h2>

    <div class="participer-bloc">
      <img src="../assets/img/rempart.png" alt="Logo Rempart" class="logo no-zoom" />
      <div>
        <h3>{{ t('participer.bloc1.title') }}</h3>
        <p>{{ t('participer.bloc1.desc') }}</p>
      </div>
    </div>

    <div class="participer-bloc reverse">
      <div>
        <h3>{{ t('participer.bloc2.title') }}</h3>
        <p>{{ t('participer.bloc2.p1') }}</p>
        <p>{{ t('participer.bloc2.p2') }}</p>
        <p>{{ t('participer.bloc2.p3') }}</p>
        <p>{{ t('participer.bloc2.p4') }}</p>

      <div class="cta-container">
        <a
          class="cta-button"
          :href="t('participer.link')"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('participer.cta') }}
        </a>
      </div>
      </div>

      <div class="participer-images">
        <img src="../assets/img/benevoles_2025.jpg" alt="Travaux 1" />
        <img src="../assets/img/chantier2.jpg" alt="Travaux 2" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.section {
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  margin-bottom: 2rem;
}

h3 {
  font-size: 2.2rem;
  font-weight: bold;
}

.association-bloc {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 3rem;
}

.assocation-text {
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

.association-title {
  margin-top: 0;
}

.img-asso {
  max-height: 300px;
  border-radius: 3px;
}

.participer-bloc {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  text-align: left;
}

.participer-bloc.reverse {
  flex-direction: row-reverse;
}

.logo {
  width: 200px;
}

.participer-images {
  display: flex;
  justify-content: center;  
  align-items: center;
  gap: 3rem;                 
}

.participer-images img {
  width: 100%;
  height: 250px;
  object-fit: cover; /* rogne l'image sans la déformer */
  object-position: center; /* centre le cadrage */
  aspect-ratio: 3 / 2.2; /* ratio facultatif ici si width + height sont fixés */
  border-radius: 3px;
}

.cta-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  
}

.cta-button {
  background-color: #e63946;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  text-decoration: none;
}

.cta-button:hover {
  background-color: #c72536;
}

@media screen and (max-width: 850px) {
  .participer-bloc,
  .participer-bloc.reverse,
  .association-bloc {
    display:flex;
    flex-wrap:wrap;
    flex-direction: column !important;
    align-items: center;
    text-align: center;
  }

  .assocation-text {
    text-align: center;
  }

  .participer-bloc.reverse {
    flex-direction: column !important;
  }

  .participer-images {
    flex-direction: column;
    gap: 1rem;
  }

  .participer-images img,
  .img-asso {
    display: flex;
    align-items: center;
    height: auto;
    max-width: 200px;
    max-height: 200px;
  }

  .logo {
    width: 150px;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.9rem;
  }

  .cta-container {
    justify-content: center;
  }
}
</style>
