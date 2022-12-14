import React from "react";
import { Flag, Trash, Write } from "@icons/index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import commentApi from "@api/commentApi";

interface iProps extends React.HTMLProps<HTMLDivElement> {
  idReply: string;
  idComment: string;
  isOwner: boolean;
  idPost: string;
  setCountReplyState: () => void;
  setIsEditReplyComment: (b: boolean) => void;
  setShowModal: (b: boolean) => void;
}
const ModalActionReplyComment: React.FC<iProps> = (props) => {
  const {
    idReply,
    idComment,
    idPost,
    isOwner,
    setIsEditReplyComment,
    setShowModal,
    setCountReplyState,
  } = props;
  const navigate = useNavigate();

  return (
    <div
      className={
        "  rounded-md py-2 w-fit flex flex-col gap-2  bg-white absolute top-0 right-0 translate-x-full  z-1000000 text-bg"
      }
    >
      {isOwner ? (
        <>
          <button onClick={() => setIsEditReplyComment(true)}>
            <div className="flex items-center gap-1 p-1 px-3 hover:bg-primaryHover hover:text-primary ">
              <Write className="w-4 h-4  " />

              <span className="text-ss flex-1   ml-1 whitespace-nowrap">
                Chỉnh sửa bình luận
              </span>
            </div>
          </button>

          <button
            className="p-1  flex items-center gap-1  px-3 w-full hover:bg-primaryHover hover:text-primary "
            onClick={async () => {
              const toastId = toast.loading("Loading...");

              const result = await commentApi.deleteReply(idReply);
              console.log(result);
              if (result.status === 200 || result.status === 202) {
                toast.success("Xóa bình luận thành công", {
                  id: toastId,
                  duration: 2500,
                });
                setCountReplyState();
                navigate(
                  `/blog/${idPost}?ref=postComment&idComment=${idComment}`
                );
              } else {
                toast.error(`Có gì đó không đúng ${result.status}`, {
                  id: toastId,
                  duration: 2500,
                });
              }
            }}
          >
            <Trash className="w-4 h-4 " />
            <span className="flex-1 text-ss text-left ml-1">Xóa bình luận</span>
          </button>
        </>
      ) : (
        <div
          className="flex hover:cursor-pointer items-center gap-1 p-1 px-3 hover:bg-primaryHover hover:text-primary "
          onClick={() => {
            toast("Tính năng đang được nâng cấp", {
              icon: "⚠️",
            });
            setShowModal(false);
          }}
        >
          <Flag className="w-4 h-4  " />

          <span className="text-ss flex-1   ml-1 whitespace-nowrap">
            Báo cáo
          </span>
        </div>
      )}
    </div>
  );
};

export default ModalActionReplyComment;
