import React, { useState } from "react";
import avatarDefault from "@images/userDefault.png";
import ReactTooltip from "react-tooltip";
import PopUpChangeImage from "./PopUpChangeImage";

interface iImageSecTionProps {
  avatarLink: string | null;
}
const ImageSection: React.FC<iImageSecTionProps> = (props) => {
  const { avatarLink } = props;
  const [showChange, setShowChange] = useState(false);
  return (
    <>
      {showChange ? (
        <PopUpChangeImage show={showChange} setShow={setShowChange} />
      ) : null}
      <img
        className="rounded-full h-[150px] w-[150px] hover:cursor-pointer"
        data-tip={
          avatarLink !== null && avatarLink.length > 0
            ? "Sửa ảnh đại diện"
            : "Thêm ảnh đại diện"
        }
        data-for="upLoadImage"
        src={
          avatarLink !== null && avatarLink.length > 0
            ? avatarLink
            : avatarDefault
        }
        onMouseOver={() => {
          console.log("hover");
        }}
        onMouseOut={() => {
          console.log("no");
        }}
        onClick={() => {
          setShowChange(true);
        }}
      />
      <ReactTooltip textColor="#FF4401" id="upLoadImage" place="bottom" />
    </>
  );
};

export default ImageSection;
