import React, { useEffect, useRef, useState } from "react";

import av1 from "@images/av1.png";
import { useNavigate } from "react-router-dom";
import { RootState } from "@app/store";
import { useSelector } from "react-redux";
import { Write } from "@icons/index";
import postApi from "@api/postApi";

import ListSkeleton from "./ListSkeleton";
import { iPage } from "@DTO/Pagination";
import ListInfinityNewest from "./ListInfinityNewest";
import ListInfinityFollowing from "./ListInfinityFollowing";
import NoPost from "./NoPost";
interface iProps extends React.HTMLProps<HTMLDivElement> {
  a?: string;
}

const CenterContent: React.FC<iProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState<iPage | null>(null);
  // const [errorKeyKiLaLamLun, setErrorKeyKiLaLamLun] = useState(true);
  const divListBlog = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const curPath = window.location.pathname;
  const { accessToken, userInfo } = useSelector(
    (state: RootState) => state.users
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (curPath === "/popular") {
      const fakeLoading = async () => {
        await setTimeout(() => {
          setLoading(false);
        }, 2000);
      };
      fakeLoading();
    } else if (curPath === "/following") {
      if (accessToken === null || accessToken.length <= 0) {
        navigate("/login");
      } else {
        const getData = async () => {
          const result = await postApi.getListPostHaveBeenFollow();
        };
        getData();
      }
    } else {
      const a = async () => {
        const result = await postApi.getAllPost();
        if (result.status === 201) {
        }
      };
      a();
    }

    return () => {};
  }, [curPath]);

  return (
    <div className={props.className} onClick={() => {}}>
      {accessToken && accessToken !== "" ? (
        <div className="flex items-center bg-bg2 p-4 mb-2 rounded-md">
          <img
            onClick={(e) => {
              navigate("/detail-user");
              e.stopPropagation();
            }}
            className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full mr-2 hover:cursor-pointer"
            src={userInfo?.avatarLink || av1}
            alt="user avatar"
          />
          <p
            className="flex items-center flex-1 h-8  md:h-9  lg:h-10  bg-hover text-s px-2 py-1 rounded-md hover:cursor-text"
            onClick={(e) => {
              navigate("/new-post");
              e.stopPropagation();
            }}
          >
            Let’s share what going on your mind...
          </p>
          <button
            className="bg-primary rounded-md px-2 py-1 text-s ml-2"
            onClick={(e) => {
              navigate("/new-post");
              e.stopPropagation();
            }}
          >
            Create Post
          </button>
        </div>
      ) : (
        <div
          className="flex-1 text-primary py-2 mb-4 hover:cursor-pointer flex items-center justify-center border-[1px] border-primary rounded-lg text-xs"
          onClick={() => {
            navigate("/login");
          }}
        >
          <Write className="stroke-primary w-5 h-5 mr-2 " />
          Đăng nhập để viết bài!
        </div>
      )}

      {curPath === "/newest" || curPath === "/" ? (
        <ListInfinityNewest />
      ) : curPath === "/following" ? (
        <ListInfinityFollowing />
      ) : curPath === "/popular" && !loading ? (
        <NoPost />
      ) : (
        <ListSkeleton />
      )}
    </div>
  );
};

export default CenterContent;
