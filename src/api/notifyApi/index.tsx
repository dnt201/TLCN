import axiosClient from "@api/axiosClient";

const notifyApi = {
  getAllNotify: (page?: number, size?: number) => {
    const url = `/notification`;
    return axiosClient.post(url, {
      pageNumber: page || 1,
      size: size || 10,
    });
  },
};
export default notifyApi;
