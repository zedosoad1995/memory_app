import { Router } from "express";
import { createUserSchema, updateUserSchema } from "../config/schemas/user";
import { createOne, updateOne } from "../controllers/users.controller";
import { checkAuth } from "../middlewares/auth";
import { validateForm } from "../middlewares/validateForm";

const router = Router();

router.post("/", validateForm(createUserSchema), createOne);
router.patch("/me", checkAuth, validateForm(updateUserSchema), updateOne);

export default router;
