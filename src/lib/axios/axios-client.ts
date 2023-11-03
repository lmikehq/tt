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
const axiosClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    timeout: 15000,
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
        // toast.error(error.message);
        return Promise.reject(error);
    }
);

const kiwiClientV1: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_KIWI_SERVER_V1,
    timeout: 15000,
    //   withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Authorization: getAuthToken(),
        apikey: process.env.NEXT_PUBLIC_KIWI_API_KEY,
    },
});

kiwiClientV1.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        // toast.error(error.message);
        return Promise.reject(error);
    }
);
const kiwiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_KIWI_SERVER,
    timeout: 15000,
    //   withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Authorization: getAuthToken(),
        apikey: process.env.NEXT_PUBLIC_KIWI_API_KEY,
    },
});

kiwiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        // toast.error(error.message);
        return Promise.reject(error);
    }
);
const kiwiResourceClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_KIWI_RESOURCE,
    timeout: 15000,
    //   withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

kiwiResourceClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        // toast.error(error.message);
        return Promise.reject(error);
    }
);

export { axiosClient, kiwiClientV1, kiwiClient, kiwiResourceClient };
