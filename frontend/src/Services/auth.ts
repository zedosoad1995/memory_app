import Api from "../Utils/api";

export const login = async (email: string, password: string) => {
  return Api.post("/auth/login", { email, password });
};
