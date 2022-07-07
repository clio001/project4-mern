import express from "express";
import {
  createComment,
  getAllComments,
  deleteComment,
  updateComment,
} from "../controller/commentsController.js";

const router = express.Router();

// * Get all comments
router.get("/all-comments", getAllComments);

// * Create new comment in Comments, Objects and Users collection
router.post("/create-comment", createComment);

// * Update a comment in Comments, Objects and Users collection
router.post("/update-comment", updateComment);

// * Delete a comment in comments, object and user collection
router.delete("/delete-comment", deleteComment);

export default router;
