import User from "../models/userModel.js";
import encryptPassword from "../utils/encryptedPassword.js";
import { verifyPassword } from "../utils/encryptedPassword.js";
import { issueToken } from "../utils/jwt.js";

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
          _id: existingUser.id,
          token: token,
        },
      });
      console.log("SUCCESS: Token issued.");
      console.log("ExistingUser ID: ", existingUser.id);
    }
  }
};

// * Authorizing

const getProfile = (request, response) => {
  console.log("getProfile user from request: ", request.user);
  response.status(200).json({
    email: request.user.email,
    firstName: request.user.firstName,
    lastName: request.user.lastName,
  });
};

export {
  findAllUsers,
  findUsersByRole,
  queryUsersByRole,
  findUserByName,
  signUp,
  logIn,
  getProfile,
};
