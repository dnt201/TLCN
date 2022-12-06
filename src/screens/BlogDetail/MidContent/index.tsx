import Tag from "@components/tag";
import DOMPurify from "dompurify";
import React, { useEffect, useRef, useState } from "react";
import reactSelect from "react-select";
import ReactTooltip from "react-tooltip";
import { FacebookLogo, More, Twitter } from "@icons/index";
interface iMidContentProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  content: string;
  setIdCurActive: (id: string) => void;
  tags: iTagLazyDeclareQuaNe[];
}

interface iTagLazyDeclareQuaNe {
  id: string;
  postTagName: string;
  displayName: string;
  colorCode: string;
  thumbnailId: string;
}

const MidContent: React.FC<iMidContentProps> = (props) => {
  const { className, content, title, setIdCurActive, tags } = props;
  const midContentRef = useRef<HTMLDivElement>(null);
  console.log("tags", tags);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  function handleScroll() {
    console.log(document.documentElement.clientHeight / 3);
    if (midContentRef.current !== null) {
      var children = Array.from(midContentRef.current.children);
      let i = 0;
      children.forEach((e) => {
        if (e.tagName === "H1") {
          let rect = e.getBoundingClientRect();
          console.log(rect.top);
          // if (rect.top <= document.documentElement.clientHeight / 2) i++;
          if (rect.top <= 52) i++;
        }
      });
      let j = 0;
      children.forEach((e, key) => {
        if (e.tagName === "H1") {
          // let rect = e.getBoundingClientRect();
          j++;
          if (j === i) {
            if (e.textContent)
              setIdCurActive(`btn-${e.textContent.formatH1().toString()}-${i}`);
            else {
            }
          } else {
            let rectMid = midContentRef.current?.getBoundingClientRect();
            if (rectMid !== undefined)
              if (
                (rectMid.top <= 0 && rectMid.bottom <= 0) ||
                window.pageYOffset <
                  document.documentElement.clientHeight * 0.15 + 52
              ) {
                setIdCurActive("");
              }
          }
        }
      });
      console.log(i);
      i = 0;
    }
  }
  return (
    <div className={"pb-[20vh] " + " " + className}>
      <h1 className="mb-4">{title}</h1>
      <div className="min-h-[calc(75vh-52px)] border-b-[1px] border-hover border-solid mb-4">
        <div
          ref={midContentRef}
          className="min-h-[calc(75vh-52px)]"
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
      <div className="flex flex-col  mt-4">
        <div className="flex items-center p-4">
          {tags ? (
            <>
              {tags
                ? tags.map((tag) => (
                    <div
                      className="flex w-fit hover:cursor-pointer rounded-md flex-row items-center p-4 bg-hover"
                      onClick={(e) => {
                        console.log("navigate qua all post of tag");
                        e.preventDefault();
                      }}
                    >
                      <img
                        className="w-6 h-6 mr-2"
                        src={`${process.env.REACT_APP_API_URL}file/${tag.thumbnailId}`}
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

        <h6 className="mt-4">All rights reserved</h6>
        <div className="mt-4 w-full flex-row-reverse flex gap-4 items-center">
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
            data-for="facebookShare"
          >
            <FacebookLogo className="w-7 h-7" />
            <ReactTooltip
              textColor="#FF4401"
              id="facebookShare"
              place="bottom"
              effect="solid"
            />
          </button>

          <button
            className=" "
            data-tip="Share bài viết này lên Twitter"
            data-for="twitterShare"
          >
            <Twitter className="w-7 h-7" />
            <ReactTooltip
              textColor="#FF4401"
              id="twitterShare"
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
