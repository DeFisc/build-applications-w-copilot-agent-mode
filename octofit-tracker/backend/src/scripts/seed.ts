import mongoose from 'mongoose'
import { User, Team, Activity, Workout, Leaderboard } from '../models/index.js'
import { getMongoDBUri } from '../database.js'

const MONGODB_URI = getMongoDBUri()

async function seed() {
  console.log('Seed the octofit_db database with test data')

  await mongoose.connect(MONGODB_URI)

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  const users = await User.create([
    { name: 'Ava Walker', email: 'ava.walker@octofit.com' },
    { name: 'Noah Chen', email: 'noah.chen@octofit.com' },
    { name: 'Mila Thompson', email: 'mila.thompson@octofit.com' }
  ])

  const teams = await Team.create([
    { name: 'Team Horizon', memberIds: [users[0]._id.toString(), users[1]._id.toString()] },
    { name: 'Team Pulse', memberIds: [users[2]._id.toString()] }
  ])

  const workouts = await Workout.create([
    {
      title: 'Morning Mobility Flow',
      description: 'A refreshing sequence of dynamic stretches for the whole body.',
      muscles: ['shoulders', 'core', 'hips'],
      difficulty: 'easy'
    },
    {
      title: 'Strength & Cardio Circuit',
      description: 'High-energy circuit training to build strength and endurance.',
      muscles: ['legs', 'chest', 'back'],
      difficulty: 'hard'
    },
    {
      title: 'Recovery Yoga',
      description: 'Gentle yoga practice to help muscles recover and improve flexibility.',
      muscles: ['core', 'hamstrings', 'glutes'],
      difficulty: 'moderate'
    }
  ])

  const activities = await Activity.create([
    {
      userId: users[0]._id.toString(),
      type: 'Running',
      durationMinutes: 32,
      caloriesBurned: 380,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
      userId: users[1]._id.toString(),
      type: 'Cycling',
      durationMinutes: 48,
      caloriesBurned: 520,
      date: new Date(Date.now() - 1000 * 60 * 60 * 48)
    },
    {
      userId: users[2]._id.toString(),
      type: 'Strength Training',
      durationMinutes: 55,
      caloriesBurned: 610,
      date: new Date(Date.now() - 1000 * 60 * 60 * 72)
    },
    {
      userId: users[0]._id.toString(),
      type: 'Yoga',
      durationMinutes: 28,
      caloriesBurned: 180,
      date: new Date(Date.now() - 1000 * 60 * 60 * 12)
    }
  ])

  const leaderboardEntries = users.map((user, index) => ({
    userId: user._id.toString(),
    userName: user.name,
    totalCalories: activities.filter((activity) => activity.userId === user._id.toString()).reduce((sum, activity) => sum + activity.caloriesBurned, 0),
    totalMinutes: activities.filter((activity) => activity.userId === user._id.toString()).reduce((sum, activity) => sum + activity.durationMinutes, 0),
    activityCount: activities.filter((activity) => activity.userId === user._id.toString()).length,
    rank: index + 1
  }))

  await Leaderboard.create(leaderboardEntries)

  console.log('Seeded users:', users.length)
  console.log('Seeded teams:', teams.length)
  console.log('Seeded workouts:', workouts.length)
  console.log('Seeded activities:', activities.length)
  console.log('Seeded leaderboard entries:', leaderboardEntries.length)

  await mongoose.disconnect()
  console.log('Seed complete')
}

seed()
  .catch((err) => {
    console.error('Seed script error:', err)
    process.exit(1)
  })
