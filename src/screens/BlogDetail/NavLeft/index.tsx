import {
  CareDown,
  CareUp,
  FacebookLogo,
  ListFill,
  Twitter,
} from "@icons/index";
import React from "react";
import ReactTooltip from "react-tooltip";

interface iNavLeftProps extends React.HTMLProps<HTMLDivElement> {}

const NavLeft: React.FC<iNavLeftProps> = (props) => {
  const { className } = props;
  return (
    <div className={" " + " " + className}>
      <div className="visible flex flex-col items-center pl-[50%] ">
        <img
          src={
            "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p148x148&_nc_cat=1&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=5JffEiPApLYAX-pzRtF&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfCSqQ_E_fHxpcZ4rhKiup5u5_kaxI_AutuxKHSu-kFlAA&oe=6393F538"
          }
          alt="avatar"
          className="h-11 w-11 rounded-full"
        />
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

          <span className="font-medium CareDown">+42</span>

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
          className="mb-4 mt-2 w-10 h-10 flex flex-col justify-center  items-center border-[1px] border-white rounded-full
        hover:bg-primary hover:border-primary transition-colors duration-500
        "
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
