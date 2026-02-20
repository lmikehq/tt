import axios, { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

const API_TIMEOUT = 15000; // 15 second timeout

const globalAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    withCredentials: true,
    timeout: API_TIMEOUT,
});

const globalStaysAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_RATEHAWK_RESOURCE,
    withCredentials: true,
    timeout: API_TIMEOUT,
});

const apiService = (url: string, method?: string, data?: any): Promise<any> => {
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

export const staysService = (
    url: string,
    method?: string,
    data?: any,
): Promise<any> => {
    return new Promise((resolve) => {
        globalStaysAxios({
            url,
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI4YjJkMjVjYmRkNjM5MzYwZWRhYjQiLCJpYXQiOjE3MDY2MDQwMzV9.gDthXPWczeUJbHK0-r5B-WYSJMVjQxrmrGWw5HOH6UE",
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
