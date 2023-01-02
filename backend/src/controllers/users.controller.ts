import { User } from "@prisma/client";
import { Request, Response } from "express";
import _ from "underscore";
import { USER } from "../constants/messages";
import { HttpException } from "../helpers/exception";
import * as UserService from "../services/users.service";

export const createOne = async (req: Request, res: Response) => {
  const { email, password, timezone, numDailyWords, collectionName } = req.body;

  const user = await UserService.getOneByEmail(email);
  if (user) {
    throw new HttpException(409, USER.DUPLICATE_USER);
  }

  const newUser = await UserService.createOne({
    email,
    password,
    timezone,
    numDailyWords,
    collectionName,
  });

  res.status(201).json({ user: _.omit(newUser, ["password"]) });
};

export const updateOne = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals as unknown as { user: User };

  const updatedUser = await UserService.updateOne(req.body, loggedUser.email);

  res.status(200).json({ user: updatedUser });
};

export const deleteOne = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals;

  await UserService.deleteOne(loggedUser.id);

  res.status(204).json({});
};
