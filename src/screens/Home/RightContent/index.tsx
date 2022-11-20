import React from "react";

interface iProps extends React.HTMLProps<HTMLDivElement> {
  a?: string;
}

const RightContent: React.FC<iProps> = (props) => {
  return (
    <div className={props.className + " hidden lg:block"}>
      <div>Right Content</div>
    </div>
  );
};

export default RightContent;
