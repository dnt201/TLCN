import axiosClient from "@api/axiosClient";
import { iCommentCreate } from "@DTO/Blog";

const commentApi = {
  getListCommentOfPost: (id: string, pageNumber?: number, size?: number) => {
    const url = `/post/${id}/get-all-comment`;

    return axiosClient.post(url, {
      size: size || 10,
      pageNumber: pageNumber || 1,
    });
  },
  commentAPost: (id: string, postData: iCommentCreate) => {
    const url = `/post/${id}/comment`;
    const formData = new FormData();

    if (postData.file !== undefined && postData.file !== null)
      formData.append("file", postData.file);
    formData.append("commentContent", postData.commentContent);
    formData.append("userTag", "");

    return axiosClient.post(url, formData);
  },
  deleteComment: (idComment: string) => {
    const url = `/post/comment/${idComment}/delete`;
    return axiosClient.delete(url);
  },

  voteACommentPost: (idComment: string) => {
    const url = `/post/comment/${idComment}/vote`;
    return axiosClient.post(url);
  },
  editComment: (idComment: string, postData: iCommentCreate) => {
    const url = `/post/comment/edit/${idComment}`;
    const formData = new FormData();

    if (postData.file !== undefined && postData.file !== null)
      formData.append("file", postData.file);
    formData.append("commentContent", postData.commentContent);
    formData.append("userTag", "");

    return axiosClient.put(url, formData);
  },
  getListReplyOfComment: (
    idComment: string,
    pageNumber?: number,
    size?: number
  ) => {
    const url = `/post/comment/${idComment}/get-all-reply`;
    return axiosClient.post(url, {
      pageNumber: pageNumber || 1,
      size: size || 1,
    });
  },
  replyComment: (idComment: string, postData: iCommentCreate) => {
    const url = `/post/${idComment}/reply`;
    const formData = new FormData();

    if (postData.file !== undefined && postData.file !== null)
      formData.append("file", postData.file);
    formData.append("replyContent", postData.commentContent);
    formData.append("userTag", "");

    return axiosClient.post(url, formData);
  },

  editReplyComment: (idReply: string, postData: iCommentCreate) => {
    const url = `/post/reply/edit/${idReply}`;
    const formData = new FormData();

    if (postData.file !== undefined && postData.file !== null)
      formData.append("file", postData.file);
    formData.append("replyContent", postData.commentContent);
    formData.append("userTag", "");

    return axiosClient.put(url, formData);
  },
  deleteReply: (idReply: string) => {
    const url = `/post/reply/${idReply}/delete`;
    return axiosClient.delete(url);
  },
};
export default commentApi;
