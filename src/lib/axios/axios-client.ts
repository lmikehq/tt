import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
import { toast } from "react-hot-toast";

interface XAxiosInstance extends AxiosInstance {
  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R>;
}
const axiosClient: XAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  timeout: 5000,
  //   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAuthToken(),
  },
});

function getAuthToken(): string | null {
  const user = localStorage.getItem("user");
  return user ? `Bearer ${JSON.parse(user)}` : null;
}

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    toast.error(error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
