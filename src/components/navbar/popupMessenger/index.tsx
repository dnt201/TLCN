import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlass, More, Expand, ArrowLeft } from "@icons/index";
import MessengerTag from "@components/navbar/popupMessenger/messengerTag";
interface iPopUpMessageProps extends React.HTMLProps<HTMLDivElement> {
  setShow: (show: number) => void;
}
const PopUpMessenger: React.FC<iPopUpMessageProps> = (props) => {
  const { className, setShow } = props;
  const [onSearchMessage, setSearchMessage] = useState(false);
  const popUpMessengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutMessage = (event: any) => {
      const buttonShowMessage = document.getElementById("showMessage");

      if (
        popUpMessengerRef.current &&
        !popUpMessengerRef.current.contains(event.target) &&
        buttonShowMessage &&
        !buttonShowMessage.contains(event.target)
      ) {
        setShow(0);
      } else {
      }
    };
    document.addEventListener("click", handleClickOutMessage, true);
    return () => {
      document.removeEventListener("click", handleClickOutMessage, true);
    };
  }, [popUpMessengerRef]);

  return (
    <div
      ref={popUpMessengerRef}
      className={
        "group/item flex absolute  z-20 right-4 top-full mt-1  max-h-[calc(100vh-48px-20px)] w-[360px] bg-bg2 rounded-md " +
        " " +
        className
      }
    >
      <div className="flex flex-col flex-1   ">
        <div className="overflow-y-auto pt-2 ">
          {/* Header  */}
          <div className="flex items-center  px-4">
            <h1 className="flex-1 font-bold text-2xl">Chats</h1>
            <i className="p-2 hover:cursor-pointer rounded-lg mr-1 hover:bg-hover group relative inline-block ">
              <More />
              <h1
                className={
                  " absolute px-3 py-1 text-[10px]  mt-3 right-0 bot-0 scale-0 w-max   rounded-md  bg-primary   z-30 group-hover:scale-100"
                }
              >
                Options
              </h1>
            </i>
            <i className="p-2 hover:cursor-pointer relative rounded-lg inline-block hover:bg-hover group ">
              <Expand />
              <span
                className={
                  " absolute px-3 py-1 text-[10px]  mt-3 right-0 bot-0 scale-0 w-max   rounded-md  bg-primary   z-30 group-hover:scale-100"
                }
              >
                Xem tất cả
              </span>
            </i>
          </div>
          {/*Search  */}
          <div className="flex items-center  px-4 relative mt-2">
            {onSearchMessage && (
              <h1
                className=" px-2 py-2 h-full mr-1 hover:cursor-pointer rounded-lg hover:bg-hover"
                onClick={() => setSearchMessage(false)}
              >
                <ArrowLeft />
              </h1>
            )}
            <div className="flex  flex-1 items-center bg-hover rounded-lg">
              {!onSearchMessage && (
                <i className="pl-2 ">
                  <MagnifyingGlass />
                </i>
              )}
              <input
                className="flex-1 px-2 bg-hover text-white py-1 rounded-lg"
                onClick={() => setSearchMessage(true)}
                placeholder="Search Messenger"
              />
            </div>
          </div>
          {/* List */}
          <div className=" my-4 px-2 w-full text-center  ">
            <i>Tính năng đang được cập nhật</i>
          </div>
        </div>
        <div className="flex items-center justify-center bg-hover  rounded-b-md py-1 border-t-[1px] border-t-dark3">
          <p className="py-1 px-2 hover:underline hover:cursor-pointer text-sm text-primary">
            See all messengers
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopUpMessenger;
