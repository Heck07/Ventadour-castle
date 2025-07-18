const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const messagesFile = path.join(__dirname, '../data/messages.json')

// Sauvegarde un message dans le fichier
function saveMessageToFile(message) {
  const data = fs.existsSync(messagesFile)
    ? JSON.parse(fs.readFileSync(messagesFile))
    : []

  data.push({ ...message, id: uuidv4(), date: new Date().toISOString(), read: false })

  const dir = path.dirname(messagesFile)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2))
}

// POST /api/contact – Sauvegarde uniquement
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs requis manquants' })
  }

  try {
    saveMessageToFile({ name, email, subject, message })
    res.status(200).json({ message: 'Message sauvegardé' })
  } catch (err) {
    console.error('Erreur lors de la sauvegarde du message :', err)
    res.status(500).json({ error: 'Erreur lors de l’enregistrement' })
  }
})

// GET /api/contact – Liste des messages
router.get('/', (req, res) => {
  if (!fs.existsSync(messagesFile)) return res.json([])
  const data = JSON.parse(fs.readFileSync(messagesFile))
  res.json(data.reverse())
})

// PATCH /api/contact/:id/read – Marquer comme lu / non lu
router.patch('/:id/read', (req, res) => {
  const { read } = req.body
  if (!fs.existsSync(messagesFile)) return res.status(404).json({ error: 'Fichier introuvable' })

  const data = JSON.parse(fs.readFileSync(messagesFile))
  const index = data.findIndex(m => m.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Message non trouvé' })

  data[index].read = !!read
  fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2))
  res.json({ success: true })
})

// DELETE /api/contact/:id – Supprimer un message
router.delete('/:id', (req, res) => {
  if (!fs.existsSync(messagesFile)) return res.status(404).json({ error: 'Fichier introuvable' })

  let data = JSON.parse(fs.readFileSync(messagesFile))
  const initialLength = data.length
  data = data.filter(m => m.id !== req.params.id)

  if (data.length === initialLength) return res.status(404).json({ error: 'Message non trouvé' })

  fs.writeFileSync(messagesFile, JSON.stringify(data, null, 2))
  res.json({ success: true })
})

module.exports = router
