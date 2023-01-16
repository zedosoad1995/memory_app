import { Router } from "express";
import {
  createWordSchema,
  updateWordSchema,
  updateWordScoresSchema,
} from "../config/schemas/word";
import {
  createOne,
  deleteOne,
  getMany,
  getOne,
  updateOne,
  updateScores,
} from "../controllers/words.controller";
import { checkAuth } from "../middlewares/auth";
import { validateForm } from "../middlewares/validateForm";

const router = Router();

router.get("/", checkAuth, getMany);
router.get("/:id", checkAuth, getOne);
router.post("/", checkAuth, validateForm(createWordSchema), createOne);
router.patch("/:id", checkAuth, validateForm(updateWordSchema), updateOne);
router.post(
  "/update_scores",
  checkAuth,
  validateForm(updateWordScoresSchema),
  updateScores
);
router.delete("/:id", checkAuth, deleteOne);

export default router;
