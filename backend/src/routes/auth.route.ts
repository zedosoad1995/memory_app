import { Router } from "express";
import { loginSchema } from "../config/schemas/auth";
import { login } from "../controllers/auth.controller";
import { validateForm } from "../middlewares/validateForm";

const router = Router();

router.post("/login", validateForm(loginSchema), login);

export default router;
