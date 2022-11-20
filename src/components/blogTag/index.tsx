import React from "react";
import { Book, BookFill, Heart, ListFill } from "@icons/index";
import { Link, useNavigate } from "react-router-dom";
export interface iBlogTag {
  id: string;
  title: string;
  listTag: string[];
  image: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  view: number;
  like: number;
  isLike: boolean;
  numCom: number;
}
interface iBlogDetail {
  blogID: string;
}

const BlogTag: React.FC<iBlogTag> = (props) => {
  const { id, title, listTag, image, user, view, like, isLike, numCom } = props;
  const navigate = useNavigate();
  return (
    <div
      className="flex  w-full bg-bg2 p-2 mb-4  shadow-md rounded-2xl items-center hover:cursor-pointer "
      onClick={() => navigate(`/blog/${id}`)}
    >
      {/* left */}
      <div className=" h-[110px] md:h-[120px] lg:h-[140px] flex">
        <img
          className=" w-[110px] md:w-[120px] lg:w-[140px] h-auto rounded-2xl "
          src={image}
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
                  (isLike && " fill-primary")
                }
              />
            </button>
          </div>
          <div className=" ">
            {listTag &&
              listTag.map((item, index) => (
                <span
                  className={
                    "py-1 px-2 mx-1 bg-hover rounded-[20px] text-ss " +
                    (index == 0 && "ml-0")
                  }
                >
                  {item}
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
              to={`user-detail/${user.id}`}
              className="pr-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <img
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full"
                src={user.image}
              />
            </Link>
            {/* Name + time */}
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{user.name}</span>
              <span className="font-semibold text-ss">1 week ago</span>
            </div>
          </div>
          {/* another */}
          <div className="flex-1 text-right">
            <span className="font-normal text-ss px-1">{view} Views</span>
            <span className="font-normal text-ss px-1">{like} Likes</span>
            <span className="font-normal text-ss px-1">{numCom} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTag;
