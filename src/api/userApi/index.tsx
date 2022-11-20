import axiosClient from "@api/axiosClient";
import queryString from "query-string";

export interface userApiAuth {
  email: string;
  password: string;
}
export interface userUpdateProfile {
  email: string;
  username: string;
  shortInfo: string;
  gender: string;
}

const userApi = {
  login: (user: userApiAuth) => {
    const url = `/auth/login`;
    return axiosClient.post(url, user);
  },
  register: (user: userApiAuth) => {
    const url = `/auth/register`;
    return axiosClient.post(url, user);
  },
  logout: () => {
    const url = `/auth/log-out`;
    return axiosClient.post(url);
  },
  activate: (token: string) => {
    const url = `/auth/activate/${token}`;
    return axiosClient.post(url);
  },
  getMe: () => {
    const url = `/auth/me`;
    return axiosClient.get(url);
  },
  updateProFile: (userUpdateProfile: userUpdateProfile) => {
    const url = `/users/edit`;
    return axiosClient.put(url, userUpdateProfile);
  },
  updateImage: (file: File) => {
    const url = `/users/avatar`;
    const formData = new FormData();

    formData.append("file", file);
    return axiosClient.post(url, formData);
  },
};
export default userApi;
