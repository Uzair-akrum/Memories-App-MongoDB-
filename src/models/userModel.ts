import mongoose from "mongoose";
import Comment from "./commentModel";
import Like from "./likeModel";
import Post from "./postModel";
import { IUser } from "../types/user";
import hashed from "@root/utils/passwordHash";

export interface UserDocument extends mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },

  {
    collection: "User",
  }
);
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.email;
  },
});
userSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function async(next) {
    const id = this.getQuery()._id;
    console.log("deleteMany", id);

    await Post.deleteMany({ userid: id });
    await Comment.deleteMany({ userid: id });
    await Like.deleteMany({ userid: id });

    next();
  }
);
userSchema.pre("save", async function (this: UserDocument, next) {
  if (this.isModified("password")) {
    const hash = await hashed(this.get("password"));
    this.set("password", hash);
  }

  next();
});
userSchema.pre("updateOne", async function (this: UserDocument, next) {
  if (this.get("password")) {
    const hash = await hashed(this.get("password"));
    this.set("password", hash);
  }

  next();
});

const User = mongoose.model("User", userSchema);
export default User;
