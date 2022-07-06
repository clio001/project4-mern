import express from "express";
import { createComment } from "../controller/commentsController.js";

const router = express.Router();

// * Create new comment in comments collection
router.post("/create-comment", createComment);

export default router;
