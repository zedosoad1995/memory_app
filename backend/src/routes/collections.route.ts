import { Router } from "express";
import {
  createCollectionSchema,
  updateCollectionSchema,
} from "../config/schemas/collection";
import {
  createOne,
  deleteOne,
  getMany,
  updateOne,
} from "../controllers/collections.controller";
import { checkAuth } from "../middlewares/auth";
import { validateForm } from "../middlewares/validateForm";

const router = Router();

router.get("/", checkAuth, getMany);
router.post("/", checkAuth, validateForm(createCollectionSchema), createOne);
router.patch(
  "/:id",
  checkAuth,
  validateForm(updateCollectionSchema),
  updateOne
);
router.delete("/:id", checkAuth, deleteOne);

export default router;
