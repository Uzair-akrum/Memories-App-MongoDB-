import mongoose from "mongoose";
import Comment from "./commentModel";
import Like from "./likeModel";
import { IError } from "../types/error";
import { IUserPost } from "../types/post";
const ObjectId = mongoose.Types.ObjectId;

const postSchema = new mongoose.Schema<IUserPost>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    userid: {
      type: ObjectId,
      required: true,
    },

    sharedFrom: {
      type: String,

      required: false,
    },
    tags: [
      {
        type: String,
        required: false,
      },
    ],

    image1: {
      filepath: {
        type: String,
        required: false,
      },
      originalFilename: {
        type: String,
        required: false,
      },
    },

    image2: {
      filepath: {
        type: String,
        required: false,
      },
      originalFilename: {
        type: String,
        required: false,
      },
    },
  },

  {
    collection: "Post",
  }
);
postSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    const id = this.getQuery()._id;
    await Like.deleteMany({ postid: id });
    await Comment.deleteMany({ postid: id });
    await Post.deleteMany({ sharedFrom: id });
    next();
  }
);
postSchema.pre(
  "validate",
  { document: false, query: true },
  async function (next) {
    console.log("save");
    next();
  }
);

const Post = mongoose.model("Post", postSchema);
const post = new Post();
postSchema.path("sharedFrom").validate(async function (value) {
  const valid = await Post.count({ _id: value });
  if (!valid) throw new IError(404, "Post not Found!");
});
post.validateSync();
export default Post;
