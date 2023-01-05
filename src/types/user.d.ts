import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { IPost } from "./post";
interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
}
interface IResponseLocals {
  user: string;
  id: ObjectId;
}
interface IResult {
  totalPages?: number;
  results?: object;
  currentPage?: number;
  limit?: number;
}

interface IUserPosts extends IUser {
 
 userposts:Array<IPost>
}
 

//  UserPosts{
// IUser,
// [IPost]

// }

export { IUser, IResponseLocals, IResult, IUserPosts };
