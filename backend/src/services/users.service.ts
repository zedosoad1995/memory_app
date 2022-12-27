import prisma from "../../prisma/prisma-client";
import { ICreateUser } from "../types/user";
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

  return prisma.user.create({
    data: {
      email: data.email,
      password: encryptedPassword,
    },
    select: {
      id: true,
      email: true,
    },
  });
};
