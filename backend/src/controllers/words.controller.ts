import { User } from "@prisma/client";
import { Request, Response } from "express";
import { WORD } from "../constants/messages";
import { calculateDaysDiff } from "../helpers/dateTime";
import { HttpException } from "../helpers/exception";
import { greaterThan } from "../helpers/query";
import { updateWordsScore } from "../helpers/word";
import * as WordService from "../services/words.service";

export const getMany = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals;
  const collectionId = req.query.collectionId as string | undefined;

  const [words, total] = await WordService.getMany(
    { collectionId },
    loggedUser.email
  );

  res.status(200).json({ words, total });
};

export const getDailyWords = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals as unknown as { user: User };
  const collectionId = req.query.collectionId as string | undefined;

  const [words, total] = await WordService.getMany(
    { collectionId },
    loggedUser.email,
    { order: "desc", orderBy: "score", limit: loggedUser.numDailyWords },
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

  const word = await WordService.getOne(
    { id: req.params.id },
    loggedUser.email
  );

  if (!word) {
    throw new HttpException(404, WORD.NOT_FOUND);
  }

  const editedWord = await WordService.updateOne(req.body, req.params.id);

  res.status(200).json({ word: editedWord });
};
