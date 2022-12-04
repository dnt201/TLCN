import React, { useEffect, useState } from "react";
import qc from "@images/banner-quang-cao-du-khach-hang-hieu-qua-3.jpg";
import { useParams } from "react-router-dom";

import MenuRight from "./MenuRight";
import MidContent from "./MidContent";
import NavLeft from "./NavLeft";
import postApi from "@api/postApi";
import { iPostDetail } from "@DTO/Blog";
import SkeletonBlogDetail from "./SkeletonBlogDetail";
import BlogNotFound from "./NotFound";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/store";
import { getPostDetailById } from "@redux/blogSlice";
const BlogDetail = () => {
  console.log("rerender");
  let params = useParams();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [stick, setStick] = useState(false);
  const { blogId } = params;
  // const [blog, setBlog] = useState<iPostDetail | null>(null);
  const { post, error, loading } = useSelector(
    (state: RootState) => state.blog
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    const vH = (window.innerHeight * 25) / 100 - 8;
    const currentYOffset = window.pageYOffset;
    if (currentYOffset >= vH) setStick(true);
    else setStick(false);
  }
  // const getBlogById = async (id: string) => {
  //   setLoading(true);
  //   const result = await postApi.getPostDetailById(id);
  //   console.log("result", result);
  //   if (result.status === 200) {
  //     setBlog(result.data);
  //   } else setBlog(null);
  //   setLoading(false);
  //   return "124";
  // };
  useEffect(() => {
    if (blogId) {
      dispatch(getPostDetailById(blogId));
    }
    // setBlog(getBlogById(blogId + "1"));
  }, [params]);
  // console.log(blog);
  if (loading) return <SkeletonBlogDetail />;
  return (
    <div ref={divRef} className="bg-bg min-h-[calc[100vh-52px]] flex flex-col">
      {post ? (
        <>
          <img
            className="mx-auto  w-[80ch] max-h-[25vh]"
            src={qc}
            alt="banner"
          />
          <div className="flex flex-col">
            <div className="flex pt-10 bg-bg  mb-4  min-h-full">
              <NavLeft
                owner={post.owner}
                isFollow={post.isFollow}
                like={post.like}
                className={
                  " h-[calc(70vh-52px)] flex-1 overflow-auto invisible hover:visible  " +
                  (stick && " sticky w-[15%]  h-[calc(100vh-52px)] top-[72px] ")
                }
              />

              <MidContent
                title={post.title}
                content={`<h1 id="01-tran-duy-nha">1. Trần Duy Nhã</h1>
                <p>abacscascsa</p>
                <h1 id="12-gi-ki-vay-troi">2. Gì kì vậy trời</h1>
                <p>124125215215122</p>
                <p></p>
                <iframe width="100%" height="480px" src="https://www.youtube.com/embed/BMtaUb-E5Uc/SOOBINOfficial" frameborder="0"></iframe>
                <p></p>
                <h1 id="23-ok-hinh-ne">3. Ok hình nè</h1>
                <p></p>
                <img src="http://localhost:3000/file/a9414559-0719-40ed-ace3-309059605000" alt="undefined" style="height: auto; width: auto; margin-left: auto; margin-right: auto; align-self: center;">
                <p></p>
                `}
                className="min-h-[calc(75vh-52px)]  flex-[3] max-w-[1016px]  mx-2  rounded-lg overflow-y-hidden overflow-hidden   "
              />

              <div className="w-1/5 mr-2">
                <MenuRight
                  content={`<h1 id="01-tran-duy-nha">1. Trần Duy Nhã</h1>
                 <p>abacscascsa</p>
                 <h1 id="12-gi-ki-vay-troi">2. Gì kì vậy trời</h1>
                 <p>124125215215122</p>
                 <p></p>
                 <iframe width="100%" height="480px" src="https://www.youtube.com/embed/BMtaUb-E5Uc/SOOBINOfficial" frameborder="0"></iframe>
                 <p></p>
                 <h1 id="23-ok-hinh-ne">3. Ok hình nè</h1>
                 <p></p>
                 <img src="http://localhost:3000/file/a9414559-0719-40ed-ace3-309059605000" alt="undefined" style="height: auto; width: auto; margin-left: auto; margin-right: auto; align-self: center;">
                 <p></p>
                 `}
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
