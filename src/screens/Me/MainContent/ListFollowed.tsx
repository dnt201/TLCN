import postApi from "@api/postApi";
import { RootState } from "@app/store";
import { iPostDetail } from "@DTO/Blog";
import { iPage } from "@DTO/Pagination";
import ListSkeleton from "@screens/Home/CenterContent/ListSkeleton";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ListFollowed = () => {
  const { userInfo } = useSelector((state: RootState) => state.users);
  const [loading, setLoading] = useState(false);

  const [listFollow, setListFollow] = useState<iPostDetail[] | null>(null);
  const [pagingListFollow, setPagingListFollow] = useState<iPage | null>(null);
  const getListFollow = async (page: number) => {
    if (userInfo) {
      const result = await postApi.getListPostHaveBeenFollow(userInfo?.id);
      if (result.status === 201) {
        setListFollow(result.data.result.data);
      } else setPagingListFollow(null);
    }
  };
  if (loading) {
    return <ListSkeleton scroll={true} />;
  }
  return <div>ListFollowed</div>;
};

export default ListFollowed;
