import React from "react";
import { iNotify } from "@DTO/Notify";
import { useNavigate } from "react-router-dom";
import { clickNotification } from "src/router/Socket";
import userDefault from "@images/userDefault.png";
import { isFulfilled } from "@reduxjs/toolkit";

interface iProps extends iNotify {
  idToast: string;
  dismiss: (id: string) => void;
  visible: boolean;
}

const PopUpNotify: React.FC<iProps> = (props) => {
  const {
    idToast,
    dismiss,
    visible,
    refId,
    userSend,
    body,
    type,
    extendData,
    id,
  } = props;
  if (extendData) console.log(JSON.parse(extendData).post);

  const navigate = useNavigate();
  return (
    <div
      className={`${
        visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full text-primary   bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div
        className="flex-1 w-0 p-4 hover:cursor-pointer "
        onClick={(e) => {
          if (type === "Post_Vote") {
            clickNotification(id);
            dismiss(idToast);
            navigate(`/blog/${refId}`);
          } else if (type === "Post_Comment") {
            clickNotification(id);
            dismiss(idToast);
            navigate(`/blog/${refId}?ref=postComment`);
          } else if (type === "Post_Comment_Vote" && extendData) {
            clickNotification(id);
            dismiss(idToast);
            navigate(
              `/blog/${
                JSON.parse(extendData).post
              }?ref=postComment&idComment=${refId}`
            );
          } else if (type === "Post_Reply" && extendData) {
            clickNotification(id);
            dismiss(idToast);
            navigate(
              `/blog/${JSON.parse(extendData).post}?ref=postComment&idComment=${
                JSON.parse(extendData).comment
              }`
            );
          }
        }}
      >
        <div className="flex items-start relative">
          <p className=" text-bg font-medium text-right text-[8px] absolute top-0 -translate-y-2 translate-x-1 right-0">
            Now
          </p>
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src={userSend.imageLink || userDefault}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {userSend.username}
            </p>
            <p className="mt-1 text-sm  text-bg">{body}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => dismiss(idToast)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUpNotify;
