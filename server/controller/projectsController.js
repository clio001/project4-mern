import Project from "../models/projectModel.js";

const getAllProjects = async (request, response) => {
  try {
    const projects = await Project.find({});
    response.status(200).json(projects);
  } catch (error) {
    response.status(400).json({
      error: error,
      message: "Unable to retrieve all projects from '/all' endpoint",
    });
  }
};

export { getAllProjects };
