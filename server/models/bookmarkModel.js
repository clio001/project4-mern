import mongoose from "mongoose";
const { Schema } = mongoose;

const bookmarkSchema = new Schema(
  {
    object_id: {
      type: Schema.Types.ObjectId,
      ref: "Object",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
