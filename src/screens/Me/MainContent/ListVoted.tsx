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

const ListVoted: React.FC<iProps> = (props) => {
  const { selectId, setNumber, loading, setLoading } = props;
  const { userInfo } = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();
  const [listVoted, setListVoted] = useState<iPostDetail[] | null>(null);
  const [pagingListVoted, setPagingListVoted] = useState<iPage | null>(null);
  const [curPage, setCurPage] = useState(1);
  const getListVoted = async (page: number) => {
    if (userInfo) {
      setLoading(true);
      const result = await postApi.getListPostHaveBeenVote(page);
      if (result.status === 201) {
        setListVoted(result.data.result.data);
        setPagingListVoted(result.data.result.page);
        setNumber(result.data.result.page.totalElement);
        setLoading(false);
      } else {
        setListVoted(null);
        setPagingListVoted(null);
      }
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (selectId === 3) {
      getListVoted(curPage || 1);
    }
  }, [curPage]);
  if (loading) {
    return <ListSkeleton scroll={true} />;
  }
  return (
    <>
      {listVoted === null ||
      pagingListVoted === null ||
      listVoted.length <= 0 ? (
        <div>
          <NoPost />
        </div>
      ) : (
        <div className="flex-1 ml-2 overflow-y-hidden overflow-hidden mt-2">
          <div className="flex flex-col  items-center mb-2">
            {listVoted?.map((post) => (
              <React.Fragment key={post.id}>
                <BlogTag {...post} />
              </React.Fragment>
            ))}
          </div>

          <Pagination changePageNumber={setCurPage} {...pagingListVoted} />
        </div>
      )}
    </>
  );
};

export default ListVoted;
