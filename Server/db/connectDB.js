import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};
export default connectDB;
