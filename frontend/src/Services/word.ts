import { IWord, IWordsResponse, IUpdateWord } from "../Types/word";
import Api from "../Utils/api";

export const getDailyWords = async (): Promise<IWordsResponse> => {
  return Api.get("/words/daily", {
    params: {
      isSeen: false,
    },
  });
};

export const updateWord = async (
  id: string,
  word: IUpdateWord
): Promise<IWord> => {
  return Api.patch(`/words/${id}`, word);
};
