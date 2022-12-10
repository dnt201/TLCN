import { iCategory } from "@DTO/Category";
import React from "react";
import { Link } from "react-router-dom";

const CategoryItem: React.FC<iCategory> = (props) => {
  const { id, categoryName, PostCount } = props;
  return (
    <Link
      to={`${props.id}`}
      className="w-[calc(33.3333333%-16px)] py-4 rounded-md mx-2 min-w-[200px] h-fit flex items-center px-4 mb-8 hover:bg-hover group transition-colors duration-300"
    >
      <div className=" bg-hover rounded-md p-2 mr-2 group-hover:bg-bg  transition-colors duration-300"></div>
      <div className="flex-1 flex flex-col">
        <h3 className="text-base">{categoryName}</h3>
        <h6 className="text-xs">{PostCount} posted</h6>
      </div>
    </Link>
  );
};

export default CategoryItem;
