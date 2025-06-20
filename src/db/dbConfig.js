import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export default connectDb;
