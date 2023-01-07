import { ObjectId } from "mongodb";

interface IFields {
  title: string;
  description: string;
  sharedFrom?: string;
  tags: Array<string>;
}
interface IFiles {
  image1: {
    filepath: string;
    originalFilename: string;
  };
  image2: {
    filepath: string;
    originalFilename: string;
  };
}
interface IPost extends IFields, IFiles {}
interface IUserPost extends IPost {
  userid: ObjectId;
}

interface IPostProgress {
  type: string;
  bytesReceived: string;
  bytesExpected: string;
}

interface IForm {
  title: string;
  description: string;

  sharedFrom: string;
  tags: Array<string>;

  image1: {
    filepath: string;
    originalFilename: string;
  };
  image2: {
    filepath: string;
    originalFilename: string;
  };
}
interface IFormExt extends IForm {
  userid: string;
}
export { IPost, IUserPost, IPostProgress, IForm, IFormExt, IFields, IFiles };
