import express from "express";
import { findAllArticles } from "../controller/articlesController.js";

const router = express.Router();

// * Articles endpoint: allarticles
router.get("/all", findAllArticles);

export default router;
