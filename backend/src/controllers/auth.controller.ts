import { Request, Response } from "express";
import { AUTH } from "../constants/messages";
import { HttpException } from "../helpers/exception";
import * as UserService from "../services/users.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "underscore";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserService.getOneByEmail(email);

  if (!user) {
    throw new HttpException(401, AUTH.WRONG_CREDENTIALS);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send({ message: AUTH.WRONG_CREDENTIALS });
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRATION as string,
    }
  );

  const userToReturn = _.omit(user, ["password"]);

  res.status(200).json({ token, user: userToReturn });
};
