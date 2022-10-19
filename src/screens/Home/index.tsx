import React from "react";
import CenterContent from "./CenterContent";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

const Home = () => {
  return (
    <div className="flex px-4  ">
      <div className="w-1/4 rounded-lg ">
        <LeftContent
          className={
            " overflow-y-scroll fixed overflow-hidden  pt-6  w-[calc(25%-20px)] h-[calc(100vh-56px-16px)]"
          }
        />
      </div>

      <CenterContent className="w-2/4  mt-6   mx-2 h-[1000px] bg-white rounded-lg overflow-y-hidden overflow-hidden   " />
      <RightContent className="w-1/4 pt-6 rounded-lg overflow-y-scroll" />
    </div>
  );
};

export default Home;
