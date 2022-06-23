import express from "express";
import {
  getAllProjects,
  createProject,
} from "../controller/projectsController.js";

const router = express.Router();

// * Endpoint for all projects

router.get("/all", getAllProjects);

// * Endpoint for creating new projects

router.post("/newproject", createProject);

export default router;
