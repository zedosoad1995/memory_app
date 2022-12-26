import { Request, Response } from "express";
import { createOne } from "../services/users.service";

export const create = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const newUser = await createOne({ email, password });

  res.status(201).json({ user: newUser });
};
