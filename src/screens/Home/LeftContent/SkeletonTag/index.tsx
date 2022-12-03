import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonTag = () => {
  return (
    <div>
      {Array(3)
        .fill("")
        .map((a, index) => (
          <div key={index} className="flex items-center  w-full mb-4">
            <Skeleton height={20} width={20} />
            <div className={`ml-1 flex flex-col flex-1`}>
              <div className="flex-[2]">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
              <div className="flex-[2]">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonTag;
