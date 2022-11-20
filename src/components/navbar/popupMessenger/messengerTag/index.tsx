import React from "react";
import av from "@images/av1.png";
interface iMessTagProps extends React.HTMLProps<HTMLDivElement> {
  name: string;
  nearMess: string;
  time: number;
  haveSeen: boolean;
}
const MessengerTag = () => {
  return (
    <div className="flex items-center w-full p-2 rounded-lg  hover:cursor-pointer hover:bg-hover">
      <img className="rounded-full  w-12 h-12" src={av} />
      <div className="flex-1 ml-2">
        <h1 className="w-full text-base">Họ và tên</h1>
        <h1 className="w-full text-sm">
          Tin nhắn gần nhất + <span>time</span>
        </h1>
      </div>
      <div>Status</div>
    </div>
  );
};

export default MessengerTag;
