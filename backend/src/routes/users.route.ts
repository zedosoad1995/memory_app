import { Router } from "express";
import { createUserSchema, updateUserSchema } from "../config/schemas/user";
import {
  createOne,
  deleteOne,
  updateOne,
} from "../controllers/users.controller";
import { checkAuth } from "../middlewares/auth";
import { validateForm } from "../middlewares/validateForm";

const router = Router();

router.post("/", validateForm(createUserSchema), createOne);
router.patch("/me", checkAuth, validateForm(updateUserSchema), updateOne);
router.delete("/me", checkAuth, deleteOne);

export default router;
