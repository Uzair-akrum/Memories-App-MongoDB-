import { NextFunction, Request, Response } from "express";

const formDataExcepter = (fn) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (
      (req.path === "/posts" && req.method === "POST") ||
      (req.path === "/posts/:id" && req.method === "POST")
    ) {
      next();
    } else {
      fn(req, res, next);
    }
  };
};

export default formDataExcepter;
