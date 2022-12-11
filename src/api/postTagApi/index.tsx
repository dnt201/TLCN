import axiosClient from "@api/axiosClient";
import { isFulfilled } from "@reduxjs/toolkit";

const postTagApi = {
  getAllPostTag: (pageNumber?: number, nameTag?: string) => {
    let url = ``;
    if (nameTag !== undefined && nameTag !== null && nameTag !== "")
      url = `/post/post-tag?name=${nameTag}`;
    else url = `/post/post-tag`;
    return axiosClient.post(url, {
      size: 100000,
      pageNumber: pageNumber || 1,
    });
  },
  getAllPostTag10000: () => {
    const url = `/post/post-tag`;
    return axiosClient.post(url, {
      size: 100000,
      pageNumber: 1,
    });
  },
  getTop5PostTagMostUsed: () => {
    const url = `/post/post-tag/top`;
    return axiosClient.get(url);
  },
};
export default postTagApi;
