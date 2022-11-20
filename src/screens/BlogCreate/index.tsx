import DialogBox from "@components/DialogBox";
import EditorText from "@components/EditorText";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DOMPurify from "dompurify";

const BlogCreate = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const [title, setTitle] = useState("");
  // const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [value, setValue] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  return (
    <div
      className={
        " relative flex flex-col bg-bg h-screen " +
        (step === 3 && " h-fit min-h-screen")
      }
    >
      <div className="flex  items-center py-2 justify-center mb-[2px] border-b-[1px] border-smokeDark">
        <div className="flex-1">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="p-2 hover:bg-smokeDark text-sm mr-1"
          >
            Hủy
          </button>
        </div>
        {step === 1 ? (
          <div className="flex">
            <h1 className="p-2 bg-smokeDark text-sm mr-1">Bước 1</h1>
            <button
              className="p-2 underline  text-sm hover:cursor-pointer hover:bg-smokeDark"
              onClick={() => {
                setStep(2);
              }}
            >
              Tiếp theo
            </button>
          </div>
        ) : step === 2 ? (
          <div className="flex">
            <button
              className="p-2 underline  text-sm hover:cursor-pointer hover:bg-smokeDark"
              onClick={() => {
                setStep(1);
              }}
            >
              Bước 1
            </button>
            <button
              className="p-2  underline   text-sm hover:cursor-pointer hover:bg-smokeDark"
              onClick={() => {
                setStep(3);
              }}
            >
              Preview
            </button>
          </div>
        ) : step === 3 ? (
          <button
            className="p-2  underline   text-sm hover:cursor-pointer hover:bg-smokeDark"
            onClick={() => {
              setStep(2);
            }}
          >
            Quay lại
          </button>
        ) : (
          <div>null</div>
        )}
      </div>

      {step === 1 ? (
        <div className="flex-1">
          <h1>Tiêu đề bài viết</h1>
          <input
            type="file"
            name="file"
            onChange={(event) => {
              if (event.target.files !== null) {
                console.log(event.target.files[0]);

                setThumbnail(event.target.files[0]);
              }
            }}
          />
        </div>
      ) : step === 2 ? (
        <EditorText valueHTML={value} setValue={setValue} />
      ) : step === 3 ? (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(value),
          }}
        />
      ) : (
        <div>
          Something went wrong <a> click to reload </a>
        </div>
      )}
    </div>
  );
};

export default BlogCreate;
