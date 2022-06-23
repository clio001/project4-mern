import Project from "../models/projectModel.js";

// * Function to GET all projects

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

// * Function to POST new projects

const createProject = async (request, response) => {
  try {
    console.log("Request body: ", request.body);
    // * Check if project already exists
    const existingProject = await Project.findOne({
      name: request.body.name,
    });
    if (existingProject) {
      response.status(409).json({
        message:
          "The name for this project already exists. Please choose a different name.",
      });
    } else {
      // * Create new project object based on project schema
      const newProject = new Project({
        name: request.body.name,
        description: request.body.description,
        /* users: request.body.users, */
        organization: request.body.organization,
        email: request.body.email,
        website: request.body.website,
      });

      // * Save the new project object to MongoDB using Mongoose .save() method
      try {
        const savedProject = await newProject.save();
        response.status(201).json({
          project: {
            name: savedProject.name,
            description: savedProject.description,
            //users: savedProject.users,
            organization: savedProject.organization,
            email: savedProject.email,
            website: savedProject.website,
          },
          message: "New project saved in MongoDB!",
        });
      } catch (error) {
        response.status(409).json({
          message: "ERROR: New project could not be saved.",
          error: error,
        });
      }
    }
  } catch (error) {
    response.json({
      message: "ERROR: New project could not be registered with the database.",
      error: error,
    });
  }
};

export { getAllProjects, createProject };
