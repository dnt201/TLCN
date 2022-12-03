import React, { useEffect, useState } from "react";
import qc from "@images/banner-quang-cao-du-khach-hang-hieu-qua-3.jpg";
import { useParams } from "react-router-dom";

import MenuRight from "./MenuRight";
import MidContent from "./MidContent";
import NavLeft from "./NavLeft";
import postApi from "@api/postApi";
import { iBlogDetail } from "@DTO/Blog";
import SkeletonBlogDetail from "./SkeletonBlogDetail";
import BlogNotFound from "./BlogNotFound";
const BlogDetail = () => {
  let params = useParams();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [stick, setStick] = useState(false);
  const { blogId } = params;
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<iBlogDetail | null>(null);

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
  const getBlogById = async (id: string) => {
    setLoading(true);
    const result = await postApi.getPostDetailById(id);
    console.log("result", result);
    if (result.status === 200) {
      setBlog(result.data);
    } else setBlog(null);
    setLoading(false);
    return "124";
  };
  useEffect(() => {
    if (blogId) {
      getBlogById(blogId);
    }
    // setBlog(getBlogById(blogId + "1"));
  }, [params]);
  console.log(blog);
  if (loading) return <SkeletonBlogDetail />;

  return (
    <div ref={divRef} className="bg-bg min-h-[calc[100vh-52px]] flex flex-col">
      {blog ? (
        <>
          <img
            className="mx-auto  w-[80ch] max-h-[25vh]"
            src={qc}
            alt="banner"
          />
          <div className="flex flex-col">
            <div className="flex pt-10 bg-bg  mb-4  min-h-full">
              <NavLeft
                owner={blog.owner}
                isFollow={blog.isFollow}
                like={blog.like}
                className={
                  " h-[calc(70vh-52px)] flex-1 overflow-auto invisible hover:visible  " +
                  (stick && " sticky w-[15%]  h-[calc(100vh-52px)] top-[72px] ")
                }
              />

              <MidContent className="min-h-[calc(75vh-52px)]  flex-[3] max-w-[1016px]  mx-2  rounded-lg overflow-y-hidden overflow-hidden   " />

              <div className="w-1/5 mr-2">
                <MenuRight
                  className={
                    " h-[calc(70vh -52px)] flex-1 overflow-auto invisible hover:visible " +
                    (stick && " fixed w-1/5 top-0 mt-[64px]  pb-6 ")
                  }
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <BlogNotFound />
      )}
    </div>
  );
};

export default React.memo(BlogDetail);
