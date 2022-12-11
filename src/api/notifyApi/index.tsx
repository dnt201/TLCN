import axiosClient from "@api/axiosClient";

const notifyApi = {
  getAllNotify: () => {
    const url = `/notification`;
    return axiosClient.get(url);
  },
};
export default notifyApi;
