import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { logout } from "./auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = config.headers ?? {};

  // @ts-ignore
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      logout();
      window.location.reload();
      return;
    }

    // @ts-ignore
    toast.error(error.response?.data?.message || "Something went wrong");
    throw error;
  }
);

export default instance;
