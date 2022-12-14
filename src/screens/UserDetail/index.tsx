import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import avatarDefault from "@images/userDefault.png";
import userApi from "@api/userApi";
import toast from "react-hot-toast";
import { Check, PhoneFill } from "@icons/index";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/store";
import BlogNotFound from "@screens/BlogDetail/NotFound";
import PublishConfirm from "@screens/BlogCreate/PublishConfirm";
import { resetPublicState } from "@redux/publicSlice";
import { iPostDetail } from "@DTO/Blog";
import postApi from "@api/postApi";
import { iPage } from "@DTO/Pagination";
import BlogTag from "@components/blogTag";
import Pagination from "@components/pagination";
interface iUserDetail {
  id: string;
  email: string;
  username: string;
  shortInfo: string;
  phoneNumber: null;
  gender: string;
  role: {
    id: string;
    role: string;
    displayName: string;
  };
  isFollowing: boolean;
  follower: number;
  following: number;
  avatarLink: string;
}

const UserDetail = () => {
  let params = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const { userInfo } = useSelector((state: RootState) => state.users);
  const { error, message } = useSelector(
    (state: RootState) => state.publicState
  );
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = params;

  //#region handle navigate me
  useEffect(() => {
    if (accessToken !== null) {
      userApi.getMe().then((r) => {
        if (r.status === 200) {
          if (userId === r.data.id) navigate("/me");
        }
      });
    }
    if (error !== null && error.length > 0) toast.error(error);
    if (message !== null && message.length > 0) toast.success(message);
    dispatch(resetPublicState());
  }, []);
  //#endregion
  const [userInfoState, setUserInfoState] = useState<iUserDetail>();
  const [listPostOfUser, setListOfPost] = useState<iPostDetail[]>();
  const [pagingList, setPagingList] = useState<iPage>();
  const [curPage, setCurPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  //
  const [isConfirm, setIsConfirm] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  //

  //#region handle follow and unfollow
  useEffect(() => {
    const unFollowConfirmHandle = async () => {
      if (userInfoState === null || userInfoState === undefined) {
        toast.error("C?? g?? ???? kh??ng ????ng, vui l??ng t???i l???i trang!");
      } else {
        toast.error("UnFollow");
        const result = await userApi.unFollowUser(userInfoState.id);

        let a: iUserDetail = {
          ...userInfoState,
          isFollowing: false,
          follower: userInfoState.follower - 1,
        };
        setUserInfoState(a);
      }
    };
    if (isConfirm === true) {
      unFollowConfirmHandle();
      setIsShowConfirm(false);
      setIsConfirm(false);
    }
  }, [isConfirm]);

  const handleFollow = async () => {
    if (accessToken === null) {
      if (userInfoState !== undefined && userInfoState.id !== undefined)
        navigate(`/login?redirect=followUser&id=${userInfoState.id}`);
      else navigate(`/login`);
    } else {
      if (userInfoState === null || userInfoState === undefined) {
        toast.error("C?? g?? ???? kh??ng ????ng, vui l??ng t???i l???i trang!");
      } else if (userInfoState.isFollowing) {
        setIsShowConfirm(true);
      } else if (!userInfoState.isFollowing) {
        toast.success("Follow");
        const result = await userApi.followUser(userInfoState.id);

        let a: iUserDetail = {
          ...userInfoState,
          isFollowing: true,
          follower: userInfoState.follower + 1,
        };
        setUserInfoState(a);
      }
    }
  };
  //#endregion
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo !== null && userId === userInfo?.id) {
      navigate("/me");
    }
    setLoading(true);
    if (userId === undefined || userId === null) {
      toast.error("C?? g?? ???? kh??ng ????ng");
      navigate("/");
    } else {
      setTimeout(async () => {
        const result = await userApi.getUserDetail(userId);
        if (result.status === 200) {
          setUserInfoState(result.data);
          setNotFound(false);
          await getData(userId);
        } else {
          setNotFound(true);
        }

        setLoading(false);
      }, 1000);
    }
  }, []);
  const getData = async (userId: string) => {
    const listPostTemp = await postApi.getAllPostByUser(userId, curPage, 1);
    if (listPostTemp.status === 200 || listPostTemp.status === 201) {
      setListOfPost(listPostTemp.data.result.data);
      setPagingList(listPostTemp.data.result.page);
    }
  };
  useEffect(() => {
    if (userInfo !== null && userId !== undefined) {
      if (notFound === false) {
        getData(userId);
      }
    }
  }, [curPage]);
  if (notFound) return <BlogNotFound />; //l?????i ?????i t??n thui :v n?? l?? notfound thoi
  return (
    <>
      {isShowConfirm ? (
        <PublishConfirm
          isConfirm={isConfirm}
          isShow={isShowConfirm}
          loading={loadingConfirm}
          setConfirmed={setIsConfirm}
          setShow={setIsShowConfirm}
          header="Unfollow?"
          message="B???n th???c s??? mu???n h???y ????ng k?? ng?????i d??ng n??y?"
          img={userInfoState?.avatarLink || avatarDefault}
        />
      ) : null}
      <div className="  min-h-[calc(100vh-52px)] bg-bg flex flex-col ">
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
                    onClick={() => handleFollow()}
                    className={
                      "flex-1 text-xs py-2  text-center rounded-md  hover:cursor-pointer " +
                      (!userInfoState?.isFollowing
                        ? " bg-primary"
                        : " border-[1px] border-white")
                    }
                  >
                    {userInfoState?.isFollowing ? (
                      <div className="flex items-center justify-center gap-[2px] overflow-hidden px-2">
                        <Check className="w-5 h-5" />
                        <span className=" line-clamp-1">??ang follow</span>
                      </div>
                    ) : (
                      " Follow"
                    )}
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
                <h4 className="w-full text-left">Gi???i thi???u</h4>
                <h6 className="text-center w-full break-all font-normal font-sm">
                  {userInfoState?.shortInfo || "Kh??ng c?? ti???u s???"}
                </h6>
                {/* <BioChange /> */}
                <div className="mt-2">
                  <h4>Li??n h???</h4>
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
                      <i className="text-xs">Kh??ng c?? th??ng tin li??n h???</i>
                    )}
                  </span>
                </div>
              </>
            ) : (
              <Skeleton height={100} />
            )}
          </div>
        </div>

        {!loading &&
        pagingList &&
        listPostOfUser &&
        listPostOfUser.length > 0 ? (
          <div className="max-w-[1028px] w-[85%] mx-auto flex justify-center flex-col items-center">
            <span className="text-right w-full text-sm py-2 ">
              Posted ({pagingList.totalElement})
            </span>
            <div className="w-full flex-1">
              {listPostOfUser.map((post) => (
                <BlogTag key={post.id} {...post} />
              ))}
            </div>
            <Pagination changePageNumber={setCurPage} {...pagingList} />
          </div>
        ) : loading ? (
          <>
            <Skeleton height={"40px"} />
            <Skeleton height={"25vh"} />
          </>
        ) : (
          <i className="text-center w-full text-sm mt-[10vh] py-2 ">
            Kh??ng c?? b??i vi???t
          </i>
        )}
      </div>
    </>
  );
};

export default UserDetail;
