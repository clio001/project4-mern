import express from "express";
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

// * loading .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const runServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. `);
  });
};

const loadRoutes = () => {
  app.use("/users", usersRoute);
};

const addMiddleware = () => {
  const corsOptions = {
    origin: "http://localhost:3000", // or '*'
    credentials: true,
  };
  app.use(cors(corsOptions));
};

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connection to White Lake database established.");
  } catch (error) {
    console.log("Error trying to connect with MongoDB.", error);
  }
};

// * Self-invoked function to avoid a function call in the global scope
(async () => {
  connectToMongoDB();
  addMiddleware();
  loadRoutes();
  runServer();
})();
