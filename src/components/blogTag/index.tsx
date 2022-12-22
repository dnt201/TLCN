import React, { useEffect, useRef, useState } from "react";
import { ListFill, More } from "@icons/index";
import { Link, useNavigate } from "react-router-dom";
import defaultPost from "@images/default-placeholder.png";
import avatarDefault from "@images/userDefault.png";
import { iPostDetail } from "@DTO/Blog";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import { RootState } from "@app/store";

import userApi from "@api/userApi";
import toast from "react-hot-toast";
import ActionModal from "@screens/BlogDetail/NavLeft/ActionModal";

interface iLazy extends iPostDetail {
  myPost?: boolean;
  listFromFollowing?: iPostDetail[];
  setListFromFollowing?: (posts: iPostDetail[]) => void;
  setPage?: (number: number) => void;
  setPageForce?: (number: number) => void;
}

const BlogTag: React.FC<iLazy> = (props) => {
  const {
    myPost,
    id,
    title,
    tags,
    dateModified,
    owner,
    view,
    like,
    isFollow,
    comment,
    thumbnailLink,
    listFromFollowing,
    setListFromFollowing,
    setPage,
    setPageForce,
  } = props;
  const navigate = useNavigate();
  const [isFollowState, setIsFollowState] = useState(isFollow);
  const divBLogTagRef = useRef<HTMLDivElement>(null);
  const [loadingPrevent, setLoadingPrevent] = useState(false);
  const { userInfo, accessToken } = useSelector(
    (state: RootState) => state.users
  );
  const handleFollowPost = async () => {
    if (!userInfo || !accessToken) {
      localStorage.clear();
      navigate(`/login?redirect=followPost&id=${id}`);
    } else if (accessToken !== null) {
      setLoadingPrevent(true);
      userApi.followPost(id).then((result) => {
        if (result.status === 201) {
          if (isFollowState) {
            toast.error("Đã Unfollow bài viết!");
            if (setPageForce) setPageForce(-1);
            if (
              listFromFollowing &&
              setListFromFollowing &&
              setPage &&
              divBLogTagRef &&
              divBLogTagRef.current
            ) {
              let tempList = listFromFollowing;
              const isCurPost = (element: iPostDetail) => element.id === id;
              const tempIndex = tempList.findIndex(isCurPost);
              if (tempIndex > -1) {
                tempList.splice(tempIndex, 1);
                if (tempList.length <= 0) {
                  setPage(-1);
                } else {
                  setListFromFollowing(tempList);
                }
              }
            }
            setIsFollowState(!isFollowState);
          } else {
            if (setPageForce) setPageForce(-1);
            toast.success("Đã follow bài viết!");
            setIsFollowState(!isFollowState);
          }
        } else toast.error("You can't follow this post!");
        setTimeout(() => {
          setLoadingPrevent(false);
        }, 2000);
      });
    }
  };
  const [showActionModal, setShowActionModal] = useState(false);
  const refDivActionModal = useRef<HTMLDivElement>(null);

  useEffect(() => {}, [showActionModal]);
  useEffect(() => {
    const handleClickOutActionModal = (event: any) => {
      if (
        refDivActionModal.current &&
        !refDivActionModal.current.contains(event.target)
      ) {
        setShowActionModal(false);
      } else {
      }
    };
    document.addEventListener("click", handleClickOutActionModal, true);
    return () => {
      document.removeEventListener("click", handleClickOutActionModal, true);
    };
  }, [refDivActionModal]);
  return (
    <div
      ref={divBLogTagRef}
      key={id}
      className={
        (listFromFollowing && isFollowState === false ? " hidden " : " ") +
        "flex  w-full bg-bg2 p-2 mb-4  shadow-md rounded-2xl items-center hover:cursor-pointer "
      }
      onClick={() => navigate(`/blog/${id}`)}
    >
      {/* left */}
      <div className=" h-[110px] md:h-[120px] lg:h-[140px] flex">
        <img
          className=" w-[110px] md:w-[120px] lg:w-[140px] h-auto rounded-2xl object-cover "
          // src={image || ""}
          src={thumbnailLink || defaultPost}
          alt="backdrop image"
        />
      </div>

      {/* right */}
      <div className="flex flex-col justify-between flex-1  h-[110px] md:h-[120px] lg:h-[140px] ml-2">
        {/* first row */}
        <div>
          <div className="flex items-start">
            <h2 className="flex-1 font-semibold text-[16px] line-clamp-3 ">
              {title}
            </h2>
            {myPost ? (
              <div
                className="p-1 mb-4 relative z-[10100] "
                ref={refDivActionModal}
              >
                <button
                  onClick={(e) => {
                    setShowActionModal(!showActionModal);
                    e.stopPropagation();
                  }}
                >
                  <More
                    className="w-6 h-6 "
                    data-tip="Chỉnh sửa bài viết"
                    data-for="acctionOfPostNavLeft"
                  />
                  <ReactTooltip
                    textColor="#FF4401"
                    id="acctionOfPostNavLeft"
                    place="top"
                    effect="solid"
                  />
                </button>
                {showActionModal ? (
                  <ActionModal
                    redirect="me"
                    className=" -translate-x-1/2 bg-white "
                    idPost={id}
                  />
                ) : null}
              </div>
            ) : (
              <button
                className={loadingPrevent ? "cursor-not-allowed" : " "}
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!loadingPrevent) {
                    await handleFollowPost();
                  }
                }}
              >
                <ListFill
                  data-tip={
                    isFollowState
                      ? "Unfollow bài viết?"
                      : "Click để follow bài viết"
                  }
                  data-for="follow"
                  className={
                    " " +
                    (isFollowState
                      ? " fill-primary"
                      : !loadingPrevent && " hover:fill-primary duration-300")
                  }
                />
                <ReactTooltip
                  textColor="#FF4401"
                  id="follow"
                  place="bottom"
                  effect="solid"
                  padding={"8px"}
                />
              </button>
            )}
          </div>
          <div className=" ">
            {tags &&
              tags.map((item, index) => (
                <span
                  key={item.id}
                  className={
                    "py-1 px-2 mx-1 bg-hover rounded-[20px] text-ss " +
                    (index == 0 && "ml-0")
                  }
                >
                  {item.displayName}
                </span>
              ))}
          </div>
        </div>

        {/* sec row */}

        {/* third row */}
        <div className="flex items-center">
          {/* ava */}
          <Link
            to={`/user-detail/${owner.id}`}
            className=" flex items-center duration-1000 p-1 rounded-lg hover:bg-hover"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <img
              className="w-8 h-8 mr-1 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full"
              src={
                owner.avatarLink !== null && owner.avatarLink.length > 0
                  ? owner.avatarLink
                  : avatarDefault
              }
            />

            {/* Name + time */}
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{owner.username}</span>
              <span className="font-semibold text-ss">
                {dateModified && dateModified.getNumberOfDayFromNow()}
              </span>
            </div>
          </Link>
          {/* another */}
          <div className="flex-1 text-right">
            <span className="font-normal text-ss px-1">{view} Views</span>
            <span className="font-normal text-ss px-1">{like} Likes</span>
            <span className="font-normal text-ss px-1">{comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTag;
