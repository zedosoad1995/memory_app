import { Router } from "express";
import usersRoute from "./users.route";
import authRoute from "./auth.route";
import wordsRoute from "./words.route";
import collectionsRoute from "./collections.route";

const api = Router()
  .use("/users", usersRoute)
  .use("/auth", authRoute)
  .use("/words", wordsRoute)
  .use("/collections", collectionsRoute);
export default Router().use("/api", api);
