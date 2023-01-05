import { RequestHandler } from "express";
import Post from "@root/models/postModel";
import response from "@root/utils/response";
import Like from "@root/models/likeModel";
import { IResponseLocals } from "@root/types/user";
import { IError } from "@root/types/error";
import { IComment } from "@root/types/comment";

import {
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
} from "@root/services/postService";
import {  IUserPost } from "../types/post";

const createPost: RequestHandler = async (req, res) => {
  const body: IUserPost = res.locals.body;
  body.userid = res.locals.data.id;

  try {
    const post: IUserPost = await createPostService(body);
    if (!post) throw new IError(400, "Unable to Create Post!");
    return response(res, 200, "Post Created", true, post, false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const deletePost: RequestHandler = async (req, res) => {
  const id: string = req.params.id;

  const responseLocals: IResponseLocals = res.locals.data;
  try {
    await deletePostService(id, responseLocals.id);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const deleteAllPosts: RequestHandler = async (req, res) => {
  try {
    await Post.deleteMany({});
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const getAllPosts: RequestHandler = async (req, res, next) => {
  try {
    res.locals = Post.find();
    next();
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const search: RequestHandler = async (req, res, next) => {
  const { word } = req.query;
  try {
    const posts = searchPostservice(word);
    res.locals = posts;
    next();
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const updatePost: RequestHandler = async (req, res) => {
  const body: IUserPost = res.locals.body;
  const postid = req.params.id;

  try {
    const responseLocals: IResponseLocals = res.locals.data;

    const post = await updatePostService(responseLocals.id, body, postid);
    return res.json(post);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const getPost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPostservice(id);
    if (!post) throw new Error("Not able to get post");

    return response(res, 201, "", true, post, false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const getPostByUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await getPostsByUserService(id);
    if (!posts) throw new Error("No Posts by User");
    return response(res, 200, "Posts by User", true, posts, false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};

const sharedBy: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await sharedByService(id);
    return response(res, 201, "All Shares", true, posts, false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const likePost: RequestHandler = async (req, res) => {
  const id: string = res.locals.data.id;

  const postid: string = req.params.id;
  try {
    if (!(await unlikeService(id, postid))) {
      await likePostService(id, postid);
      await Like.create({ userid: id, postid });
      return response(res, 201, " Liked", true, [], false);
    }
    return response(res, 201, "UnLiked", true, [], false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const commentPost: RequestHandler = async (req, res) => {
  const userid: string = res.locals.data.id;
  const postid: string = req.params.id;
  const body: IComment = req.body;

  try {
    const comment = await commentPostService(userid, body.commentText, postid);
    return response(res, 201, "", true, comment, false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const deleteComment: RequestHandler = async (req, res) => {
  const id: string = res.locals.data.id;
  const commentId: string = req.params.id;
  try {
    await deleteCommentService(id, commentId);
    return response(res, 201, "Deleted", true, [], false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
export {
  createPost,
  deletePost,
  search,
  updatePost,
  sharedBy,
  getPost,
  getPostByUser,
  likePost,
  commentPost,
  getAllPosts,
  deleteComment,
  deleteAllPosts
};
