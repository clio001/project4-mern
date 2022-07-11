import express from "express";
import { multerUploads } from "../middlewares/multer.js";
import {
  getAllObjects,
  getComments,
  postComment,
  postNewObject,
  getObjectByID,
  uploadImage,
} from "../controller/objectsController.js";

const router = express.Router();

router.get("/all", getAllObjects);
router.get("/single-object/:id", getObjectByID);

router.post("/object-comments", getComments);
router.post("/post-comment", postComment);
router.post("/new-object", postNewObject);
router.post("/upload-image", multerUploads.single("image"), uploadImage);

export default router;
