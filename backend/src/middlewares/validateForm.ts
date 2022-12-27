import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { HttpException } from "../helpers/exception";

export const validateForm =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (err) {
      if (!(err instanceof ZodError)) {
        throw err;
      }

      throw new HttpException(422, err.errors[0].message);
    }
  };
