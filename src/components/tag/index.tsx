import React from "react";
import { Link } from "react-router-dom";
export interface iTagProp extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
  icon: React.ElementType;
  title: string;
  subTitle: string | number;
  bgColor?: string;
  onChangeFilter?: (filter: string) => void;
  filter?: string;
}

const Tag: React.FC<iTagProp> = (props) => {
  const { filter, onChangeFilter } = props;
  return (
    <Link
      to={props.href}
      className={
        props.className +
        " flex flex-row h-[52px] rounded-md items-center px-2  py-2 hover:bg-hover " +
        (filter === props.href && " bg-hover ")
      }
      onClick={() =>
        onChangeFilter &&
        filter &&
        filter !== props.href &&
        onChangeFilter(props.href)
      }
    >
      <div className="flex-1 h-full flex justify-center items-center ">
        <b className={"rounded-md p-2  bg-dark4"}>
          <props.icon />
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

export default Tag;
