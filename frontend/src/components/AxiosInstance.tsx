import axios from "axios";

const baseURl =
  "http://fairbank-backend-38fb5c-6206e1-38-242-233-127.traefik.me/";

const AxiosInstance = axios.create({
  baseURL: baseURl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      config.headers.Authorization = ``;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("Token");
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
