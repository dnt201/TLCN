import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlass, More, Expand, ArrowLeft } from "@icons/index";
import NotifyTag from "./notifyTag";
interface iPopUpNotifyProps extends React.HTMLProps<HTMLDivElement> {
  setShow: (number: number) => void;
}

const PopUpNotify: React.FC<iPopUpNotifyProps> = (props) => {
  const { className, setShow } = props;
  const [optionSelect, setOptionSelect] = useState(0);
  const popupNotify = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutNotify = (event: any) => {
      const buttonShowNotify = document.getElementById("showNotify");
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
        "flex absolute  overflow-y-auto z-20 right-4 top-full mt-1 max-h-[calc(100vh-48px-20px)] w-[360px] bg-bg2 rounded-md " +
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
        <div className="h-3/4 mt-4 ">
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
              <NotifyTag />
              <NotifyTag />
              <NotifyTag />
              <NotifyTag />
              <NotifyTag />
              <NotifyTag />
              <NotifyTag />
              <NotifyTag />
              <NotifyTag />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpNotify;
