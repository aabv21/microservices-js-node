import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: Object,
    slug: String,
    public: { type: Boolean, default: false },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

Post.ensureIndexes();
Post.syncIndexes();

export default Post;
