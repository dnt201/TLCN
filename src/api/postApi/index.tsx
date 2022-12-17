import axiosClient from "@api/axiosClient";
import { iCommentCreate } from "@DTO/Blog";
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
    formData.append("category", postData.category);
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
    formData.append("category", postData.category);
    formData.append("tags", postData.tags.toString());
    return axiosClient.put(url, formData);
  },
  getAllPost: (name?: string, pageNumber?: number, size?: number) => {
    let url = ``;
    if (name !== undefined && name !== "") url = `/post/all?name=${name}`;
    else url = `/post/all?name`;
    return axiosClient.post(url, {
      size: size || 3,
      pageNumber: pageNumber || 1,
    });
  },

  getAllPostByUser: (userId: string, pageNumber?: number, size?: number) => {
    const url = `/post/all-by-user/${userId}`;
    return axiosClient.post(url, {
      size: size || 2,
      pageNumber: pageNumber || 1,
    });
  },
  getPostDetailById: (postId: string) => {
    const url = `/post/${postId}`;
    return axiosClient.get(url);
  },
  getListPostHaveBeenVote: (pageNumber?: number) => {
    const url = `/post/all-post-vote`;
    return axiosClient.post(url, {
      size: 5,
      pageNumber: pageNumber || 1,
    });
  },
  getListPostHaveBeenView: (pageNumber?: number) => {
    const url = `/post/all-post-view`;
    return axiosClient.post(url, {
      size: 5,
      pageNumber: pageNumber || 1,
    });
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
  getPostNotApprove: (pageNumber?: number) => {
    const url = `/post/all-not-approve`;
    return axiosClient.post(url, {
      size: 5,
      pageNumber: pageNumber || 1,
    });
  },
  getAllPostByCategory: (id: string, pageNumber?: number, size?: number) => {
    const url = `/post/all-by-category/${id}`;
    return axiosClient.post(url, {
      size: size || 5,
      pageNumber: pageNumber || 1,
    });
  },
  getAllPostByPostTag: (
    postTags: string[],
    pageNumber?: number,
    size?: number
  ) => {
    const url = `/post/all-by-posttag`;

    return axiosClient.post(url, {
      postTags,
      page: {
        pageNumber: pageNumber || 1,
        size: size || 2,
      },
    });
  },

  deletePost: (id: string) => {
    const url = `/post/${id}`;
    return axiosClient.delete(url);
  },
  voteUp: (id: string) => {
    const url = `/post/${id}/vote`;
    return axiosClient.post(url, {
      type: "Upvote",
    });
  },
  voteDown: (id: string) => {
    const url = `/post/${id}/vote`;
    return axiosClient.post(url, {
      type: "Downvote",
    });
  },
};
export default postApi;
