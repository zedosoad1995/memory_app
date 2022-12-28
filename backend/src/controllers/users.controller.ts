import { User } from "@prisma/client";
import { Request, Response } from "express";
import * as UserService from "../services/users.service";

export const createOne = async (req: Request, res: Response) => {
  const { email, password, timezone } = req.body;

  const newUser = await UserService.createOne({
    email,
    password,
    timezone,
  });

  res.status(201).json({ user: newUser });
};

export const updateOne = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals as unknown as { user: User };

  const updatedUser = await UserService.updateOne(req.body, loggedUser.email);

  res.status(200).json({ user: updatedUser });
};
