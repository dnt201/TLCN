import React from "react";

interface iProps extends React.HTMLProps<HTMLDivElement> {
  a?: string;
}

const CenterContent: React.FC<iProps> = (props) => {
  return (
    <div className={props.className}>
      <div className="px-4 py-2">Center Content</div>
    </div>
  );
};

export default CenterContent;
