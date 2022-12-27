import { Router } from "express";
import { createOne, getMany } from "../controllers/words.controller";
import { checkAuth } from "../middlewares/auth";

const router = Router();

router.get("/", checkAuth, getMany);
router.post("/", checkAuth, createOne);

export default router;
