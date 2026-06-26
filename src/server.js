// server.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const MONGODB_URL = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URL);

    console.log(`mongodb connected : ${conn.connection.host}`);

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (error) {
    console.log("Mongodb connection error:", error);
  }
};

startServer();