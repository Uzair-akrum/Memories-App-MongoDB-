import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  search,
  sharedBy,
  updatePost,
  likePost,
  commentPost,
  getAllPosts,
  deleteComment,
  deleteAllPosts,
} from "@root/controllers/postController";
import paginate from "@root/middlewares/paginate";
import { setSchema } from "@root/middlewares/setSchema";
import { auth } from "@root/middlewares/auth";
import validate from "@root/middlewares/validate";
import {
  postSchema,
  querySchema,
  updatePostSchema,
} from "@root/middlewares/joiSchema";
const router = express.Router();

router.get("/search", validate(querySchema, "query"), search, paginate());
router.get("/:id", setSchema("User"), getPost);
router.get("/shares/:id", sharedBy);
router.get("/", validate(querySchema, "post"), getAllPosts, paginate());
router.delete("/", deleteAllPosts);
router.use(auth);
router.post("/", validate(postSchema, "post"), createPost);
router.delete("/:id", deletePost);
router.post("/:id", validate(updatePostSchema, "post"), updatePost);
router.post("/like/:id", likePost);
router.post("/comment/:id", commentPost);
router.delete("/comment/:id", deleteComment);
export default router;
