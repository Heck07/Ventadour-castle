<template>
  <div class="admin-login">
    <h2>Connexion Admin</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Nom d'utilisateur" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()

const handleLogin = async () => {
  error.value = null
  try {
    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }) // 👈 ici
    })

    if (!res.ok) throw new Error('Identifiants incorrects')
    
    const data = await res.json()
    localStorage.setItem('token', data.token)
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.admin-login {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  text-align: center;
  display: flex;
   flex-direction: column;
  justify-content: center;
  align-items: center;
}

.admin-login h2 {
  color: black;
  font-size: 2.7rem;
  text-shadow: none;
  margin: 0;
}
input {
  display: block;
  margin: 1rem 0;
  padding: 0.7rem;
  font-size: 1rem;
}
button {
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
