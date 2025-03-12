import mongoose from "mongoose";
import mangoClient from "mongodb";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Use globalThis to store the cached connection
let cached: MongooseCache = (globalThis as any).mongoose || { conn: null, promise: null };

if (!cached.promise) {
  cached.promise = mongoose
    .connect(MONGODB_URI, { dbName: "zaiqa_express" })
    .then((mongooseInstance) => mongooseInstance.connection);
}

cached.conn = cached.conn || await cached.promise;
(globalThis as any).mongoose = cached;

export async function connectToDatabase() {
  return cached.conn;
}
