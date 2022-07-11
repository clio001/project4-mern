import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import passportConfig from "./config/passport.js";
import "../server/config/passport.js";
import cookieSession from "cookie-session";
import { findAllArticles } from "./controller/articlesController.js";

// * Importing routes
import usersRoute from "./routes/usersRoute.js";
import articlesRoute from "./routes/articlesRoute.js";
import projectsRoute from "./routes/projectsRoute.js";
import objectsRoute from "./routes/objectsRoute.js";
import commentsRoute from "./routes/commentsRoute.js";
import bookmarksRoute from "./routes/bookmarksRoute.js";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";

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
  app.use("/comments", commentsRoute);
  app.use("/bookmarks", bookmarksRoute);
};

const addMiddleware = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const corsOptions = {
    origin: "http://localhost:3000", // or '*'
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(
    cookieSession({
      name: "john-session",
      keys: ["key1", "key2"],
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  passportConfig(passport);
  cloudinaryConfig();
  // console.log("Passport config running: ", passportConfig(passport));

  const isLoggedIn = (request, response, next) => {
    if (request.user) {
      next();
    } else {
      response.status(401).json({ message: "Unauthorized" });
    }
  };
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
