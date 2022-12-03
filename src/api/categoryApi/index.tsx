import axiosClient from "@api/axiosClient";

const categoryApi = {
  getCategoryByName: (name: string) => {
    const url = `/category/find?name=${name}`;
    return axiosClient.post(url);
  },
  getAllCategory: (pageNumber?: number, nameTag?: string) => {
    let url = ``;
    if (nameTag !== undefined && nameTag !== null && nameTag !== "")
      url = `/category?name=${nameTag}`;
    else url = `/category`;
    return axiosClient.post(url, {
      size: 9,
      pageNumber: pageNumber || 1,
    });
  },
  getAllCategory10000: () => {
    const url = `/category`;
    return axiosClient.post(url, {
      size: 100000,
      pageNumber: 1,
    });
  },
  getTop5CategoryMostUsed: () => {
    const url = `/category/top`;
    return axiosClient.get(url);
  },
};
export default categoryApi;
