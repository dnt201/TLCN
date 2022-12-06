import postApi from "@api/postApi";
import { RootState } from "@app/store";
import BlogTag from "@components/blogTag";
import { iPostDetail } from "@DTO/Blog";
import { iPage } from "@DTO/Pagination";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

interface iProps {
  selectId: number;
}

const ListPost: React.FC<iProps> = (props) => {
  const { selectId } = props;
  const { userInfo } = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();
  //1
  const [listPosted, setListPosted] = useState<iPostDetail[] | null>(null);
  const [pagingListPosted, setPagingListPosted] = useState<iPage | null>(null);
  //2
  const [listPostVote, setListPostVoted] = useState<iPostDetail[] | null>(null);
  const [pagingListPostVote, setPagingListPostVoted] = useState<iPage | null>(
    null
  );
  //3
  const [listView, setListView] = useState<iPostDetail[] | null>(null);
  const [pagingListView, setPagingListView] = useState<iPage | null>(null);
  //4
  const [listFollow, setListFollow] = useState<iPostDetail | null>(null);
  const [pagingListFollow, setPagingListFollow] = useState<iPage | null>(null);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (selectId === 1) {
      postApi.getAllPostByUser(userInfo.id).then((result) => {
        if (result.status === 201) {
          console.log(result);
          setListPosted(result.data.result.data);
        } else {
        }
      });
    } else if (selectId === 2) {
      postApi.getListPostHaveBeenFollow(userInfo.id).then((result) => {
        if (result.status === 201) {
          console.log(result);
          setListPosted(result.data.result.data);
        } else {
        }
      });
    } else if (selectId === 3) {
      postApi.getListPostHaveBeenVote().then((result) => {
        if (result.status === 201) {
          console.log(result);
          setListPosted(result.data.result.data);
        } else {
        }
      });
    } else if (selectId === 4) {
      postApi.getListPostHaveBeenView().then((result) => {
        if (result.status === 201) {
          console.log(result);
          setListPosted(result.data.result.data);
        } else {
        }
      });
    }
  }, []);
  if (selectId === 1) {
    return (
      <div className="flex-1 ml-2 overflow-y-hidden overflow-hidden mt-2">
        <div className="flex flex-col  items-center mb-2">
          {listPosted?.map((post) => (
            <BlogTag {...post} />
          ))}
        </div>
      </div>
    );
  } else if (selectId === 2) {
    return (
      <div className="flex-1 ml-2 overflow-y-hidden overflow-hidden mt-2">
        <div className="flex flex-col  items-center mb-2">
          {listPostVote?.map((post) => (
            <BlogTag {...post} />
          ))}
        </div>
      </div>
    );
  } else
    return (
      <div className="flex-1 ml-2 overflow-y-hidden overflow-hidden mt-2">
        <div className="flex flex-col items-center mb-2"></div>
        <div></div>
      </div>
    );
};

export default ListPost;
