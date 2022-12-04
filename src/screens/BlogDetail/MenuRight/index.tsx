import DOMPurify from "dompurify";
import React, { Fragment, useEffect, useRef, useState } from "react";

interface iMenuRightProps extends React.HTMLProps<HTMLDivElement> {
  content: string;
}

const MenuRight: React.FC<iMenuRightProps> = (props) => {
  const { className, content } = props;
  const divMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let temp = document.createElement("div");
    console.log(content);
    temp.innerHTML = content;
    console.log(temp.querySelectorAll("h1"));
    temp.querySelectorAll("h1").forEach((item) => {
      let tempA = document.createElement("button");
      tempA.innerText = item.innerText;
      tempA.id = item.innerHTML;
      tempA.className = "text-xl ";
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
  }, [content]);

  return (
    <div className={"w-full" + " " + className}>
      <div className="visible flex flex-col items-center ">
        <h1>Mục lục</h1>
        <div
          className="flex flex-1 w-full flex-col items-start"
          ref={divMenuRef}
        >
          {divMenuRef.current?.childNodes.length === 0 &&
            "Bài viết này không có danh mục"}
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fuga
          harum eum quibusdam aspernatur nostrum adipisci totam ut perferendis
          eos veritatis nihil dignissimos, nulla magni inventore libero id quam
          asperiores?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fuga
          harum eum quibusdam aspernatur nostrum adipisci totam ut perferendis
          eos veritatis nihil dignissimos, nulla magni inventore libero id quam
          asperiores?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fuga
          harum eum quibusdam aspernatur nostrum adipisci totam ut perferendis
          eos veritatis nihil dignissimos, nulla magni inventore libero id quam
          asperiores?
        </p>
      </div>
    </div>
  );
};

export default MenuRight;
