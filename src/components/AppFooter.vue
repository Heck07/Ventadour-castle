<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <img src="../assets/blason.svg" alt="Blason" class="blason" />
        <div class="footer-text">
          <p>{{ t('footer.address') }}</p>
          <p>Roulandy, 07380 Meyras</p>
          <p>04 75 38 00 92</p>
          <p>chateau-ventadour@gmail.com</p>
        </div>
      </div>

      <div class="separator"></div>

      <div class="footer-right">
        <p>{{ t('footer.follow_us') }}</p>
        <div class="social-icons">
          <a href="https://www.instagram.com/chateauventadour07/" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://www.facebook.com/chateaudeventadourardeche" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2025 Château de Ventadour —
        <RouterLink to="/mentions-legales">Mentions légales</RouterLink>
      </p>
    </div>
  </footer>
</template>


<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: white;
  font-family: 'Inter', sans-serif;
  padding: 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 2rem;
  gap: 2rem;
  position: relative; /* ✅ utile pour ancrer l’absolu */
}

.footer-left,
.footer-right {
  flex: 1;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.footer-left {
  gap: 5rem;
  flex-direction: row;
}

.footer-right {
  flex-direction: column;
}

.footer-left img.blason {
  width: 60px;
  height: auto;
}

.footer-left .footer-text p {
  margin: 0.2rem 0;
  text-align: left;
}

.footer-right p {
  margin-bottom: 1rem;
  margin-top: 0;
  font-weight: bold;
}

.social-icons {
  display: flex;
  color: white;
  gap: 1.5rem;
  font-size: 1.5rem;
  decoration: none;
  justify-content: center;
}

.separator {
 position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  background-color: white;
}

.footer-bottom {
  background-color: #e5e5e5;
  color: black;
  text-align: center;
  padding: 0.8rem;
  font-size: 0.9rem;
}

.footer-bottom a {
  color: black;
  text-decoration: underline;
}

.social-icons a {
  text-decoration: none;  /* ✅ supprime la ligne */
  color: white;           /* pour forcer la couleur des icônes si besoin */
}

@media screen and (max-width: 1000px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .footer-left,
  .footer-right {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer-left {
    gap: 1rem;
  }

  .footer-left .footer-text p {
    text-align: center;
  }

  .separator {
    display: none;
  }
}
</style>
