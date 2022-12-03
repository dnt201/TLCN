import postTagApi from "@api/postTagApi";
import { AppDispatch, RootState } from "@app/store";
import Pagination from "@components/pagination";
import { getAllPostTag } from "@redux/postTagSlice";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { iTag } from "src/DTO";
import TagItem from "./TagItem";
const Tags = () => {
  const width = (window.screen.width * 70) / 100 / 3;
  const { listTag, page, error, loading } = useSelector(
    (state: RootState) => state.postTags
  );
  const dispatch = useDispatch<AppDispatch>();
  const [pageNum, setPageNum] = useState(page?.pageNumber || 1);
  const [nameTag, setNameTag] = useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (nameTag.length === 0) {
      dispatch(getAllPostTag({ pageNum, nameTag }));
    } else {
      timer = setTimeout(() => {
        dispatch(getAllPostTag({ pageNum, nameTag }));
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [nameTag, pageNum]);

  return (
    <div className="flex flex-col bg-bg w-screen min-h-[calc(100vh-52px)]">
      <div className="flex-1 flex flex-col w-3/4 mx-auto ">
        <div className="flex  items-center pt-6 text-lg pb-10">
          <span className="text-primary px-2">({page?.totalElement})</span>
          <span className=" pr-2">TAGS</span>
          <span className="h-[1px] flex-1 bg-smokeDark mr-2 "> </span>
          <div className="flex relative items-center bg-white pr-[2px]">
            <input
              value={nameTag}
              onChange={(e) => {
                setPageNum(1);
                setNameTag(e.target.value);
              }}
              placeholder="Nhập post tag name"
              className=" px-2 py-[2px] mr-5 focus:outline-none text-primary"
            />

            <i className=" absolute right-0 bottom-0 translate-y-[2px] mr-1">
              <ClipLoader color="#FF4401" size={20} loading={loading} />
            </i>
          </div>
        </div>
        <div className="flex-[9999] flex flex-wrap ">
          {!loading ? (
            listTag.map((tag) => (
              <React.Fragment key={tag.id}>
                <TagItem {...tag}>{tag.displayName}</TagItem>
              </React.Fragment>
            ))
          ) : (
            <>
              {Array(9)
                .fill("")
                .map(() => (
                  <div className="flex items-center w-1/3 mb-8">
                    <Skeleton width={80} height={80} />
                    <div className={`ml-1 min-w-[200px] w-[${width - 80 - 4}]`}>
                      <Skeleton width={"100%"} />
                      <Skeleton width={"100%"} />
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      {page && !loading ? (
        <Pagination {...page} loading={loading} changePageNumber={setPageNum} />
      ) : null}
    </div>
  );
};

export default Tags;
