import axios from "axios";
const globalAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

const apiService = (url: string, method: string, data: any) => {
  return new Promise((resolve, reject) => {
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
      .catch((err) => reject(new Error(err)));
  });
};

export default apiService;
