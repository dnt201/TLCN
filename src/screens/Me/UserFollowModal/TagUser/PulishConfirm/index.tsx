import React from "react";
import { XMark } from "@icons/index";

import SureImage from "@images/sure.gif";
import { ClipLoader } from "react-spinners";
import userApi from "@api/userApi";
interface iProps {
  isShow: boolean;
  setShow: (b: boolean) => void;
  isConfirm: boolean;
  setConfirmed: (b: boolean) => void;
  header?: string;
  message?: string;
  loading: boolean;
  img?: string;
}

const PublishConfirm: React.FC<iProps> = (props) => {
  const { setShow, setConfirmed, header, message, loading, img } = props;
  return (
    <div className="top-0 right-0 fixed  w-full h-full flex justify-center items-center  z-[12001] ">
      <div
        className="  w-full h-full bg-[#000] opacity-50"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShow(false);
        }}
      ></div>
      <div className="w-full fixed max-h-[240px] z-[12001] max-w-[420px] bg-bg  flex flex-col   border-[1px] border-smokeDark  rounded-md text-[#000]">
        {/* Start Header */}
        <div className="flex items-center bg-smoke px-4 py-2 border-b-[1px] border-smokeDark rounded-t-md">
          <h3 className="text-left  text-sm flex-1 ">
            {header && header.length > 0 ? header : " Xuất bản bài viết!"}
          </h3>
          <span
            className="hover:text-primary duration-300 hover:cursor-pointer p-1"
            onClick={() => setShow(false)}
          >
            <XMark className="w-5 h-5" />
          </span>
        </div>
        {/* End Header */}

        {/* Start Body */}
        <span className=" bg-white flex items-center justify-center ">
          <img
            src={img ? img : SureImage}
            className={
              "w-1/3 h-1/3 " +
              (img ? "  w-1/4 h-1/4 rounded-full mx-2 my-4" : null)
            }
          />
          <span className=" p-2 text-sm ">
            {message && message.length > 0
              ? message
              : " Nếu không còn chỉnh sửa, bạn muốn xuất bản bài viết?"}
          </span>
        </span>
        {/* End Body */}
        {/* Start Bot Button */}
        <div className="px-4 py-2 border-t-[1px] rounded-b-md flex-row-reverse flex border-smokeDark bg-smoke">
          <button
            className="flex items-center bg-primary border-[1px] border-primary text-white px-2 py-1 text-sm rounded-sm"
            onClick={() => {
              setConfirmed(true);
              setShow(false);
            }}
          >
            <span>Yes</span>
            {loading && <ClipLoader size={16} color={"#fff"} />}
          </button>
          <button
            className="  mr-1 border-smokeDark  border-[1px]  bg-smokeHover  px-2 py-1 text-sm rounded-sm"
            onClick={() => {
              setConfirmed(false);
              setShow(false);
            }}
          >
            Cancel
          </button>
        </div>
        {/* End Bot Button */}
      </div>
    </div>
  );
};

export default PublishConfirm;
