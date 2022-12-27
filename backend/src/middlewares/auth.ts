import { Request, Response, NextFunction } from "express";
import { AUTH } from "../constants/messages";
import { HttpException } from "../helpers/exception";
import jwt from "jsonwebtoken";
import * as UserService from "../services/users.service";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw Error();

    const token = authHeader.split(" ")[1];
    const decoded = <{ email: string }>(
      jwt.verify(token, process.env.JWT_SECRET)
    );

    const user = UserService.getOneByEmail(decoded.email);

    if (!user) throw Error();

    res.locals.user = user;
    next();
  } catch (err) {
    throw new HttpException(401, AUTH.UNAUTHENTICATED);
  }
};
