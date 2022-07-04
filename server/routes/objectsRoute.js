import express from "express";
import {
  getAllObjects,
  getComments,
  postComment,
  postNewObject,
} from "../controller/objectsController.js";

const router = express.Router();

router.get("/all", getAllObjects);

router.post("/object-comments", getComments);
router.post("/post-comment", postComment);
router.post("/new-object", postNewObject);

export default router;
