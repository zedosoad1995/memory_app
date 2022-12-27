import { Request, Response } from "express";
import * as UserService from "../services/users.service";

export const createOne = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const newUser = await UserService.createOne({ email, password });

  res.status(201).json({ user: newUser });
};
