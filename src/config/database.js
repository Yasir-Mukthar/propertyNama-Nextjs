import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {

  if (connected) {
    console.log("already connected");
    return;
  }

  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("connected to db");
  } catch (error) {
    console.log("error connecting to db", error);
  }
};

export default connectDB;
