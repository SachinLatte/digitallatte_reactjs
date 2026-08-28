import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, lastFailed: 0 };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  // If connection failed within the last 15 seconds, fail instantly to avoid hanging
  if (cached.lastFailed && Date.now() - cached.lastFailed < 15000) {
    throw new Error("Database temporarily offline");
  }

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/digitallatte";
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1500, // Fail fast in 1.5s instead of hanging for 30s
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      cached.lastFailed = 0;
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    cached.lastFailed = 0;
  } catch (e) {
    cached.promise = null;
    cached.lastFailed = Date.now();
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
