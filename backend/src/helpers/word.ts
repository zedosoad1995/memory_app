import prisma from "../../prisma/prisma-client";
import * as WordService from "../services/words.service";
import { calculateDaysDiff } from "./dateTime";

export const updateWordsScore = async (
  collectionId: string,
  email: string,
  currentDateLocal: string,
  nDaysSinceLastUpdate: number
) => {
  const [words, ...other] = await WordService.getMany({ collectionId }, email);

  return prisma.$transaction(async (tx) => {
    for (const word of words) {
      const nDaysWordCreation = calculateDaysDiff(
        word.createdAtLocal,
        currentDateLocal
      );

      const nDaysReal = Math.min(nDaysSinceLastUpdate, nDaysWordCreation);
      if (nDaysReal <= 0) continue;

      const score = word.isSeen
        ? 0
        : word.score + (word.relevance + (6 - word.knowledge)) * nDaysReal;

      await tx.word.update({
        data: {
          score,
          isSeen: false,
        },
        where: { id: word.id },
      });
    }

    await tx.user.update({
      data: {
        lastUpdateLocal: currentDateLocal,
      },
      where: { email },
    });
  });
};
