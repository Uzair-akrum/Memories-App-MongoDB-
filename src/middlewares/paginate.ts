import { Request, Response } from "express";
import response from "@root/utils/response";
import { IResult } from "@root/types/user";
import { IError } from "@root/types/error";
import IQuery from "@root/types/query";
const paginate = () => {
  return async (req: Request, res: Response) => {
    const query: IQuery = req.query as unknown as IQuery;
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const model = res.locals;
    const startIndex = (page - 1) * limit;

    const results: IResult = {};
    results.currentPage = page;
    results.limit = limit;

    results.totalPages = (await model.clone().countDocuments().exec()) / limit;
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      return response(res, 201, `All ${model}s!`, true, results, false);
    } catch (err) {
      if (err instanceof IError) {
        return response(res, err.status, `${err.msg}`, true, [], false);
      }
      return response(res, 500, `Something Went Wrong`, false, [], true);
    }
  };
};
export default paginate;
