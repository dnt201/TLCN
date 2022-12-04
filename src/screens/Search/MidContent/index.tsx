import React from "react";

interface iProps extends React.HTMLProps<HTMLDivElement> {}

const MidContent: React.FC<iProps> = (props) => {
  const { className } = props;
  return <div className={className}>MidContent</div>;
};

export default MidContent;
