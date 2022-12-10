import postApi from "@api/postApi";
import { RootState } from "@app/store";
import BlogTag from "@components/blogTag";
import Pagination from "@components/pagination";
import { iPostDetail } from "@DTO/Blog";
import { iPage } from "@DTO/Pagination";
import BlogNotFound from "@screens/BlogDetail/NotFound";
import ListSkeleton from "@screens/Home/CenterContent/ListSkeleton";
import NoPost from "@screens/Home/CenterContent/NoPost";
import SkeletonTag from "@screens/Home/LeftContent/SkeletonTag";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

interface iProps {
  selectId: number;
  setNumber: (n: number | null) => void;
  loading: boolean;
  setLoading: (b: boolean) => void;
}

const ListSeen: React.FC<iProps> = (props) => {
  const { selectId, setNumber, loading, setLoading } = props;
  const { userInfo } = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();
  const [listSeen, setListSeen] = useState<iPostDetail[] | null>(null);
  const [pagingListSeen, setPagingListSeen] = useState<iPage | null>(null);
  const [curPage, setCurPage] = useState(1);
  const getListSeen = async (page: number) => {
    if (userInfo) {
      setLoading(true);
      const result = await postApi.getListPostHaveBeenVote(page);
      if (result.status === 201) {
        setListSeen(result.data.result.data);
        setPagingListSeen(result.data.result.page);
        setNumber(result.data.result.page.totalElement);
        setLoading(false);
      } else {
        setListSeen(null);
        setPagingListSeen(null);
      }
    }
  };

  useEffect(() => {
    console.log("List rerender");
    if (!userInfo) {
      navigate("/login");
    } else if (selectId === 4) {
      getListSeen(curPage || 1);
    }
  }, [curPage]);
  if (loading) {
    return <ListSkeleton scroll={true} />;
  }
  return (
    <>
      {listSeen === null || pagingListSeen === null || listSeen.length <= 0 ? (
        <div>
          <NoPost />
        </div>
      ) : (
        <div className="flex-1 ml-2 overflow-y-hidden overflow-hidden mt-2">
          <div className="flex flex-col  items-center mb-2">
            {listSeen?.map((post) => (
              <React.Fragment key={post.id}>
                <BlogTag {...post} />
              </React.Fragment>
            ))}
          </div>

          <Pagination changePageNumber={setCurPage} {...pagingListSeen} />
        </div>
      )}
    </>
  );
};

export default ListSeen;
