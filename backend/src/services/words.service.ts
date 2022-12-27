import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import { ICreateWord, IWordQuery } from "../types/word";

export const getMany = async (email: string) => {
  const query = {
    where: {
      user: {
        email,
      },
    },
  };

  return Promise.all([prisma.word.findMany(query), prisma.word.count(query)]);
};

export const getOne = async (query: IWordQuery, email: string) => {
  return prisma.word.findFirst({ where: { ...query, user: { email } } });
};

export const createOne = async (data: ICreateWord, email: string) => {
  const query: Prisma.WordCreateArgs = {
    data: {
      word: data.word,
      translation: data.translation,
      knowledge: data.knowledge,
      relevance: data.relevance,
      score: 0,
      collection: data.collectionId
        ? {
            connect: {
              id: data.collectionId,
            },
          }
        : {},
      user: {
        connect: {
          email,
        },
      },
    },
  };

  return prisma.word.create(query);
};
