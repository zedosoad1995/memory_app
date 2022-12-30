import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import { ICreateCollection } from "../types/collection";
import { IPagination } from "../types/query";

export const getMany = (email: string, pagination: IPagination = {}) => {
  const baseQuery = {
    where: {
      user: {
        email,
      },
    },
    orderBy: pagination.orderBy
      ? {
          [pagination.orderBy]: pagination.order,
        }
      : {},
    skip: pagination.offset,
    take: pagination.limit,
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
    prisma.collection.findMany(findManyQuery),
    prisma.collection.count(baseQuery),
  ]);
};

export const getOne = async (id: string, email: string) =>
  prisma.collection.findFirst({
    where: {
      id,
      user: {
        email,
      },
    },
  });

export const createOne = async (data: ICreateCollection, email: string) => {
  const query: Prisma.CollectionCreateArgs = {
    data: {
      name: data.name,
      user: {
        connect: {
          email,
        },
      },
    },
  };

  return prisma.collection.create(query);
};

export const deleteOne = async (id: string) =>
  prisma.collection.delete({
    where: {
      id,
    },
  });
