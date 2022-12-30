export interface ICreateUser {
  email: string;
  password: string;
  numDailyWords: number;
  timezone?: string;
}

export interface IEditUser {
  timezone?: string;
  numDailyWords?: number;
}
