import express, {Request, Response } from "express";
import cors from "cors"
import { router } from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFoundRouteHandler from './middlewares/notFoundRouteHandler';

export const app = express();

app.use(express.json())
app.use(cors())

app.use("/api/v1/", router)



app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "The PH Tour Management is coming!!!",
  });
});

app.use(globalErrorHandler);

app.use(notFoundRouteHandler)
