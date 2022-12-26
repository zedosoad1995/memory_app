import express, { Request, Response, NextFunction } from "express";
//import routes from "./routes";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(400).json({ message: err });
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
