export interface ICreateWord {
  word: string;
  translation: string;
  knowledge: number;
  relevance: number;
  collectionId?: string;
}

export interface IWordQuery {
  word?: string;
  collectionId?: string;
}
