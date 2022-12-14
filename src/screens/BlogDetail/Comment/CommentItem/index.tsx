import { iComment, iCommentCreate, iReply } from "@DTO/Blog";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserDefault from "@images/userDefault.png";
import {
  ChevronUp,
  ChevronDown,
  More,
  FaceSmile,
  Photo,
  ArrowPath,
} from "@icons/index";
import ReactTooltip from "react-tooltip";
import ModalActionComment from "./ModalActionComment";
import toast from "react-hot-toast";
import avatarDefault from "@images/userDefault.png";
import commentApi from "@api/commentApi";
import { iPage } from "@DTO/Pagination";
import ReplyComment from "../ReplyComment";

interface iProps extends iComment {
  isOwner: boolean;
  idPost: string;
  curUserId: string | null;
  curUserImg: string | null;
  curUserName: string | null;
  status: "Approve" | "Waiting";
  isReply?: boolean;
}

const sizeNumOnePage = 2;
const CommentItem: React.FC<iProps> = (props) => {
  const {
    isOwner,
    status,
    commentId,
    curUserId,
    countReply,
    dateModified,
    content,
    sender,
    idPost,
    curUserImg,
  } = props;
  const [showActionModal, setShowActionModal] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [countReplyState, setCountReplyState] = useState(
    parseInt(countReply) || 0
  );
  const [pagingListReply, setPagingListReply] = useState<iPage>();
  const [curPage, setCurPage] = useState(1);
  const [valueComment, setValueComment] = useState(content);
  const [valueCommentFromDataBase, setValueCommentFromDataBase] =
    useState(content);

  const [valueReply, setValueReply] = useState("");
  const navigate = useNavigate();
  const [listReply, setListReply] = useState<iReply[] | null>(null);

  const [loading, setLoading] = useState(false);

  const refDivActionModal = useRef<HTMLDivElement>(null);
  const [isEditComment, setIsEditComment] = useState(false);
  const accessFromLocal = localStorage.getItem("accessToken");

  // console.log(curPage, pagingListReply, "--------------------");

  //fetch list
  useEffect(() => {
    if (curPage === -1) setCurPage(1);
    else {
      const fetchList = async () => {
        const result = await commentApi.getListReplyOfComment(
          commentId,
          curPage,
          sizeNumOnePage
        );
        if (result.status === 200 || result.status === 201) {
          console.log(result);
          if (listReply !== null)
            setListReply([...listReply, ...result.data.data]);
          else setListReply(result.data.data);
          setPagingListReply(result.data.page);
        } else toast.error("Lấy dữ liệu reply comment lỗi");
      };
      fetchList();
    }
  }, [commentId, curPage]);

  useEffect(() => {
    const handleClickOutActionModalComment = (event: any) => {
      if (
        refDivActionModal.current &&
        !refDivActionModal.current.contains(event.target)
      ) {
        setShowActionModal(false);
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
    <div
      className="p-4 bg-[#f1f1f1] rounded-md mb-4 border-gray"
      id={commentId}
    >
      {/* Start header */}
      <div className="flex  items-center">
        <img
          className="w-10 h-10 rounded-full mr-2 "
          src={sender.avatarLink || UserDefault}
        />
        <div className="flex flex-col ">
          <Link className="" to={isOwner ? "/me" : `/user-detail/${sender.id}`}>
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
                  value={valueComment}
                  onChange={(e) => setValueComment(e.target.value)}
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
              }}
            >
              Hủy
            </button>
            <button
              className="rounded-md px-4 py-2 mt-4 mb-2 text-white bg-primary disabled:cursor-not-allowed disabled:bg-primaryHover disabled:text-black"
              disabled={
                valueComment === valueCommentFromDataBase ||
                valueComment.trim().length <= 0
              }
              onClick={async () => {
                if (valueComment.trim().length > 0) {
                  let commentTemp: iCommentCreate = {
                    commentContent: valueComment.trim(),
                    userTag: [],
                  };
                  setLoading(true);
                  const result = await commentApi.editComment(
                    commentId,
                    commentTemp
                  );
                  if (result.status === 200) {
                    toast.success("Chỉnh sửa thành công!");
                    setShowActionModal(false);
                    setValueComment(commentTemp.commentContent.trim());
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
          <p className="my-2">{valueComment}</p>

          <div className=" flex items-center">
            <button
              className="p-[2px]"
              data-tip="Vote Up"
              data-for="voteUpComment"
            >
              <ChevronUp className="w-3 h-3  " />
              <ReactTooltip
                textColor="#FF4401"
                id="voteUpComment"
                place="bottom"
                effect="solid"
              />
            </button>
            <span className="px-[2px] text-sm">0</span>
            <button
              className="p-[2px]"
              data-tip="Vote Down"
              data-for="voteDownComment"
            >
              <ChevronDown className="w-3 h-3" />
              <ReactTooltip
                textColor="#FF4401"
                id="voteDownComment"
                place="bottom"
                effect="solid"
              />
            </button>
            <span className="h-[16px] w-[1px] mx-2 bg-bg"></span>
            <button
              className="p-1 text-sm"
              data-tip="Trả lời"
              data-for="replyComment"
              onClick={() => {
                if (accessFromLocal === null || accessFromLocal.length <= 0) {
                  navigate("/login");
                } else {
                  setShowReply(!showReply);
                  setValueReply("");
                }
              }}
            >
              Trả lời ({countReplyState})
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
                  setShowActionModal(!showActionModal);
                }}
              />
              <ReactTooltip
                textColor="#FF4401"
                id="acctionComment"
                place="bottom"
                effect="solid"
              />
              {showActionModal ? (
                <ModalActionComment
                  setShowModal={setShowActionModal}
                  setIsEditComment={setIsEditComment}
                  idPost={idPost}
                  idComment={commentId}
                  isOwner={isOwner}
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
                        commentId,
                        replyTemp
                      );
                      if (result.status === 201) {
                        toast.success("Reply thành công!");
                        setValueReply("");
                        setCountReplyState(countReplyState + 1);
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
      {listReply && listReply?.length > 0 && (
        <div className=" w-full h-[1px] bg-smokeDark my-2"> </div>
      )}
      {listReply && listReply.length > 0 && (
        <div>
          {listReply.map((reply, index) => (
            <div className="" key={reply.replyId}>
              <ReplyComment
                status={status}
                curUserImg={curUserImg}
                setListReply={setListReply}
                setCurPage={setCurPage}
                setCountReplyState={setCountReplyState}
                countReplyState={countReplyState}
                {...reply}
                curUserId={curUserId}
                idComment={commentId}
                idPost={idPost}
              />
              {index < listReply.length - 1 && (
                <div className="flex w-full px-4  ">
                  <span className="h-[1px] bg-smokeDark my-2 w-full flex-1">
                    {" "}
                  </span>
                </div>
              )}
            </div>
          ))}

          {pagingListReply &&
          curPage <
            Math.ceil(pagingListReply?.totalElement / pagingListReply.size) ? (
            <button
              onClick={() => setCurPage(curPage + 1)}
              className={
                "text-center w-full text-sm text-primaryLow hover:text-primary hover:underline p-2"
              }
            >
              Load more...
            </button>
          ) : (
            <button
              className={
                "text-center w-full text-sm flex items-center justify-center gap-1 text-primaryLow hover:text-primary p-2"
              }
              onClick={() => {
                setCurPage(-1);
                setListReply([]);
              }}
            >
              Nothing reload
              <ArrowPath className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
