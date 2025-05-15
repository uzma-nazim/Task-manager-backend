import mongoose from "mongoose";
import envVars from "./env";

const connectDB = async (): Promise<typeof mongoose | undefined> => {
  try {
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout for server selection
      socketTimeoutMS: 45000, // 45 seconds timeout for operations
    };
    const conn = await mongoose.connect(envVars.MONGO_URI, options);
    return conn;
  } catch (error) {
    throw error;
  }
};

export default connectDB;
