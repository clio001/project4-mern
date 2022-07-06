import express from "express";
import {
  createComment,
  getAllComments,
} from "../controller/commentsController.js";

const router = express.Router();

// * Get all comments
router.get("/all-comments", getAllComments);

// * Create new comment in comments collection
router.post("/create-comment", createComment);

export default router;
