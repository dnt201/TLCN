import { RootState } from "@app/store";
import { iComment, iCommentCreate } from "@DTO/Blog";
import { iPage } from "@DTO/Pagination";
import { ChatBubbleLeft, FaceSmile, Photo } from "@icons/index";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import CommentItem from "./CommentItem";
import avatarDefault from "@images/userDefault.png";
import ReactTooltip from "react-tooltip";
import Pagination from "@components/pagination";
import commentApi from "@api/commentApi";

interface iProps {
  idPost: string;
  isOwner: boolean;
  status: "Approve" | "Waiting";
}
const ReplyComment: React.FC<iProps> = (props) => {
  //#region handle navigate
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const commentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let refFromURL = searchParams.get("ref");

    if (
      commentRef !== null &&
      commentRef.current &&
      refFromURL !== null &&
      refFromURL === "postComment"
    ) {
      let id = searchParams.get("idComment");
      if (id) {
        let a = document.getElementById(id);
        if (a) {
          a.scrollIntoView();
          a.style.background = "#f1f1";
          setTimeout(() => {
            if (a) a.style.background = "#f1f1f1";
          }, 2500);
        } else {
          commentRef.current.scrollIntoView();
        }
      } else {
        commentRef.current.scrollIntoView();
      }
      // if(document.getElementById())
    }
  }, [commentRef.current]);
  //#endregion

  const { idPost, status } = props;
  const accessToken = localStorage.getItem("accessToken");
  const { userInfo } = useSelector((state: RootState) => state.users);
  const [listComment, setListComment] = useState<iComment[] | null>(null);
  const [pagingListComment, setPagingListComment] = useState<iPage>();
  const [loading, setLoading] = useState(true);
  const [curPage, setCurPage] = useState(1);
  const [first, setFirst] = useState(true);

  const [valueComment, setValueComment] = useState("");

  useEffect(() => {
    commentApi.getListCommentOfPost(idPost, curPage, 5).then((result) => {
      setFirst(false);

      if (curPage === -1) setCurPage(1);
      else {
        console.log(first);

        if (result.status === 201) {
          setListComment(result.data.data);
          setPagingListComment(result.data.page);
          console.log(commentRef.current);
          if (commentRef.current && first !== true) {
            commentRef.current.scrollIntoView();
          }
        } else {
          toast.error("L???y d??? li???u comment c?? l???i!");
        }
        setLoading(false);
      }
    });
  }, [curPage]);
  if (listComment === undefined) return <div>lazy undefined list comment</div>;
  return (
    <div className="flex flex-col pb-10">
      <h4 className="pb-2">
        B??nh lu???n ({pagingListComment && pagingListComment.totalElement})
      </h4>
      <div ref={commentRef}></div>
      {accessToken !== null && accessToken.length > 0 && userInfo ? (
        <div className="w-full bg-[#f1f1f1]  rounded-md ">
          <div className=" flex flex-col p-4 pb-0 border-gray border-[1px] rounded-md">
            {/* Start Header */}
            <div>
              <button className=" px-2 border-b-2 mr-2 border-primary">
                Vi???t
              </button>
              <button
                className=" px-2"
                onClick={() => {
                  toast("T??nh n??ng ??ang ???????c n??ng c???p", {
                    icon: "??????",
                  });
                }}
              >
                Xem tr?????c
              </button>
            </div>
            {/* End Header */}

            {/* Start Body */}
            <div className="flex mt-2 gap-1">
              <img
                className="w-11 h-11 rounded-full"
                src={userInfo.avatarLink || avatarDefault}
              />
              <div className="flex flex-1 border-[#f1f1f1] border-[1px] focus-within:border-bg2 bg-white rounded-md group">
                <textarea
                  placeholder="Vi???t b??nh lu???n"
                  className="resize-none flex-1 rounded-md p-2 text-sm  focus:outline-none "
                  rows={6}
                  value={valueComment}
                  onChange={(e) => setValueComment(e.target.value)}
                />

                <div
                  className="flex flex-col items-center  px-1 gap-2 mt-2"
                  onClick={() => {
                    toast("T??nh n??ng ??ang ???????c n??ng c???p", {
                      icon: "??????",
                    });
                  }}
                >
                  <i
                    className="hover:cursor-pointer"
                    data-for="faceEmoji"
                    data-tip=" Add bi???u t?????ng c???m x??c"
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
                    data-tip="K??o th??? ho???c click ????? ????nh k??m ???nh"
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
            <button
              className={
                " self-end max-w-fit justify-end my-2 p-4 rounded-md  disabled:cursor-not-allowed " +
                (valueComment.trim().length > 0
                  ? " bg-primary text-white "
                  : " bg-primaryHover ")
              }
              disabled={valueComment.trim().length <= 0 && true}
              onClick={async () => {
                if (status === "Waiting") {
                  toast("B??i vi???t ch??a ???????c duy???t! Kh??ng th??? comment!", {
                    icon: "??????",
                  });
                  setValueComment("");
                } else {
                  if (valueComment.trim().length > 0) {
                    let commentTemp: iCommentCreate = {
                      commentContent: valueComment.trim(),
                      userTag: [],
                    };
                    setLoading(true);
                    const result = await commentApi.commentAPost(
                      idPost,
                      commentTemp
                    );
                    if (result.status === 201) {
                      toast.success("???? b??nh lu???n b??i vi???t");
                      setValueComment("");
                      setCurPage(-1);
                      setListComment(null);
                    } else
                      toast.error("Th??m b??nh lu???n th???t b???i" + result.status);
                  } else toast.error("B??nh lu???n kh??ng ???????c r???ng!");
                }
              }}
            >
              B??nh lu???n
            </button>
            {/* End Bottom */}
          </div>
        </div>
      ) : (
        <button
          className="flex items-center justify-center px-2 py-4 rounded-md border-gray hover:bg-[#ccc] trasition-all text-smokeDark border-[1px]"
          onClick={() => {
            navigate(`/login?redirect=commentPost&id=${idPost}`);
          }}
        >
          <ChatBubbleLeft className="w-6 h-6" />
          <span className=" ml-2 text-sm ">????ng nh???p ????? b??nh lu???n</span>
        </button>
      )}

      <div className="mt-4">
        {listComment !== null && listComment.length > 0 ? (
          <div>
            {listComment.map((comment) => (
              <div key={comment.commentId}>
                <CommentItem
                  curUserId={userInfo ? userInfo.id : null}
                  status={status}
                  curUserName={userInfo?.username || null}
                  curUserImg={userInfo?.avatarLink ? userInfo.avatarLink : null}
                  idPost={idPost}
                  {...comment}
                  isOwner={
                    userInfo !== null && userInfo.id === comment.sender.id
                      ? true
                      : false
                  }
                />
              </div>
            ))}
            {pagingListComment && (
              <Pagination
                changePageNumber={setCurPage}
                {...pagingListComment}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center px-2 py-4 rounded-md border-gray text-gray border-[1px]">
            <ChatBubbleLeft className="w-6 h-6" />
            <span className=" ml-2 text-sm ">Kh??ng c?? b??nh lu???n</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplyComment;
