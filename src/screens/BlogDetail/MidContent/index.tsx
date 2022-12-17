import DOMPurify from "dompurify";
import React, { useEffect, useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import { FacebookLogo, More, Twitter } from "@icons/index";
import { useNavigate } from "react-router-dom";
import defaultIMG from "@images/default.jpg";

interface iMidContentProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  content: string;
  setIdCurActive: (id: string) => void;
  tags: iTagLazyDeclareQuaNe[];
  owner: iOwnerLazy;
  status: "Approve" | "Waiting";
}
interface iOwnerLazy {
  id: string;
  username: string;
  avatarLink: string;
}

interface iTagLazyDeclareQuaNe {
  id: string;
  postTagName: string;
  displayName: string;
  colorCode: string;
  thumbnailId: string;
}

const MidContent: React.FC<iMidContentProps> = (props) => {
  const { className, content, title, setIdCurActive, tags, status } = props;
  const midContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  function handleScroll() {
    if (midContentRef.current !== null) {
      var children = Array.from(midContentRef.current.children);
      let i = 0;
      children.forEach((e) => {
        if (e.tagName === "H1") {
          let rect = e.getBoundingClientRect();
          // if (rect.top <= document.documentElement.clientHeight / 2) i++;
          if (rect.top <= 54) i++;
        }
      });
      let j = 0;
      children.forEach((e, key) => {
        if (e.tagName === "H1") {
          // let rect = e.getBoundingClientRect();
          j++;

          let rectMid = midContentRef.current?.getBoundingClientRect();
          if (rectMid !== undefined)
            if (
              (rectMid.top <= 0 && rectMid.bottom <= 0) ||
              window.pageYOffset <
                document.documentElement.clientHeight * 0.15 + 52
            ) {
              setIdCurActive("");
            } else {
              if (j === i) {
                if (e.textContent)
                  setIdCurActive(
                    `btn-${e.textContent.formatH1().toString()}-${i}`
                  );
              }
            }
        }
      });
      i = 0;
    }
  }
  return (
    <div className={"pb-[20vh] " + " " + className}>
      {status !== undefined && status !== "Approve" && (
        <h6 className=" text-center">
          <i className="text-no text-xs">
            Đang kiểm duyệt, bài viết sẽ được công khai khi quản trị viên xác
            nhận!
          </i>
        </h6>
      )}
      <h1 className="mb-4">{title}</h1>
      <div className="min-h-[calc(75vh-52px)] border-b-[1px] border-hover border-solid mb-4">
        <div
          ref={midContentRef}
          className="min-h-[calc(75vh-52px)] mb-16"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content, {
              ADD_TAGS: ["iframe"],
              ADD_ATTR: [
                "allow",
                "allowfullscreen",
                "frameborder",
                "scrolling",
              ],
            }),
          }}
        />
        <div />
      </div>
      <div className="flex flex-col  my-4">
        <div className="flex items-center p-4 gap-4">
          {tags ? (
            <>
              {tags
                ? tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex w-fit hover:cursor-pointer rounded-md  flex-row items-center p-3 bg-[#f1f1f1]"
                      onClick={(e) => {
                        navigate(`/tags/${tag.id}`);
                        e.preventDefault();
                      }}
                    >
                      <img
                        className="w-6 h-6 mr-2"
                        src={
                          tag.thumbnailId === undefined ||
                          tag.thumbnailId === null ||
                          tag.thumbnailId.length < 0
                            ? defaultIMG
                            : `${process.env.REACT_APP_API_URL}file/${tag.thumbnailId}`
                        }
                      />
                      <h6>{tag.postTagName}</h6>
                    </div>
                  ))
                : null}
            </>
          ) : (
            <span>
              <i>Ows... Nothing tags to show!!! </i>
            </span>
          )}
        </div>
        <h6 className="mt-2">All rights reserved</h6>
        <div className="mt-2 w-full flex-row-reverse flex gap-4 items-center">
          <button
            className=""
            data-tip="Hiển thị các actions với bài viết"
            data-for="action"
          >
            <More className="w-7 h-7" />
            <ReactTooltip
              textColor="#FF4401"
              id="action"
              place="bottom"
              effect="solid"
            />
          </button>

          <button
            className=""
            data-tip="Share bài viết này lên facebook"
            data-for="facebookShareBotNe"
          >
            <FacebookLogo className="w-7 h-7" />
            <ReactTooltip
              textColor="#FF4401"
              id="facebookShareBotNe"
              place="bottom"
              effect="solid"
            />
          </button>

          <button
            className=" "
            data-tip="Share bài viết này lên Twitter"
            data-for="twitterShareBotNe"
          >
            <Twitter className="w-7 h-7" />
            <ReactTooltip
              textColor="#FF4401"
              id="twitterShareBotNe"
              place="bottom"
              effect="solid"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MidContent);
