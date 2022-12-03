import {
  CareDown,
  CareUp,
  FacebookLogo,
  ListFill,
  Twitter,
} from "@icons/index";
import React from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import avatarDefault from "@images/userDefault.png";

interface iNavLeftProps extends React.HTMLProps<HTMLDivElement> {
  owner: {
    avatarLink: string | null;
    id: string;
    username: string;
  };
  like: number;
  isFollow: boolean;
}

const NavLeft: React.FC<iNavLeftProps> = (props) => {
  const { className, owner, like, isFollow } = props;
  console.log(isFollow);
  return (
    <div className={" " + " " + className}>
      <div className="visible flex flex-col items-center pl-[50%] ">
        <Link to={`/user-detail/${owner.id}`}>
          <img
            src={owner.avatarLink ? owner.avatarLink : avatarDefault}
            alt="avatar"
            className="h-11 w-11 rounded-full"
          />
        </Link>
        <div className="flex flex-col items-center my-4">
          <button className="p-1 group" data-tip="Up vote" data-for="upVote">
            <CareUp className="group-hover:fill-primary  transition-colors duration-500 " />
            <ReactTooltip
              textColor="#FF4401"
              id="upVote"
              place="right"
              effect="solid"
            />
          </button>

          <span className="font-medium CareDown">
            {like >= 0 ? `+${like}` : like}
          </span>

          <button
            className="p-1 group"
            data-tip="Down vote"
            data-for="downVote"
          >
            <CareDown className="group-hover:fill-primary transition-colors duration-500 " />
            <ReactTooltip
              textColor="#FF4401"
              id="downVote"
              place="right"
              effect="solid"
            />
          </button>
        </div>
        <button
          data-tip="Bookmark bài viết này"
          data-for="bookmark"
          className={
            "mb-4 mt-2 w-10 h-10 flex flex-col justify-center  items-center border-[1px] border-white rounded-full " +
            "hover:bg-primary hover:border-primary transition-colors duration-500" +
            (isFollow && " bg-primary border-primary")
          }
        >
          <ListFill />
          <ReactTooltip
            textColor="#FF4401"
            id="bookmark"
            place="right"
            effect="solid"
          />
        </button>
        <button
          className="mt-4 mb-2"
          data-tip="Share bài viết này lên facebook"
          data-for="facebookShare"
        >
          <FacebookLogo className="w-5 h-5" />
          <ReactTooltip
            textColor="#FF4401"
            id="facebookShare"
            place="right"
            effect="solid"
          />
        </button>

        <button
          className="mt-4 "
          data-tip="Share bài viết này lên Twitter"
          data-for="twitterShare"
        >
          <Twitter />
          <ReactTooltip
            textColor="#FF4401"
            id="twitterShare"
            place="right"
            effect="solid"
          />
        </button>
      </div>
    </div>
  );
};

export default NavLeft;
