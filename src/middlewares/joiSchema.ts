import Joi from "joi";
import { IUser } from "@root/types/user";
import { IFormExt } from "@root/types/post";
import IQuery from "@root/types/query";
const userSchema = Joi.object<IUser>({
  username: Joi.string().min(3).max(30).required(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(5)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const updateUerSchema = Joi.object<IUser>({
  username: Joi.string().min(3).max(30).optional(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(5)
    .optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
});
const postSchema = Joi.object<IFormExt>({
  title: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string().min(5).max(30).required(),
  tags: Joi.array().items(Joi.string()),
  sharedFrom: Joi.string(),

  userid: Joi.object({
    id: Joi.string().hex().length(24),
  }),
  image1: Joi.object({
    filepath: Joi.string(),
    originalFilename: Joi.string(),
  }),
  image2: Joi.object({
    filepath: Joi.string(),
    originalFilename: Joi.string(),
  }),
});
const querySchema = Joi.object<IQuery>({
  word: Joi.string().optional(),
  page: Joi.string().required(),
  limit: Joi.string().required(),
});

const updatePostSchema = Joi.object<IFormExt>({
  title: Joi.string().alphanum().min(3).max(30).optional(),
  description: Joi.string().min(5).max(30).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  sharedFrom: Joi.string().optional(),

  userid: Joi.object({
    id: Joi.string().hex().length(24),
  }).optional(),
  image1: Joi.object({
    filepath: Joi.string(),
    originalFilename: Joi.string(),
  }).optional(),
  image2: Joi.object({
    filepath: Joi.string(),
    originalFilename: Joi.string(),
  }).optional(),
});
export { userSchema, postSchema, querySchema, updatePostSchema ,updateUerSchema};
