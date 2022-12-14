import React, { useEffect, useState } from "react";
import { iPage } from "src/DTO";

import { ChevronRight, ChevronLeft } from "@icons/index";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

interface iLazy extends iPage {
  loading?: boolean;
  changePageNumber: (number: number) => void;
}
const Pagination: React.FC<iLazy> = (props) => {
  const { pageNumber, totalElement, size, changePageNumber, loading } = props;

  const [curPage, setCurPage] = useState(pageNumber);
  const [maxPage, setMaxPage] = useState(Math.ceil(totalElement / size));

  const [onClickNe, setOnClickNe] = useState(false);

  useEffect(() => {
    console.log(curPage, maxPage);

    let timer: NodeJS.Timeout;
    const funcFake = async () => {
      timer = setTimeout(() => {
        if (1 <= curPage && curPage <= maxPage) {
          changePageNumber(curPage);
        } else {
          changePageNumber(1);
          setCurPage(1);
          if (maxPage !== 0) toast.error("Số trang không hợp lệ");
        }
      }, 1000);
    };
    if (onClickNe) {
      setOnClickNe(false);
      if (1 <= curPage && curPage <= maxPage) {
        changePageNumber(curPage);
      } else {
        changePageNumber(1);
        setCurPage(1);
        toast.error("Số trang không hợp lệ");
      }
    } else {
      funcFake();
    }

    setMaxPage(Math.ceil(totalElement / size));
    return () => {
      clearTimeout(timer);
    };
  }, [curPage, totalElement]);

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
              setOnClickNe(true);
              setCurPage(curPage - 1);
            }
          }}
        >
          <ChevronLeft />
        </button>
        {totalElement >= 0 && !loading && (
          <input
            className=" border-[1px]  border-bg2  text-primary w-12 text-center  mx-2 focus:outline-none 
            "
            value={curPage}
            min={1}
            max={maxPage}
            type="number"
            disabled={totalElement === 0}
            onChange={(e) => {
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
              setOnClickNe(true);
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
