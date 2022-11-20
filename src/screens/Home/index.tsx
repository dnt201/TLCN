import { RootState } from "@app/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CenterContent from "./CenterContent";
import LeftContent, { listChose } from "./LeftContent";
import RightContent from "./RightContent";

const Home = () => {
  const [filter, setFilter] = useState(listChose[0].href);
  const { accessToken } = useSelector((state: RootState) => state.users);
  console.log(filter);

  return (
    <div className="flex px-4 min-h-screen bg-bg">
      <div className="w-1/4  rounded-lg ">
        <LeftContent
          className={
            " fixed  invisible overflow-y-auto hover:visible  mx-auto  mt-2  pt-4 w-[calc(25%-20px)] h-[calc(100vh-48px-16px)]  pb-6 group"
          }
          onChangeFilter={(filter: string) => setFilter(filter)}
          filter={filter}
        />
      </div>
      <CenterContent className="flex-1  mt-6   mx-2  rounded-lg overflow-y-hidden overflow-hidden   " />
      {/* <RightContent className="w-1/4 pt-6 rounded-lg hover:overflow-y-scroll" /> */}
    </div>
  );
};

export default Home;
