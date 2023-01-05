import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import connectDB from "@config/db";
import routesIndex from "@root/routes/routesIndex";
import formDataExcepter from "@root/controllers/formDataExcepter";
import { createServer } from "http";

import { Server } from "socket.io";
import cors from "cors";
dotenv.config();
const app = express();

export const httpServer = createServer(app);
app.use(formDataExcepter(express.json()));
app.use(cors({ origin: "*" }));
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

routesIndex(app);
httpServer.listen(process.env.PORT, async () => {
  connectDB();

  console.log(`Server Runing on ${process.env.PORT}`);
});
