import React, { useEffect } from "react";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import userApi, { userApiAuth } from "@api/userApi";
import { AppDispatch, RootState } from "src/app/store";
import imgUserLogin from "@assets/images/userLogin.gif";
import successConfirmImage from "@assets/images/registerSuccess.gif";
import {
  AccountLogo,
  FacebookLogo,
  GithubLogo,
  GoogleLogo,
  ChevronLeft,
} from "@icons/index";
import FormLogin from "./FormLogin";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { isFulfilled } from "@reduxjs/toolkit";
import {
  resetUserState,
  setUserError,
  setUserMessage,
  userGetMe,
} from "@redux/userSlice";
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
  const { accessToken, message, error } = useSelector(
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

      console.log("setTimeout", message);
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
    // console.log("accessToken", accessToken);
    if (accessTokenFromLocalStorage !== null) {
      navigate("/");
    } else {
      if (accessToken !== "") {
        let actionFromURL = searchParams.get("redirect");
        let idFromURL = searchParams.get("id");
        console.log(actionFromURL, idFromURL);
        if (actionFromURL !== null && idFromURL !== null) {
          if (actionFromURL === "followPost") {
            postApi.getPostDetailById(idFromURL).then((result) => {
              if (result.status === 200) {
                console.log(result);
                if (result.data.isFollow === true) {
                  console.log("navigate followed");
                  navigate(`/blog/${searchParams.get("id")}?message=followed`);
                } else if (result.data.isFollow === false) {
                  console.log("navigate chưa follow và follow");
                  navigate(
                    `/blog/${searchParams.get("id")}?message=followSuccess`
                  );
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
                        dispatch(
                          setMessagePublicState("Đã follow thành công!")
                        );
                        navigate(`/user-detail/${idFromURL}`);
                      } else {
                        // dispatch(setUserError("Something went wrong"));
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
    }
  }, [accessToken, accessTokenFromLocalStorage]);

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
          <img
            className="h-full w-full  rounded-md"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Logo Image"
          />
        </Link>
        {step !== 3 ? (
          <h1 className=" mt-4 font-bold text-primary text-xl text-center">
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
                  console.log("lazyyyy");
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
              Bạn chưa có tài khoản?
              <Link to={"/register"} className="text-primary font-semibold">
                Đăng ký
              </Link>
            </span>
            <a className="mt-2 text-sm text-primary font-semibold">
              Quên mật khẩu?
            </a>
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
