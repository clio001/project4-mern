import express, { response } from "express";
import passport from "passport";
import { multerUploads } from "../middlewares/multer.js";
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
  googleLogin,
  imageUpload,
} from "../controller/usersController.js";
import jwtAuth, { googleAuth } from "../utils/jwtAuth.js";
// import User from "../models/userModel.js";

const router = express.Router();

// * TEST endpoint
router.get("/test", (request, response) => {
  response.send({ response: "Access to test route successful!" });
});

// * GET user information
router.get("/all", findAllUsers);
router.get("/profile", jwtAuth, getProfile);

// * Others
router.get("/foo/:role", queryUsersByRole);

// * Image upload
router.post("/upload-image", multerUploads.single("image"), imageUpload);

// * Account endpoints
router.post("/signup", signUp);
router.post("/login", logIn);
router.patch("/update-profile", updateAccount);
router.delete("/delete", deleteUser);

// * Google login endpoints

router.get("/failure", (req, res) => res.send("Failure!"));
router.get("/success", (req, res) => res.send("Success!"));
router.get(
  "/google-login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failure" }),
  function (request, response) {
    // succesfull authentication: redirect to help page
    response.redirect("/success");
  }
);

router.get("/logout", (request, response) => {
  request.session = null;
  request.logout();
  response.redirect("/");
});

export default router;
