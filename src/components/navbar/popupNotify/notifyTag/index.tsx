import React, { useState } from "react";
import av from "@images/av1.png";
import { iNotify } from "@DTO/Notify";
import { useNavigate } from "react-router-dom";
import { clickNotification } from "src/router/Socket";
interface iProps extends iNotify {
  fbiCloseTheDoor: () => void;
  // name: string;
  // nearMess: string;
  // time: number;
  // haveSeen: boolean;
}
const NotifyTag: React.FC<iProps> = (props) => {
  const {
    id,
    body,
    type,
    refId,
    extendData,
    userSend,
    isClicked,
    dateCreated,
    fbiCloseTheDoor,
  } = props;

  const [isClickedState, setIsClickedState] = useState(isClicked);
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    if (type === "Post_Vote") {
      clickNotification(id);
      setIsClickedState(true);
      navigate(`/blog/${refId}`);
    } else if (type === "Post_Comment") {
      clickNotification(id);
      setIsClickedState(true);
      navigate(`/blog/${refId}?ref=postComment`);
    } else if (type === "Post_Reply") {
      clickNotification(id);
      setIsClickedState(true);
      navigate(
        `/blog/${refId}?ref=postComment&idComment=${extendData?.comment}`
      );
    }
    fbiCloseTheDoor();
  };

  return (
    <div
      className="flex flex-1 items-center   p-2 rounded-lg my-2   hover:cursor-pointer hover:bg-hover max-h-[84px] "
      onClick={() => {
        handleClickNavigate();
      }}
    >
      <img
        className="rounded-full   w-12 h-12"
        src={userSend && userSend.imageLink ? userSend.imageLink : av}
      />
      <div className="flex-1 flex-col  flex justify-between ml-2">
        <span className="w-full  text-s line-clamp-3 font-normal text-white">
          {body}
        </span>
        <h1 className="w-full text-[11px]  text-primary">
          {dateCreated.convertToDay()}
        </h1>
      </div>
      {!isClickedState && (
        <div className="p-1 rounded-full bg-primaryLow"></div>
      )}
    </div>
  );
};

export default NotifyTag;
