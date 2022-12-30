import { Request, Response } from "express";
import { COLLECTION } from "../constants/messages";
import { HttpException } from "../helpers/exception";
import {
  calculateOffset,
  parseLimit,
  parseOrder,
  parseOrderBy,
  parsePage,
} from "../helpers/query";
import * as CollectionService from "../services/collections.service";

export const getMany = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals;

  const orderBy = parseOrderBy(req.query.orderBy as string | undefined, "name");
  const order = parseOrder(req.query.order as string | undefined, "asc");
  const limit = parseLimit(req.query.limit as string | undefined);
  const page = parsePage(req.query.page as string | undefined);
  const offset = calculateOffset(page, limit);
  const pagination = { limit, offset, order, orderBy };

  const [collections, total] = await CollectionService.getMany(
    loggedUser.email,
    pagination
  );

  res.status(200).json({ collections, total });
};

export const createOne = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals;

  const newCollection = await CollectionService.createOne(
    req.body,
    loggedUser.email
  );

  res.status(201).json({ collection: newCollection });
};

export const deleteOne = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals;

  const collection = await CollectionService.getOne(
    req.params.id,
    loggedUser.email
  );

  if (!collection) {
    throw new HttpException(404, COLLECTION.NOT_FOUND);
  }
  await CollectionService.deleteOne(req.params.id);

  res.status(204).json({});
};
