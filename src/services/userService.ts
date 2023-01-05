import User from "../models/userModel";
import mongoose from "mongoose";

import { ObjectId } from "mongodb";
import { IUser, IUserPosts } from "@root/types/user";
import { IDelete } from "@root/types/deletedoc";
const createUserService = async (body: IUser): Promise<IUser> => {
  return await User.create(body);
};
const getPostsByUserService = async (id: string): Promise<IUserPosts> => {
  const userposts = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "Post",
        localField: "_id",
        foreignField: "userid",
        as: "userposts",
      },
    },
  ]);
  return userposts[0];
};
const deleteUserService = async (resid: ObjectId): Promise<IDelete> => {
  return User.deleteOne({ _id: resid });
};
const updateUserService = async (id: string, body: IUser): Promise<any> => {
  return User.updateOne({ _id: id }, body);
};

const loginUserService = async (email: string): Promise<IUser> => {
  return User.findOne({ email: email });
};
const getUserService = async (id: string): Promise<IUser> => {
  return User.findById(id);
};

export {
  createUserService,
  getPostsByUserService,
  deleteUserService,
  updateUserService,
  loginUserService,
  getUserService,
};
