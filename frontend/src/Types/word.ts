export interface IWord {
  id: string;
  word: string;
  translation: string;
  relevance: number;
  knowledge: number;
  score: number;
  createdAtLocal: string;
  isSeen: boolean;
  isLearned: boolean;
  toReviewToday: boolean;
  userId: string;
  collectionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IWordsResponse {
  words: IWord[];
  total: number;
}

export interface IWordResponse {
  word: IWord;
}

export interface IDailyWordsResponse {
  words: IWord[];
  totalSeen: number;
  totalUnseen: number;
}

export interface ICreateWord {
  word: string;
  translation: string;
  knowledge: number;
  relevance: number;
  collectionId?: string;
}

export interface IUpdateWord {
  word?: string;
  translation?: string;
  knowledge?: number;
  relevance?: number;
  isSeen?: boolean;
  isLearned?: boolean;
}
