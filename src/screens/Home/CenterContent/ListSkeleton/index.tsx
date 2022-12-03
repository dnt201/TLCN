import React, { useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";

const ListSkeleton = () => {
  const refD = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (refD !== null && refD.current) {
      refD.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [refD]);
  return (
    <div ref={refD}>
      {Array(3)
        .fill("")
        .map((a, index) => (
          <div key={index} className="flex  w-full h-[120px] mb-4">
            <Skeleton height={"100%"} width={140} />
            <div className={`ml-1 flex flex-col flex-1`}>
              <div className="flex-[2]  mb-1">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
              <div className="flex-[2]  mb-1">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
              <div className="flex-[2] mb-1 ">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
              <div className="flex-[3] flex  ">
                <div className="flex-1 mr-2">
                  <Skeleton width={"100%"} height={"100%"} />
                </div>
                <div className="flex-[4]">
                  <Skeleton width={"100%"} height={"100%"} />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListSkeleton;
