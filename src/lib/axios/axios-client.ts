import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-hot-toast";

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAuthToken(),
  },
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();

    if (token) {
      config.headers!["Authorization"] = token;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

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
