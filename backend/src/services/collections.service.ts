import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import {
  ICollectionQuery,
  ICreateCollection,
  IUpdateCollection,
} from "../types/collection";
import { IPagination } from "../types/query";

export const getMany = (email: string, pagination: IPagination = {}) => {
  const baseQuery = {
    where: {
      user: {
        email,
      },
    },
    orderBy: pagination.order,
    skip: pagination.offset,
    take: pagination.limit,
  };

  const findManyQuery = {
    ...baseQuery,
    orderBy: pagination?.order
      ? Object.entries(pagination?.order).map(([k, v]) => ({ [k]: v }))
      : {},
    skip: pagination.offset,
    take: pagination.limit,
  };

  return Promise.all([
    prisma.collection.findMany(findManyQuery),
    prisma.collection.count(baseQuery),
  ]);
};

export const getOne = async (query: ICollectionQuery, email: string) =>
  prisma.collection.findFirst({
    where: {
      ...query,
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

export const updateOne = async (
  data: IUpdateCollection,
  collectionId: string
) => {
  const query: Prisma.CollectionUpdateArgs = {
    data: {
      name: data.name,
    },
    where: {
      id: collectionId,
    },
  };

  return prisma.collection.update(query);
};

export const deleteOne = async (id: string) =>
  prisma.collection.delete({
    where: {
      id,
    },
  });
