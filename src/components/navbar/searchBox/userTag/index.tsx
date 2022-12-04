import React from "react";
import ava1 from "@assets/images/userDefault.png";
import { useSelector } from "react-redux";
import { RootState } from "@app/store";
import { Link } from "react-router-dom";
export interface iUserTag {
  id: string;
  username: string;
  email: string;
  avatarLink: string;
  setShowSearchBox: (b: boolean) => void;
  setInputSearch: (value: string) => void;
}

const UserTag: React.FC<iUserTag> = (props) => {
  const { id, username, avatarLink, setShowSearchBox, setInputSearch } = props;
  const { userInfo } = useSelector((state: RootState) => state.users);
  return (
    <Link
      to={userInfo?.id === id ? "/me" : `/user-detail/${id}`}
      className="flex items-center p-2  overflow-hidden hover:bg-hover"
      onClick={() => {
        setShowSearchBox(false);
        // setInputSearch("");
      }}
    >
      <img src={avatarLink || ava1} className="w-8 h-8 rounded-full" />
      <div className="flex flex-col ml-2">
        <span className=" line-clamp-1  text-sm font-semibold">{username}</span>
        {userInfo?.id === id ? <span className=" text-ss">Bạn</span> : null}
      </div>
    </Link>
  );
};

export default UserTag;
