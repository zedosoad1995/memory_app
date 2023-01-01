import { IUser } from "../Types/user";

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const setUser = (user: IUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): IUser | undefined => {
  return JSON.parse(localStorage.getItem("user") ?? "undefined");
};

export const isAuth = () => {
  return (
    Boolean(localStorage.getItem("token")) &&
    Boolean(localStorage.getItem("user"))
  );
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
