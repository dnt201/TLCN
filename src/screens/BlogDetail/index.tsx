import { iBlogTag } from "@components/blogTag";
import { log } from "console";
import React, { useEffect, useRef, useState } from "react";
import qc from "@images/banner-quang-cao-du-khach-hang-hieu-qua-3.jpg";
import { useParams } from "react-router-dom";
import { getBlogById } from "./data";
import MenuRight from "./MenuRight";
import MidContent from "./MidContent";
import NavLeft from "./NavLeft";
const BlogDetail = () => {
  let params = useParams();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [stick, setStick] = useState(false);
  const { blogId } = params;
  const [blog, setBlog] = useState<iBlogTag>();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    const vH = (window.innerHeight * 25) / 100 - 8;
    const currentYOffset = window.pageYOffset;
    if (currentYOffset >= vH) setStick(true);
    else setStick(false);
    console.log(vH, currentYOffset);
  }

  useEffect(() => {
    setBlog(getBlogById(blogId + "1"));
  }, [params]);
  console.log(blogId, " ,", blog);

  return (
    <div ref={divRef} className="bg-bg min-h-screen flex flex-col">
      <img className="mx-auto  w-[80ch] max-h-[25vh]" src={qc} alt="banner" />
      <div className="flex  min-h-screen bg-bg  mb-4 ">
        <div className="w-[15%]">
          <NavLeft
            className={
              " h-[calc(100vh-52px)] overflow-auto invisible hover:visible " +
              (stick &&
                " h-[calc(100vh-52px)]  fixed   w-[15%]  top-0 mt-[64px]  pb-6 ")
            }
          />
        </div>
        <MidContent className=" flex-1  mt-6   mx-2  rounded-lg overflow-y-hidden overflow-hidden   " />
        <div className="w-1/5 mr-2">
          <MenuRight
            className={
              " h-[calc(100vh-52px)] overflow-auto invisible hover:visible " +
              (stick &&
                " h-[calc(100vh-52px)]  fixed w-1/5 top-0 mt-[64px]  pb-6 ")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(BlogDetail);
