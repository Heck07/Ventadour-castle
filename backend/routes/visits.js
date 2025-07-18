const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const FILE = path.join(process.cwd(), 'data', 'visits.json')

router.get('/', (_req, res) => {
  try {
    const content = fs.readFileSync(FILE, 'utf-8')
    const data = JSON.parse(content)
    res.json({ count: data.count || 0 })
  } catch {
    res.status(500).json({ count: 0 })
  }
})

module.exports = router
