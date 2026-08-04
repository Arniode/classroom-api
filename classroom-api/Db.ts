import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect('mongodb://localhost:27017/classroom');
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log('Failed to connect to MongoDB', error);
    }
}