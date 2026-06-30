import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 8000
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker'

// Middleware
app.use(express.json())

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
