import express from 'express'
import { type InferSchemaType } from 'mongoose'
import { User, Team, Activity, Workout } from './models/index.js'
import { userSchema } from './models/user.js'
import { connectDatabase } from './config/database.js'

const app = express()
const PORT = Number(process.env.PORT ?? 8000)
const HOST = '0.0.0.0'
const CODESPACE_NAME = process.env.CODESPACE_NAME
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

// Middleware
app.use(express.json())

// MongoDB Connection
await connectDatabase()

// API metadata endpoint with Codespaces-aware URL support
app.get('/api/info', (req, res) => {
  res.json({
    status: 'OK',
    apiBaseUrl: API_BASE_URL,
    codespaceName: CODESPACE_NAME ?? null,
    port: PORT
  })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running' })
})

app.get('/api/users', async (_req, res) => {
  const users = await User.find().limit(50).lean()
  res.json({ users })
})

type UserSummary = Pick<InferSchemaType<typeof userSchema>, 'name'>

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().limit(50).lean()
  res.json({ teams })
})

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().sort({ date: -1 }).limit(100).lean()
  res.json({ activities })
})

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().limit(50).lean()
  res.json({ workouts })
})

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await Activity.aggregate([
    {
      $group: {
        _id: '$userId',
        totalCalories: { $sum: '$caloriesBurned' },
        totalMinutes: { $sum: '$durationMinutes' },
        activityCount: { $sum: 1 }
      }
    },
    { $sort: { totalCalories: -1, totalMinutes: -1 } },
    { $limit: 10 }
  ])

  const enriched = await Promise.all(
    leaderboard.map(async (entry) => {
      const user = await User.findById(entry._id).lean<UserSummary | null>()
      return {
        userId: entry._id,
        userName: user?.name ?? 'Unknown',
        totalCalories: entry.totalCalories,
        totalMinutes: entry.totalMinutes,
        activityCount: entry.activityCount
      }
    })
  )

  res.json({ leaderboard: enriched })
})

app.listen(PORT, HOST, () => {
  console.log(`Server running on ${API_BASE_URL}`)
})
