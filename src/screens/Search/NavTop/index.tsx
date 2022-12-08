import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@icons/index";
import Select from "react-select";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { string } from "yup";
const options = [
  { value: "1", label: "Phù hợp nhất" },
  { value: "2", label: "Mới nhất" },
  { value: "3", label: "Cũ nhất" },
  { value: "4", label: "Lượt follow giảm dần" },
  { value: "5", label: "Lượt vote giảm dần" },
  { value: "6", label: "Lượt bình luận giảm dần" },
];
interface iProps extends React.HTMLProps<HTMLDivElement> {
  setLazyFalse: (b: boolean) => void;
}
const NavTop: React.FC<iProps> = (props) => {
  const { className, setLazyFalse } = props;
  const [selected, setSelected] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<{ value: string; label: string }>({
    value: "1",
    label: "Phù hợp nhất",
  });

  let navigate = useNavigate();

  useEffect(() => {
    console.log(filter, "---------------------");
    console.log("re render");
    // console.log("---------------------------------");
    let typeFromSearch = searchParams.get("type");
    if (typeFromSearch === "posts") setSelected(1);
    else if (typeFromSearch === "users") setSelected(2);
    else setLazyFalse(true);

    let nameFromSearch = searchParams.get("q");
    if (nameFromSearch !== null) setSearchValue(nameFromSearch);
    else {
      toast.error("Search value invalid");
      setSearchValue("");
    }
    let filterFromSearch = searchParams.get("filter");
    if (filterFromSearch !== null) {
      let filterTemp = options.find((e) => e.value === filterFromSearch);
      if (filterTemp) setFilter(filterTemp);
    }
  }, [searchParams]);

  return (
    <div className={className + " z-10"}>
      <div className="flex-1 flex-col">
        <div className="flex items-center rounded-md">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (searchParams.get("q") === searchValue.trim()) {
                  navigate(0);
                } else if (selected === 1)
                  navigate(
                    `/search?q=${searchValue.trim()}&type=${
                      selected === 1
                        ? "posts"
                        : selected === 2
                        ? "users"
                        : "posts"
                    }${filter ? "&filter=" + filter.value : ""}`
                  );
                else
                  navigate(
                    `/search?q=${searchValue.trim()}&type=${
                      selected === 1
                        ? "posts"
                        : selected === 2
                        ? "users"
                        : "posts"
                    }`
                  );
              }
            }}
            className=" flex-1 rounded-md px-4 py-2 bg-transparent border-[1px] border-hover focus:outline-none focus:border-primary"
          />
          <Link
            className="ml-2 rounded-md flex items-center bg-primary  px-4 py-2"
            to={`/search?q=${searchValue.trim()}&type=${
              selected === 1 ? "posts" : selected === 2 ? "users" : "posts"
            }${filter ? "&filter=" + filter.value : ""}`}
            onClick={() => {
              if (searchParams.get("q") === searchValue) {
                navigate(0);
              } else setSearchValue(searchValue.trim());
            }}
          >
            <MagnifyingGlass />
            <span className="ml-2 text-lg">Tìm kiếm</span>
          </Link>
        </div>
        <div className="flex  items-center border-b-[1px] border-hover mt-4 h-fit">
          <div className="h-fit py-2">
            <Link
              to={`/search?q=${searchValue}&type=posts${
                filter ? "&filter=" + filter.value : ""
              }`}
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
          {selected !== 2 ? (
            <div
              className={
                "flex items-center flex-1 justify-end  " +
                (selected === 2 ? " hidden" : null)
              }
            >
              <span className="mr-1">Sắp xếp theo: </span>
              <Select
                options={options}
                value={filter}
                onChange={(e) => {
                  if (e) {
                    // setFilter({ label: e.label, value: e.value });
                    navigate(
                      `/search?q=${searchValue.trim()}&type=${
                        selected === 1
                          ? "posts"
                          : selected === 2
                          ? "users"
                          : "posts"
                      }${e.value ? "&filter=" + e.value : ""}`
                    );
                  }
                }}
                className={"text-primary focus:border-primary w-fit "}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavTop;
