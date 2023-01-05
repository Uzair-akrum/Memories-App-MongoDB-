import userRoutes from "@root/routes/userRoutes";
import postRoutes from "@root/routes/postRoutes";
import { Express } from "express";

const routesIndex = (app: Express) => {
  app.use("/user", userRoutes);
  app.use("/post", postRoutes);
};
export default routesIndex;
