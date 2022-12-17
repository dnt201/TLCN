import postApi from "@api/postApi";
import userApi from "@api/userApi";
import BlogTag from "@components/blogTag";
import UserTag from "@components/navbar/searchBox/userTag";
import Pagination from "@components/pagination";
import { iPostDetail } from "@DTO/Blog";
import { iPage } from "@DTO/Pagination";
import { iUserTag } from "@DTO/User";
import BlogNotFound from "@screens/BlogDetail/NotFound";
import SkeletonBlogDetail from "@screens/BlogDetail/SkeletonBlogDetail";
import ListSkeleton from "@screens/Home/CenterContent/ListSkeleton";
import SkeletonTag from "@screens/Home/LeftContent/SkeletonTag";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";
import { BeatLoader, CircleLoader, ClipLoader } from "react-spinners";
import UserTagItem from "./UserTagItem";

interface iProps extends React.HTMLProps<HTMLDivElement> {}

const MidContent: React.FC<iProps> = (props) => {
  const width = (window.screen.width * 70) / 100 / 3;

  const { className } = props;

  const [searchValue, setSearchValue] = useState("");
  const [select, setSelect] = useState("");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [listUser, setListUser] = useState<iUserTag[] | null>(null);
  const [listPost, setListPost] = useState<iPostDetail[] | null>(null);
  const [paging, setPaging] = useState<iPage | null>(null);
  const [curPage, setCurPage] = useState(1);

  const getAllPost = async () => {
    let q = searchParams.get("q");
    const result = await postApi.getAllPost(q || searchValue, curPage, 3);
    if (result.status === 201) {
      if (result.data.result.data.length > 0) {
        setListPost(result.data.result.data);
        setPaging(result.data.result.page);
      } else setListPost(null);
    } else {
    }
    setLoading(false);
  };
  const getAllUser = async () => {
    let q = searchParams.get("q");
    const result = await userApi.getAllUser(q || searchValue, curPage, 6);
    if (result.status === 201) {
      if (result.data.result.data.length > 0) {
        setListUser(result.data.result.data);
        setPaging(result.data.result.page);
      } else setListUser(null);
    } else {
    }
    setLoading(false);
  };
  useEffect(() => {
    setCurPage(-1);
  }, [searchParams]);
  useEffect(() => {
    setLoading(true);

    if (curPage === -1) setCurPage(1);
    else {
      let typeFromSearch = searchParams.get("type");
      let q = searchParams.get("q");
      if (typeFromSearch === "posts") {
        setSelect("posts");

        getAllPost();
      } else if (typeFromSearch === "users") {
        setSelect("users");
        getAllUser();
        //call api user by name
        // userApi.findUserByDisplayName(inputSearch),

        const width = (window.screen.width * 70) / 100 / 3;
      }

      let nameFromSearch = searchParams.get("q");
      if (nameFromSearch !== null) setSearchValue(nameFromSearch);
    }
  }, [curPage]);

  if (searchValue.length <= 0)
    return (
      <div className={className + " flex-1 flex justify-center mt-[10vh]"}>
        <i className="text-center">
          Vui lòng nhập tên bài viết hay người dùng bạn muốn tìm kiếm.
        </i>
      </div>
    );

  if (loading) {
    return (
      <div className={className + " flex-1"}>
        {/* <ListSkeleton scroll={false} />
         */}
        <span className="flex gap-1 justify-center items-center">
          Đang tìm kiếm{" "}
          <span className="translate-y-[2px]">
            <ClipLoader size={20} color="#fff" />
          </span>
        </span>
      </div>
    );
  }
  return (
    <div className={className}>
      {select === "posts" && listPost !== null ? (
        <div className="w-full flex-1 flex-col flex ">
          <span className="flex gap-1 justify-end pb-2">
            <b> {paging?.totalElement}</b> <span>kết quả</span>
          </span>
          <div className="  flex-1 flex-col flex ">
            {listPost.map((post) => (
              <BlogTag {...post} />
            ))}
          </div>
          {paging !== null && (
            <Pagination changePageNumber={setCurPage} {...paging} />
          )}
        </div>
      ) : select === "users" && listUser !== null ? (
        <div className="w-full flex-1 flex-col flex ">
          <span className="flex gap-1 justify-end   pb-2">
            <b> {paging?.totalElement}</b> <span>kết quả</span>
          </span>
          <div className="  flex-1 flex-wrap flex w-full">
            {listUser.map((user) => (
              <div className="w-1/3 my-4 px-4 flex justify-start ">
                <UserTagItem {...user} />
              </div>
            ))}
          </div>
          {paging !== null && (
            <Pagination changePageNumber={setCurPage} {...paging} />
          )}
        </div>
      ) : (
        <div className="flex justify-center mt-[10vh]">
          <i className="text-center"> Không có kết quả phù hợp!</i>
        </div>
      )}
    </div>
  );
};

export default MidContent;
