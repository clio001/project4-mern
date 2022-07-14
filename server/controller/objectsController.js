import Object from "../models/objectModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

// * GET all objects

const getAllObjects = async (request, response) => {
  try {
    const allObjects = await Object.find();
    response.status(200).json({
      message: "SUCCESS: All objects found.",
      number: allObjects.length,
      allObjects,
    });
  } catch (error) {
    response.status(404).json({
      message: "ERROR: No objects found.",
      error: error,
    });
  }
};

// * GET object by ID

const getObjectByID = async (request, response) => {
  try {
    const result = await Object.findOne({ _id: request.params.id })
      .populate({
        path: "comments",
        select: ["author", "body", "user_id", "createdAt", "updatedAt"],
      })
      .populate({
        path: "bookmarks",
        select: ["_id", "user_id", "object_id", "createdAt", "updatedAt"],
      })
      .populate({
        path: "comments",
        populate: {
          path: "user_id",
          model: "User",
        },
      })
      .exec();
    console.log("Result: ", result);

    response.status(200).json({
      message: "SUCCESS: Object retrieved.",
      result,
    });
  } catch (error) {
    response.status(404).json({
      message: "ERROR: Unable to find object by id.",
      error: error,
    });
  }
};

// * POST new object

const postNewObject = async (request, response) => {
  console.log("Request body: ", request.body);
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
      const number = await Object.find();

      console.log("SUCCESS: New object created.");

      const resultUserUpdate = await User.findByIdAndUpdate(
        request.body.user_id,
        { $push: { object: result } }
      );
      response.status(201).json({
        number: number.length,
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

// * Upload object image

const uploadImage = async (request, response) => {
  console.log("Request body object img upload: ", request.body);
  try {
    console.log("Request file: ", request.file);
    const resultUpload = await cloudinary.uploader.upload(request.file.path, {
      folder: "docHub-objects",
    });

    response.status(201).json({
      message: "SUCCESS: Object image successfully uploaded.",
      resultUpload,
      image_URL: resultUpload.url,
    });
  } catch (error) {
    response.status(500).json({
      message: "ERROR: Unable to upload object image.",
      error,
    });
  }
};

// * Retrieve comments from object

const getComments = async (request, response) => {
  const isObject = await Object.exists({ _id: request.body.id });
  if (isObject) {
    const result = await Object.findOne({ _id: isObject })
      .populate({
        path: "comments",
        select: ["author", "body", "object_id", "user_id"],
      })
      .populate({
        path: "comments",
        populate: {
          path: "user_id",
          model: "User",
        },
        select: [
          "title",
          "creator",
          "date",
          "description",
          "type",
          "archive",
          "rights",
          "web_url",
          "image_url",
          "createdAt",
          "comments",
        ],
      })
      .exec();

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

export {
  getAllObjects,
  getObjectByID,
  postNewObject,
  getComments,
  postComment,
  uploadImage,
};
