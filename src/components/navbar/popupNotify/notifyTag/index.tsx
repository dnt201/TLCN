import React from "react";
import av from "@images/av1.png";
interface iMessTagProps extends React.HTMLProps<HTMLDivElement> {
  name: string;
  nearMess: string;
  time: number;
  haveSeen: boolean;
}
const NotifyTag = () => {
  return (
    <div className="flex flex-1 items-center  p-2 rounded-lg   hover:cursor-pointer hover:bg-hover max-h-[84px]">
      <img className="rounded-full  w-12 h-12" src={av} />
      <div className="flex-1 ml-2">
        <h1 className="w-full  text-[12px] line-clamp-3 font-normal text-primary">
          Note: Avatar component returns an tag with a random image. All other
          props like "className, width, height, alt" etc. will directly passed
          to element.
        </h1>
        <h1 className="w-full text-[11px]  text-primary">Time</h1>
      </div>
      <div>Status</div>
    </div>
  );
};

export default NotifyTag;
