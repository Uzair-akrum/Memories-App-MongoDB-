import express from "express";
import {
  createUser,
  getPostsByUser,
  deleteUser,
  updateUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteAllUsers,
} from "@root/controllers/userController";
import paginate from "@root/middlewares/paginate";
import { userSchema, updateUerSchema } from "@root/middlewares/joiSchema";
import validate from "@root/middlewares/validate";
import { auth } from "@root/middlewares/auth";
const router = express.Router();

router.get("/:id", getUser);
router.get("/posts/:id", getPostsByUser);
router.delete("/", deleteAllUsers);
``
router.get("/", getAllUsers, paginate());
router.post("/", validate(userSchema), createUser);

router.post("/login", loginUser);
router.use(auth);
router.delete("/delete", deleteUser);

router.post("/update", validate(updateUerSchema), updateUser);

export default router;
