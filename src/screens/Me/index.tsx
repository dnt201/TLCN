import React, { useEffect, useState } from "react";
import avatarDefault from "@images/userDefault.png";
import { Gender, PhoneFill, Setting, Write } from "@icons/index";
// import userApi from "@api/userApi";
import { useDispatch, Selector, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/store";
import { resetUserState, userGetMe } from "@redux/userSlice";
import InforSkeleton from "./MeSkeleton/InforSkeleton";
import BioChange from "./BioSection";
import InForPopup from "./InForPopup";
import MainContent from "./MainContent";
import ImageSection from "./ImageSection";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

const Me = () => {
  const { userInfo, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const [showInForPopup, setShowInForPopup] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(userGetMe());
    if (error && error !== null) toast.error(error);
    dispatch(resetUserState);
  }, []);
  return (
    <>
      <div className=" min-h-[calc(100vh-52px)] bg-bg flex flex-col ">
        {showInForPopup ? (
          <InForPopup show={showInForPopup} setShow={setShowInForPopup} />
        ) : null}

        {/* Infor */}
        <div className=" pt-2 flex flex-col items-center border-b-[1px] border-hover pb-4  lg:justify-center lg:mx-[5%]">
          {/* Infor block 1 */}
          <div className=" flex w-full max-w-[480px] flex-row items-center  lg:mr-2">
            {!loading ? (
              <ImageSection avatarLink={userInfo?.avatarLink || null} />
            ) : (
              <Skeleton circle height={160} width={160} />
            )}

            <div className=" flex-1 ml-2 ">
              <h3 className="mt-1 text-lg font-semibold break-words line-clamp-2 text-center ">
                {!loading ? userInfo?.username : <Skeleton />}
              </h3>
              {!loading ? (
                <button
                  className="flex   items-center text-[15px] w-full mt-1 p-1 justify-center hover:bg-hover border-white border-[1px] rounded-md"
                  onClick={() => setShowInForPopup(true)}
                >
                  <Setting />
                  <span className="ml-2 text-s">Chỉnh sửa thông tin</span>
                </button>
              ) : (
                <Skeleton />
              )}

              {!loading ? (
                <div className="flex w-full mt-1">
                  <div className="flex-1 text-xs py-2  text-center rounded-md hover:bg-hover hover:cursor-pointer ">
                    <span className="font-bold mr-1">{userInfo?.follower}</span>
                    Follower
                  </div>
                  <div className="flex-1 text-xs py-2  text-center rounded-md hover:bg-hover hover:cursor-pointer ">
                    <span className="font-bold mr-1">
                      {userInfo?.following}
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
                <BioChange />
                {userInfo?.phoneNumber ? (
                  <div className="mt-2">
                    <h4>Liên hệ</h4>
                    <span className="flex items-center mt-1 text-sm">
                      <PhoneFill className="w-5 h-5" />
                      <a
                        href={`tel:${userInfo?.phoneNumber}`}
                        className="ml-3 flex items-end"
                      >
                        <span className="font-bold text-sm">
                          {userInfo?.phoneNumber}
                        </span>
                      </a>
                    </span>
                  </div>
                ) : null}
              </>
            ) : (
              <Skeleton height={100} />
            )}
          </div>
        </div>

        {!loading ? (
          <MainContent />
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

export default React.memo(Me);
