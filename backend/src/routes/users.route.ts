import { Router } from "express";
import { createOne } from "../controllers/users.controller";

const router = Router();

router.post("/", createOne);

export default router;
