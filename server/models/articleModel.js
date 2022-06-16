import mongoose from "mongoose";
const { Schema } = mongoose;

const articleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
