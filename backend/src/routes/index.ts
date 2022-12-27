import { Router } from "express";
import usersRoute from "./users.route";
import authRoute from "./auth.route";
import wordsRoute from "./words.route";

const api = Router()
  .use("/users", usersRoute)
  .use("/auth", authRoute)
  .use("/words", wordsRoute);

export default Router().use("/api", api);
