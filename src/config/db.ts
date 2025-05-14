import mongoose from 'mongoose';

const connectDB = async (): Promise<typeof mongoose | undefined> => {
  try {
    // Add additional connection options for better stability
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout for server selection
      socketTimeoutMS: 45000, // 45 seconds timeout for operations
    };
    
    await mongoose.connect(process.env.MONGO_URI!, options);

    
    return mongoose;
  } catch (error) {
    
    return undefined;
  }
};

export default connectDB; 