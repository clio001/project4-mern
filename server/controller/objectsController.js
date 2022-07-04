import Object from "../models/objectModel.js";
import User from "../models/userModel.js";

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

// * POST new object

const postNewObject = async (request, response) => {
  try {
    const existingObject = await Object.exists({ title: request.body.title });
    if (existingObject) {
      response.status(409).json({
        message: "ERROR: Object already exists.",
      });
      console.log("ERROR: Object already exists.");
    } else {
      const newObject = {
        title: request.body.title,
        description: request.body.description,
        date: request.body.date,
        creator: request.body.creator,
        type: request.body.type,
        archive: request.body.archive,
        rights: request.body.rights,
        web_url: request.body.web_url,
        image_url: request.body.image_url,
        comments: [],
      };
      const result = await Object.create(newObject);

      console.log("SUCESS: New object created.");

      const resultUserUpdate = await User.findByIdAndUpdate(
        request.body.user_id,
        { $push: { object: newObject } }
      );
      response.status(201).json({
        message: "SUCCESS: New object created and added to user profile.",
        result,
        resultUserUpdate,
      });
    }
  } catch (error) {
    response.status(400).json({
      message: "ERROR: Unable to add new object.",
      error: error,
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

export { getAllObjects, postNewObject, getComments, postComment };
