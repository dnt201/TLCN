import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import avatarDefault from "@images/userDefault.png";
import userApi from "@api/userApi";
import toast from "react-hot-toast";
import { PhoneFill } from "@icons/index";
import { useSelector } from "react-redux";
import { RootState } from "@app/store";
import BlogNotFound from "@screens/BlogDetail/NotFound";
interface iUserDetail {
  id: string;
  email: string;
  username: string;
  shortInfo: string;
  phoneNumber: null;
  gender: "Unknown";
  role: {
    id: "c5e6a595-7efa-4e30-8d76-04fd94d85266";
    role: "User";
    displayName: "User";
  };
  isFollowing: boolean;
  follower: 0;
  following: 0;
  avatarLink: string;
}

const UserDetail = () => {
  let params = useParams();
  const { userInfo } = useSelector((state: RootState) => state.users);
  const { userId } = params;
  const [userInfoState, setUserInfoState] = useState<iUserDetail>();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo !== null && userId === userInfo?.id) {
      navigate("/me");
    }
    setLoading(true);
    if (userId === undefined || userId === null) {
      toast.error("Something went wrong");
      navigate("/");
    } else {
      setTimeout(async () => {
        const result = await userApi.getUserDetail(userId);
        if (result.status === 200) {
          setUserInfoState(result.data);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
        console.log(result);
        setLoading(false);
      }, 1000);
    }
  }, []);
  if (notFound) return <BlogNotFound />; //lười đổi tên thui :v nó là notfound thoi
  return (
    <>
      <div className=" min-h-[calc(100vh-52px)] bg-bg flex flex-col ">
        {/* Infor */}
        <div className=" pt-2 flex flex-col items-center border-b-[1px] border-hover pb-4  lg:justify-center lg:mx-[5%]">
          {/* Infor block 1 */}
          <div className=" flex w-full max-w-[480px] flex-row items-center  lg:mr-2">
            {!loading ? (
              <img
                className="rounded-full h-[150px] w-[150px]"
                data-for="upLoadImage"
                src={
                  userInfoState !== null && userInfoState?.avatarLink !== null
                    ? userInfoState?.avatarLink
                    : avatarDefault
                }
              />
            ) : (
              <Skeleton circle height={160} width={160} />
            )}

            <div className=" flex-1 ml-2 ">
              <h3 className=" text-lg font-semibold break-words line-clamp-2 flex-1">
                {!loading ? userInfoState?.username : <Skeleton />}
              </h3>

              {!loading ? (
                <div className="flex w-full mt-1">
                  <button
                    className={
                      "flex-1 text-xs py-2  text-center rounded-md  hover:cursor-pointer " +
                      (!userInfoState?.isFollowing ? " bg-primary" : " ")
                    }
                  >
                    {userInfoState?.isFollowing ? "Đã follow" : " Follow"}
                  </button>
                  <div className="flex-1 text-xs py-2  text-center rounded-md hover:cursor-pointer ">
                    <span className="font-bold mr-1">
                      {userInfoState?.follower}
                    </span>
                    Follower
                  </div>
                  <div className="flex-1 text-xs py-2  text-center rounded-md hover:cursor-pointer ">
                    <span className="font-bold mr-1">
                      {userInfoState?.following}
                    </span>
                    Following
                  </div>
                </div>
              ) : (
                <Skeleton />
              )}
            </div>
          </div>
          {/* Infor block 2 */}

          <div className="bg-bg2 w-full py-2 mt-4 px-4 pb-4 rounded-md  max-w-[480px] ">
            {!loading ? (
              <>
                <h4 className="w-full text-left">Giới thiệu</h4>
                <h6 className="text-center w-full break-all font-normal font-sm">
                  {userInfoState?.shortInfo || "Không có tiểu sử"}
                </h6>
                {/* <BioChange /> */}
                <div className="mt-2">
                  <h4>Liên hệ</h4>
                  <span className="flex items-center justify-center mt-1 text-sm">
                    {userInfoState?.phoneNumber ? (
                      <>
                        <PhoneFill className="w-5 h-5" />
                        <a
                          href={`tel:${userInfoState.phoneNumber}`}
                          className="ml-3 flex items-end"
                        >
                          <span className="font-bold text-sm">
                            {userInfoState.phoneNumber}
                          </span>
                        </a>
                      </>
                    ) : (
                      <i className="text-xs">Không có thông tin liên hệ</i>
                    )}
                  </span>
                </div>
              </>
            ) : (
              <Skeleton height={100} />
            )}
          </div>
        </div>

        {!loading ? (
          <div>MainContent</div>
        ) : (
          <>
            <Skeleton height={"40px"} />
            <Skeleton height={"25vh"} />
          </>
        )}
      </div>
    </>
  );
};

export default UserDetail;
