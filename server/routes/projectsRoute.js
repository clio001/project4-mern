import express from "express";
import { getAllProjects } from "../controller/projectsController.js";

const router = express.Router();

// * Endpoint for all projects

router.get("/all", getAllProjects);

export default router;
