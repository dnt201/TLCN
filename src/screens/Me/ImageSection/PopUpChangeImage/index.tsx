import React, { useEffect, useRef, useState } from "react";
import { UpImage, XMark } from "@icons/index";
import Dropzone, { useDropzone } from "react-dropzone";
import toast, { CheckmarkIcon } from "react-hot-toast";
import userApi from "@api/userApi";

interface iPopUpChangeImageProps {
  show: boolean;
  setShow: (t: boolean) => void;
}

const PopUpChangeImage: React.FC<iPopUpChangeImageProps> = (props) => {
  const divPopUpRef = useRef<HTMLDivElement>(null);

  const [isDropOn, setDropOn] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const { show, setShow } = props;
  useEffect(() => {
    console.log("selectedImage", selectedImage);
  }, [selectedImage]);
  const handleSummit = async () => {
    if (selectedImage === null) {
      toast.error("Something went wrong! Select again,");
    } else {
      console.log(selectedImage);
      const a = await userApi.updateImage(selectedImage);
      console.log(a);
    }
  };

  return (
    <div
      className="fixed  top-0 left-0  z-[10000] flex items-center justify-center"
      ref={divPopUpRef}
      onClick={() => setShow(false)}
    >
      {/* BackGround */}
      <div className="w-screen h-screen bg-bg opacity-70"></div>

      {/* Form */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          "fixed bg-bg2 h-[70vh] w-[50vw] rounded-lg flex flex-col " +
          (isDropOn ? " bg-hover " : null)
        }
      >
        {/* Start Header  */}
        <div className="flex  relative items-center   border-b-[1px] border-smokeHover">
          <h3 className="w-full text-center my-2">Cập nhật ảnh đại diện</h3>
          <button
            className="absolute top-0 right-0  rounded-full  text-white p-2"
            onClick={() => setShow(false)}
          >
            <XMark />
          </button>
        </div>
        {/* End Header  */}

        {/* Start Input */}
        {selectedImage ? (
          <div className="flex  items-center  justify-center mt-8">
            <div className="w-fit relative">
              <img
                src={URL.createObjectURL(selectedImage)}
                className="max-w-[240px] p-4 max-h-[240px]"
                alt="Pumb"
              />
              <button
                className="absolute top-0 right-0 translate-y-1/3 p-[2px] -translate-x-1/3 hover:bg-smoke bg-white text-bg rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <XMark className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <Dropzone
            // maxFiles={1}
            accept={{ "image/jpeg": [".jpeg", ".png"] }}
            onDragEnter={() => {
              setDropOn(true);
              console.log("onDragEnter");
            }}
            onDragLeave={() => {
              setDropOn(false);
              console.log("onDragLeave");
            }}
            // onDropRejected={(files) => {
            //   console.log("onDropRejected", files);
            //   if (files.length > 1)
            //     toast.error('Vui lòng chọn duy nhất "1" ảnh!');
            // }}
            onDrop={(files) => {
              console.log(files);
              if (files.length > 1)
                toast.error('Vui lòng chọn duy nhất "1" ảnh!');
              else if (files[0]) setSelectedImage(files[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className="flex items-center  justify-center mt-8"
                {...getRootProps()}
              >
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center max-w-[240px] p-4 max-h-[240px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UpImage />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Only PNG or JPG
                    </p>
                  </div>
                </label>
              </div>
            )}
          </Dropzone>
        )}
        {/* End Input */}

        {/* Start bottomNav */}
        <div className="mt-6 flex justify-center w-full">
          <button
            className="py-2 px-4 border-[1px] border-white rounded-lg mr-2"
            onClick={() => setShow(false)}
          >
            Hủy
          </button>
          <button
            className={
              "flex items-center p-2 px-4 border-[1px] rounded-lg  " +
              (selectedImage === null
                ? " bg-smokeDark border-smokeDark cursor-not-allowed "
                : " border-primary  bg-primary cursor-pointer ")
            }
            disabled={selectedImage === null ? true : false}
            onClick={() => {
              handleSummit();
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

export default PopUpChangeImage;
