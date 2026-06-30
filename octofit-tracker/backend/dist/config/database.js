import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
export async function connectDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}
export function getMongoDBUri() {
    return MONGODB_URI;
}
