import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const InforSkeleton = () => {
  return (
    <div className="w-1/4 ">
      <div className="flex mx-[5%] items-center">
        <Skeleton circle height={160} width={160} />
        <span className="flex-1 ml-2">
          <Skeleton count={3} />
        </span>
      </div>
      <Skeleton width={"90%"} height={"calc(100vh-52px-160px)"} />
    </div>
  );
};

export default InforSkeleton;
