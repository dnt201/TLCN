import axiosClient from "@api/axiosClient";
import { ChangePassWordValues } from "@screens/ChangePassWord";
import axios from "axios";
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
  updatePassword: (data: ChangePassWordValues) => {
    const url = `/users/update/password`;
    return axiosClient.post(url, data);
  },
  findUserByDisplayName: (name: string) => {
    const url = `/users/find?name=${name}`;
    return axiosClient.get(url);
  },
  getUserDetail: (id: string) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  followUser: (id: string) => {
    const url = `/users/follow`;
    return axiosClient.post(url, {
      userFollowId: id,
    });
  },
  unFollowUser: (id: string) => {
    const url = `/users/unfollow`;
    return axiosClient.post(url, {
      userFollowId: id,
    });
  },
  followPost: (id: string) => {
    const url = `/post/${id}/follow`;
    return axiosClient.post(url, {
      userFollowId: id,
    });
  },

  getAllUser: (q: string, pageNumber?: number, size?: number) => {
    const url = `/users/all?name=${q}`;
    return axiosClient.post(url, {
      size: size || 9,
      pageNumber: pageNumber || 1,
      order: [],
    });
  },
  getMyFollower: () => {
    const url = `/users/my/follower`;
    return axiosClient.get(url);
  },
  getMyFollowing: () => {
    const url = `/users/my/follow`;
    return axiosClient.get(url);
  },
  forgotPassword: (email: string) => {
    const url = `/users/forgot-password`;
    return axiosClient.post(url, { email });
  },
  verifyForgotPassWordToken: (token: string) => {
    const url = `/users/validate-forgot-token`;
    return axiosClient.post(url, { token });
  },
  changePasswordWithToken: (
    token: string,
    password: string,
    confirmPassWord: string
  ) => {
    const url = `/users/validate-forgot-token`;
    return axiosClient.post(url, { token, password, confirmPassWord });
  },
};
export default userApi;
