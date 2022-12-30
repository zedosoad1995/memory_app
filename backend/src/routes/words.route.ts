import { Router } from "express";
import {
  createWordSchema,
  updateWordSchema,
  updateWordScoresSchema,
} from "../config/schemas/word";
import {
  createOne,
  deleteOne,
  getDailyWords,
  getMany,
  updateOne,
  updateScores,
} from "../controllers/words.controller";
import { checkAuth } from "../middlewares/auth";
import { validateForm } from "../middlewares/validateForm";

const router = Router();

router.get("/", checkAuth, getMany);
router.get("/daily", checkAuth, getDailyWords);
router.post("/", checkAuth, validateForm(createWordSchema), createOne);
router.patch("/:id", checkAuth, validateForm(updateWordSchema), updateOne);
router.post(
  "/scores",
  checkAuth,
  validateForm(updateWordScoresSchema),
  updateScores
);
router.delete("/:id", checkAuth, deleteOne);

export default router;
