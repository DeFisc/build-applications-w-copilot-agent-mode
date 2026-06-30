import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  muscles: { type: [String], default: [] },
  difficulty: { type: String, default: 'moderate' },
  createdAt: { type: Date, default: Date.now }
})

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)
