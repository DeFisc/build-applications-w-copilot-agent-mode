import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  memberIds: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
})

export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)
