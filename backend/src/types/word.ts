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
}

export interface IWordQuery {
  id?: string;
  word?: string;
  collectionId?: string;
  isSeen?: boolean;
}
