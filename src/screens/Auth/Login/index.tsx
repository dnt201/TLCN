import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import userApi from "@api/userApi";
import { AppDispatch, RootState } from "src/app/store";
import imgUserLogin from "@assets/images/userLogin.gif";
import successConfirmImage from "@assets/images/registerSuccess.gif";
import {
  AccountLogo,
  FacebookLogo,
  GithubLogo,
  GoogleLogo,
} from "@icons/index";
import FormLogin from "./FormLogin";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { resetUserState, setUserMessage } from "@redux/userSlice";
import postApi from "@api/postApi";
import { setMessagePublicState } from "@redux/publicSlice";
const Login = () => {
  const [pause, setPause] = React.useState(false);
  const [successConfirm, setSuccessConfirm] = React.useState(false);
  const [tokenValidate, setTokenValidate] = React.useState("");
  const [step, setStep] = React.useState(1);
  const [verifyLoading, setVerifyLoading] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { accessToken, message, error, userInfo } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (error !== "" && error.length > 0 && error.length !== null) {
      setPause(true);
      setTimeout(() => {
        toast.remove();
        setPause(false);
      }, 2000);
      toast.error(error);
    }
    if (message !== "" && message.length > 0 && message.length !== null) {
      setPause(true);

      setTimeout(() => {
        toast.remove();
        setPause(false);
      }, 2000);
      toast.success(message);
    }
    dispatch(resetUserState());
  }, [error, message]);

  const accessTokenFromLocalStorage = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessTokenFromLocalStorage !== null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (accessTokenFromLocalStorage !== "" && userInfo) {
      let actionFromURL = searchParams.get("redirect");
      let idFromURL = searchParams.get("id");

      if (actionFromURL !== null && idFromURL !== null) {
        if (actionFromURL === "followPost") {
          postApi.getPostDetailById(idFromURL).then((result) => {
            if (result.status === 200) {
              if (result.data.isFollow === true) {
                navigate(`/blog/${searchParams.get("id")}?message=followed`);
                toast("Bài viết đã được follow trước đó!", {
                  icon: "⚠️",
                });
              } else if (result.data.isFollow === false && idFromURL !== null) {
                userApi.followPost(idFromURL).then((result) => {
                  if (result.status === 200 || result.status === 201) {
                    navigate(`/blog/${idFromURL}?message=followSuccess`);
                    toast.success("Đã follow bài viết thành công!");
                  } else {
                    navigate(`/blog/${idFromURL}}`);
                    toast.error(
                      "Lỗi, Không thể follow bài viết! Vui lòng thử lại"
                    );
                  }
                });
              } else navigate("/");
            }
          });
        } else if (actionFromURL === "followUser") {
          userApi.getMe().then((result) => {
            if (result.status === 200) {
              if (result.data.id === idFromURL) {
                dispatch(setUserMessage("ErrorFlowYourself"));
                navigate(`/me`);
              } else {
                if (idFromURL) {
                  userApi.followUser(idFromURL).then((result) => {
                    if (result.status === 201) {
                      dispatch(setMessagePublicState("Đã follow thành công!"));
                      navigate(`/user-detail/${idFromURL}`);
                    } else {
                      navigate(`/user-detail/${idFromURL}?success=false`);
                    }
                  });
                }
              }
            } else navigate("/");
          });
        } else if (actionFromURL === "commentPost") {
          navigate(`/blog/${idFromURL}?ref=postComment`);
        } else navigate("/");
      } else navigate("/");
    }
  }, [accessToken, accessTokenFromLocalStorage, userInfo]);

  const showToastOnUpdate = () => {
    setPause(true);
    setTimeout(() => {
      toast.remove();
      setPause(false);
    }, 2000);
    toast("Tính năng đang được cập nhập!", { icon: "👏" });
  };
  return (
    <div
      className="w-screen h-screen bg-white flex lg:flex-row items-center justify-center 
    md:flex-col-reverse 
    "
    >
      <div className="flex  flex-col lg:flex-1  p-4 items-center  justify-center bg-bg2 md: bg-transparent md:flex-[2] md:justify-start">
        <Link to={"/"} className=" mr-1 h-[44px] w-[44px] rounded-md  mt-8">
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.868 0H2.13201C1.69917 0 1.28405 0.171956 0.97799 0.478017C0.671929 0.784078 0.5 1.1992 0.5 1.63203V15.3147C0.5 15.7476 0.671929 16.1627 0.97799 16.4688C1.28405 16.7748 1.69917 16.9467 2.13201 16.9467H8.02889V30.368C8.02889 30.8008 8.20082 31.2159 8.50688 31.522C8.81294 31.828 9.22806 32 9.6609 32H23.3436C23.5577 32 23.7697 31.9578 23.9675 31.8757C24.1652 31.7936 24.3449 31.6733 24.496 31.5217C24.6472 31.3701 24.767 31.1902 24.8485 30.9922C24.93 30.7942 24.9717 30.5821 24.9711 30.368V16.9467H30.868C31.3008 16.9467 31.716 16.7748 32.022 16.4688C32.3281 16.1627 32.5 15.7476 32.5 15.3147V1.63203C32.5 1.1992 32.3281 0.784078 32.022 0.478017C31.716 0.171956 31.3008 0 30.868 0ZM2.3935 1.8935H15.5533V15.0533H2.3935V1.8935ZM23.0821 30.1065H9.91787V16.9467H23.0821V30.1065ZM30.6155 15.0533H17.4467V1.8935H30.6155V15.0533Z"
              fill="black"
            />
            <path
              d="M11.4397 10.0264C11.5286 10.1076 11.6339 10.172 11.7498 10.2157C11.8657 10.2594 11.9898 10.2816 12.115 10.281C12.2396 10.2817 12.363 10.2595 12.4782 10.2158C12.5933 10.1721 12.6979 10.1077 12.7858 10.0264C12.8762 9.94475 12.948 9.84733 12.9971 9.73982C13.0462 9.63231 13.0714 9.51685 13.0714 9.40023C13.0714 9.28361 13.0462 9.16818 12.9971 9.06067C12.948 8.95316 12.8762 8.85572 12.7858 8.7741L9.7492 5.9774C9.66059 5.8941 9.55482 5.8279 9.43809 5.78273C9.32135 5.73755 9.196 5.71429 9.06938 5.71429C8.94276 5.71429 8.81743 5.73755 8.7007 5.78273C8.58396 5.8279 8.47817 5.8941 8.38955 5.9774L5.35303 8.7741C5.17273 8.94016 5.07143 9.16539 5.07143 9.40023C5.07143 9.63508 5.17273 9.8603 5.35303 10.0264C5.53333 10.1924 5.77787 10.2857 6.03285 10.2857C6.28784 10.2857 6.53238 10.1924 6.71268 10.0264L9.07845 7.84744L11.4397 10.0264Z"
              fill="black"
            />
            <path
              d="M21.5517 10.0228L23.9175 7.84569L26.2833 10.0228C26.3719 10.1061 26.4776 10.1722 26.5944 10.2173C26.7111 10.2625 26.8365 10.2857 26.9631 10.2857C27.0897 10.2857 27.2151 10.2625 27.3318 10.2173C27.4485 10.1722 27.5543 10.1061 27.6429 10.0228C27.7333 9.94128 27.8052 9.84395 27.8543 9.73652C27.9033 9.6291 27.9286 9.51374 27.9286 9.39721C27.9286 9.28069 27.9033 9.16536 27.8543 9.05793C27.8052 8.9505 27.7333 8.85315 27.6429 8.7716L24.6064 5.97718C24.5177 5.89395 24.412 5.82781 24.2952 5.78267C24.1785 5.73753 24.0531 5.71429 23.9265 5.71429C23.7999 5.71429 23.6746 5.73753 23.5578 5.78267C23.4411 5.82781 23.3353 5.89395 23.2467 5.97718L20.2102 8.7716C20.0299 8.93752 19.9286 9.16256 19.9286 9.39721C19.9286 9.63187 20.0299 9.85691 20.2102 10.0228C20.3905 10.1888 20.635 10.282 20.89 10.282C21.145 10.282 21.3895 10.1888 21.5698 10.0228H21.5517Z"
              fill="black"
            />
            <path
              d="M13.8041 21.9736C13.5981 21.8076 13.3186 21.7143 13.0272 21.7143C12.7359 21.7143 12.4564 21.8076 12.2504 21.9736C12.0443 22.1395 11.9286 22.3647 11.9286 22.5994C11.9286 22.8342 12.0443 23.0593 12.2504 23.2253L15.7257 26.0209C15.8266 26.1047 15.9474 26.1713 16.0808 26.2168C16.2143 26.2623 16.3577 26.2857 16.5026 26.2857C16.6475 26.2857 16.7909 26.2623 16.9244 26.2168C17.0578 26.1713 17.1786 26.1047 17.2795 26.0209L20.7496 23.2253C20.9557 23.0593 21.0714 22.8342 21.0714 22.5994C21.0714 22.3647 20.9557 22.1395 20.7496 21.9736C20.5436 21.8076 20.2641 21.7143 19.9727 21.7143C19.6813 21.7143 19.4019 21.8076 19.1958 21.9736L16.5078 24.1349L13.8041 21.9736Z"
              fill="black"
            />
          </svg>
        </Link>
        {step !== 3 ? (
          <h1 className="font-bold text-primary text-xl text-center">
            Đăng nhập vào Teaching Me
          </h1>
        ) : (
          <div>
            <h1 className=" mt-4 font-bold text-primary text-xl text-center">
              Xác nhận email!
            </h1>
            <i className=" mt-4 text-primary text-xs text-center">
              Chúng tôi vừa gửi một token đến email của bạn, vui lòng kiểm tra!
            </i>
          </div>
        )}

        {step === 1 ? (
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => setStep(2)}
              className="w-3/4 border-2 relative sm:w-[320px] text-bg2 border-smokeHover mt-10 text-center px-4 py-2 text-xs rounded-[9999px] transition-colors hover:bg-smokeHover"
            >
              <AccountLogo className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />
              Sử dụng email / số điện thoại
            </button>
            <button
              disabled={pause}
              onClick={() => showToastOnUpdate()}
              className="disabled:cursor-not-allowed w-3/4 border-2 relative sm:w-[320px] text-bg2 border-smokeHover mt-2 text-center px-4 py-2 text-xs rounded-[9999px] transition-colors hover:bg-smokeHover"
            >
              <GoogleLogo className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />
              Tiếp tục với Google
            </button>
            <button
              disabled={pause}
              onClick={() => showToastOnUpdate()}
              className="disabled:cursor-not-allowed w-3/4 border-2 relative sm:w-[320px] text-bg2 border-smokeHover mt-2 text-center px-4 py-2 text-xs rounded-[9999px] transition-colors hover:bg-smokeHover"
            >
              <FacebookLogo className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />
              Tiếp tục với Facebook
            </button>
            <button
              disabled={pause}
              onClick={() => showToastOnUpdate()}
              className="disabled:cursor-not-allowed w-3/4 border-2 relative sm:w-[320px] text-bg2 border-smokeHover mt-2 text-center px-4 py-2 text-xs rounded-[9999px] transition-colors hover:bg-smokeHover"
            >
              <GithubLogo className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />
              Tiếp tục với Github
            </button>
          </div>
        ) : step === 2 ? (
          <FormLogin pause={pause} setStep={(step) => setStep(step)} />
        ) : step === 3 ? (
          <div className="flex items-start w-full">
            <div className=" flex flex-col flex-1">
              <input
                placeholder="Enter your token"
                className=" flex-1 mr-2 ml-6 text-bg p-2 text-sm border-bg2  focus:outline-none
                border-b-[1px] focus:border-bg focus:border-b-2
                "
                value={tokenValidate}
                onChange={(e) => setTokenValidate(e.target.value.toString())}
              />
              {/* {tokenValidate.length <= 0 && (
                <i className="w-full text-center text-xs text-no">
                  Token is invalid
                </i>
              )} */}
            </div>
            <button
              className={
                "text-primary p-2 text-sm flex items-center border-primary border-[1px] hover:text-white hover:bg-primary  transition-colors duration-700 " +
                (pause && " cursor-not-allowed")
              }
              disabled={pause}
              onClick={async () => {
                if (tokenValidate.length > 0) {
                  setVerifyLoading(true);

                  const result = await userApi.activate(tokenValidate);
                  if (result.status === 404) {
                    setPause(true);
                    setTimeout(() => {
                      setPause(false);
                      toast.remove();
                    }, 2000);
                    toast.error("Token không đúng, vui lòng kiểm tra lại");
                  } else {
                    setSuccessConfirm(true);
                    setTimeout(() => {
                      setSuccessConfirm(false);
                      setStep(1);
                      toast.success("Xác thực thành công!");
                    }, 1850);
                    setTimeout(() => {
                      toast.remove();
                    }, 3850);
                  }
                  setVerifyLoading(false);
                } else {
                  setPause(true);
                  setTimeout(() => {
                    setPause(false);
                    toast.remove();
                  }, 2000);
                  toast.error("Vui lòng nhập token!");
                }
              }}
            >
              <span className="flex-1 text-center">Verify</span>
              <ClipLoader
                color={"#fff"}
                loading={verifyLoading}
                // cssOverride={override}
                size={16}
                className="ml-2 text-sm "
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
            {successConfirm ? (
              <div className="fixed w-screen h-screen top-0 flex bg-white items-center justify-center">
                <img className="" src={successConfirmImage} alt="a" />
              </div>
            ) : null}
          </div>
        ) : null}
        {step !== 3 ? (
          <>
            <span className="mt-8 font-normal text-sm text-bg2">
              Bạn chưa có tài khoản?{" "}
              <Link to={"/register"} className="text-primary font-semibold">
                Đăng ký
              </Link>
            </span>
            <Link
              className="mt-2 text-sm text-primary font-semibold"
              to={"/forgotpassword"}
            >
              Quên mật khẩu?
            </Link>
          </>
        ) : null}
      </div>
      <div className=" flex  flex-1 justify-center items-center phone:hidden">
        <img className="w-p[480px]" src={imgUserLogin} alt="img" />
      </div>
    </div>
  );
};

export default Login;
