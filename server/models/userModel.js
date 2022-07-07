import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
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
  project: [
    {
      type: String,
    },
  ],
  object: [
    {
      type: Schema.Types.ObjectId,
      ref: "Object",
    },
  ],

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  avatar_url: {
    type: String,
  },
  /*   project: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    }, 
  ],*/

  role: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
