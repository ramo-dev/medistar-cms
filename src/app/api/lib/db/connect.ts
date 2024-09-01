import mongoose from "mongoose";



let isConnected = false;

export const connect = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    // change local to your atlas uri
    await mongoose.connect(process.env.MONGO_LOCAL_DB);
    isConnected = true;
    console.log('Connected to MongoDB!');
  } catch (error) {
    isConnected = false;
    console.error('Error connecting to MongoDB:', error);
  }
};

