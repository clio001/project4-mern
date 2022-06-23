import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  /*   users: {
    type: String,
  }, */
  organization: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },

  /*   imgPath: {
    type: String,
  }, */
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
