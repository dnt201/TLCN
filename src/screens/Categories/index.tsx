import postTagApi from "@api/postTagApi";
import { AppDispatch, RootState } from "@app/store";
import Pagination from "@components/pagination";
import { getAllCategory } from "@redux/categorySlice";

import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { iCategory } from "src/DTO";
import CategoryItem from "./CategoryItem";
const Categories = () => {
  const width = (window.screen.width * 70) / 100 / 3;
  const { listCategory, pageCategory, error, loading } = useSelector(
    (state: RootState) => state.category
  );
  const dispatch = useDispatch<AppDispatch>();
  const [pageNum, setPageNum] = useState(pageCategory?.pageNumber || 1);
  const [nameCategory, setNameCategory] = useState<string>("");
  const [te, setTe] = useState<string>("");

  useEffect(() => {
    dispatch(getAllCategory({ pageNum, nameCategory }));
  }, [nameCategory, pageNum]);

  return (
    <div className="flex flex-col bg-bg w-screen min-h-[calc(100vh-52px)]">
      <div className="flex-1 flex flex-col w-3/4 mx-auto ">
        <div className="flex  items-center pt-6 text-lg pb-8">
          <span className="text-primary px-2">
            ({pageCategory?.totalElement})
          </span>
          <span className=" pr-2">
            {pageCategory?.totalElement === 1 ? "Category" : "Categories"}
          </span>
          <span className="h-[1px] flex-1 bg-smokeDark mr-2 "> </span>
          <div className="flex relative items-center bg-white pr-[2px]">
            <input
              value={te}
              onChange={async (e) => {
                let timer: NodeJS.Timeout;
                setTe(e.target.value);
                timer = await setTimeout(() => {
                  setPageNum(1);
                  setNameCategory(e.target.value);
                }, 1500);
                return () => clearTimeout(timer);
              }}
              placeholder="Nhập tên danh mục"
              className=" px-2 py-[2px] mr-5 focus:outline-none text-primary rounded-md "
            />

            <i className=" absolute right-0 bottom-0 translate-y-[2px] mr-1">
              <ClipLoader color="#FF4401" size={20} loading={loading} />
            </i>
          </div>
        </div>
        <div className=" flex flex-wrap  ">
          {!loading ? (
            listCategory.map((category) => (
              <CategoryItem key={category.id} {...category} />
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

      {pageCategory && !loading ? (
        <Pagination
          {...pageCategory}
          loading={loading}
          changePageNumber={setPageNum}
        />
      ) : null}
    </div>
  );
};

export default Categories;
