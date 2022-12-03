import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCategory = () => {
  return (
    <div>
      {Array(3)
        .fill("")
        .map((a, index) => (
          <div key={index} className="flex  w-full items-center ">
            <div className="mt-2">
              <Skeleton height={8} width={8} />
            </div>
            <div className="flex-1  ml-1">
              <Skeleton width={"100%"} height={16} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonCategory;
