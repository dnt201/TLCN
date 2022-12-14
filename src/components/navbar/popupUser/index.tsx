import React, { useEffect, useRef } from "react";
import ava1 from "@assets/images/userDefault.png";
import { ChangePassWord, LogOut, Setting } from "@icons/index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/store";
import { userLogout } from "@redux/userSlice";
import toast from "react-hot-toast";
interface iPopUpUserProps extends React.HTMLProps<HTMLDivElement> {
  setShow: (number: number) => void;
}
const PopUpUser: React.FC<iPopUpUserProps> = (props) => {
  const { className, setShow } = props;
  const popUpUser = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();
  const logoutHandle = async () => {
    setShow(0);
    const result = await dispatch(userLogout());
    if (result.payload === 200) {
      navigate(`/login`);
      setTimeout(() => {
        toast.remove();
      }, 2000);
      toast.success("Đăng xuất thành công!");
    }
  };
  useEffect(() => {
    const handleClickOutUser = (event: any) => {
      const buttonShowUser = document.getElementById("showUser");
      console.log(buttonShowUser);

      if (
        popUpUser.current &&
        !popUpUser.current.contains(event.target) &&
        buttonShowUser &&
        !buttonShowUser.contains(event.target)
      ) {
        setShow(0);
      } else {
      }
    };
    document.addEventListener("click", handleClickOutUser, true);
    return () => {
      document.removeEventListener("click", handleClickOutUser, true);
    };
  }, [popUpUser]);

  return (
    <div
      ref={popUpUser}
      className={
        "flex border-[1px] border-dark3 flex-col fixed overflow-x-auto overflow-hidden  z-20 right-4 top-[54px] h-max w-[320px] bg-bg2 rounded-md p-2  " +
        className
      }
    >
      <div
        className="flex items-center p-2 rounded-md hover:cursor-pointer hover:bg-hover"
        onClick={() => {
          navigate("/me");
          setShow(0);
        }}
      >
        <img
          src={userInfo?.avatarLink || ava1}
          alt="user avatar"
          className="h-9 w-9 rounded-full"
        />
        <span className="font-medium text-[15px] pl-2  overflow-hidden text-ellipsis whitespace-nowrap">
          {userInfo && userInfo.username}
        </span>
      </div>
      <div className="border-b-[1px] mt-2 w-100% mx-2 border-dark3"></div>

      <div className="mt-2">
        <div className="flex items-center p-2 rounded-md  hover:cursor-pointer hover:bg-hover">
          <i className="h-8 w-8 bg-smokeDark flex items-center justify-center rounded-full">
            <Setting />
          </i>
          <span className="font-medium text-[15px] ml-2 ">Settings</span>
        </div>
        <div
          className="flex items-center p-2 rounded-md  hover:cursor-pointer hover:bg-hover"
          onClick={() => {
            navigate("change-password");
            setShow(0);
          }}
        >
          <i className="h-8 w-8 bg-smokeDark flex items-center justify-center rounded-full">
            <ChangePassWord />
          </i>
          <span className="font-medium text-[15px] ml-2 ">Change password</span>
        </div>

        <div
          className="flex items-center p-2 rounded-md  hover:cursor-pointer hover:bg-hover"
          onClick={(e) => {
            logoutHandle();
            e.stopPropagation();
          }}
        >
          <i className="h-8 w-8 bg-smokeDark flex items-center justify-center rounded-full">
            <LogOut />
          </i>
          <span className="font-medium text-[15px] ml-2 ">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default PopUpUser;
