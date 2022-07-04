import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import passportConfig from "./config/passport.js";
import { findAllArticles } from "./controller/articlesController.js";

// * Importing routes
import usersRoute from "./routes/usersRoute.js";
import articlesRoute from "./routes/articlesRoute.js";
import projectsRoute from "./routes/projectsRoute.js";
import objectsRoute from "./routes/objectsRoute.js";

// * loading .env file
dotenv.config();

const app = express();
/* console.log("App ", app); */
const PORT = process.env.PORT || 5001;

const runServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. `);
  });
};

const loadRoutes = () => {
  app.use("/users", usersRoute);
  app.use("/projects", projectsRoute);
  app.use("/articles", articlesRoute);
  app.use("/objects", objectsRoute);

  // app.use("/teams");
  /*     app.use("/projects") PROJECTS
    app.use("/objects") OBJECTS */
};

const addMiddleware = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const corsOptions = {
    origin: "http://localhost:3000", // or '*'
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(passport.initialize());
  passportConfig(passport);
  // console.log("Passport config running: ", passportConfig(passport));
};

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connection to MongoDB established.");
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
