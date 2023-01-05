import mongoose from "mongoose";
import Post from "@root/models/postModel";
import Like from "@root/models/likeModel";
import Comment from "@root/models/commentModel";
import { IFormExt, IPost, IUserPost } from "@root/types/post";
import { ObjectId } from "mongodb";
import { IComment } from "@root/types/comment";

import { IDelete } from "@root/types/deletedoc";
const createPostService = async (body: IUserPost): Promise<IUserPost> => {
  return await Post.create(body);
};
const deletePostService = async (
  id: string,
  userid: ObjectId
): Promise<IDelete> => {
  return await Post.deleteOne({ _id: id, userid });
};
const searchPostservice = (word: any): Promise<IUserPost[]> => {
  const posts = Post.find({
    $or: [
      { title: { $regex: `${word}`, $options: "i" } },
      { description: { $regex: `${word}`, $options: "i" } },
      { tags: { $regex: `${word}`, $options: "i" } },
    ],
  });
  return posts[0];
};
const updatePostService = async (
  userid: ObjectId,
  body: IPost,
  postid: string
) => {
  return await Post.updateOne({ _id: postid, userid: userid }, body);
};
const getPostservice = async (id: string) => {
  return await Post.aggregate([
    {
      $lookup: {
        from: "Like",
        localField: "_id",
        foreignField: "postid",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "Comment",
        localField: "_id",
        foreignField: "postid",
        as: "comments",
      },
    },
    { $addFields: { likesCount: { $size: "$likes" } } },
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
  ]);
};
const getPostsByUserService = async (userid: string) => {
  return await Post.find({ userid: userid });
};
const sharedByService = async (shareid: string) => {
  return await Post.find({ sharedFrom: shareid });
};
const likePostService = async (id: string, postid: string): Promise<any> => {
  return await Like.create({ userid: id, postid });
};
const commentPostService = async (
  id: string,
  commentText: string,
  postid: string
): Promise<any> => {
  const comment = await Comment.create({
    userid: id,
    commentText,
    postid,
  });
  console.log(comment);
  return comment;
};
const deleteCommentService = async (
  userid: string,
  commentId: string
): Promise<IDelete> => {
  const del = await Comment.deleteOne({ _id: commentId, userid });
  console.log(del);
  return del;
};
const unlikeService = async (
  userid: string,
  postid: string
): Promise<IDelete> => {
  return await Like.deleteOne({
    $and: [{ userid: userid }, { postid: postid }],
  });
};
export {
  createPostService,
  deletePostService,
  searchPostservice,
  updatePostService,
  getPostservice,
  getPostsByUserService,
  sharedByService,
  likePostService,
  commentPostService,
  deleteCommentService,
  unlikeService,
};
