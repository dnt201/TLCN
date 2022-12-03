import { Javascript, Tutorial } from "@icons/index";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultIMG from "@images/default.jpg";
export interface iTagProp extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
  icon?: React.ElementType;
  img?: string;
  title: string;
  subTitle: string | number;
  bgColor?: string;
}

const Filter: React.FC<iTagProp> = (props) => {
  const curPath = window.location.pathname;
  const navigate = useNavigate();
  if (props.href === curPath)
    return (
      <button
        className={
          props.className +
          " flex flex-row h-[52px] rounded-md items-center px-2  py-2 mb-2 hover:bg-hover w-full text-left " +
          ((curPath === props.href ||
            (curPath === "/" && props.href === "/newest")) &&
            " bg-hover ")
        }
        onClick={() => {
          // navigate(`/props.href`);
          if (props.href === curPath) {
            navigate(0);
          }
        }}
      >
        <div className="flex-1 h-full flex justify-center items-center ">
          <b className={"rounded-md  bg-dark4 p-2"}>
            {props.icon ? (
              <props.icon />
            ) : props.img !== undefined ? (
              <img
                src={props.img === null ? defaultIMG : props.img}
                className={"w-5 h-5 block mx-auto "}
              />
            ) : null}
          </b>
        </div>
        <div className="flex-[5] flex flex-col ml-2">
          <p className="text-xs text-white  pb-1">{props.title}</p>
          {typeof props.subTitle == "number" ? (
            <p className="text-ss text-dark3">
              {String(props.subTitle).prettyNumber()} posted this tag
            </p>
          ) : (
            <p className="text-ss text-dark3">{props.subTitle}</p>
          )}
        </div>
      </button>
    );
  return (
    <Link
      to={props.href}
      className={
        props.className +
        " flex flex-row h-[52px] rounded-md items-center px-2  py-2 mb-2 hover:bg-hover w-full text-left " +
        ((curPath === props.href ||
          (curPath === "/" && props.href === "/newest")) &&
          " bg-hover ")
      }
      onClick={() => {
        // navigate(`/props.href`);
        if (props.href === curPath) {
          navigate(0);
        }
      }}
    >
      <div className="flex-1 h-full flex justify-center items-center ">
        <b className={"rounded-md  bg-dark4 p-2"}>
          {props.icon ? (
            <props.icon />
          ) : props.img !== undefined ? (
            <img
              src={props.img === null ? defaultIMG : props.img}
              className={"w-5 h-5 block mx-auto "}
            />
          ) : null}
        </b>
      </div>
      <div className="flex-[5] flex flex-col ml-2">
        <p className="text-xs text-white  pb-1">{props.title}</p>
        {typeof props.subTitle == "number" ? (
          <p className="text-ss text-dark3">
            {String(props.subTitle).prettyNumber()} posted this tag
          </p>
        ) : (
          <p className="text-ss text-dark3">{props.subTitle}</p>
        )}
      </div>
    </Link>
  );
};

export default Filter;
