<template>
  <section class="section">
    <h2 class="decorated-title-center">{{ t('contact.title') }}</h2>

    <div class="info">
      <p>
        <Phone class="icon-inline" />
        <span v-html="t('contact.phone')"></span>
      </p>
      <p>
        <Mail class="icon-inline" />
        <span v-html="t('contact.mail')"></span>
      </p>
      <p>
        <CastleIcon class="icon-inline" />
        {{ t('contact.status_prefix') }}
        <span :class="['status-indicator', isOpen ? 'open' : 'closed']"></span>
        <strong>{{ isOpen ? t('contact.open') : t('contact.closed') }}</strong>
      </p>
    </div>

    <form class="form" @submit="handleSubmit">
      <input v-model="name" type="text" :placeholder="t('contact.form.name')" required />
      <input v-model="email" type="email" :placeholder="t('contact.form.email')" required />
      <input v-model="subject" type="text" :placeholder="t('contact.form.subject')" />
      <textarea v-model="message" rows="5" :placeholder="t('contact.form.message')" required></textarea>
      <button type="submit" :disabled="sending">{{ t('contact.form.submit') }}</button>
      <p v-if="success === false" style="color: red;">Erreur lors de l’envoi.</p>
    </form>

      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal">
          <h3>Merci !</h3>
          <p>Votre message a bien été envoyé.<br />Nous vous recontacterons rapidement.</p>
          <button @click="showModal = false">Fermer</button>
        </div>
      </div>
    
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Phone, Mail, CastleIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isOpen = ref(false)
const showModal = ref(false)


const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const sending = ref(false)
const success = ref(null)

const handleSubmit = async (e) => {
  e.preventDefault()
  sending.value = true
  success.value = null

  try {
    if (import.meta.env.PROD) {
      // simulation en ligne
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success.value = true
    } else {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.value, email: email.value, subject: subject.value, message: message.value }),
      })
      success.value = res.ok
    }

    if (success.value) {
      name.value = ''
      email.value = ''
      subject.value = ''
      message.value = ''
      showModal.value = true
    }
  } catch (err) {
    console.error('Erreur lors de l’envoi du message :', err)
    success.value = false
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentHour = now.getHours()
  isOpen.value = (currentMonth === 7 || currentMonth === 8) && currentHour >= 9 && currentHour < 19
})
</script>

<style scoped>
.section {
  padding: 2rem 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.info {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #444;
}

.status-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 0.5rem;
}

.status-indicator.open {
  background-color: green;
}

.status-indicator.closed {
  background-color: red;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form input,
.form textarea {
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form button {
  padding: 0.8rem;
  background-color: #333;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.form button:hover {
  background-color: #000;
}

.icon-inline {
  width: 1.1em;
  height: 1.1em;
  vertical-align: -0.15em;
  margin-right: 0.4em;
  stroke: #555;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}

.modal h3 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.modal button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
