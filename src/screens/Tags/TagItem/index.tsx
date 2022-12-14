import { iTag } from "@DTO/Tag";
import { Javascript } from "@icons/index";
import React from "react";
import defaultIMG from "@images/default.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
const TagItem: React.FC<iTag> = (props) => {
  const { PostCount, postTagName, thumbnailLink } = props;
  return (
    <Link
      to={`${props.id}`}
      className="w-1/3 min-w-[200px] h-fit flex items-center px-4 mb-4 "
    >
      <img
        className=" rounded-md w-20 h-20 mr-2"
        src={thumbnailLink === null ? defaultIMG : thumbnailLink}
        // effect="blur"
      />

      <div className="flex flex-col">
        <h3 className="text-base">{postTagName}</h3>
        <span className="font-light text-sm">{PostCount} bài viết</span>
      </div>
    </Link>
  );
};

export default TagItem;
