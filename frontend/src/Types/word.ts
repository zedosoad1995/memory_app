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
  userId: string;
  collectionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IWordsResponse {
  words: IWord[];
  total: number;
  totalSeen: number;
  totalUnseen: number;
}

export interface IUpdateWord {
  word?: string;
  translation?: string;
  knowledge?: number;
  relevance?: number;
  isSeen?: boolean;
}
