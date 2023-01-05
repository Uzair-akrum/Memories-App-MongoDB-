import { Response } from "express";

const response = (
  res: Response,
  status: number,
  msg: string,
  success: boolean,
  body: object,
  err: boolean
): Response => {
  return res.status(status).json({
    msg: msg,
    success: success,
    body: body,
    err: err,
  });
};
export default response;
