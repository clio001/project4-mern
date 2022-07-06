import mongoose from "mongoose";
const { Schema } = mongoose;

const objectSchema = new Schema(
  {
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
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  { timestamps: true }
);

const Object = mongoose.model("Object", objectSchema);
export default Object;
