import Api from "../Utils/api";

export const login = async (email: string, password: string) => {
  return Api.post("/auth/login", { email, password });
};

export const register = async (
  email: string,
  password: string,
  numDailyWords: number
) => {
  return Api.post("/users", {
    email,
    password,
    numDailyWords,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
};
