import postApi from "@api/postApi";
import { RootState } from "@app/store";
import BlogTag from "@components/blogTag";
import Pagination from "@components/pagination";
import { iPostDetail } from "@DTO/Blog";
import { iPage } from "@DTO/Pagination";
import ListSkeleton from "@screens/Home/CenterContent/ListSkeleton";
import NoPost from "@screens/Home/CenterContent/NoPost";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface iProps {
  selectId: number;
  setNumber: (n: number | null) => void;
  loading: boolean;
  setLoading: (b: boolean) => void;
}

const ListFollowed: React.FC<iProps> = (props) => {
  const { selectId, setNumber, loading, setLoading } = props;
  const { userInfo } = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();
  const [listFollow, setListFollow] = useState<iPostDetail[] | null>(null);
  const [pagingListFollow, setPagingListFollow] = useState<iPage | null>(null);
  const [curPage, setCurPage] = useState(1);
  const getListFollow = async (page: number) => {
    if (userInfo) {
      const result = await postApi.getListPostHaveBeenFollow("", page);
      if (result.status === 201) {
        setListFollow(result.data.result.data);
        setPagingListFollow(result.data.result.page);
        setNumber(result.data.result.page.totalElement);
        setLoading(false);
      } else {
        setListFollow(null);
        setPagingListFollow(null);
      }
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (selectId === 2) {
      getListFollow(curPage || 1);
    }
  }, [curPage]);
  if (loading) {
    return <ListSkeleton scroll={true} />;
  }
  return (
    <>
      {listFollow === null ||
      pagingListFollow === null ||
      listFollow.length <= 0 ? (
        <div>
          <NoPost />
        </div>
      ) : (
        <>
          <div className="flex-1 ml-2 overflow-y-hidden overflow-hidden mt-2">
            <div className="flex flex-col  items-center mb-2">
              {listFollow?.map((post) => (
                <React.Fragment key={post.id}>
                  <BlogTag {...post} setPageForce={setCurPage} />
                </React.Fragment>
              ))}
            </div>
          </div>
          <Pagination changePageNumber={setCurPage} {...pagingListFollow} />
        </>
      )}
    </>
  );
};

export default ListFollowed;
