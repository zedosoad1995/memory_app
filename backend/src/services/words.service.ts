import { Prisma, User } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import { IPagination } from "../types/query";
import { ICreateWord, IUpdateWord, IWordQuery } from "../types/word";

export const getMany = async (
  query: IWordQuery,
  email: string,
  pagination: IPagination = {},
  advancedQueries: Prisma.WordWhereInput = {}
) => {
  const baseQuery = {
    where: {
      ...query,
      ...advancedQueries,
      user: {
        email,
      },
    },
  };

  const findManyQuery = {
    ...baseQuery,
    orderBy: pagination.orderBy
      ? {
          [pagination.orderBy]: pagination.order,
        }
      : {},
    skip: pagination.offset,
    take: pagination.limit,
  };

  return Promise.all([
    prisma.word.findMany(findManyQuery),
    prisma.word.count(baseQuery),
  ]);
};

export const getOne = async (query: IWordQuery, email: string) => {
  return prisma.word.findFirst({
    where: { ...query, user: { email } },
    select: { collection: true },
  });
};

export const createOne = async (data: ICreateWord, user: User) => {
  const createdAtLocal = new Date().toLocaleString("en-US", {
    timeZone: user.timezone ?? undefined,
  });

  const query: Prisma.WordCreateArgs = {
    data: {
      word: data.word,
      translation: data.translation,
      knowledge: data.knowledge,
      relevance: data.relevance,
      score: 0,
      createdAtLocal,
      isSeen: false,
      collection: data.collectionId
        ? {
            connect: {
              id: data.collectionId,
            },
          }
        : {},
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  };

  return prisma.word.create(query);
};

export const updateOne = async (data: IUpdateWord, wordId: string) => {
  const query: Prisma.WordUpdateArgs = {
    data: {
      word: data.word,
      translation: data.translation,
      knowledge: data.knowledge,
      relevance: data.relevance,
      isSeen: data.isSeen,
    },
    where: {
      id: wordId,
    },
  };

  return prisma.word.update(query);
};

export const deleteOne = async (id: string) =>
  prisma.word.delete({
    where: {
      id,
    },
  });
