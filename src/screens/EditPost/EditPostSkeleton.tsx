import React from "react";
import Skeleton from "react-loading-skeleton";

const EditPostSkeleton = () => {
  return (
    <div className="bg-bg h-screen flex flex-col">
      <div className="flex items-center justify-center  border-b-[1px] border-smokeDark px-2">
        <div className="w-[95%] mb-1 mr-2">
          <Skeleton height={24} />
        </div>
        <div className="w-[5%] mb-1">
          <Skeleton height={24} />
        </div>
      </div>
      <div className="flex flex-1  justify-center items-center mb-4">
        <div className="flex-1">
          <div className="w-[95%] mb-1 mx-2">
            <Skeleton height={24} />
          </div>
          <div className="w-[95%] mb-1 mx-2">
            <Skeleton height={24} />
          </div>
          <div className="w-[95%] mb-1 mx-2">
            <Skeleton height={24} />
          </div>
          <div className="w-[95%] mb-1 mx-2">
            <Skeleton height={24} />
          </div>
        </div>
        <div className="w-[240px] h-[240px] mr-4">
          <Skeleton width={240} height={240} />
        </div>
      </div>
    </div>
  );
};

export default EditPostSkeleton;
