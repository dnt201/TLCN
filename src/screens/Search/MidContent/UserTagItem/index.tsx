import { RootState } from "@app/store";
import { iUserTag } from "@DTO/User";
import avatarDefault from "@images/userDefault.png";
import { Check } from "@icons/index";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface iProps extends iUserTag {}
const UserTagItem: React.FC<iProps> = (props) => {
  const {
    avatarLink,
    email,
    gender,
    id,
    isFollow,
    phoneNumber,
    shortInfo,
    username,
  } = props;
  const navigate = useNavigate();
  const [isFollowState, setIsFollowState] = useState(isFollow);
  const { userInfo, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  if (!userInfo) return <div>Loader</div>;
  const handleFollow = () => {};
  return (
    <div
      className={"flex items-center hover:cursor-pointer px-2 py-1 flex-1"}
      onClick={() => {
        if (userInfo.id === id) navigate("/me");
        else navigate(`/user-detail/${id}`);
      }}
    >
      <img
        className="w-12 h-12 rounded-full mr-2"
        src={avatarLink || avatarDefault}
      />
      <div className="flex flex-1 flex-col">
        <span className="font-semibold text-primaryLow hover:text-primary hover:underline hover:cursor-pointer ">
          {username}
        </span>
        {/* <div>{email}</div> */}
        {userInfo.id === id ? (
          <span>Bạn</span>
        ) : (
          <button
            onClick={() => handleFollow()}
            className={
              " text-xs mt-1 max-w-[50%] py-2 text-center rounded-md  hover:cursor-pointer " +
              (!isFollowState
                ? "  bg-primary  "
                : " border-[1px] border-white ")
            }
          >
            {isFollowState ? (
              <div className="flex items-center justify-center  overflow-hidden ">
                <Check className="w-3 h-3" />
                <span className=" ml-1 line-clamp-1">Đã follow</span>
              </div>
            ) : (
              " Follow"
            )}
          </button>
        )}

        {/* <button>
          {isFollowState ? <div>Đã follow</div> : <div>Follow</div>}
        </button> */}
      </div>
    </div>
  );
};

export default UserTagItem;
