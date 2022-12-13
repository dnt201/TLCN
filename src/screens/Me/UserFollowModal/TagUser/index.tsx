import React, { useEffect, useState } from "react";
import avatarDefault from "@images/userDefault.png";
import { iUserFollow } from "..";
import PublishConfirm from "./PulishConfirm";
import userApi from "@api/userApi";
import { toast } from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { reduceFollowing } from "@redux/userSlice";
import { AppDispatch } from "@app/store";
import { useNavigate } from "react-router-dom";
interface iProps extends iUserFollow {
  select: "Follower" | "Following";
}
const TagUser: React.FC<iProps> = (props) => {
  const { select } = props;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [remove, setRemove] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const unFollow = async (userId: string) => {
    const rs = await userApi.unFollowUser(userId);
    if (rs.status === 200 || rs.status === 201) {
      toast.error("Unfollow thành công!");
      setRemove(true);
      dispatch(reduceFollowing(1));
    } else {
      toast.error("Unfollow thành công!");
      setRemove(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (remove === true) {
      setLoading(true);
      setTimeout(() => {
        unFollow(props.id);
      }, 2000);
    }
  }, [remove]);
  return (
    <div
      className="flex items-center px-3 py-2 "
      onClick={(e) => {
        navigate(`/user-detail/${props.id}`);
        e.stopPropagation();
      }}
    >
      {showConfirm && (
        <PublishConfirm
          header={`Bạn có thực sự muốn unfollow ${props.username}`}
          setShow={setShowConfirm}
          loading={loading}
          isShow={showConfirm}
          isConfirm={remove}
          setConfirmed={setRemove}
          img={props.avatarLink ? props.avatarLink : avatarDefault}
        />
      )}
      <img
        src={props.avatarLink ? props.avatarLink : avatarDefault}
        className="w-9 h-9 rounded-full hover:cursor-pointer"
      />
      <div className="flex flex-1 ml-2 flex-col justify-evenly">
        <span className="text-base font-medium text-primary hover:cursor-pointer">
          {props.username}
        </span>
        <span className="line-clamp-1"> {props.shortInfo}</span>
      </div>
      {select === "Following" ? (
        <button
          onClick={() => {
            setShowConfirm(true);
          }}
          className="font-medium flex items-center gap-1 text-sm bg-[#f1f1f1] hover:bg-[#a1a1a1] disabled:hover:bg-[#f1f1f1] px-4 py-[6px] rounded-md disabled:cursor-not-allowed"
          disabled={remove || loading}
        >
          {loading ? (
            <>
              "Unfollowed"
              <HashLoader size={16} />
            </>
          ) : remove ? (
            "Unfollowed"
          ) : (
            "Following"
          )}
        </button>
      ) : (
        <span className="font-medium flex items-center gap-1 text-sm bg-[#f1f1f1] hover:bg-[#a1a1a1] disabled:hover:bg-[#f1f1f1] px-4 py-[6px] rounded-md disabled:cursor-not-allowed">
          Remove
        </span>
      )}
    </div>
  );
};

export default TagUser;
