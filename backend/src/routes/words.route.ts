import { Router } from "express";
import {
  createWordSchema,
  updateWordScoresSchema,
} from "../config/schemas/word";
import {
  createOne,
  getMany,
  updateScores,
} from "../controllers/words.controller";
import { checkAuth } from "../middlewares/auth";
import { validateForm } from "../middlewares/validateForm";

const router = Router();

router.get("/", checkAuth, getMany);
router.post("/", checkAuth, validateForm(createWordSchema), createOne);
router.post(
  "/scores",
  checkAuth,
  validateForm(updateWordScoresSchema),
  updateScores
);

export default router;
