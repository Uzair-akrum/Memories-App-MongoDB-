import { ObjectId } from "mongodb";

interface IComment {
  postid: ObjectId;
  commentText: string;
  userid: ObjectId;
}
export { IComment };
