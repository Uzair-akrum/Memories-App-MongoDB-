import User from "@root/models/userModel";
import { RequestHandler } from "express";
import { IUser, IResponseLocals } from "@root/types/user";
import response from "@root/utils/response";
import bcrypt from "bcryptjs";
import generateToken from "@root/utils/generateToken";
import { IError } from "@root/types/error";
import {
  createUserService,
  getPostsByUserService,
  deleteUserService,
  updateUserService,
  loginUserService,
  getUserService,
} from "@root/services/userService";
const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = User.find();
    res.locals = users;
    next();
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const createUser: RequestHandler = async (req, res) => {
  const body: IUser = req.body;

  try {
    const user: IUser = await createUserService(body);
    if (!user) throw new IError(400, "Unable to create user");
    return response(res, 201, "User Created!", true, user, false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const getPostsByUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const userPosts = await getPostsByUserService(id);
    console.log(userPosts);
    if (!userPosts) throw new IError(404, "User not Found");
    return response(res, 201, "User Posts!", true, userPosts, false);
  } catch (err: unknown) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const deleteUser: RequestHandler = async (req, res) => {
  const id: string = res.locals.data.id;

  try {
    const responseLocals: IResponseLocals = res.locals.data;
    if (!responseLocals) throw new IError(404, "User not Found!");

    await deleteUserService(responseLocals.id);
    return response(res, 202, "Deleted!", true, [], false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const deleteAllUsers: RequestHandler = async (req, res) => {
  try {
    await User.deleteMany({});

    return response(res, 202, "Deleted!", true, [], false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const updateUser: RequestHandler = async (req, res) => {
  const body: IUser = req.body;
  const id: string = res.locals.data.id;

  if (!id) throw new IError(400, "User not  Authenticated!");
  try {
    const user = await updateUserService(id, body);
    if (!user) throw new IError(404, "Unable to find User!");

    return response(res, 201, "Updated User!", true, user, false);
  } catch (err) {
    ``;
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const loginUser: RequestHandler = async (req, res) => {
  const body: IUser = req.body;
  console.log(body);
  const { email, password } = body;
  try {
    const user = await loginUserService(email);

    if (!user) throw new IError(404, "User not Found");
    const hash: string = user.password;
    console.log(hash);
    return bcrypt.compare(password, hash, function (err, result) {
      if (err) throw new Error("Password didnt Match");

      if (result) {
        return response(
          res,
          200,
          " Logged In!",
          true,

          { token: generateToken(email, user._id) },
          false
        );
      } else {
        return response(res, 400, "Unable to Log in!", true, [], false);
      }
    });
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};
const getUser: RequestHandler = async (req, res) => {
  const id: string = req.params.id;

  try {
    const user = await getUserService(id);

    if (!user) throw new IError(404, "User not Found");

    return response(res, 201, "User Found", true, user, false);
  } catch (err) {
    if (err instanceof IError) {
      return response(res, err.status, `${err.msg}`, false, [], true);
    }
    return response(res, 500, `${err}`, false, [], true);
  }
};

export {
  createUser,
  getUser,
  getPostsByUser,
  deleteUser,
  deleteAllUsers,
  updateUser,
  loginUser,
  getAllUsers,
};
