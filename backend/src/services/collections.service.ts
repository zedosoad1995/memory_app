import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import { ICreateCollection } from "../types/collection";

export const getMany = (email: string) => {
  const mainQuery = {
    where: {
      user: {
        email,
      },
    },
  };

  return Promise.all([
    prisma.collection.findMany(mainQuery),
    prisma.collection.count(mainQuery),
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
