import express from "express";
import {
  createBookmark,
  getAllBookmarks,
  deleteBookmark,
} from "../controller/bookmarksController.js";

const router = express.Router();

// * GET all bookmarks
router.get("/all", getAllBookmarks);

// * POST a new bookmark to Bookmarks collection and update info in Objects and Users collections
router.post("/create-bookmark", createBookmark);

// * DELETE bookmark from Bookmarks, Objects, and Users collections
router.delete("/delete-bookmark", deleteBookmark);

export default router;
