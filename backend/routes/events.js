const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const router = express.Router()

const EVENTS_FILE = path.join(process.cwd(), 'data/events.json')
const UPLOAD_DIR = path.join(process.cwd(), 'uploads')

// Assure que le dossier de stockage existe
fs.mkdirSync(UPLOAD_DIR, { recursive: true })

// Configuration multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})
const upload = multer({ storage })

// Helpers
const loadEvents = () =>
  fs.existsSync(EVENTS_FILE)
    ? JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf-8'))
    : []

const saveEvents = (data) =>
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(data, null, 2), 'utf-8')

/* --------- ROUTES ----------- */

// GET all events
router.get('/', (_req, res) => {
  const events = loadEvents()
  res.json(events)
})

// GET one event
router.get('/:id', (req, res) => {
  const events = loadEvents()
  const event = events.find((e) => e.id === req.params.id)
  if (!event) return res.status(404).json({ message: 'Not found' })
  res.json(event)
})

// POST new event
router.post(
  '/',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'extraImages', maxCount: 10 }
  ]),
  (req, res) => {
    const { title, date, content, previewImageIndex = 0 } = req.body
    const cover = req.files?.coverImage?.[0]
    const extras = req.files?.extraImages || []

    const allFiles = []
    if (cover) allFiles.push(cover)
    if (extras.length > 0) allFiles.push(...extras)

    const newEvent = {
      id: uuidv4(),
      title,
      date,
      content,
      images: allFiles.map((f) => `/uploads/${f.filename}`),
      featuredImage: cover ? `/uploads/${cover.filename}` : null,
      previewImageIndex: parseInt(previewImageIndex),
      createdAt: new Date().toISOString()
    }

    const events = loadEvents()
    events.unshift(newEvent)
    saveEvents(events)

    res.status(201).json(newEvent)
  }
)

// PUT update event
router.put(
  '/:id',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'extraImages', maxCount: 10 }
  ]),
  (req, res) => {
    const events = loadEvents()
    const index = events.findIndex((e) => e.id === req.params.id)
    if (index === -1) return res.status(404).json({ message: 'Not found' })

    const { title, date, content, previewImageIndex = 0 } = req.body
    const cover = req.files?.coverImage?.[0]
    const extras = req.files?.extraImages || []

    const updated = {
      ...events[index],
      title,
      date,
      content,
      previewImageIndex: parseInt(previewImageIndex),
      updatedAt: new Date().toISOString()
    }

    if (cover || extras.length > 0) {
      const all = []
      if (cover) all.push(cover)
      if (extras.length > 0) all.push(...extras)
      updated.images = all.map((f) => `/uploads/${f.filename}`)
      updated.featuredImage = cover ? `/uploads/${cover.filename}` : updated.images[0]
    }

    events[index] = updated
    saveEvents(events)
    res.json(updated)
  }
)

// DELETE event
router.delete('/:id', (req, res) => {
  const events = loadEvents()
  const index = events.findIndex((e) => e.id === req.params.id)
  if (index === -1) return res.status(404).json({ message: 'Not found' })

  const [deleted] = events.splice(index, 1)
  saveEvents(events)

  // Supprimer les images du disque
  if (deleted.images) {
    deleted.images.forEach((imgPath) => {
      const filePath = path.join(UPLOAD_DIR, imgPath.replace('/uploads/', ''))
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    })
  }

  res.json({ message: 'Deleted' })
})

module.exports = router
