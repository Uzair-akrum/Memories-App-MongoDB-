import mongoose from "mongoose";
import User from "./userModel";
import Post from "./postModel";
import { IError } from "../types/error";
const ObjectId = mongoose.Types.ObjectId;

const likeSchema = new mongoose.Schema(
  {
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
    collection: "Like",
  }
);

const Like = mongoose.model("Like", likeSchema);

likeSchema.path("userid").validate(async function (value: string) {
  const userExist = await User.count({ _id: value });
  if (!userExist) throw new IError(404, "User not Found againt userid");
});
likeSchema.path("postid").validate(async function (value: string) {
  const postExist = await Post.count({ _id: value });
  if (!postExist) throw new IError(404, "Post not Found againt postid");
});
export default Like;
