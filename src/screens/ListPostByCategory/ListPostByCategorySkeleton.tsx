import ListSkeleton from "@screens/Home/CenterContent/ListSkeleton";
import React from "react";
import Skeleton from "react-loading-skeleton";

const ListPostByCategorySkeleton = () => {
  return (
    <div className="flex  flex-col bg-bg  min-h-[calc(100vh-52px)] ">
      <div className="flex  items-center w-full max-w-[960px] mx-auto  pb-[2px] mt-[10vh] border-b-2 border-hover">
        <div className=" flex items-center mr-2 flex-1">
          <div className=" bg-hover rounded-md p-2 mr-2 group-hover:bg-bg  transition-colors duration-300"></div>
          <Skeleton width={90} />
        </div>

        <div className="flex flex-col items-center">
          <Skeleton />
        </div>
      </div>

      <div className="flex flex-1 h-full flex-col items-center">
        <div className="h-full w-full max-w-[960px]">
          <ListSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ListPostByCategorySkeleton;
