import mongoose from 'mongoose';

const mongoDBUrl = process.env.MONGO_URI;
mongoose.set('strictQuery', false);
export const mongoDB = () => mongoose.connect(mongoDBUrl as string);
