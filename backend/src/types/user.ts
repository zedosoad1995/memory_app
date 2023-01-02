export interface ICreateUser {
  email: string;
  password: string;
  numDailyWords: number;
  timezone?: string;
  collectionName?: string;
}

export interface IEditUser {
  timezone?: string;
  numDailyWords?: number;
}
