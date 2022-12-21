import React, { useEffect, useState } from "react";
import { XMark } from "@icons/index";
import userApi from "@api/userApi";
import { ClipLoader } from "react-spinners";
import TagUser from "./TagUser";
import { resolveSoa } from "dns";

export interface iUserFollow {
  id: string;
  email: string;
  username: string;
  shortInfo: string;
  phoneNumber: string | null;
  gender: string;
  avatarLink: string | null;
}
interface iProps {
  setShow: (b: boolean) => void;
  select: "Follower" | "Following";
}
const UserFollowModal: React.FC<iProps> = (props) => {
  const { select, setShow } = props;
  const [loading, setLoading] = useState(true);
  const [listUser, setListUser] = useState<iUserFollow[] | null>(null);
  const getListUser = async (type: "Follower" | "Following") => {
    if (type === "Follower") {
      let rs = await userApi.getMyFollower();
      if (rs.status === 200) setListUser(rs.data);
    } else if (type === "Following") {
      let rs = await userApi.getMyFollowing();
      if (rs.status === 200) setListUser(rs.data);
    }

    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getListUser(select);
  }, []);
  return (
    <div
      className="top-0 right-0 fixed  w-full h-full z-[12000] overflow-hidden  "
      onClick={(e) => {
        setShow(false);
      }}
    >
      <div className="bg-bg2 opacity-50  w-full h-full "></div>
      <div
        className=" flex flex-col right-1/2 top-[72px] translate-x-1/2 fixed bg-white max-h-[70vh] h-[470px] min-h-[50vh] pb-4 w-[360px] rounded-t-md z-[12000] text-bg"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className="flex  relative items-center   border-b-[1px] border-smokeHover">
          <h3 className="w-full text-center  p-2 text-base">
            {select === "Follower" ? "Followers" : "Following"}
          </h3>
          <button
            className="absolute top-0 right-0  rounded-full  text-bg p-2"
            onClick={() => setShow(false)}
          >
            <XMark />
          </button>
        </div>
        <div className="overflow-y-scroll mt-4 ">
          {loading ? (
            <div className=" flex justify-center items-center">
              <ClipLoader size={20} /> Loading
            </div>
          ) : listUser !== null && listUser.length > 0 ? (
            <>
              {listUser.map((u) => (
                <TagUser key={u.id} {...u} select={select} />
              ))}
            </>
          ) : (
            <i className="flex items-center justify-center mt-4 text-sm">
              {select === "Follower"
                ? "Chưa có người theo dõi bạn!"
                : "Bạn chưa theo dõi ai cả!"}
            </i>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFollowModal;
