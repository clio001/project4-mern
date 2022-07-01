import mongoose from "mongoose";
const { Schema } = mongoose;

const objectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  creator: {
    type: String,
  },
  type: {
    type: String,
  },
  archive: {
    type: String,
  },
  rights: {
    type: String,
  },
  web_url: {
    type: String,
  },
  image_url: {
    type: String,
  },
  comments: [
    {
      body: String,
      author: String,
      date: () => Date.now(),
    },
  ],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Object = mongoose.model("object", objectSchema);
export default Object;
