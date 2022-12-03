import React from "react";
import { Book, BookFill, Heart, ListFill } from "@icons/index";
import { Link, useNavigate } from "react-router-dom";
import defaultPost from "@images/default-placeholder.png";
import avatarDefault from "@images/userDefault.png";

export interface iBlogTag {
  id: string;
  title: string;
  dateModified: string;
  owner: {
    id: string;
    username: string;
    avatarLink: string;
  };
  category: {
    id: string;
    categoryName: string;
  };
  tags: [
    {
      id: string;
      postTagName: string;
      displayName: string;
      colorCode: string;
      thumbnailId: string;
    }
  ];
  like: number;
  view: number;
  comment: number;
  thumbnailLink: string;
  isFollow: false;
}

const BlogTag: React.FC<iBlogTag> = (props) => {
  const {
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
  } = props;
  const navigate = useNavigate();
  return (
    <div
      key={id}
      className="flex  w-full bg-bg2 p-2 mb-4  shadow-md rounded-2xl items-center hover:cursor-pointer "
      onClick={() => navigate(`/blog/${id}`)}
    >
      {/* left */}
      <div className=" h-[110px] md:h-[120px] lg:h-[140px] flex">
        <img
          className=" w-[110px] md:w-[120px] lg:w-[140px] h-auto rounded-2xl "
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
            <h2 className="flex-1 font-semibold text-[16px]">{title}</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ListFill
                className={
                  " hover:fill-primary duration-1000 " +
                  (isFollow && " fill-primary")
                }
              />
            </button>
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
          <div className="flex items-center duration-1000 p-1 rounded-lg hover:bg-hover">
            <Link
              to={`user-detail/${owner.id}`}
              className="pr-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <img
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full"
                src={
                  owner.avatarLink !== null && owner.avatarLink.length > 0
                    ? owner.avatarLink
                    : avatarDefault
                }
              />
            </Link>
            {/* Name + time */}
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{owner.username}</span>
              <span className="font-semibold text-ss">
                {dateModified && dateModified.getNumberOfDayFromNow()}
              </span>
            </div>
          </div>
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
