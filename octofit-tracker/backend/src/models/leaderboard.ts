import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  totalCalories: { type: Number, default: 0 },
  totalMinutes: { type: Number, default: 0 },
  activityCount: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)
