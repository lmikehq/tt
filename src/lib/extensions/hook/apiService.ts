import axios, { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
const globalAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
});

const apiService = (url: string, method?: string, data?: any): Promise<any> => {
  console.log(url);
  return new Promise((resolve) => {
    globalAxios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    })
      .then((res) => resolve(res.data))
      .catch((err) => {
        resolve(err?.response?.data);
      });
  });
};



export const extApiService = (url: string, method?: string, data?: any) => {
  return new Promise((resolve) => {
    axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    })
      .then((res) => resolve(res.data))
      .catch((err) => resolve(err.response?.data));
  });
};

export default apiService;
