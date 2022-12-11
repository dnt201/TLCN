import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgRegister from "@images/register.gif";
import FormRegister from "./FormRegister";
import { AppDispatch, RootState } from "@app/store";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState, setUserMessage } from "@redux/userSlice";
import toast from "react-hot-toast";
import userApi from "@api/userApi";
import { ClipLoader } from "react-spinners";
import successConfirmImage from "@assets/images/registerSuccess.gif";

const Register = () => {
  const [pause, setPause] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [tokenValidate, setTokenValidate] = React.useState("");
  const [verifyLoading, setVerifyLoading] = React.useState(false);
  const [successConfirm, setSuccessConfirm] = React.useState(false);
  const navigate = useNavigate();

  const { accessToken, message, error } = useSelector(
    (state: RootState) => state.users
  );
  const accessTokenFromLocalStorage = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken !== null) {
      navigate("/");
    }
  }, [accessToken]);

  const dispatch = useDispatch<AppDispatch>();

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
  return (
    <div
      className="w-screen min-h-screen bg-white flex lg:flex-row items-center justify-center text-bg
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
        {step === 1 ? (
          <h1 className=" mt-4 font-bold text-primary text-xl text-center">
            Đăng ký tài khoản
          </h1>
        ) : step === 2 ? (
          <div>
            <h1 className=" mt-4 font-bold text-primary text-xl text-center">
              Xác nhận email!
            </h1>
            <i className=" mt-4 text-primary text-xs text-center">
              Chúng tôi vừa gửi một token đến email của bạn, vui lòng kiểm tra!
            </i>
          </div>
        ) : null}
        {step === 1 ? (
          <FormRegister pause={pause} setStep={(step) => setStep(step)} />
        ) : step === 2 ? (
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
            </div>
            <button
              className={
                "text-primary rounded-sm p-2 text-sm flex items-center border-primary border-[1px] hover:text-white hover:bg-primary  transition-colors duration-700 " +
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
                    toast.error("Token không đúng, vui lòng kiểm tra lại!");
                  } else {
                    setSuccessConfirm(true);
                    setTimeout(() => {
                      setSuccessConfirm(false);
                      dispatch(setUserMessage("Xác thực thành công!"));
                      navigate("/login");
                    }, 1850);
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
                <img className="w-p[480px]" src={successConfirmImage} alt="a" />
              </div>
            ) : null}
          </div>
        ) : (
          <></>
        )}

        <span className="mt-8 font-normal text-sm text-bg2">
          Bạn đã có tài khoản?
          <Link className="text-primary font-semibold" to="/login">
            Đăng nhập
          </Link>
        </span>
        <a className="mt-2 text-sm text-primary font-semibold">
          Quên mật khẩu?
        </a>
      </div>
      <div className=" flex  flex-1 justify-center items-center phone:hidden">
        <img className="w-[40vw] " src={imgRegister} alt="img" />
      </div>
    </div>
  );
};

export default Register;
