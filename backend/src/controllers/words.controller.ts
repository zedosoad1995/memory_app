import { Request, Response } from "express";
import { WORD } from "../constants/messages";
import { HttpException } from "../helpers/exception";
import * as WordService from "../services/words.service";

export const getMany = async (req: Request, res: Response) => {
  const { user: loggedUser } = res.locals;

  const [words, total] = await WordService.getMany(loggedUser.email);

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

  const newWord = await WordService.createOne(req.body, loggedUser.email);

  res.status(201).json({ word: newWord });
};
