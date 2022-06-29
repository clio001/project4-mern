import express from "express";
import {
  findAllUsers,
  findUserByName,
  findUsersByRole,
  queryUsersByRole,
  signUp,
  logIn,
  getProfile,
  deleteUser,
  updateAccount,
} from "../controller/usersController.js";
import jwtAuth from "../utils/jwtAuth.js";
// import User from "../models/userModel.js";

const router = express.Router();

// * TEST endpoint
router.get("/test", (request, response) => {
  response.send({ response: "Access to test route successful!" });
});

// * DOCHUB ENDPOINTS

router.get("/all", findAllUsers);
router.get("/profile", jwtAuth, getProfile);
router.get("/foo/:role", queryUsersByRole);

router.post("/signup", signUp);
router.post("/login", logIn);

router.put("/update-profile", updateAccount);

router.delete("/delete", deleteUser);

export default router;
