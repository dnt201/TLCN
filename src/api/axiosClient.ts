import { configureStore } from "@reduxjs/toolkit";
// api/axiosClient.js
import axios, { AxiosRequestConfig } from "axios";
import { log } from "console";
import queryString from "query-string";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import userApi from "./userApi";
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
  (response) => {
    console.log("response", response);
    return response;
  },
  async (error) => {
    // Handle errors
    console.log("error", error);
    const prevRequest = error.config;

    const refreshToken = await localStorage.getItem("refreshToken");
    if (
      error.response.status === 401 &&
      error.response.data.message === "Unauthorized"
    ) {
      prevRequest.sent = true;
      console.log("refreshToken: ", refreshToken);

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
      if (newAccessToken.data.accessToken) {
        console.log("newAccessToken", newAccessToken);

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
              Authorization: `Bearer ${newAccessToken.data.accessToken}`,
              // Cookie: `Refresh=${refreshToken}`,
            };
            return await config;
          }
        );

        return await lazyAxios(prevRequest);
      }
      // console.log("axiosClient(prevRequest)", axiosClient(prevRequest));
      // await console.log(axios.get("/api/v1/login"));
    }
    // else if (
    //   error.response.status === 400 &&
    //   error.response.data.message === "Unauthorized"
    // ) {
    //   console.log("chưa confirm");
    // }
    else if (error.response) {
      console.log("error.response", error.response);
      return error.response;
    } else throw error;
  }
);
export default axiosClient;
