import { RootState } from "@app/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CenterContent from "./CenterContent";
import LeftContent, { listChose } from "./LeftContent";

const Home = () => {
  const { accessToken } = useSelector((state: RootState) => state.users);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    console.log("mouteddđ-----------------------");
    window.scrollTo(0, 0);
  }, [accessToken]);
  return (
    <div className="flex px-4 min-h-[inherit] bg-bg">
      <div className="w-1/5  rounded-lg ">
        <LeftContent
          className={
            " fixed  invisible overflow-y-auto hover:visible  mx-auto  mt-2  pt-4 w-[calc(20%-20px)] h-[calc(100vh-48px-16px)]  pb-6 group"
          }
        />
      </div>
      <CenterContent className="flex-1 mt-6   mx-2  rounded-lg overflow-y-hidden overflow-hidden   " />
      {/* <RightContent className="w-1/4 pt-6 rounded-lg hover:overflow-y-scroll" /> */}
    </div>
  );
};

export default Home;
