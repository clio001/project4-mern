import express from "express";
import { findAllArticles } from "../controller/articlesController.js";

const router = express.Router();

// * Articles endpoint: allarticles
router.get("/allarticles", findAllArticles);

export default router;
