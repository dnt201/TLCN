import React, { useEffect, useState } from "react";
import { iPage } from "src/DTO";

import { ChevronRight, ChevronLeft } from "@icons/index";
import Skeleton from "react-loading-skeleton";

interface iLazy extends iPage {
  loading?: boolean;
}
const Pagination: React.FC<iLazy> = (props) => {
  const { order, pageNumber, totalElement, size, changePageNumber, loading } =
    props;

  const [curPage, setCurPage] = useState(pageNumber);
  const [maxPage, setMaxPage] = useState(Math.ceil(totalElement / size));

  useEffect(() => {
    changePageNumber(curPage);
    setMaxPage(Math.ceil(totalElement / size));
  }, [curPage, totalElement]);

  console.log(curPage);
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-center items-center p-2 text-primary">
        <button
          className={
            "px-2 border-[1px]  border-primary " +
            "disabled:text-smoke disabled:bg-smokeDark disabled:border-white"
          }
          disabled={curPage === 1 || maxPage === 1 || loading}
          onClick={() => {
            if (curPage - 1 >= 1) {
              setCurPage(curPage - 1);
            }
          }}
        >
          <ChevronLeft />
        </button>
        {totalElement >= 0 && !loading && (
          <input
            className=" border-[1px]  border-white  text-primary w-12 text-center  mx-2
            "
            value={curPage}
            min={1}
            max={maxPage}
            type="number"
            disabled={totalElement === 0}
            onChange={(e) => {
              if (
                1 <= parseInt(e.target.value) &&
                parseInt(e.target.value) <= maxPage
              )
                setCurPage(parseInt(e.target.value));
            }}
          />
        )}

        <button
          className={
            "px-2 border-[1px] border-primary " +
            "disabled:text-smoke disabled:bg-smokeDark disabled:border-white"
          }
          disabled={
            curPage === maxPage || maxPage === 1 || maxPage === 0 || loading
          }
          onClick={() => {
            if (curPage + 1 <= maxPage) {
              setCurPage(curPage + 1);
            }
          }}
        >
          <ChevronRight />
        </button>
      </div>
      {loading ? (
        <Skeleton width={20} height={10} />
      ) : (
        <i className="text-ss">
          {curPage} of {maxPage > 0 ? maxPage : "1"}
        </i>
      )}
    </div>
  );
};

export default Pagination;
