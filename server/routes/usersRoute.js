import express from "express";
import {
  findAllUsers,
  findUserByName,
  findUsersByRole,
  queryUsersByRole,
  signUp,
  logIn,
  getProfile,
} from "../controller/usersController.js";
import jwtAuth from "../utils/jwtAuth.js";
// import User from "../models/userModel.js";

const router = express.Router();

// * TEST endpoint
router.get("/test", (request, response) => {
  response.send({ response: "Access to test route successful!" });
});

router.get("/all", findAllUsers); // * FIND ALL USERS endpoint
router.get("/:role", queryUsersByRole); // * FIND USERS by role
router.post("/signup", signUp);
router.post("/login", logIn);

router.get("/profile", jwtAuth, getProfile);

export default router;
