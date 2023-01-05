import { NextFunction, Response } from "express";
import ICustomSchemaReq from "@root/types/schema";

const setSchema = (text: string) => {
  return (req: ICustomSchemaReq, res: Response, next: NextFunction) => {
     req.schemaInfo = text;
    next();
  };
};
export { setSchema };
