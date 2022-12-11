import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlass, More, Expand, ArrowLeft } from "@icons/index";
import NotifyTag from "./notifyTag";
import { iNotify } from "@DTO/Notify";
import { iPage } from "@DTO/Pagination";
import notifyApi from "@api/notifyApi";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
interface iPopUpNotifyProps extends React.HTMLProps<HTMLDivElement> {
  setShow: (number: number) => void;
}

const PopUpNotify: React.FC<iPopUpNotifyProps> = (props) => {
  const { className, setShow } = props;
  const [optionSelect, setOptionSelect] = useState(0);
  const [listNotify, setListNotify] = useState<iNotify[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState<iPage | null>(null);
  const [curPage, setCurPage] = useState(1);
  const popupNotify = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (curPage === -1) setCurPage(1);
    else {
      //lần đầu get
      setLoading(true);
      if (paging === null && curPage === 1) {
        notifyApi.getAllNotify().then((result) => {
          setLoading(false);
          console.log(result);
          if (result.status === 201) {
            setListNotify(result.data.data);
            setPaging(result.data.page);
          } else toast.error("Fetch list notify error!");
        });
      } else {
        notifyApi.getAllNotify().then((result) => {
          setLoading(false);
          console.log(result);
          if (result.status === 201 && listNotify) {
            setListNotify([...listNotify, ...result.data.data]);
            setPaging(result.data.page);
          } else if (result.status === 201 && !listNotify) {
            setListNotify(result.data.data);
            setPaging(result.data.page);
          } else toast.error("Fetch list notify error!");
        });
      }
    }
  }, [curPage]);

  useEffect(() => {
    const handleClickOutNotify = (event: any) => {
      const buttonShowNotify = document.getElementById("showNotifyA");
      console.log(buttonShowNotify);

      if (
        popupNotify.current &&
        !popupNotify.current.contains(event.target) &&
        buttonShowNotify &&
        !buttonShowNotify.contains(event.target)
      ) {
        setShow(0);
      } else {
      }
    };
    document.addEventListener("click", handleClickOutNotify, true);
    return () => {
      document.removeEventListener("click", handleClickOutNotify, true);
    };
  }, [popupNotify]);

  return (
    <div
      ref={popupNotify}
      className={
        "flex absolute  h-fit  overflow-y-auto z-[11111] right-4 top-full mt-1 max-h-[calc(100vh-48px-20px)] w-[360px] bg-bg2 rounded-md shadow-sm shadow-hover " +
        className
      }
    >
      <div className="w-full pt-2 ml-3 px-2">
        {/* Header  */}
        <div className="flex items-center  ">
          <h1 className="flex-1 font-bold text-2xl">Notifications</h1>

          <i className="p-2 hover:cursor-pointer rounded-lg hover:bg-hover  relative inline-block ">
            <More />
          </i>
        </div>
        {/* Options */}
        <div className="flex items-center w-full ">
          <button
            className={
              "p-2 hover:bg-hover rounded-md mr-2 " +
              (optionSelect === 0 && " bg-hover")
            }
            onClick={() => {
              setOptionSelect(0);
            }}
          >
            All
          </button>
          <button
            className={
              "p-2 hover:bg-hover rounded-md mr-2 " +
              (optionSelect === 1 && " bg-hover")
            }
            onClick={() => {
              setOptionSelect(1);
            }}
          >
            Unread
          </button>
        </div>

        {/* List */}
        <div className=" mt-4 ">
          {/* header */}
          <div className=" flex w-full items-center ">
            <p className="flex-1 text-base">Earlier</p>
            <button className="text-xs p-2 rounded-md hover:bg-hover text-primary">
              See all
            </button>
          </div>
          {2 < 1 ? (
            <div className="flex flex-1 mt-2">
              <i className="w-full text-s text-center">No notify</i>
            </div>
          ) : (
            <div>
              {listNotify && listNotify.length > 0 && paging ? (
                <div>
                  {listNotify.map((result) => (
                    <NotifyTag key={result.id} {...result} />
                  ))}
                  {curPage < Math.ceil(paging.totalElement / paging.size) ? (
                    <button
                      className="flex items-center text-s border-t-[1px] border-white justify-center w-full py-2 mb-2 gap-1 hover:text-primary hover:underline duration-200"
                      onClick={() => setCurPage(curPage + 1)}
                    >
                      Load more...
                      <ClipLoader loading={loading} size={20} color={"#fff"} />
                    </button>
                  ) : (
                    <div className="w-full text-center  text-s border-t-[1px] border-white  py-2">
                      <i>Nothing to load</i>
                    </div>
                  )}
                </div>
              ) : (
                <i className=" flex justify-center pt-4 pb-8">
                  Nothing to show
                </i>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpNotify;
