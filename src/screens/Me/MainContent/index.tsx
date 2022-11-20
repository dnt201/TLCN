import React, { ReactComponentElement, useState } from "react";
import { Post, List, Voted, Seen } from "@icons/index";
interface iNav {
  id: number;
  title: string;
  icon: React.ElementType;
}
const listNav: iNav[] = [
  {
    id: 1,
    title: "Bài viết",
    icon: Post,
  },
  {
    id: 2,
    title: "Đã lưu",
    icon: List,
  },
  {
    id: 3,
    title: "Đã vote",
    icon: Voted,
  },
  {
    id: 4,
    title: "Đã xem",
    icon: Seen,
  },
];

const MainContent = () => {
  const [selectId, setSelectId] = useState(1);
  console.log(selectId);
  return (
    <div className="lg:mx-[10%]">
      <div className="flex  justify-center items-center">
        {listNav.map((item) => (
          <button
            className={
              "flex items-center px-2 py-4 mx-2 font-base  z-30" +
              (item.id === selectId
                ? " text-primary border-t-[2px] mb-1px border-primary"
                : "  text-white ")
            }
            onClick={() => setSelectId(item.id)}
            key={item.id}
          >
            <span className="mr-1"> {<item.icon />}</span> {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
