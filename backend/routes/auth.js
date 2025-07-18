const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// Identifiants admin simples
const users = [
  { id: 1, username: 'admin', password: '123' }
]

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body

  const user = users.find(u => u.username === username && u.password === password)

  if (!user) {
    return res.status(401).json({ error: 'Identifiants incorrects' })
  }

  const token = jwt.sign({ id: user.id }, 'VENTADOUR_SECRET', { expiresIn: '2h' })

  res.json({ token })
})

module.exports = router
