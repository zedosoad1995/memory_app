import { IUser } from "../Types/user";
import Api from "../Utils/api";

export const login = async (
  email: string,
  password: string
): Promise<{ token: string; user: IUser }> => {
  return Api.post("/auth/login", { email, password });
};

export const register = async (
  email: string,
  password: string,
  numDailyWords: number
): Promise<{ user: IUser }> => {
  return Api.post("/users", {
    email,
    password,
    numDailyWords,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
};
