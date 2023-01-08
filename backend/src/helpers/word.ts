import { User } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import * as WordService from "../services/words.service";
import { calculateDaysDiff } from "./dateTime";

export const updateWordsScore = async (
  collectionId: string,
  user: User,
  currentDateLocal: string,
  nDaysSinceLastUpdate: number
) => {
  const [words, ...other] = await WordService.getMany(
    { collectionId },
    user.email
  );

  return prisma.$transaction(async (tx) => {
    const validWordIds = [];

    for (const word of words) {
      const nDaysWordCreation = calculateDaysDiff(
        word.createdAtLocal,
        currentDateLocal
      );

      const nDaysReal = Math.min(nDaysSinceLastUpdate, nDaysWordCreation);
      if (nDaysReal <= 0) continue;
      validWordIds.push(word.id);

      const score = word.isSeen
        ? 0
        : word.score + (word.relevance + (6 - word.knowledge)) * nDaysReal;

      await tx.word.update({
        data: {
          score,
          isSeen: false,
          toReviewToday: false,
        },
        where: { id: word.id },
      });
    }

    const topWords = await tx.word.findMany({
      where: {
        id: {
          in: validWordIds,
        },
        collectionId,
        user: {
          email: user.email,
        },
        isLearned: false,
      },
      orderBy: {
        score: "desc",
      },
      take: user.numDailyWords,
    });

    await tx.word.updateMany({
      data: {
        toReviewToday: true,
      },
      where: {
        id: {
          in: topWords.map((word) => word.id),
        },
      },
    });

    await tx.user.update({
      data: {
        lastUpdateLocal: currentDateLocal,
      },
      where: { email: user.email },
    });
  });
};
