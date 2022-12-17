import React, { useEffect, useRef, useState } from "react";
import qc from "@images/banner-quang-cao-du-khach-hang-hieu-qua-3.jpg";
import { useNavigate, useParams } from "react-router-dom";

import MenuRight from "./MenuRight";
import MidContent from "./MidContent";
import NavLeft from "./NavLeft";
import SkeletonBlogDetail from "./SkeletonBlogDetail";
import BlogNotFound from "./NotFound";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/store";
import { getPostDetailById } from "@redux/blogSlice";
import Comment from "./Comment";
import userApi from "@api/userApi";

const BlogDetail = () => {
  let params = useParams();
  const [stick, setStick] = useState(false);
  const { blogId } = params;
  const divRef = useRef<HTMLDivElement>(null);
  const [idCurActive, setIdCurActive] = useState("");
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const { post, error, loading } = useSelector(
    (state: RootState) => state.blog
  );

  const checkOwner = async () => {
    if (post !== null && accessToken) {
      const data = await userApi.getMe();
      if (data.status === 200) {
        if (data.data.id === post.owner.id) setIsOwner(true);
        else setIsOwner(false);
      } else setIsOwner(false);
    }
  };
  useEffect(() => {
    checkOwner();
  }, [accessToken, post]);

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

  useEffect(() => {
    if (blogId) {
      dispatch(getPostDetailById(blogId));
    }
  }, [params]);
  if (loading) return <SkeletonBlogDetail />;
  if (!post?.id) return <BlogNotFound />;
  return (
    <div
      ref={divRef}
      className="bg-white min-h-[calc[100vh-52px]] flex flex-col text-bg"
    >
      {post ? (
        <>
          <img
            className="mx-auto  max-w-[80ch] min-h-[25vh] max-h-[30vh]"
            src={post.thumbnailLink || qc}
            alt="banner"
          />
          <div className="flex flex-col">
            <div className="flex pt-10 bg-white  mb-4  min-h-full">
              <NavLeft
                isOwner={isOwner}
                status={post.status}
                voteData={post.voteData}
                idPost={post.id}
                owner={post.owner}
                isFollow={post.isFollow}
                like={post.like}
                className={
                  " h-[calc(70vh-52px)] flex-1   invisible hover:visible  " +
                  (stick &&
                    " sticky w-[15%]  h-[calc(100vh-52px)] top-[72px]  ")
                }
              />

              <MidContent
                {...post}
                setIdCurActive={setIdCurActive}
                className="min-h-[calc(75vh-52px)]  flex-[3] max-w-[1016px]  mx-2  rounded-lg overflow-y-hidden overflow-hidden   "
              />
              <MenuRight
                idCurActive={idCurActive}
                content={post.content}
                className={
                  " h-[calc(70vh -52px)] flex-1 overflow-auto invisible hover:visible " +
                  (stick &&
                    " sticky w-1/5 h-[calc(100vh-52px)] top-[52px] pb-4")
                }
              />
            </div>
            <div className=" max-w-[1016px]   w-full mx-auto">
              <div className=" my-8 w-full mx-auto">
                <h4 className="pb-2">
                  Bài viết khác từ{" "}
                  <b
                    className="text-primary hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/user-detail/${post.owner.id}?posted`);
                    }}
                  >
                    {post.owner.username}
                  </b>
                </h4>
                <div className="w-full flex justify-center my-4">
                  <i className="">Danh sách bài viết của user</i>
                </div>
              </div>

              <div id="comment-post-section">
                <Comment
                  idPost={post.id}
                  isOwner={isOwner}
                  status={post.status}
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
