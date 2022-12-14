import { iCommentCreate } from "@DTO/Blog";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserDefault from "@images/userDefault.png";
import { More, FaceSmile, Photo } from "@icons/index";
import ReactTooltip from "react-tooltip";
import toast from "react-hot-toast";
import avatarDefault from "@images/userDefault.png";
import commentApi from "@api/commentApi";
import ModalActionReplyComment from "./ModalActionReplyComment";

interface iReply {
  replyId: string;
  content: string;
  dateModified: string;
  sender: {
    id: string;
    username: string;
    avatarLink: string;
  };
  replyTag: string[];
}

interface iPropsReply extends iReply {
  idPost: string;
  idComment: string;
  curUserId: string | null;
  curUserImg: string | null;
  status: "Approve" | "Waiting";
  setCountReplyState: (n: number) => void;
  countReplyState: number;

  setListReply: (a: iReply[] | null) => void;
  setCurPage: (n: number) => void;
  isReply?: boolean;
}

const ReplyComment: React.FC<iPropsReply> = (props) => {
  const {
    content,
    dateModified,
    idComment,
    idPost,
    curUserId,
    replyId,
    curUserImg,
    status,
    sender,
    setCountReplyState,
    countReplyState,
    setListReply,
    setCurPage,
  } = props;

  const [showActionModalReply, setShowActionModalReply] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [valueCommentReply, setValueCommentReply] = useState(content);
  const [valueCommentFromDataBaseReply, setValueCommentFromDataBaseReply] =
    useState(content);

  const [valueReply, setValueReply] = useState("");

  console.log(replyId);
  const [loading, setLoading] = useState(false);
  const refDivActionModal = useRef<HTMLDivElement>(null);
  const [isEditComment, setIsEditComment] = useState(false);

  useEffect(() => {
    const handleClickOutActionModalComment = (event: any) => {
      if (
        refDivActionModal.current &&
        !refDivActionModal.current.contains(event.target)
      ) {
        setShowActionModalReply(false);
      } else {
      }
    };
    document.addEventListener("click", handleClickOutActionModalComment, true);
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutActionModalComment,
        true
      );
    };
  }, [refDivActionModal]);

  return (
    <div className="p-4 py-0 bg-[#f1f1f1] rounded-md mb-1 border-gray">
      {/* Start header */}
      <div className="flex  items-center">
        <img
          className="w-10 h-10 rounded-full mr-2 "
          src={sender.avatarLink || UserDefault}
        />
        <div className="flex flex-col ">
          <Link
            className=""
            to={
              curUserId !== null && curUserId === sender.id
                ? "/me"
                : `/user-detail/${sender.id}`
            }
          >
            <span className="text-primaryLow   font-semibold   hover:underline  hover:text-primary">
              {sender.username}
            </span>
          </Link>
          <span className="text-s">{dateModified.convertToDay()}</span>
        </div>
      </div>
      {/* End header */}
      {/* Start Bottom Nav */}
      {isEditComment ? (
        // start edit
        <div className=" p-4   mt-4 py-2   border-gray border-[1px] rounded-md">
          <div className=" flex flex-col rounded-md">
            {/* Start Header */}
            <div>
              <button className=" px-2 border-b-2 mr-2 border-primary">
                Viết
              </button>
              <button
                className=" px-2"
                onClick={() => {
                  toast("Tính năng đang được nâng cấp", {
                    icon: "⚠️",
                  });
                }}
              >
                Xem trước
              </button>
            </div>
            {/* End Header */}

            {/* Start Body */}
            <div className="flex mt-2 gap-1">
              <div className="flex flex-1 border-[#f1f1f1] border-[1px] focus-within:border-bg2 bg-white rounded-md group">
                <textarea
                  placeholder="Viết bình luận"
                  className="resize-none flex-1 rounded-md p-2 text-sm  focus:outline-none "
                  rows={6}
                  value={valueCommentReply}
                  onChange={(e) => setValueCommentReply(e.target.value)}
                />

                <div
                  className="flex flex-col items-center  px-1 gap-2 mt-2"
                  onClick={() => {
                    toast("Tính năng đang được nâng cấp", {
                      icon: "⚠️",
                    });
                  }}
                >
                  <i
                    className="hover:cursor-pointer"
                    data-for="faceEmoji"
                    data-tip=" Add biểu tượng cảm xúc"
                  >
                    <FaceSmile />
                  </i>
                  <ReactTooltip
                    textColor="#FF4401"
                    id="faceEmoji"
                    place="bottom"
                    effect="solid"
                    backgroundColor="#000"
                  />
                  <i
                    className="hover:cursor-pointer"
                    data-for="photoEmoji"
                    data-tip="Kéo thả hoặc click để đính kèm ảnh"
                  >
                    <Photo />
                  </i>
                  <ReactTooltip
                    textColor="#FF4401"
                    id="photoEmoji"
                    place="bottom"
                    effect="solid"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-1 justify-end">
            <button
              className="rounded-md px-4 py-2 mt-4 mb-2 "
              onClick={() => {
                setIsEditComment(false);
                setShowActionModalReply(false);
              }}
            >
              Hủy
            </button>
            <button
              className="rounded-md px-4 py-2 mt-4 mb-2 text-white bg-primary disabled:cursor-not-allowed disabled:bg-primaryHover disabled:text-black"
              disabled={
                valueCommentReply === valueCommentFromDataBaseReply ||
                valueCommentReply.trim().length <= 0
              }
              onClick={async () => {
                if (valueCommentReply.trim().length > 0) {
                  let replyTemp: iCommentCreate = {
                    commentContent: valueCommentReply.trim(),
                    userTag: [],
                  };
                  setLoading(true);
                  const result = await commentApi.editReplyComment(
                    replyId,
                    replyTemp
                  );
                  if (result.status === 200) {
                    toast.success("Chỉnh sửa thành công!");
                    setShowActionModalReply(false);
                    setValueCommentReply(replyTemp.commentContent.trim());
                    setIsEditComment(false);
                  } else toast.error("Chỉnh sửa thất bại" + result.status);
                  console.log(result);
                } else toast.error("Bình luận không được rỗng!");
              }}
            >
              Chỉnh sửa
            </button>
          </div>
          {/*end edit */}
        </div>
      ) : (
        //Add new
        <>
          <p className="my-2">{valueCommentReply}</p>
          <div className=" flex items-center">
            <span className="h-[16px] w-[1px] mx-2 bg-bg"></span>
            <button
              className="p-1 text-sm"
              data-tip="Trả lời"
              data-for="replyComment"
              onClick={() => {
                setShowReply(!showReply);
              }}
            >
              Trả lời
              <ReactTooltip
                textColor="#FF4401"
                id="replyComment"
                place="bottom"
                effect="solid"
              />
            </button>

            <div
              className="mx-1 p-1 hover:cursor-pointer relative"
              ref={refDivActionModal}
            >
              <More
                className="w-6 h-6 hover:cursor-pointer"
                data-tip="Hiển thị các hành động"
                data-for="acctionComment"
                onClick={() => {
                  setShowActionModalReply(!showActionModalReply);
                }}
              />
              <ReactTooltip
                textColor="#FF4401"
                id="acctionComment"
                place="bottom"
                effect="solid"
              />
              {showActionModalReply ? (
                <ModalActionReplyComment
                  // setCurPage={setCurPage}
                  setCountReplyState={() =>
                    setCountReplyState(countReplyState - 1)
                  }
                  setShowModal={setShowActionModalReply}
                  setIsEditReplyComment={setIsEditComment}
                  idComment={idComment}
                  idPost={idPost}
                  idReply={replyId}
                  // curUserId={curUserId}
                  isOwner={
                    curUserId !== null && curUserId === sender.id ? true : false
                  }
                />
              ) : null}
            </div>
          </div>
        </>
      )}
      {/* End Bottom Nav */}
      {showReply ? (
        <div className="w-full bg-[#f1f1f1]  rounded-md ">
          <div className=" flex flex-col p-4 pb-0 border-gray border-[1px] rounded-md">
            {/* Start Header */}
            <div>
              <button className=" px-2 border-b-2 mr-2 border-primary">
                Viết
              </button>
              <button
                className=" px-2"
                onClick={() => {
                  toast("Tính năng đang được nâng cấp", {
                    icon: "⚠️",
                  });
                }}
              >
                Xem trước
              </button>
            </div>
            {/* End Header */}

            {/* Start Body */}
            <div className="flex mt-2 gap-1">
              <img
                className="w-11 h-11 rounded-full"
                src={curUserImg ? curUserImg : avatarDefault}
              />
              <div className="flex flex-1 border-[#f1f1f1] border-[1px] focus-within:border-bg2 bg-white rounded-md group">
                <textarea
                  autoFocus
                  placeholder="Viết bình luận"
                  className="resize-none flex-1 rounded-md p-2 text-sm  focus:outline-none "
                  rows={6}
                  value={valueReply}
                  onChange={(e) => setValueReply(e.target.value)}
                />

                <div
                  className="flex flex-col items-center  px-1 gap-2 mt-2"
                  onClick={() => {
                    toast("Tính năng đang được nâng cấp", {
                      icon: "⚠️",
                    });
                  }}
                >
                  <i
                    className="hover:cursor-pointer"
                    data-for="faceEmoji"
                    data-tip=" Add biểu tượng cảm xúc"
                  >
                    <FaceSmile />
                  </i>
                  <ReactTooltip
                    textColor="#FF4401"
                    id="faceEmoji"
                    place="bottom"
                    effect="solid"
                    backgroundColor="#000"
                  />
                  <i
                    className="hover:cursor-pointer"
                    data-for="photoEmoji"
                    data-tip="Kéo thả hoặc click để đính kèm ảnh"
                  >
                    <Photo />
                  </i>
                  <ReactTooltip
                    textColor="#FF4401"
                    id="photoEmoji"
                    place="bottom"
                    effect="solid"
                  />
                </div>
              </div>
            </div>
            {/* Start Body */}

            {/* Start Bottom */}
            <div className=" flex flex-1 justify-end">
              <button
                className="rounded-md px-4 py-2 mt-4 mb-2 "
                onClick={() => {
                  setShowReply(false);
                }}
              >
                Hủy
              </button>
              <button
                className={
                  " self-end max-w-fit justify-end my-2 p-4 rounded-md  disabled:cursor-not-allowed " +
                  (valueReply.trim().length > 0
                    ? " bg-primary text-white "
                    : " bg-primaryHover ")
                }
                disabled={valueReply.trim().length <= 0 && true}
                onClick={async () => {
                  if (status === "Waiting") {
                    toast("Bài viết chưa được duyệt! Không thể comment!", {
                      icon: "⚠️",
                    });
                    setValueReply("");
                  } else {
                    if (valueReply.trim().length > 0) {
                      let replyTemp: iCommentCreate = {
                        commentContent: valueReply.trim(),
                        userTag: [],
                      };
                      setLoading(true);
                      const result = await commentApi.replyComment(
                        idComment,
                        replyTemp
                      );
                      if (result.status === 201) {
                        toast.success("Reply thành công!");
                        setValueReply("");
                        setShowReply(false);
                        setCurPage(-1);
                        setListReply(null);
                      } else toast.error("Reply thất bại" + result.status);
                      console.log(result);
                    } else toast.error("Reply không được rỗng!");
                  }
                }}
              >
                Reply
              </button>
            </div>
            {/* End Bottom */}
          </div>
        </div>
      ) : null}
      {/* {showReply ? <div>Trả lời</div> : null} */}
    </div>
  );
};

export default ReplyComment;
