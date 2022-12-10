import React, { Fragment, useEffect, useRef, useState } from "react";

interface iMenuRightProps extends React.HTMLProps<HTMLDivElement> {
  content: string;
  idCurActive: string;
}

const MenuRight: React.FC<iMenuRightProps> = (props) => {
  const { className, content, idCurActive } = props;
  const divMenuRef = useRef<HTMLDivElement>(null);

  // console.log("Menu right rerender");
  console.log(idCurActive);

  useEffect(() => {
    if (divMenuRef.current !== null) {
      var collection = divMenuRef.current.children;
      if (collection !== undefined) {
        for (let i = 0; i < collection.length; i++) {
          if (collection[i].id === idCurActive) {
            // console.log(collection[])
            collection[i].classList.add("active");
            divMenuRef.current.scrollTop =
              collection[i].getBoundingClientRect().top;
          } else collection[i].classList.remove("active");
        }
      }
    }
    // console.log(collection);
  }, [idCurActive]);
  // useEffect(() => {
  //   let temp = document.createElement("div");
  //   // console.log(content);
  //   temp.innerHTML = content;
  //   // console.log(temp.querySelectorAll("h1"));
  //   setNumH1(temp.querySelectorAll("h1").length);
  // }, []);

  useEffect(() => {
    let temp = document.createElement("div");
    // console.log(content);
    temp.innerHTML = content;
    // console.log(temp.querySelectorAll("h1"));
    if (temp.querySelectorAll("h1").length === 0) {
      let tempA = document.createElement("i");
      tempA.innerText = "Bài viết này không có mục lục";
      tempA.className = "text-center  w-full";

      divMenuRef.current?.appendChild(tempA);
    } else {
      temp.querySelectorAll("h1").forEach((item, key) => {
        let tempA = document.createElement("button");
        // tempA.innerText = item.innerText;
        tempA.id = `btn-${item.innerText.formatH1()}-${key + 1}`;
        let spanTitle = document.createElement("span");
        spanTitle.innerText = item.innerText;
        spanTitle.className = " pl-8 text-sm my-1  line-clamp-2 text-left ";
        tempA.appendChild(spanTitle);
        // tempA.className = " ";
        tempA.onclick = (e) => {
          e.preventDefault();
          let element = document.getElementById(item.id);
          if (element !== null) {
            var elementPosition = element.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - 52;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
          return false;
        };

        divMenuRef.current?.appendChild(tempA);
      });
    }
  }, [content]);

  return (
    <div className={"w-full" + " " + className}>
      <div className="visible flex flex-col items-center ">
        <h1 className="">Mục lục</h1>
        <div
          id="menu-right-post-bing-chi-ling"
          className="flex flex-1 w-full flex-col items-start"
          ref={divMenuRef}
        ></div>
      </div>
    </div>
  );
};

export default MenuRight;
