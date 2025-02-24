import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/QuickCart`, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((err) => {
        console.error("Database connection error:", err);
        throw new Error("Failed to connect to MongoDB");
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset promise to allow retrying
    throw error;
  }
}

export default connectDB;
