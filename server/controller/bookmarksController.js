import User from "../models/userModel.js";
import Object from "../models/objectModel.js";
import Bookmark from "../models/bookmarkModel.js";

// * GET all bookmarks

const getAllBookmarks = async (request, response) => {
  try {
    const result = await Bookmark.find({});
    response.status(200).json({
      message: "SUCCESS: All bookmarks retrieved.",
      number: result.length,
      result,
    });
  } catch (error) {
    response.status(404).json({
      message: "ERROR: Unable to find bookmarks.",
      error: error,
    });
  }
};

// * POST create new bookmark in Bookmarks collection and update in Objects and Users collections

const createBookmark = async (request, response) => {
  try {
    // ? Create bookmark in Bookmarks collection
    const result = await Bookmark.create({
      object_id: request.body.object_id,
      user_id: request.body.user_id,
    });

    // ? Update Objects collection
    const resultUpdateObj = await Object.findByIdAndUpdate(
      request.body.object_id,
      {
        $push: { bookmarks: result },
      }
    ).exec();

    // ? Update Users collection
    const resultUpdateUsers = await User.findByIdAndUpdate(
      request.body.user_id,
      {
        $push: { bookmarks: result },
      }
    ).exec();

    response.status(201).json({
      message:
        "SUCCESS: Bookmark created in Bookmarks collection. Objects and Users collection updated.",
      result,
      resultUpdateObj,
      resultUpdateUsers,
    });
  } catch (error) {
    response.status(400).json({
      message: "ERROR: Unable to create and update bookmarks.",
      error,
    });
  }
};

// * DELETE bookmark from Bookmarks, Objects, and Users collections
const deleteBookmark = async (request, response) => {
  try {
    // ? Delete in Bookmarks
    const resultDelBookmarks = await Bookmark.findByIdAndDelete(
      request.body.bookmark_id
    );

    // ? Delete in bookmarks array in Objects collection
    const resultDelObjects = await Object.updateOne(
      { _id: request.body.object_id },
      {
        $pull: { bookmarks: request.body.bookmark_id },
      }
    );

    // ? Delete in bookmarks array in Users collection
    const resultDelUsers = await User.updateOne(
      { _id: request.body.user_id },
      {
        $pull: { bookmarks: request.body.bookmark_id },
      }
    );

    response.status(200).json({
      message: "SUCCESS: Bookmark removed.",
      resultDelBookmarks,
      resultDelObjects,
      resultDelUsers,
    });
  } catch (error) {
    response.status(400).json({
      message:
        "ERROR: Unable to remove bookmark from Bookmarks, Objects, and Users collection",
      error: error,
    });
  }
};

export { getAllBookmarks, createBookmark, deleteBookmark };
