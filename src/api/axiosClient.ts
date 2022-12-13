import { AppDispatch } from "./../app/store";
import { configureStore } from "@reduxjs/toolkit";
// api/axiosClient.js
import axios, { AxiosRequestConfig } from "axios";
import { log } from "console";
import queryString from "query-string";
import { clearAllUser } from "@redux/userSlice";
import { toast } from "react-hot-toast";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request -
// config` for the full list of configs

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //baseURL: "http://localhost:3000/",
  headers: {
    // "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const accessToken = await localStorage.getItem("accessToken");
  if (accessToken)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  console.log("config ne: ", config);
  return await config;
});
axiosClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    // Handle errors
    const prevRequest = error.config;

    const refreshToken = await localStorage.getItem("refreshToken");
    console.log(error);
    if (error.message === "Network Error") {
      console.log("!error.status");
      return error.message;
    } else if (
      error.response.status === 401 &&
      error.response.data.message === "Unauthorized" &&
      prevRequest._retry !== true
    ) {
      prevRequest._retry = true;
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        };
        const newAccessToken = await axios.get(
          `${process.env.REACT_APP_API_URL}auth/refresh`,
          config
        );

        const { accessToken } = newAccessToken.data;
        localStorage.removeItem(accessToken);
        localStorage.setItem("accessToken", accessToken);

        let lazyAxios = await axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          headers: {
            "Content-Type": "application/json",
          },
        });
        lazyAxios.interceptors.request.use(
          async (config: AxiosRequestConfig) => {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${newAccessToken.data.refreshToken}`,
              // Cookie: `Refresh=${refreshToken}`,
            };
            return await config;
          }
        );
        // console.log(prevRequest);
        // console.log((await lazyAxios(prevRequest)).config);
        return await lazyAxios(prevRequest);
      } catch (_error: any) {
        // console.log(
        //   _error,
        //   "day neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        // );
        console.log("dispatch");
        window.dispatchEvent(new Event("storage"));
        // localStorage.clear();
        if (
          _error.response.status === 401 &&
          _error.response.data.message === "Unauthorized"
        )
          toast.error("Refresh hết hạn");
        Promise.reject(_error);
      }
    } else if (error.response) {
      console.log("error.response", error.response);
      return error.response;
    } else throw error;
  }
);
export default axiosClient;
