import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFoundRouteHandler from "./app/middlewares/notFoundRouteHandler";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import "./app/config/passport";

export const app = express();

app.use(
  expressSession({
    secret: "your secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());

app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "The PH Tour Management is coming!!!",
  });
});

app.use(globalErrorHandler);

app.use(notFoundRouteHandler);
