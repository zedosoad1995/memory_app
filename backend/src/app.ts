import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { HttpException } from "./helpers/exception";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.use(
  (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err.name === "HttpException" && "statusCode" in err) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    console.error(err);

    return res.status(500).json({ message: "Something went wrong" });
  }
);

process.on("uncaughtException", (err) => {
  console.error(err);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
