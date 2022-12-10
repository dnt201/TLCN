import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonBlogDetail = () => {
  return (
    <div className="flex ">
      <div className="w-1/5 flex flex-col items-end mt-[96px]">
        <div className=" flex flex-col items-center">
          <Skeleton
            baseColor="#f1f1f1"
            highlightColor="#a1a1a1"
            width={44}
            height={44}
            circle
          />
          <Skeleton
            baseColor="#f1f1f1"
            highlightColor="#a1a1a1"
            width={44}
            height={120}
          />
        </div>
      </div>
      <div className="w-3/5 flex flex-col  ">
        <div className="mx-4 mt-2">
          <Skeleton
            baseColor="#f1f1f1"
            highlightColor="#a1a1a1"
            width={"100%"}
            height={"20vh"}
          />
        </div>

        <div className="mx-4">
          <Skeleton
            baseColor="#f1f1f1"
            highlightColor="#a1a1a1"
            width={"100%"}
            height={28}
          />
          <Skeleton
            baseColor="#f1f1f1"
            highlightColor="#a1a1a1"
            width={"100%"}
          />
          <Skeleton
            baseColor="#f1f1f1"
            highlightColor="#a1a1a1"
            width={"100%"}
          />
          <Skeleton
            baseColor="#f1f1f1"
            highlightColor="#a1a1a1"
            width={"100%"}
            height={"50vh"}
          />
        </div>
      </div>{" "}
      <div className="w-1/5 flex flex-col mt-[96px]">
        <Skeleton
          baseColor="#f1f1f1"
          highlightColor="#a1a1a1"
          width={"90%"}
          height={28}
        />
        <Skeleton baseColor="#f1f1f1" highlightColor="#a1a1a1" width={"90%"} />
        <Skeleton baseColor="#f1f1f1" highlightColor="#a1a1a1" width={"90%"} />
        <Skeleton baseColor="#f1f1f1" highlightColor="#a1a1a1" width={"90%"} />
        <Skeleton baseColor="#f1f1f1" highlightColor="#a1a1a1" width={"90%"} />
        <Skeleton baseColor="#f1f1f1" highlightColor="#a1a1a1" width={"90%"} />
        <Skeleton baseColor="#f1f1f1" highlightColor="#a1a1a1" width={"90%"} />
      </div>{" "}
      <div></div>
    </div>
  );
};

export default SkeletonBlogDetail;
