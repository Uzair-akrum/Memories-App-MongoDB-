import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  try {
 
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {});
    console.log('mongoe')

    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
     console.error(`Error  ${error}`);
    process.exit(1);
  }
};

export default connectDB;
