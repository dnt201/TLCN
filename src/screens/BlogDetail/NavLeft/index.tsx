import {
  CareDown,
  CareUp,
  FacebookLogo,
  ListFill,
  More,
  Twitter,
  Write,
} from "@icons/index";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import avatarDefault from "@images/userDefault.png";
import userApi from "@api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@app/store";
import ActionModal from "./ActionModal";
import postApi from "@api/postApi";

interface iNavLeftProps extends React.HTMLProps<HTMLDivElement> {
  idPost: string;
  owner: {
    avatarLink: string | null;
    id: string;
    username: string;
  };
  like: number;
  isFollow: boolean;
  status: "Approve" | "Waiting";
  voteData?: "Upvote" | "DownVote";
  isOwner: boolean;
}

const NavLeft: React.FC<iNavLeftProps> = (props) => {
  const {
    className,
    idPost,
    owner,
    like,
    isFollow,
    status,
    voteData,
    isOwner,
  } = props;
  const [isFollowState, setIsFollowState] = useState<boolean>(
    isFollow || false
  );
  const [disabledNotSpam, setDisableNotSpam] = useState(false);

  const [voteDataState, setVoteDataState] = useState<
    "Upvote" | "DownVote" | null
  >(null);
  const [likeState, setLikeState] = useState(like);
  useEffect(() => {
    if (voteData === undefined) setVoteDataState(null);
    else setVoteDataState(voteData);
    setLikeState(like);
  }, [voteData, like]);
  const [isDisable, setDisable] = useState<boolean>(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const refDivActionModal = useRef<HTMLDivElement>(null);

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

  const { userInfo } = useSelector((state: RootState) => state.users);
  return (
    <div className={" " + " " + className}>
      <div className="visible flex flex-col  items-center pl-[50%] ">
        {isOwner ? (
          <div className="p-1 mb-4 relative " ref={refDivActionModal}>
            <More
              className="w-6 h-6 hover:cursor-pointer"
              data-tip="Chỉnh sửa bài viết"
              data-for="acctionOfPostNavLeft"
              onClick={() => setShowActionModal(!showActionModal)}
            />
            <ReactTooltip
              textColor="#FF4401"
              id="acctionOfPostNavLeft"
              place="top"
              effect="solid"
            />
            {showActionModal ? <ActionModal idPost={idPost} /> : null}
          </div>
        ) : null}

        <Link to={isOwner ? `/me` : `/user-detail/${owner.id}`}>
          <img
            src={owner.avatarLink ? owner.avatarLink : avatarDefault}
            alt="avatar"
            className="h-11 w-11 rounded-full"
          />
        </Link>
        <div className="flex flex-col items-center my-4">
          <button
            className={"p-1 group   disabled:cursor-not-allowed"}
            data-for="upVote"
            data-tip={
              voteDataState !== null && voteDataState === "Upvote"
                ? "Un vote"
                : "Up vote"
            }
            disabled={disabledNotSpam}
            onClick={async () => {
              if (status === undefined || status !== "Approve") {
                toast.error("Bài viết chưa được phê duyệt");
              } else {
                setDisableNotSpam(true);
                if (isOwner) {
                  toast("Không thể vote bài viết của chính bạn", {
                    icon: "⚠️",
                  });
                } else {
                  const result = await postApi.voteUp(idPost);
                  if (result.status === 201) {
                    if (voteDataState === null) {
                      toast.success(`Vote thành công`);
                      setVoteDataState("Upvote");
                      setLikeState(likeState + 1);
                    } else if (voteDataState === "DownVote") {
                      toast.success(`Vote thành công`);
                      setVoteDataState("Upvote");
                      setLikeState(likeState + 2);
                    } else {
                      toast.error(`UnVote thành công`);
                      setVoteDataState(null);
                      setLikeState(likeState - 1);
                    }
                  } else {
                    toast.error(
                      `Có gì đó không đúng ${result.data.message} vote up`
                    );
                  }
                }
                setTimeout(() => setDisableNotSpam(false), 2500);
              }
            }}
          >
            <CareUp
              className={
                " transition-colors duration-500 " +
                (voteDataState !== null && voteDataState === "Upvote"
                  ? " fill-primary  "
                  : !disabledNotSpam && "  group-hover:fill-primary ")
              }
            />
            <ReactTooltip
              textColor="#FF4401"
              id="upVote"
              place="right"
              effect="solid"
            />
          </button>

          <span
            className={
              "font-medium CareDown" +
              (voteDataState !== null && " font-semibold text-primary")
            }
          >
            {likeState >= 0 ? `+${likeState}` : likeState}
          </span>

          <button
            className={"p-1 group disabled:cursor-not-allowed"}
            data-tip={
              voteDataState !== null && voteDataState === "DownVote"
                ? "Un vote"
                : "Down vote"
            }
            disabled={disabledNotSpam}
            data-for="downVote"
            onClick={async () => {
              if (status === undefined || status !== "Approve") {
                toast.error("Bài viết chưa được phê duyệt");
              } else {
                setDisableNotSpam(true);
                if (isOwner) {
                  toast("Không thể vote bài viết của chính bạn", {
                    icon: "⚠️",
                  });
                } else {
                  const result = await postApi.voteDown(idPost);
                  if (result.status === 201) {
                    if (voteDataState === null) {
                      toast.success(`Down vote thành công`);
                      setVoteDataState("DownVote");
                      setLikeState(likeState - 1);
                    } else if (voteDataState === "Upvote") {
                      toast.success(`Down vote thành công`);
                      setVoteDataState("DownVote");
                      setLikeState(likeState - 2);
                    } else {
                      toast.error(`UnVote thành công`);
                      setVoteDataState(null);
                      setLikeState(likeState + 1);
                    }
                  } else {
                    toast.error(
                      `Có gì đó không đúng ${result.data.message} vote up`
                    );
                  }
                }
                setTimeout(() => setDisableNotSpam(false), 2500);
              }
            }}
          >
            <CareDown
              className={
                " transition-colors duration-500 " +
                (voteDataState !== null && voteDataState === "DownVote"
                  ? " fill-primary  "
                  : !disabledNotSpam && "  group-hover:fill-primary ")
              }
            />
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
            "mb-4 mt-2 w-10 h-10 flex flex-col duration-75 justify-center  items-center border-[1px] rounded-full transition-colors   group " +
            (!isDisable && " hover:border-primary 0 ") +
            (isFollowState ? " bg-primary border-primary  " : " border-bg ") +
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
            } else {
              if (result.status === 404)
                toast.error("Bài viết chưa được phê duyệt");
            }
            await setTimeout(() => {
              setDisable(false);
            }, 1000);
          }}
        >
          <ListFill
            className={
              " duration-75 " +
              (isFollowState
                ? " fill-white "
                : !isDisable && "  group-hover:fill-primary  ")
            }
          />
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
          onClick={() => {
            toast("Oops, tính năng đang cập nhập", {
              icon: "⚠️",
            });
          }}
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
          onClick={() => {
            toast("Oops, tính năng đang cập nhập", {
              icon: "⚠️",
            });
          }}
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
