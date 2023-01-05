import { Request, Response } from "express";
import formidable from "formidable";
import { join } from "path";
import * as dateFn from "date-fns";
import { mkdir, stat } from "fs/promises";
import { IFields, IFiles, IPostProgress, IForm } from "@root/types/post";
import _ from "lodash";
import { io } from "@root/index";
export const parseForm = async (
  req: Request,
  res: Response
): Promise<IForm> => {
  return new Promise(async (resolve, reject) => {
    const uploadDir: string = join(
      process.env.ROOT_DIR || process.cwd(),
      `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`
    );

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        return e;
      }
    }
    const form: formidable.form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.on("progress", (bytesReceived, bytesExpected) => {
      const progress: IPostProgress = {
        type: "progress",
        bytesReceived: bytesReceived,
        bytesExpected: bytesExpected,
      };
      io.sockets.emit("progress", progress);
    });
    form.parse(req, (err, fields: IFields, files: IFiles): void => {
      if (err) {
        res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
        reject(err);
      }

      const { image1, image2 } = _.pick(files, [
        "image1.filepath",
        "image1.originalFilename",
        "image2.filepath",
        "image2.originalFilename",
      ]);
      const { title, description, sharedFrom, tags } = fields;

      resolve({ image1, image2, title, description, sharedFrom, tags });
    });
  });
};
