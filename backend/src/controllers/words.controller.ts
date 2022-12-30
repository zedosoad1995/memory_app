import { User } from "@prisma/client";
import { Request, Response } from "express";
import { WORD } from "../constants/messages";
import { calculateDaysDiff } from "../helpers/dateTime";
import { HttpException } from "../helpers/exception";
import {
  calculateOffset,
  greaterThan,
  parseBoolean,
  parseLimit,
  parseOrder,
  parseOrderBy,
  parsePage,
} from "../helpers/query";
import { updateWordsScore } from "../helpers/word";
import * as WordService from "../services/words.service";

export const getMany = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals;
  const collectionId = req.query.collectionId as string | undefined;
  const orderBy = parseOrderBy(req.query.orderBy as string | undefined, "word");
  const order = parseOrder(req.query.order as string | undefined, "asc");
  const limit = parseLimit(req.query.limit as string | undefined);
  const page = parsePage(req.query.page as string | undefined);
  const offset = calculateOffset(page, limit);
  const pagination = { limit, offset, order, orderBy };

  const [words, total] = await WordService.getMany(
    { collectionId },
    loggedUser.email,
    pagination
  );

  res.status(200).json({ words, total });
};

export const getDailyWords = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals as unknown as { user: User };
  const collectionId = req.query.collectionId as string | undefined;
  const isSeen = parseBoolean(req.query.isSeen as string | undefined);

  const limit = Math.min(
    parseLimit(req.query.limit as string | undefined),
    loggedUser.numDailyWords
  );
  const page = parsePage(req.query.page as string | undefined);
  const offset = calculateOffset(page, limit);

  const [words, total] = await WordService.getMany(
    { collectionId, isSeen },
    loggedUser.email,
    {
      order: "desc",
      orderBy: "score",
      limit,
      offset,
    },
    greaterThan("score", 0)
  );

  res.status(200).json({ words, total });
};

export const createOne = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals;
  const { word, collectionId } = req.body;

  const existingWord = await WordService.getOne(
    { word, collectionId },
    loggedUser.email
  );
  if (existingWord) {
    throw new HttpException(400, WORD.DUPLICATE_WORD);
  }

  const newWord = await WordService.createOne(req.body, loggedUser);

  res.status(201).json({ word: newWord });
};

export const updateScores = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals as unknown as { user: User };
  const { collectionId } = req.body;

  const currentDateLocal = new Date().toLocaleString("en-US", {
    timeZone: loggedUser.timezone ?? undefined,
  });

  let nDaysSinceLastUpdate = calculateDaysDiff(
    loggedUser.lastUpdateLocal,
    currentDateLocal
  );

  await updateWordsScore(
    collectionId,
    loggedUser.email,
    currentDateLocal,
    nDaysSinceLastUpdate
  );

  res.status(204).json({});
};

export const updateOne = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals as unknown as { user: User };
  const { word: wordLabel } = req.body;

  const word = await WordService.getOne(
    { id: req.params.id },
    loggedUser.email
  );

  if (!word) {
    throw new HttpException(404, WORD.NOT_FOUND);
  }

  if (wordLabel) {
    const existingWord = await WordService.getOne(
      { collectionId: word.collectionId, word: wordLabel },
      loggedUser.email
    );

    if (existingWord && existingWord.id != req.params.id) {
      throw new HttpException(400, WORD.DUPLICATE_WORD);
    }
  }

  const editedWord = await WordService.updateOne(req.body, req.params.id);

  res.status(200).json({ word: editedWord });
};

export const deleteOne = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals as unknown as { user: User };

  const word = await WordService.getOne(
    { id: req.params.id },
    loggedUser.email
  );

  if (!word) {
    throw new HttpException(404, WORD.NOT_FOUND);
  }

  await WordService.deleteOne(req.params.id);

  res.status(204).json({});
};
