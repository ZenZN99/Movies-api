import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connection MongoDB");
  } catch (error) {
    console.log("Fail MongoDB", error);
  }
}
