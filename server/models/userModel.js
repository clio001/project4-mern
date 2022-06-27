import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  /*   imgPath: {
    type: String,
  }, */
  /*   project: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    }, 
  ],*/

  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
