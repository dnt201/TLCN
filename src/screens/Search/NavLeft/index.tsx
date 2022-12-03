import React from "react";
interface iProps extends React.HTMLProps<HTMLDivElement> {}
const NavLeft: React.FC<iProps> = (props) => {
  const { className } = props;
  return (
    <div className={className}>
      <div className="flex-1 visible">NavLeft</div>
    </div>
  );
};

export default NavLeft;
