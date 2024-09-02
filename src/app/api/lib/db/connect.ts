
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_LOCAL_DB; // Use your Atlas URI or local DB URI

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

// Track connection state using mongoose's internal state
const connect = async () => {
  if (mongoose.connection.readyState >= 1) {
    // `1` means mongoose is already connected
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    // Use a single mongoose.connect() call with your connection string
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB!');
    return "Connected to database"
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return error
  }
};

export default connect;

