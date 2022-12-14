import React, { useEffect, useState } from "react";
import { Public, Write } from "@icons/index";
import userApi, { userUpdateProfile } from "@api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/store";
import { userGetMe } from "@redux/userSlice";
import { BeatLoader } from "react-spinners";

interface iBioProps {}

const BioSection: React.FC<iBioProps> = (props) => {
  const [bioInput, setBioInput] = useState("");
  const [changeBio, setChangeBio] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [bioInDatabase, setBioInDatabase] = useState("");
  const [hasChanged, setHasChanged] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (bioInput === bioInDatabase) setHasChanged(false);
    else setHasChanged(true);
  }, [bioInput]);
  useEffect(() => {
    setBioInput(userInfo?.shortInfo || "");
    setBioInDatabase(userInfo?.shortInfo || "");
  }, [userInfo]);
  const handleUpdateBio = async () => {
    if (userInfo) {
      let userUpdate: userUpdateProfile = {
        email: userInfo.email,
        username: userInfo.username,
        shortInfo: bioInput,
        gender: userInfo.gender,
      };
      setLoading(true);
      const result = await userApi.updateProFile(userUpdate);
      await setTimeout(() => {
        if (result.status === 200) dispatch(userGetMe());
        setLoading(false);
        setChangeBio(false);
      }, 2500);
    } else {
      alert("screens/Me/BioSection error! check");
    }
  };

  return (
    <div
      className={
        "flex flex-col  relative py-2 px-1 justify-center items-center " +
        (isLoading ? "  " : null)
      }
    >
      {isLoading ? (
        <div className="p-4   absolute w-full h-full bg-white  flex items-center justify-center opacity-70 rounded-lg">
          <BeatLoader
            color={"#444"}
            loading={isLoading}
            // cssOverride={override}
            size={12}
            className="opacity-100"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : null}

      {changeBio ? (
        <div className="w-full">
          <textarea
            className="w-full min-h-[60px] px-2 py-1 text-center text-sm text-white rounded-lg bg-hover break-all resize-none"
            defaultValue={bioInput}
            onChange={(e) => setBioInput(e.target.value)}
            placeholder="M?? t??? v??? b???n"
          ></textarea>
          <div className="py-1 mt-1 flex items-center">
            <div className="flex items-center text-sm">
              <i className="mr-1">
                <Public />
              </i>
              C??ng khai
            </div>
            <div className="flex-1 flex items-center justify-end">
              <button
                className="px-2 py-1 border-white hover:bg-hover border-[1px] text-s rounded-md"
                onClick={() => {
                  setChangeBio(false);
                  setBioInput(bioInDatabase);
                }}
              >
                H???y
              </button>
              <button
                className={
                  "px-2 py-1 ml-1  border-[1px]  text-s rounded-md " +
                  (hasChanged
                    ? " bg-primary  border-primary hover:bg-primaryLow "
                    : " cursor-not-allowed bg-smokeDark border-smokeDark")
                }
                onClick={() => {
                  handleUpdateBio();
                }}
                disabled={!hasChanged}
              >
                L??u
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <span className="text-center w-full break-all">{bioInput}</span>
          <button
            className="flex items-center text-sm w-full mt-1 p-1 justify-center border-white border-[1px] rounded-md"
            onClick={() => setChangeBio(true)}
          >
            <span className="ml-2 text-s">
              {bioInput.length > 0 ? (
                <>
                  <div className="flex items-center">
                    <Write />
                    <p className="ml-1">Ch???nh s???a ti???u s???</p>
                  </div>
                </>
              ) : (
                "Th??m ti???u s???"
              )}
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default BioSection;
