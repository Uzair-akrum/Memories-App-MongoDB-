import mongoose from "mongoose";
import User from "./userModel";
import Post from "./postModel";
import { IError } from "../types/error";
const ObjectId = mongoose.Types.ObjectId;

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    userid: {
      type: ObjectId,
      required: true,
    },
    postid: {
      type: ObjectId,
      required: true,
    },
  },
  {
    collection: "Comment",
  }
);

const Comment = mongoose.model("Comment", commentSchema);
commentSchema.path("userid").validate(async function (value: string) {
  const userExist = await User.count({ _id: value });
  if (!userExist) throw new IError(404, "User not Found againt userid");
});
commentSchema.path("postid").validate(async function (value: string) {
  const postExist = await Post.count({ _id: value });
  if (!postExist) throw new IError(404, "Post not Found againt postid");
});
export default Comment;
