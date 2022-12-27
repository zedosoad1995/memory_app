import { Router } from "express";
import { createWordSchema } from "../config/schemas/word";
import { createOne, getMany } from "../controllers/words.controller";
import { checkAuth } from "../middlewares/auth";
import { validateForm } from "../middlewares/validateForm";

const router = Router();

router.get("/", checkAuth, getMany);
router.post("/", checkAuth, validateForm(createWordSchema), createOne);

export default router;
