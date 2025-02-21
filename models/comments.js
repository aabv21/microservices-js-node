import mongoose from "mongoose";

import Post from "./posts.js";

const commentSchema = new mongoose.Schema(
  {
    content: String,
    author: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    post: {
      ref: "Post",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

commentSchema.post("save", async function (doc) {
  await Post.findByIdAndUpdate(doc.post, {
    $push: { comments: doc._id },
  });
});

Comment.ensureIndexes();
Comment.syncIndexes();

export default Comment;
