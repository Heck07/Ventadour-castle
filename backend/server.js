const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./routes/auth')
const eventsRoutes = require('./routes/events')
const newsRoutes = require('./routes/news')
const visitsRoute = require('./routes/visits')
const contactRoutes = require('./routes/contact')

const app = express()

app.use(cors())
app.use(express.json())

// Exposer les images et fichiers statiques
app.use('/uploads', express.static('uploads'))
app.use('/public', express.static(path.join(__dirname, 'public')))

// Routes API
app.use('/api/auth', authRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/visits', visitsRoute)

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001')
})
