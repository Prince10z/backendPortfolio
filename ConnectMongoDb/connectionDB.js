import mongoose from "mongoose";
async function connectDB(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully!");
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
  }
}

export default connectDB;
