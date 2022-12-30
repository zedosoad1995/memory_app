import { Router } from "express";
import { createCollectionSchema } from "../config/schemas/collection";
import {
  createOne,
  deleteOne,
  getMany,
} from "../controllers/collections.controller";
import { checkAuth } from "../middlewares/auth";
import { validateForm } from "../middlewares/validateForm";

const router = Router();

router.get("/", checkAuth, getMany);
router.post("/", checkAuth, validateForm(createCollectionSchema), createOne);
router.delete("/:id", checkAuth, deleteOne);

export default router;
