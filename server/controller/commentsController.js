import Comment from "../models/commentModel.js";
import Object from "../models/objectModel.js";

// * POST to create new commment in comments collection

const createComment = async (request, response) => {
  try {
    const result = await Comment.create({
      author: request.body.author,
      body: request.body.comment,
      object_id: request.body.object_id,
    });

    const resultPopulate = await Object.findOne({ _id: request.body.object_id })
      .populate({
        path: "comments",
        select: ["author"],
      })
      .exec();

    response.status(200).json({
      message: "Success: Comment added to comments collection.",
    });
  } catch (error) {
    response.status(400).json({
      message: "ERROR: Unable to create new comment in comments collection.",
      error: error,
    });
  }
};

export { createComment };
