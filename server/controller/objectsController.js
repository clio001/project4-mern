import Object from "../models/objectModel.js";

// * GET all objects

const getAllObjects = async (request, response) => {
  try {
    const allObjects = await Object.find();
    response.status(200).json({
      message: "SUCCESS: All objects found.",
      allObjects,
    });
  } catch (error) {
    response.status(404).json({
      message: "ERROR: No objects found.",
    });
  }
};

// * Retrieve comments from object

const getComments = async (request, response) => {
  const isObject = await Object.exists({ _id: request.body.id });
  if (isObject) {
    const result = await Object.where("_id")
      .equals(isObject)
      .select(
        "title creator date description type archive rights web_url image_url createdAt comments"
      );
    response.status(200).json({
      message: "SUCCESS: Comments retrieved.",
      result,
    });
  } else {
    response.status(404).json({
      message: "ERROR: Object id not found. Unable to find object comments.",
    });
    console.log("ERROR: Object id not found. Unable to find object comments.");
  }
};

// * Post user comment to object

const postComment = async (request, response) => {
  try {
    console.log("REQUEST BODY: ", request.body);
    const result = await Object.updateOne(
      { _id: request.body.id },
      {
        $push: {
          comments: {
            author: request.body.author,
            body: request.body.comment,
          },
        },
      }
    );
    response.status(200).json({
      message: "SUCCESS: New user comment added.",
      result,
    });
  } catch (error) {
    response.status(404).json({
      message: "ERROR adding new user comment.",
    });
  }
};

export { getAllObjects, getComments, postComment };
