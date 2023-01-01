export interface IUser {
  id: string;
  email: string;
  lastUpdateLocal: string;
  timezone: string | null;
  numDailyWords: number;
  createdAt: string;
  updatedAt: string;
}
