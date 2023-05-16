import axios from "axios";

import { signOut } from "next-auth/react";

const BASE_URL = process.env.API_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = "";
    if (token && config.headers) {
      (config.headers as { [key: string]: string })["Authorization"] =
        "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== `/authentication/log-in` && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        signOut();
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
