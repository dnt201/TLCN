import React from "react";

interface iProps extends React.HTMLProps<HTMLDivElement> {}

const MidContent: React.FC<iProps> = (props) => {
  const {} = props;
  return <div>MidContent</div>;
};

export default MidContent;
