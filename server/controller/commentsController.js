import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import Object from "../models/objectModel.js";

// * GET all comments

const getAllComments = async (request, response) => {
  try {
    const result = await Comment.find({});
    response.status(200).json({
      message: "SUCCESS: All comments retrieved.",
      result,
    });
  } catch (error) {
    response.status(404).json({
      message: "ERROR: Unable to retieve commments.",
      error,
    });
  }
};

// * POST to create new commment in comments collection

const createComment = async (request, response) => {
  try {
    const result = await Comment.create({
      author: request.body.author,
      body: request.body.comment,
      object_id: request.body.object_id,
      user_id: request.body.user_id,
    });

    const pushIDToObject = await Object.findByIdAndUpdate(
      request.body.object_id,
      {
        $push: { comments: result },
      }
    );

    const populateObject = await Object.findOne({ _id: request.body.object_id })
      .populate({
        path: "comments",
        select: ["author", "body", "user_id"],
      })
      .exec();

    const pushIDtoUser = await User.findByIdAndUpdate(request.body.user_id, {
      $push: { comments: result },
    });

    const populateUser = await User.findOne({
      _id: request.body.user_id,
    }).populate({
      path: "comments",
      select: ["author", "body", "object_id"],
    });

    response.status(200).json({
      message: "Success: Comment added to comments collection.",
      result,
      pushIDToObject,
      populateObject,
      pushIDtoUser,
      populateUser,
    });
  } catch (error) {
    response.status(400).json({
      message: "ERROR: Unable to create new comment in comments collection.",
      error: error,
    });
  }
};

export { createComment, getAllComments };
