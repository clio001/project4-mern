import express from "express";
import {
  findAllUsers,
  findUserByName,
  findUsersByRole,
  queryUsersByRole,
  signUp,
  logIn,
} from "../controller/usersController.js";
// import User from "../models/userModel.js";

const router = express.Router();

// * TEST endpoint
router.get("/test", (request, response) => {
  response.send({ response: "Access to test route successful!" });
});

// * FIND ALL USERS endpoint
router.get("/all", findAllUsers);

// * FIND USERS by role
router.get("/:role", queryUsersByRole);

// * SIGNUP route for new users
router.post("/signup", signUp);

// * LOGIN route

router.post("/login", logIn);

export default router;
