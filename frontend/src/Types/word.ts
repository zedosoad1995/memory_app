export interface IWord {
  id: string;
  word: string;
  translation: string;
  relevance: number;
  knowledge: number;
  score: number;
  createdAtLocal: string;
  isSeen: boolean;
  userId: string;
  collectionId: string;
  createdAt: string;
  updatedAt: string;
}
