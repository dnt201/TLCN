import axiosClient from "@api/axiosClient";

const fileApi = {
  updateImage: (file: File) => {
    const url = `/file/create`;
    const formData = new FormData();
    formData.append("file", file);
    return axiosClient.post(url, formData);
  },
};
export default fileApi;
