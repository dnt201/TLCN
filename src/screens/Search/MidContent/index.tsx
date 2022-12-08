import postApi from "@api/postApi";
import BlogTag from "@components/blogTag";
import { iUserTag } from "@components/navbar/searchBox/userTag";
import Pagination from "@components/pagination";
import { iPostDetail } from "@DTO/Blog";
import { iPage } from "@DTO/Pagination";
import BlogNotFound from "@screens/BlogDetail/NotFound";
import SkeletonBlogDetail from "@screens/BlogDetail/SkeletonBlogDetail";
import ListSkeleton from "@screens/Home/CenterContent/ListSkeleton";
import SkeletonTag from "@screens/Home/LeftContent/SkeletonTag";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";

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
    const result = await postApi.getAllPost(q || searchValue, curPage, 1);
    if (result.status === 201) {
      if (result.data.result.data.length > 0) {
        setListPost(result.data.result.data);
        setPaging(result.data.result.page);
      }
      // let i:iPage = { size: 1,
      //   pageNumber: 1,
      //   totalElement: 1,
      //   order: []}
      // setPaging(i);
      else setListPost(null);
      console.log(result);
    } else {
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);

    let typeFromSearch = searchParams.get("type");
    let q = searchParams.get("q");
    if (typeFromSearch === "posts") {
      setSelect("posts");
      console.log("call api post by name");
      getAllPost();
    } else if (typeFromSearch === "users") {
      setSelect("users");
      //call api user by name
      // userApi.findUserByDisplayName(inputSearch),
      console.log("call api user by name");
      const width = (window.screen.width * 70) / 100 / 3;
    }

    let nameFromSearch = searchParams.get("q");
    if (nameFromSearch !== null) setSearchValue(nameFromSearch);
  }, [searchParams, curPage]);

  if (searchValue.length <= 0)
    return (
      <div className={className + " flex justify-center mt-[10vh]"}>
        <i> Vui lòng nhập tên bài viết hay người dùng bạn muốn tìm kiếm.</i>
      </div>
    );

  if (loading) {
    if (select === "posts")
      return (
        <div className={className}>
          <ListSkeleton scroll={false} />
        </div>
      );
    else if (select === "users")
      return (
        <div className={className + " flex flex-wrap z-0"}>
          {Array(9)
            .fill("")
            .map(() => (
              <div className="flex items-center w-1/3 mb-8 ">
                <Skeleton width={80} height={80} className={"z-0"} />
                <div className={`ml-1 min-w-[200px] w-[${width - 80 - 4}]`}>
                  <Skeleton width={"100%"} />
                  <Skeleton width={"100%"} />
                </div>
              </div>
            ))}
        </div>
      );
  }
  return (
    <div className={className}>
      {select === "posts" && listPost !== null ? (
        <div className="w-full">
          <span className="flex gap-1 justify-end   pb-2">
            <b> {paging?.totalElement}</b> <span>kết quả</span>
          </span>
          {listPost.map((post) => (
            <BlogTag {...post} />
          ))}
          {paging !== null && (
            <Pagination changePageNumber={setCurPage} {...paging} />
          )}
        </div>
      ) : select === "users" && listUser !== null ? (
        <div></div>
      ) : (
        <div className="flex justify-center">
          <i> Không có kết quả phù hợp!</i>
        </div>
      )}
    </div>
  );
};

export default MidContent;
