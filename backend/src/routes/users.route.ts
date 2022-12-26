import { Router } from "express";
import { create } from "../controllers/users.controller";

const router = Router();

router.post("/", create);

export default router;
