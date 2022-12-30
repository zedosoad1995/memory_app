import prisma from "../../prisma/prisma-client";
import { ICreateUser, IEditUser } from "../types/user";
import bcrypt from "bcryptjs";

export const getOneByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createOne = async (data: ICreateUser) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const encryptedPassword = await bcrypt.hash(data.password, salt);

  const lastUpdateLocal = new Date().toLocaleString("en-US", {
    timeZone: data.timezone,
  });

  return prisma.user.create({
    data: {
      email: data.email,
      password: encryptedPassword,
      timezone: data.timezone,
      numDailyWords: data.numDailyWords,
      lastUpdateLocal,
    },
    select: {
      id: true,
      email: true,
      lastUpdateLocal: true,
      timezone: true,
      numDailyWords: true,
    },
  });
};

export const updateOne = async (data: IEditUser, email: string) => {
  return prisma.user.update({
    data: {
      timezone: data.timezone,
      numDailyWords: data.numDailyWords,
    },
    select: {
      id: true,
      email: true,
      lastUpdateLocal: true,
      timezone: true,
      numDailyWords: true,
    },
    where: {
      email,
    },
  });
};
