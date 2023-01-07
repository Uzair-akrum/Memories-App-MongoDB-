import { NextFunction, Response } from "express";
import response from "@root/utils/response";
import ICustomSchemaReq from "@root/types/schema";
import { IError } from "@root/types/error";
import { parseForm } from "@root/utils/parseForm";
import { IForm } from "@root/types/post";
import { IUser } from "@root/types/user";
import Joi from "joi";
import IQuery from "@root/types/query";
const validate =
  (schema: Joi.Schema, type?: string) =>
  async (req: ICustomSchemaReq, res: Response, next: NextFunction) => {
    if (req.method == "DELETE") {
      next();
      return;
    }
    let body: IForm | IUser = req.body;
    const query: IQuery = req.query;
    if (type == "post") {
      body = await parseForm(req, res);
    }

    try {
      await schema.validateAsync(type == "query" ? query : body);
      res.locals.body = body;
      next();
    } catch (err) {
      if (err instanceof IError) {
        return response(res, err.status, `${err.msg}`, false, [], false);
      } else if (err instanceof Error) {
        return response(res, 400, `${err}`, false, [], true);
      }
    }
  };

export default validate;
