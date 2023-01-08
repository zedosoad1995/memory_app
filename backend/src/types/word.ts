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

export interface IWordQuery {
  id?: string;
  word?: string;
  collectionId?: string | null;
  isSeen?: boolean;
  isLearned?: boolean;
  toReviewToday?: boolean;
}
