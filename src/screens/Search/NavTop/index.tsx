import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@icons/index";
import Select from "react-select";
import { Link, useSearchParams } from "react-router-dom";
const options = [
  { value: "1", label: "Phù hợp nhất" },
  { value: "2", label: "Mới nhất" },
  { value: "3", label: "Cũ nhất" },
  { value: "4", label: "Lượt follow giảm dần" },
  { value: "5", label: "Lượt vote giảm dần" },
  { value: "6", label: "Lượt bình luật giảm dần" },
];
interface iProps extends React.HTMLProps<HTMLDivElement> {}
const NavTop: React.FC<iProps> = (props) => {
  const { className } = props;
  const [selected, setSelected] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("re render");
    console.log("---------------------------------");
    let typeFromSearch = searchParams.get("type");
    if (typeFromSearch === "posts") setSelected(1);
    else if (typeFromSearch === "users") setSelected(2);
    else setSelected(1);

    let nameFromSearch = searchParams.get("q");
    if (nameFromSearch !== null) setSearchValue(nameFromSearch);
    else setSearchValue("");
  }, [searchParams]);

  return (
    <div className={className}>
      <div className="flex-1 flex-col">
        <div className="flex items-center rounded-md">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className=" flex-1 rounded-md px-4 py-2 bg-transparent border-[1px] border-hover focus:outline-none focus:border-primary"
          />
          <Link
            className="ml-2 rounded-md flex items-center bg-primary  px-4 py-2"
            to={`/search?q=${searchValue}&type=${
              selected === 1 ? "posts" : selected === 2 ? "users" : "posts"
            }`}
          >
            <MagnifyingGlass />
            <span className="ml-2 text-lg">Tìm kiếm</span>
          </Link>
        </div>
        <div className="flex  items-center border-b-[1px] border-hover mt-4">
          <div className="">
            <Link
              to={`/search?q=${searchValue}&type=posts`}
              className={
                "px-4 py-2 " +
                (selected === 1
                  ? " border-b-[2px] border-primary text-primary"
                  : " ")
              }
            >
              <span className="text-lg font-medium">Bài viết</span>
            </Link>
            <Link
              to={`/search?q=${searchValue}&type=users`}
              className={
                "px-4 py-2 " +
                (selected === 2
                  ? " border-b-[2px] border-primary text-primary"
                  : " ")
              }
            >
              <span className="text-lg font-medium">Tác giả</span>
            </Link>
          </div>
          <div className="flex items-center mb-1 flex-1 justify-end ">
            <span className="mr-1">Sắp xếp theo: </span>
            <Select
              options={options}
              className="text-primary focus:border-primary w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTop;
