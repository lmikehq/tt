import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios"
import { toast } from "react-hot-toast"

interface XAxiosInstance extends AxiosInstance {
  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R>
}
const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  timeout: 15000,
  //   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAuthToken(),
  },
})

function getAuthToken(): string | null {
  let user = null
  if (typeof window !== "undefined") {
    // Access localStorage here
    user = window.localStorage.getItem("user")
    }
  return user ? `Bearer ${user}` : null
}

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    // toast.error(error.message);
    return Promise.reject(error)
  }
)

const kiwiClientV1: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KIWI_SERVER_V1,
  timeout: 15000,
  //   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    apikey: process.env.NEXT_PUBLIC_KIWI_API_KEY,
  },
})

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
    apikey: process.env.NEXT_PUBLIC_KIWI_API_KEY,
  },
})

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
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    timeout: 40000,
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


const rateHawkResourceClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_RATEHAWK_RESOURCE,
    timeout: 15000,
    //   withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Authorization: getAuthToken(),
    },
});
rateHawkResourceClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        // toast.error(error.message);
        return Promise.reject(error);
    }
);


const tripAdvisorResourceClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TRIPADVISOR_RESOURCE,
    timeout: 15000,
    //   withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        // "Referer": "https://stays-dev.thrillers.travel",
        // "Origin": "https://stays-dev.thrillers.travel"
    },
});
tripAdvisorResourceClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);


export {
    axiosClient,
    kiwiClientV1,
    kiwiClient,
    kiwiResourceClient,
    rateHawkResourceClient,
    tripAdvisorResourceClient,
};
