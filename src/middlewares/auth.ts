import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestHandler } from "express";
import dotenv from "dotenv";
import response from "@root/utils/response";
dotenv.config();
const jwtsec = "jwttoken";

export const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req
      .header("Authorization")
      ?.replace("Bearer ", "")
      .slice(2, -1);

    if (!token) throw new Error();
    const decoded:any= jwt.verify(token, jwtsec);
    console.log(decoded);
    res.locals = decoded;

    next();
  } catch (err) {
    console.log(err);
    return response(res, 401, "Please Authenticate", false, [], true);
  }
};
