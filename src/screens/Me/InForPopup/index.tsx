import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@app/store";
import { XMark } from "@icons/index";
import { useDispatch, useSelector } from "react-redux";
import userApi, { userUpdateProfile } from "@api/userApi";
import { userGetMe } from "@redux/userSlice";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
interface iInForPopups {
  show: boolean;
  setShow: (show: boolean) => void;
}
const gender: string[] = ["Male", "Female", "LGBT", "Unknown"];
const InForPopup: React.FC<iInForPopups> = (props) => {
  const { show, setShow } = props;
  const [loading, setLoading] = useState(false);
  const [userNameInput, setUserNameInput] = useState("");
  const [shortInfoInput, setShortInfoInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [userNameInputZ, setUserNameInputZ] = useState("");
  const [genderInputZ, setGenderInputZ] = useState("");
  const [hasChanged, setHasChanged] = useState(false);

  const { userInfo } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setUserNameInput(userInfo?.username || "");
    setGenderInput(userInfo?.gender || "");
    setUserNameInputZ(userInfo?.username || "");
    setGenderInputZ(userInfo?.gender || "");
  }, [userInfo]);
  useEffect(() => {
    if (userNameInput === userNameInputZ && genderInput === genderInputZ)
      setHasChanged(false);
    else setHasChanged(true);
  }, [userNameInput, genderInput]);
  const handleUpdateProfile = async () => {
    if (userInfo) {
      let userUpdate: userUpdateProfile = {
        email: userInfo.email,
        username: userNameInput,
        shortInfo: shortInfoInput,
        gender: genderInput,
      };
      setLoading(true);

      toast.promise(userApi.updateProFile(userUpdate), {
        loading: "Saving...",
        success: () => {
          setLoading(false);
          setShow(false);
          dispatch(userGetMe());
          return "Update profile thành công!";
        },
        error: (err) => {
          return err + "";
        },
      });
    } else {
      alert("screens/Me/InForPopup error! check");
    }
  };
  return (
    <div
      className="fixed w-screen  h-screen top-0 left-0  z-[10000] flex items-center justify-center"
      // ref={divPopUpRef}
      onClick={() => setShow(false)}
    >
      <div className="fixed w-screen  h-screen bg-bg opacity-70"></div>
      {/* Form */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={" relative bg-bg2 w-[50vw] rounded-lg flex flex-col "}
      >
        {loading ? (
          <div className=" absolute  z-[10000] w-full h-full bg-white opacity-75  flex justify-center items-center">
            <BeatLoader />
          </div>
        ) : null}
        {/* Start Header  */}
        <div className="flex  relative items-center  border-b-[1px] border-smokeHover">
          <h3 className="w-full text-center my-2">Cập nhật thông tin</h3>
          <button
            className="absolute top-0 right-0  rounded-full  text-white p-2"
            onClick={() => setShow(false)}
          >
            <XMark />
          </button>
        </div>
        {/* End Header  */}
        {/* Start content */}
        <div className="flex flex-col mt-4 mx-4">
          <div className="flex flex-row   items-center">
            <label className=" flex-1 mr-[2px]">Tên người dùng: </label>
            <input
              className=" flex-[3]  px-2 py-2 text-sm text-white rounded-lg bg-hover break-all resize-none"
              defaultValue={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              placeholder="Nhập tên người dùng"
            />
          </div>
          <div className="flex flex-row mt-3 items-center ">
            <label htmlFor="gender" className=" w-1/4">
              Giới tính:
            </label>
            <select
              id="gender"
              className=" w-fit text-bg2 px-1 py-2 rounded-lg text-sm"
              onChange={(e) => setGenderInput(e.target.value)}
            >
              {gender.map((item, index) => (
                <option key={item} selected={item === genderInput} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* End content */}
        {/* Start bottomNav */}
        <div className="flex justify-center w-full pt-6 pb-4">
          <button
            className="py-2 px-4 border-[1px] border-white rounded-lg mr-2"
            onClick={() => setShow(false)}
          >
            Hủy
          </button>
          <button
            className={
              "flex items-center p-2 px-4 border-[1px] rounded-lg  " +
              (!hasChanged
                ? " bg-smokeDark border-smokeDark cursor-not-allowed "
                : " border-primary  bg-primary cursor-pointer ")
            }
            disabled={!hasChanged}
            onClick={() => {
              handleUpdateProfile();
            }}
          >
            Lưu
          </button>
        </div>
        {/* End bottomNav */}
      </div>
    </div>
  );
};

export default InForPopup;
