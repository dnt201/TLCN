import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bars3,
  Bell,
  BellAlert,
  Book,
  BookFill,
  Home,
  HomeFill,
  List,
  ListFill,
  MagnifyingGlass,
  Message,
  Tag,
  TagFill,
  Category,
  CategoryFill,
} from "@icons/index";
import ava1 from "@assets/images/userDefault.png";
import PopUpMessenger from "./popupMessenger";
import PopUpNotify from "./popupNotify";
import PopUpUser from "./popupUser";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "@app/store";
import SearchBox from "./searchBox";
import { time } from "console";
import toast from "react-hot-toast";
interface tabItem {
  title: string;
  icon: React.ElementType;
  iconFill: React.ElementType;
  linkTo: string;
}
const listTabItem: tabItem[] = [
  {
    title: "Home",
    icon: Home,
    iconFill: HomeFill,
    linkTo: "/newest",
  },

  {
    title: "Tags",
    icon: Tag,
    iconFill: TagFill,
    linkTo: "/tags",
  },
  {
    title: "Categories",
    icon: Category,
    iconFill: CategoryFill,
    linkTo: "/categories",
  },
  {
    title: "Saved",
    icon: List,
    iconFill: ListFill,
    linkTo: "/list-save",
  },
  {
    title: "Course",
    icon: Book,
    iconFill: BookFill,
    linkTo: "/your-courses",
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [visible, setVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [showRightNav, setShowRightNav] = useState(0);
  const [isSearchFocus, setSearchFocus] = useState(false);
  const popUpSearchBox = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { accessToken, userInfo } = useSelector(
    (state: RootState) => state.users
  );
  useEffect(() => {
    const handleClickOutUser = (event: any) => {
      const buttonShowUser = document.getElementById("showUser");
      if (
        popUpSearchBox.current &&
        !popUpSearchBox.current.contains(event.target) &&
        buttonShowUser &&
        !buttonShowUser.contains(event.target)
      ) {
        setSearchFocus(false);
      } else {
      }
    };
    document.addEventListener("click", handleClickOutUser, true);
    return () => {
      document.removeEventListener("click", handleClickOutUser);
    };
  }, [popUpSearchBox]);

  return (
    <nav
      className={
        "bg-bg2 fixed top-0 w-full shadow-sm phone:py-2  dark:bg-black dark:border-white z-[9999]   " +
        (visible ? "  " : " ")
      }
    >
      <div className=" flex relative flex-wrap justify-between items-center">
        <div
          className={
            "flex items-center px-4 w-[320px] transition-transform " +
            (isSearchFocus && " pl-2")
          }
        >
          {!isSearchFocus ? (
            <Link to="/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className=" mr-1 h-9  keyframes-appear duration-[5000]"
                alt=" Teaching Me Logo"
              />
            </Link>
          ) : (
            <button
              className="flex items-center  hover:bg-smokeDark p-2  rounded-full "
              onClick={() => setSearchFocus(false)}
            >
              <ArrowLeft />
            </button>
          )}

          <div
            className="flex w-full bg-white items-center justify-center focus:bg-primary   pl-2 ml-1 rounded-full "
            ref={popUpSearchBox}
          >
            {!isSearchFocus ? (
              <MagnifyingGlass className=" top-0 left-0 stroke-secondary  h-5 w-5 duration-1000 " />
            ) : null}

            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Tìm kiếm với Teaching Me..."
              className={
                "px-2 py-1 w-full rounded-full text-sm text-bg  focus:border-0 focus:outline-none "
                // +(isSearchFocus ? " -translate-x-[20px] duration-700" : " ")
              }
              onFocus={() => setSearchFocus(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log("navigate with", searchValue);
                  if (searchValue.length === 0 || searchValue === "") {
                    toast.error("Empty name search!!!");
                  } else {
                    navigate(`/search?q=${searchValue}&type=post`);
                    // setSearchValue("");
                    e.currentTarget.blur();
                    setSearchFocus(false);
                  }
                }
              }}
            />
            {isSearchFocus ? (
              <SearchBox
                inputSearch={searchValue}
                setInputSearch={setSearchValue}
                setSearchFocus={setSearchFocus}
                className="
                absolute 
             shadow-[0px_3px_3px_1px_rgba(255,255,255,0.2)] pl-2 pb-4
            overflow-y-auto   top-full  w-[320px] left-0
             bg-bg2 rounded-b-lg max-h-[calc(100vh-48px-20px)] 
            "
              ></SearchBox>
            ) : null}
          </div>
        </div>

        {/* End Logo */}
        {/*Start Button bar responsive*/}
        <div className="flex ">
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="sr-only">Open menu</span>
            <Bars3 />
          </button>
        </div>
        {/*End Button bar responsive */}
        {/* Center menu */}
        <div
          className={
            "justify-between flex-1 items-center w-full sm:flex sm:w-auto sm:order-1" +
            "phone:border-t-[1px] phone:overflow-y-scroll phone:max-h-screen phone:overflow-x-hidden phone:absolute phone:top-[57px] phone:bg-white phone:h-screen" +
            (showMenu ? " visible" : " hidden")
          }
          id="navbar-search"
        >
          <ul className="flex flex-1 justify-center  flex-col  sm:flex-row sm:text-sm sm:font-medium  ">
            {listTabItem.map((item) => (
              <React.Fragment key={item.title}>
                <li className="flex">
                  <Link
                    to={item.linkTo}
                    className={
                      "relative px-12 py-4 tablet:px-8   phone:py-4 phone:px-4 text-black group transition-all " +
                      " hover:bg-hover " +
                      " phone:w-screen" +
                      " after:content-[''] after:border-b-2 after:absolute after:w-full after:bottom-0 after:left-0 after:border-primary " +
                      (item.linkTo === window.location.pathname ||
                      (item.linkTo === "/newest" &&
                        (window.location.pathname === "/newest" ||
                          window.location.pathname === "/" ||
                          window.location.pathname === "/popular" ||
                          window.location.pathname === "/following"))
                        ? " after:visible "
                        : " after:hidden ")
                    }
                    aria-current="page"
                  >
                    <span
                      className={
                        "px-3 py-1 text-[10px] rounded-md group-hover:text-white w-max    absolute   bg-primary  scale-0  -bottom-full -translate-y-1/2 left-[50%] translate-x-[-50%]  " +
                        (item.linkTo !== window.location.pathname &&
                          " group-hover:scale-100")
                      }
                    >
                      {item.title}
                    </span>
                    <i className=" w-full">
                      {item.linkTo === window.location.pathname ||
                      (item.linkTo === "/newest" &&
                        (window.location.pathname === "/newest" ||
                          window.location.pathname === "/" ||
                          window.location.pathname === "/popular" ||
                          window.location.pathname === "/following")) ? (
                        <item.iconFill className="w-5 h-5 fill-primary" />
                      ) : (
                        <item.icon className="w-5 h-5 stroke-white   " />
                      )}
                    </i>
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
        {/* End Center menu */}
        {/* Start right */}
        <div className="mr-4 flex  items-center">
          {accessToken === "" ? (
            <div>
              <Link
                className="text-sm font-semibold px-4 py-2 rounded-full h-full hover:bg-hover duration-500 "
                to={"/register"}
              >
                Đăng ký
              </Link>
              <Link
                className="text-sm font-semibold px-4 py-2 rounded-full h-full bg-primary "
                to={"/login"}
              >
                Đăng nhập
              </Link>
            </div>
          ) : (
            <>
              <i
                id="showMessage"
                className="relative p-4 rounded-lg hover:bg-hover hover:cursor-pointer "
                onClick={() => {
                  if (showRightNav === 1) setShowRightNav(0);
                  else setShowRightNav(1);
                }}
              >
                <Message />
              </i>

              <i
                id="showNotify"
                className="p-4  rounded-lg hover:bg-hover hover:cursor-pointer  "
                onClick={() => {
                  if (showRightNav === 2) setShowRightNav(0);
                  else setShowRightNav(2);
                }}
              >
                {1 ? <BellAlert /> : <Bell />}
              </i>

              <i
                id="showUser"
                className="px-4 py-2  rounded-lg hover:bg-hover hover:cursor-pointer"
                onClick={() => {
                  if (showRightNav === 3) setShowRightNav(0);
                  else setShowRightNav(3);
                }}
              >
                <img
                  className="h-9 w-9 rounded-full "
                  src={userInfo?.avatarLink || ava1}
                  alt="z"
                />
              </i>
            </>
          )}
        </div>
        {/* End right */}
        {/* Start popups */}
        {showRightNav === 1 ? (
          <PopUpMessenger
            setShow={(show) => {
              setShowRightNav(show);
            }}
          />
        ) : showRightNav === 2 ? (
          <PopUpNotify
            setShow={(show) => {
              setShowRightNav(show);
            }}
          />
        ) : showRightNav === 3 ? (
          <PopUpUser
            setShow={(show) => {
              setShowRightNav(show);
            }}
          />
        ) : null}
        {/* End popups */}
      </div>
    </nav>
  );
};

export default Navbar;
