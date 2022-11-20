import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
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
} from "@icons/index";
import ava1 from "@assets/images/av1.png";
import PopUpMessenger from "./popupMessenger";
import PopUpNotify from "./popupNotify";
import PopUpUser from "./popupUser";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "@app/store";
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
    linkTo: "",
  },
  {
    title: "Saved",
    icon: List,
    iconFill: ListFill,
    linkTo: "list-save",
  },
  {
    title: "Course",
    icon: Book,
    iconFill: BookFill,
    linkTo: "your-courses",
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState(listTabItem[0].title);
  const [showRightNav, setShowRightNav] = useState(0);

  const { accessToken, userInfo } = useSelector(
    (state: RootState) => state.users
  );
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // function handleScroll() {
  //   const currentYOffset = window.pageYOffset;
  //   const visible = yOffset > currentYOffset;
  //   console.log(currentYOffset);
  //   console.log(visible);

  //   setYOffset(currentYOffset);
  //   setVisible(visible);
  // }

  return (
    <nav
      className={
        "bg-bg2 fixed top-0 w-full shadow-sm phone:py-2  dark:bg-black dark:border-white z-[9999]   " +
        (visible ? " zblock " : " zhidden")
      }
    >
      <div className=" flex flex-wrap justify-between items-center">
        {/* Logo */}
        <div className="flex items-center pl-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className=" mr-1 h-9"
              alt=" Teaching Me Logo"
            />
          </Link>
          <button className="flex bg-transparent h-8 w-8 rounded-full items-center justify-center ">
            <MagnifyingGlass className="stroke-secondary h-6 w-6" />
          </button>
        </div>
        {/* End Logo */}

        {/*Button bar responsive*/}
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
                    onClick={(e) => {
                      setSelected(item.title);
                      console.log(e);
                    }}
                    className={
                      "relative px-12 py-4 tablet:px-8   phone:py-4 phone:px-4 text-black group transition-all " +
                      " hover:bg-hover " +
                      " phone:w-screen" +
                      " after:content-[''] after:border-b-2 after:absolute after:w-full after:bottom-0 after:left-0 after:border-primary " +
                      (selected === item.title
                        ? " after:visible "
                        : " after:hidden ")
                    }
                    aria-current="page"
                  >
                    <span
                      className={
                        "px-3 py-1 text-[10px] rounded-md group-hover:text-white w-max    absolute   bg-primary  scale-0  -bottom-full left-[50%] translate-x-[-50%]  " +
                        (selected !== item.title && " group-hover:scale-100")
                      }
                    >
                      {item.title}
                    </span>
                    <i className=" w-full">
                      {selected === item.title ? (
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
        <div className="mr-4 flex relative items-center">
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
                <img className="h-9 w-9 rounded-full " src={ava1} alt="z" />
              </i>
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
            </>
          )}
        </div>
        {/* Right */}
      </div>
    </nav>
  );
};

export default Navbar;
