import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface CustomInstance extends AxiosInstance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export const instance: CustomInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
axios.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

//response
instance.interceptors.response.use(
  (response) => {
    if (response.data.access_token)
      localStorage.setItem("accessToken", response.data.access_token);
    return response.data;
  },
  (error) => Promise.reject(error)
);
