import User from "../models/userModel.js";
import encryptPassword from "../utils/encryptedPassword.js";
import { verifyPassword } from "../utils/encryptedPassword.js";
import { issueToken } from "../utils/jwt.js";
import passport from "passport";
import GoogleStrategy from "passport-google-oidc";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// * loading .env file
dotenv.config();

// * Function to retrieve all users
const findAllUsers = async (request, response) => {
  console.log(request.params);
  try {
    const users = await User.find({});
    response.status(200).json(users);
    /* console.log(users); */
  } catch (error) {
    response.status(400).json({
      error: error,
      message: "Unable to retrieve all users from '/data' endpoint.",
    });
  }
};

// * Function to retrieve all users by role
const findUsersByRole = async (request, response) => {
  try {
    const usersByRole = await User.find({ role: request.params.role }).exec();
    if (usersByRole.length === 0) {
      response.status(404).json({ message: "No users with this role." });
    } else {
      response.status(200).json({ usersByRole, number: usersByRole.length });
      console.log("Users by role: ", usersByRole);
    }
  } catch (error) {
    response.status(400).json({
      error: error,
      message: "Unable to retrieve users by role from '/role' endpoint.",
    });
  }
};

// * Function to query database by role (params) and first name (query parameter)
const queryUsersByRole = async (request, response) => {
  console.log(request.query);
  const name = request.query.firstName;
  if (name) {
    const usersByRole = await User.find({
      role: request.params.role,
      firstName: name,
    });
    response.status(200).json(usersByRole);
  } else {
    response.status(204).json({ message: "No users found by role and name" });
  }
};

// * Function to sign up new users
const signUp = async (request, response) => {
  try {
    console.log("request.body", request.body);
    // * Check if user already exists

    const existingUser = await User.findOne({ email: request.body.email });
    if (existingUser) {
      response.status(409).json({ message: "User already exists." });
    } else {
      // * Pass user password into encryption and assign encrypted password to variable "hashedPassword"
      const hashedPassword = await encryptPassword(request.body.password);
      console.log("hashed password", hashedPassword);

      // * Create new user object
      const newUser = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        organization: request.body.organization,
        password: hashedPassword,
        role: request.body.role,
        project: request.body.project,
        createdAt: new Date(),
      });
      console.log("New user created.");

      // * Save new user object by using the Mongoose .save()
      try {
        const savedUser = await newUser.save();
        response.status(201).json({
          user: {
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            organization: savedUser.organization,
            role: savedUser.role,
            project: savedUser.project,
            createdAt: savedUser.createdAt,
          },
          message: "User saved in MongoDB!",
        });
      } catch (error) {
        response
          .status(409)
          .json({ message: "Error saving new user.", error: error });
      }
    }
  } catch (error) {
    response.json({
      message: "ERROR: User could not be signed up.",
      error: error,
    });
  }
};

// * LOGIN

const logIn = async (request, response) => {
  const existingUser = await User.findOne({ email: request.body.email });
  if (!existingUser) {
    response
      .status(401)
      .json({ message: "ERROR: User does not exist. Please register first." });
  } else {
    console.log("User exists. Proceeding with password verification ...");
    const verified = await verifyPassword(
      request.body.password,
      existingUser.password
    );
    console.log("User password (hashed): ", existingUser.password);
    console.log("User password (plain): ", request.body.password);
    if (!verified) {
      response.status(401).json({ message: "ERROR: Password incorrect." });
      console.log("ERROR: Password did not match.");
    } else {
      console.log(
        "SUCCESS: Password matched. Proceeding with issuing token ..."
      );
      const token = issueToken(existingUser.id);
      response.status(200).json({
        message: "SUCCESS: User password verified. Token issued.",
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          project: existingUser.project,
          _id: existingUser.id,
          object: existingUser.object,
          comments: existingUser.comments,
          token: token,
        },
      });
      console.log("SUCCESS: Token issued.");
      console.log("ExistingUser ID: ", existingUser.id);
    }
  }
};

// * Authorizing

const getProfile = async (request, response) => {
  const populateUser = await User.findOne({ _id: request.user.id })
    .populate({
      path: "comments",
      select: ["author", "body", "object_id"],
    })
    .populate({
      path: "object",
      select: [
        "_id",
        "title",
        "description",
        "date",
        "creator",
        "type",
        "archive",
        "rights",
        "web_url",
        "image_url",
        "comments",
        "likes",
        "createdAt",
        "updatedAt",
      ],
    })
    .populate({
      path: "bookmarks",
      select: ["_id", "user_id", "object_id", "createdAt", "updatedAt"],
    })
    .populate({
      path: "bookmarks",
      populate: {
        path: "object_id",
        model: "Object",
      },
    })
    .populate({
      path: "bookmarks",
      populate: {
        path: "user_id",
        model: "User",
      },
    });

  response.status(200).json({
    user: populateUser,
  });
};

// * Delete user account

const deleteUser = async (request, response) => {
  const existingUser = await User.findOne({ email: request.body.email });
  if (existingUser) {
    console.log("ExistingUser from deleteUser", existingUser);
    try {
      const result = await User.deleteOne({ email: request.body.email });
      console.log("Result from account deletion: ", result);
      response.status(200).json({
        message: "SUCCESS: User account deleted.",
        result: result,
      });
    } catch (error) {
      response.status(404).json({
        message: "ERROR: User exists but unable to delete account.",
        error: error,
      });
    }
  } else {
    response.status(410).json({
      message:
        "ERROR: User email does not exist in database. Could not delete user.",
    });
  }
};

// * Update account information

const updateAccount = async (request, response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(request.body.id, {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      organization: request.body.organization,
      role: request.body.role,
      project: request.body.project,
    });
    response.status(200).json({
      message: "SUCCESS: User info updated.",
      user: updatedUser,
    });
  } catch (error) {
    response.status(400).json({
      message: "ERROR: Unable to update account information.",
    });
  }
};

// * Function to populate specific user with project data
const findUserByName = async (request, response) => {
  try {
    const user = await User.findOne({ firstName: "Juano" })
      .populate({
        path: "project",
        select: ["name"],
      })
      .exec();
    response.status(200).json(user);
  } catch (error) {
    response.status(400).json({
      error: error,
      message: "Unable to find user by name and populate with project data.",
    });
  }
};

const googleLogin = async (request, response) => {};

// * Image upload

const imageUpload = async (request, response) => {
  console.log("request.body", request.body);
  try {
    console.log("request.file", request.file); // Multer stores the file in the request.file property
    const resultUpload = await cloudinary.uploader.upload(request.file.path, {
      folder: "docHub-avatars",
    });
    console.log("Result of image upload: ", resultUpload);

    const resultUser = await User.findByIdAndUpdate(request.body.user_id, {
      avatar_url: resultUpload.url,
    });

    response.status(200).json({
      message: "SUCCESS: Image successfully uploaded.",
      image_URL: resultUpload.url,
      resultUser,
    });
  } catch (error) {
    response.status(500).json({
      message: "ERROR: Image not uploaded.",
      error,
    });
  }
};

export {
  findAllUsers,
  findUsersByRole,
  queryUsersByRole,
  findUserByName,
  signUp,
  logIn,
  googleLogin,
  getProfile,
  deleteUser,
  updateAccount,
  imageUpload,
};
