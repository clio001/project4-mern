import User from "../models/userModel.js";

// * Function to retrieve all users from MongoDB
const findAllUsers = async (request, response) => {
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

export { findAllUsers };
