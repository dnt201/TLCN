import axiosClient from "@api/axiosClient";
import { ChangePassWordValues } from "@screens/ChangePassWord";
import queryString from "query-string";

export interface postCreate {
  file?: File;
  title: string;
  category: string;
  content: string;
  tags: string[];
}

const postApi = {
  createPost: (postData: postCreate) => {
    const url = `/post/create`;

    const formData = new FormData();
    if (postData.file !== undefined && postData.file !== null)
      formData.append("file", postData.file);
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("tags", postData.tags.toString());

    return axiosClient.post(url, formData);
  },
  editPost: (postId: string, postData: postCreate) => {
    const url = `/post/edit/${postId}`;

    const formData = new FormData();
    if (postData.file !== undefined && postData.file !== null)
      formData.append("file", postData.file);
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("tags", postData.tags.toString());
    return axiosClient.put(url, formData);
  },
  getAllPost: (name?: string, pageNumber?: number) => {
    let url = ``;
    if (name !== undefined && name !== "") url = `/post/all?name=${name}`;
    else url = `/post/all`;
    return axiosClient.post(url, {
      size: 3,
      pageNumber: pageNumber || 1,
    });
  },
  postPostByCategory: (categoryId: string) => {
    const url = `/post/all-by-category/${categoryId}`;
    return axiosClient.post(url);
  },
  getAllPostByPostTag: (postTags: string[]) => {
    const url = `/post/all-by-posttag`;
    const data = { postTags };
    return axiosClient.get(url, { data });
  },
  getAllPostByUser: (userId: string) => {
    const url = `/post/all-by-user/${userId}`;
    return axiosClient.get(url);
  },
  getPostDetailById: (postId: string) => {
    const url = `/post/${postId}`;
    return axiosClient.get(url);
  },
  getListPostHaveBeenVote: () => {
    const url = `/post/all-post-vote`;
    return axiosClient.post(url);
  },
  getListPostHaveBeenView: () => {
    const url = `/post/all-post-view`;
    return axiosClient.post(url);
  },
  getListPostHaveBeenFollow: (name?: string, pageNumber?: number) => {
    let url = ``;
    if (name !== undefined && name !== "")
      url = `/post/all-post-follow?name=${name}`;
    else url = `/post/all-post-follow`;
    return axiosClient.post(url, {
      size: 3,
      pageNumber: pageNumber || 1,
    });
  },
};
export default postApi;
