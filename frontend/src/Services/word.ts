import { IWord, IUpdateWord, IDailyWordsResponse } from "../Types/word";
import Api from "../Utils/api";

export const getDailyWords = async (): Promise<IDailyWordsResponse> => {
  return Api.get("/words", {
    params: {
      toReviewToday: true,
    },
  });
};

export const getUnreviewsDailyWords =
  async (): Promise<IDailyWordsResponse> => {
    const DEFAULT_RES = { words: [], totalUnseen: 0, totalSeen: 0 };

    let res = await Api.get("/words", {
      params: {
        toReviewToday: true,
        isSeen: false,
      },
    });

    if (!("words" in res) || !("total" in res)) return DEFAULT_RES;

    const words = res.words as unknown as IWord[];
    const totalUnseen = res.total as unknown as number;

    res = await Api.get("/words", {
      params: {
        toReviewToday: true,
        isSeen: true,
      },
    });

    if (!("total" in res)) return DEFAULT_RES;

    const totalSeen = res.total as unknown as number;

    return { words, totalSeen, totalUnseen };
  };

export const updateWord = async (
  id: string,
  word: IUpdateWord
): Promise<IWord> => {
  return Api.patch(`/words/${id}`, word);
};
