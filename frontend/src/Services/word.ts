import {
  IWord,
  IUpdateWord,
  IDailyWordsResponse,
  ICreateWord,
  IWordsResponse,
  IWordResponse,
} from "../Types/word";
import Api from "../Utils/api";

export const getWords = async (): Promise<IWordsResponse> => {
  return Api.get("/words");
};

export const getWord = async (id: string): Promise<IWordResponse> => {
  return Api.get(`/words/${id}`);
};

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
        isLearned: false,
        orderBy: "score",
        order: "desc",
      },
    });

    if (!("words" in res) || !("total" in res)) return DEFAULT_RES;

    const words = res.words as unknown as IWord[];
    const totalUnseen = res.total as unknown as number;

    res = await Api.get("/words", {
      params: {
        toReviewToday: true,
        or: JSON.stringify([{ isSeen: true }, { isLearned: true }]),
      },
    });

    if (!("total" in res)) return DEFAULT_RES;

    const totalSeen = res.total as unknown as number;

    return { words, totalSeen, totalUnseen };
  };

export const createWord = async (word: ICreateWord): Promise<IWord> => {
  return Api.post("/words", word);
};

export const updateWord = async (
  id: string,
  word: IUpdateWord
): Promise<IWord> => {
  return Api.patch(`/words/${id}`, word);
};

export const updateScores = async (): Promise<void> => {
  return Api.post("/words/update_scores");
};
