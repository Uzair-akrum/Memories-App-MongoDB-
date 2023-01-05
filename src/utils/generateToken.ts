import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const generateToken = function generate(
  user: string,
  id: mongoose.Types.ObjectId
): string {
  const tokenSecret =  `${process.env.JWTTOKEN}`;

  return jwt.sign({ data: { user, id } }, tokenSecret, {
    expiresIn: process.env.EXPIRESIN,
  });
};

export default generateToken;
