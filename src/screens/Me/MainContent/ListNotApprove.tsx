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

const ListNotApprove: React.FC<iProps> = (props) => {
  const { selectId, setNumber, loading, setLoading } = props;
  const { userInfo } = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();
  const [listNotApproved, setListNotApproved] = useState<iPostDetail[] | null>(
    null
  );
  const [pagingListNotApproved, setPagingListNotApproved] =
    useState<iPage | null>(null);
  const [curPage, setCurPage] = useState(1);
  const getListNotApproved = async (page: number) => {
    if (userInfo) {
      setLoading(true);
      const result = await postApi.getPostNotApprove(page);
      if (result.status === 201) {
        setListNotApproved(result.data.result.data);
        setPagingListNotApproved(result.data.result.page);
        setNumber(result.data.result.page.totalElement);
        setLoading(false);
      } else {
        setListNotApproved(null);
        setPagingListNotApproved(null);
      }
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (selectId === 5) {
      getListNotApproved(curPage || 1);
    }
  }, [curPage]);
  if (loading) {
    return <ListSkeleton scroll={true} />;
  }
  return (
    <>
      {listNotApproved === null ||
      pagingListNotApproved === null ||
      listNotApproved.length <= 0 ? (
        <div>
          <NoPost />
        </div>
      ) : (
        <div className="flex-1 ml-2 overflow-y-hidden overflow-hidden mt-2">
          <div className="flex flex-col  items-center mb-2">
            {listNotApproved?.map((post) => (
              <React.Fragment key={post.id}>
                <BlogTag {...post} />
              </React.Fragment>
            ))}
          </div>

          <Pagination
            changePageNumber={setCurPage}
            {...pagingListNotApproved}
          />
        </div>
      )}
    </>
  );
};

export default ListNotApprove;
