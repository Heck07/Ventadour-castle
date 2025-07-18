const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const router = express.Router()

const DATA_FILE = path.join(process.cwd(), 'data', 'news.json')
const UPLOAD_DIR = path.join(process.cwd(), 'uploads')

// Configuration Multer pour les images
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  }
})
const upload = multer({ storage })

// Helper
const loadData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8')
      return content ? JSON.parse(content) : []
    }
  } catch (err) {
    console.error('Erreur parsing JSON dans news.json:', err)
  }
  return []
}

const saveData = (data) =>
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')

/* --------- ROUTES ----------- */

// GET /api/news — tous les articles
router.get('/', (_req, res) => {
  const news = loadData()
  res.json(news)
})

// GET /api/news/:id — un seul article
router.get('/:id', (req, res) => {
  const news = loadData()
  const item = news.find((a) => a.id === req.params.id)
  if (!item) return res.status(404).json({ message: 'Not found' })
  res.json(item)
})

// POST /api/news — ajout d'un nouvel article
router.post('/', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'extraImages', maxCount: 5 }
]), (req, res) => {
  const news = loadData()
  const { title, summary, content, featuredImage, date  } = req.body
const cover = req.files && req.files.coverImage ? req.files.coverImage[0] : null
const extras = req.files && req.files.extraImages ? req.files.extraImages : []

// Combine les fichiers s'ils existent
const allFiles = []
if (cover) allFiles.push(cover)
if (extras.length > 0) allFiles.push(...extras)

const newItem = {
  id: uuidv4(),
  title,
  date,
  content,
  images: allFiles.map(f => `/uploads/${f.filename}`),
  featuredImage: cover ? `/uploads/${cover.filename}` : null,
  createdAt: new Date().toISOString()
}

  news.push(newItem)
  saveData(news)
  res.status(201).json(newItem)
})

// PUT /api/news/:id — mise à jour
router.put('/:id', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'extraImages', maxCount: 5 }
]), (req, res) => {
  const news = loadData()
  const index = news.findIndex((n) => n.id === req.params.id)
  if (index === -1) return res.status(404).json({ message: 'Not found' })

  const { title, summary, content, featuredImage, date} = req.body
  const cover = req.files?.coverImage?.[0]
const extras = req.files?.extraImages || []

const allFiles = []
if (cover) allFiles.push(cover)
if (extras.length > 0) allFiles.push(...extras)

const updated = {
  ...news[index],
  title,
  date,
  summary,
  content,
  updatedAt: new Date().toISOString(),
}

if (allFiles.length > 0) {
  updated.images = allFiles.map(f => `/uploads/${f.filename}`)
  updated.featuredImage = cover ? `/uploads/${cover.filename}` : updated.images[0]
}

if (featuredImage) {
  updated.featuredImage = featuredImage
}

  news[index] = updated
  saveData(news)
  res.json(updated)
})

// DELETE /api/news/:id — suppression
router.delete('/:id', (req, res) => {
  const news = loadData()
  const index = news.findIndex((n) => n.id === req.params.id)
  console.log('Trying to delete:', req.params.id)

  if (index === -1) return res.status(404).json({ message: 'Not found' })

  const deleted = news.splice(index, 1)[0]
  saveData(news)

  // Optionnel : suppression des images physiques
  if (deleted.images) {
    deleted.images.forEach((img) => {
      const filePath = path.join(UPLOAD_DIR, img)
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    })
  }

  res.json({ message: 'Deleted' })
})

module.exports = router
