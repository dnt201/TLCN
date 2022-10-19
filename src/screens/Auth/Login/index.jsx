import React from "react";
import userLogin from "@assets/images/userLogin.gif";
import { Link } from "react-router-dom";
import {
  AccountLogo,
  FacebookLogo,
  GithubLogo,
  GoogleLogo,
} from "@icons/index";
const Login = () => {
  return (
    <div
      className="w-screen h-screen bg-white flex lg:flex-row items-center justify-center 
    md:flex-col-reverse
    "
    >
      <div className="flex flex-col lg:flex-1  p-4 items-center  justify-center bg-smoke md: bg-transparent md:flex-[2] md:justify-start">
        <Link
          to={"/"}
          className=" mr-1 h-[44px] w-[44px] rounded-md  mt-8"
          alt=" Teaching Me Logo"
        >
          <img
            className="h-full w-full  rounded-md"
            src="https://flowbite.com/docs/images/logo.svg"
          />
        </Link>
        <h1 className=" mt-4 font-bold text-xl text-center">
          Chào mừng đến với Teaching Me
        </h1>
        <Link className="w-3/4 border-2 relative sm:w-[320px] border-smokeHover mt-10 text-center px-4 py-2 text-xs rounded-[9999px] transition-colors hover:bg-smokeHover ">
          <AccountLogo className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />
          Sử dụng email / số điện thoại
        </Link>
        <Link className="w-3/4 border-2 relative sm:w-[320px] border-smokeHover mt-2 text-center px-4 py-2 text-xs rounded-[9999px] transition-colors hover:bg-smokeHover ">
          <GoogleLogo className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />
          Tiếp tục với Google
        </Link>
        <Link className="w-3/4 border-2 relative sm:w-[320px] border-smokeHover mt-2 text-center px-4 py-2 text-xs rounded-[9999px] transition-colors hover:bg-smokeHover ">
          <FacebookLogo className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />
          Tiếp tục với Facebook
        </Link>
        <Link className="w-3/4 border-2 relative sm:w-[320px] border-smokeHover mt-2 text-center px-4 py-2 text-xs rounded-[9999px] transition-colors hover:bg-smokeHover ">
          <GithubLogo className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />
          Tiếp tục với Github
        </Link>
        <span className="mt-8 font-normal text-sm">
          Bạn chưa có tài khoản?{" "}
          <Link className="text-secondary font-semibold">Đăng ký</Link>
        </span>
        <Link className="mt-2 text-sm text-secondary font-semibold">
          Quên mật khẩu?
        </Link>
      </div>

      <div className=" flex  flex-1 justify-center items-center phone:hidden">
        <img className="w-[40vw] " src={userLogin} alt="img" />
      </div>
    </div>
  );
};

export default Login;
