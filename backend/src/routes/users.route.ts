import { Router } from "express";
import { createUserSchema } from "../config/schemas/user";
import { createOne } from "../controllers/users.controller";
import { validateForm } from "../middlewares/validateForm";

const router = Router();

router.post("/", validateForm(createUserSchema), createOne);

export default router;
