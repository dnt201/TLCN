import axiosClient from "@api/axiosClient";

const userApi = {
  get: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
};
