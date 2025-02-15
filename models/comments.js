const mongoose = require("mongoose");

const Post = require("./posts");

const commentSchema = new mongoose.Schema(
  {
    content: String,
    author: Object,
    post: { ref: "Post", type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

commentSchema.post("save", async function (doc) {
  await Post.findByIdAndUpdate(doc.post, {
    $push: { comments: doc._id },
  });
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
