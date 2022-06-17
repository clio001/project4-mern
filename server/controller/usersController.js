import User from "../models/userModel.js";

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
      response.status(204).json({ message: "No users with this role." });
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

export { findAllUsers, findUsersByRole, queryUsersByRole, findUserByName };
