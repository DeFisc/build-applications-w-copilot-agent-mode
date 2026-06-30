import mongoose from 'mongoose';
const activitySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
