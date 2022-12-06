import {
  CareDown,
  CareUp,
  FacebookLogo,
  ListFill,
  Twitter,
} from "@icons/index";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import avatarDefault from "@images/userDefault.png";
import userApi from "@api/userApi";
import toast from "react-hot-toast";

interface iNavLeftProps extends React.HTMLProps<HTMLDivElement> {
  idPost: string;
  owner: {
    avatarLink: string | null;
    id: string;
    username: string;
  };
  like: number;
  isFollow: boolean;
}

const NavLeft: React.FC<iNavLeftProps> = (props) => {
  const { className, idPost, owner, like, isFollow } = props;
  const [isFollowState, setIsFollowState] = useState<boolean>(
    isFollow || false
  );
  const [isDisable, setDisable] = useState<boolean>(false);
  // console.log(isFollow);
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
          data-tip={
            isFollowState ? "Unfollow bài viết này" : "Follow bài viết này"
          }
          data-for="bookmark"
          className={
            "mb-4 mt-2 w-10 h-10 flex flex-col justify-center  items-center border-[1px] border-white rounded-full transition-colors duration-50 " +
            (!isDisable && "hover:bg-primary hover:border-primary 0 ") +
            (isFollowState && " bg-primary border-primary ") +
            (isDisable && " cursor-not-allowed ")
          }
          disabled={isDisable}
          onClick={async () => {
            setDisable(true);
            var result;
            if (isFollowState === true) {
              result = await userApi.followPost(idPost);
            } else {
              result = await userApi.followPost(idPost);
            }
            if (result.status === 201) {
              if (isFollowState === true)
                toast.error("Unfollow bài viết thành công!");
              else toast.success("Follow bài viết thành công!");
              setIsFollowState(!isFollowState);
            }
            await setTimeout(() => {
              setDisable(false);
            }, 1000);
          }}
        >
          <ListFill />
          <ReactTooltip
            textColor="#FF4401"
            id="bookmark"
            place="right"
            effect="solid"
          />
        </button>

        {/* <iframe
          src={`https://www.facebook.com/plugins/share_button.php?href=https://viblo.asia/p/cau-hinh-aws-credential-zOQJwYPxVMP#_tao-nhieu-profile-credential-2&layout=button&size=large&width=87&height=28&appId`}
          width="87"
          height="28"
          className="border-none overflow-hidden"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          data-tip="Share bài viết này lên facebook"
          data-for="facebookShare"
        >
          <ReactTooltip
            textColor="#FF4401"
            id="facebookShare"
            place="right"
            effect="solid"
          />
        </iframe> */}

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
