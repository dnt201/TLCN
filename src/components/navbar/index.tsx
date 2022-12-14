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
  BellFill,
  Write,
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
import ReactTooltip from "react-tooltip";
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
  // const accessToken = localStorage.getItem("accessToken");
  // useEffect(() => {
  //   console.log("r const accessToken = localStorage.getItem");
  // }, [accessToken]);
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
        "bg-bg2 fixed top-0 w-full z-[11111] shadow-sm phone:py-2  dark:bg-black dark:border-white  " +
        (visible ? "  " : " ")
      }
    >
      <div className=" flex relative z-[11111] flex-wrap justify-between items-center">
        <div
          className={
            "flex items-center px-4 w-[320px] transition-transform " +
            (isSearchFocus && " pl-2")
          }
        >
          {!isSearchFocus ? (
            <Link
              to="/"
              className="flex items-center"
              onClick={() => {
                if (window.location.pathname === "/") navigate(0);
              }}
            >
              <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.868 0H2.13201C1.69917 0 1.28405 0.171956 0.97799 0.478017C0.671929 0.784078 0.5 1.1992 0.5 1.63203V15.3147C0.5 15.7476 0.671929 16.1627 0.97799 16.4688C1.28405 16.7748 1.69917 16.9467 2.13201 16.9467H8.02889V30.368C8.02889 30.8008 8.20082 31.2159 8.50688 31.522C8.81294 31.828 9.22806 32 9.6609 32H23.3436C23.5577 32 23.7697 31.9578 23.9675 31.8757C24.1652 31.7936 24.3449 31.6733 24.496 31.5217C24.6472 31.3701 24.767 31.1902 24.8485 30.9922C24.93 30.7942 24.9717 30.5821 24.9711 30.368V16.9467H30.868C31.3008 16.9467 31.716 16.7748 32.022 16.4688C32.3281 16.1627 32.5 15.7476 32.5 15.3147V1.63203C32.5 1.1992 32.3281 0.784078 32.022 0.478017C31.716 0.171956 31.3008 0 30.868 0ZM2.3935 1.8935H15.5533V15.0533H2.3935V1.8935ZM23.0821 30.1065H9.91787V16.9467H23.0821V30.1065ZM30.6155 15.0533H17.4467V1.8935H30.6155V15.0533Z"
                  fill="white"
                />
                <path
                  d="M11.4397 10.0264C11.5286 10.1076 11.6339 10.172 11.7498 10.2157C11.8657 10.2594 11.9898 10.2816 12.115 10.281C12.2396 10.2817 12.363 10.2595 12.4782 10.2158C12.5933 10.1721 12.6979 10.1077 12.7858 10.0264C12.8762 9.94475 12.948 9.84733 12.9971 9.73982C13.0462 9.63231 13.0714 9.51685 13.0714 9.40023C13.0714 9.28361 13.0462 9.16818 12.9971 9.06067C12.948 8.95316 12.8762 8.85572 12.7858 8.7741L9.7492 5.9774C9.66059 5.8941 9.55482 5.8279 9.43809 5.78273C9.32135 5.73755 9.196 5.71429 9.06938 5.71429C8.94276 5.71429 8.81743 5.73755 8.7007 5.78273C8.58396 5.8279 8.47817 5.8941 8.38955 5.9774L5.35303 8.7741C5.17273 8.94016 5.07143 9.16539 5.07143 9.40023C5.07143 9.63508 5.17273 9.8603 5.35303 10.0264C5.53333 10.1924 5.77787 10.2857 6.03285 10.2857C6.28784 10.2857 6.53238 10.1924 6.71268 10.0264L9.07845 7.84744L11.4397 10.0264Z"
                  fill="white"
                />
                <path
                  d="M21.5517 10.0228L23.9175 7.84569L26.2833 10.0228C26.3719 10.1061 26.4776 10.1722 26.5944 10.2173C26.7111 10.2625 26.8365 10.2857 26.9631 10.2857C27.0897 10.2857 27.2151 10.2625 27.3318 10.2173C27.4485 10.1722 27.5543 10.1061 27.6429 10.0228C27.7333 9.94128 27.8052 9.84395 27.8543 9.73652C27.9033 9.6291 27.9286 9.51374 27.9286 9.39721C27.9286 9.28069 27.9033 9.16536 27.8543 9.05793C27.8052 8.9505 27.7333 8.85315 27.6429 8.7716L24.6064 5.97718C24.5177 5.89395 24.412 5.82781 24.2952 5.78267C24.1785 5.73753 24.0531 5.71429 23.9265 5.71429C23.7999 5.71429 23.6746 5.73753 23.5578 5.78267C23.4411 5.82781 23.3353 5.89395 23.2467 5.97718L20.2102 8.7716C20.0299 8.93752 19.9286 9.16256 19.9286 9.39721C19.9286 9.63187 20.0299 9.85691 20.2102 10.0228C20.3905 10.1888 20.635 10.282 20.89 10.282C21.145 10.282 21.3895 10.1888 21.5698 10.0228H21.5517Z"
                  fill="white"
                />
                <path
                  d="M13.8041 21.9736C13.5981 21.8076 13.3186 21.7143 13.0272 21.7143C12.7359 21.7143 12.4564 21.8076 12.2504 21.9736C12.0443 22.1395 11.9286 22.3647 11.9286 22.5994C11.9286 22.8342 12.0443 23.0593 12.2504 23.2253L15.7257 26.0209C15.8266 26.1047 15.9474 26.1713 16.0808 26.2168C16.2143 26.2623 16.3577 26.2857 16.5026 26.2857C16.6475 26.2857 16.7909 26.2623 16.9244 26.2168C17.0578 26.1713 17.1786 26.1047 17.2795 26.0209L20.7496 23.2253C20.9557 23.0593 21.0714 22.8342 21.0714 22.5994C21.0714 22.3647 20.9557 22.1395 20.7496 21.9736C20.5436 21.8076 20.2641 21.7143 19.9727 21.7143C19.6813 21.7143 19.4019 21.8076 19.1958 21.9736L16.5078 24.1349L13.8041 21.9736Z"
                  fill="white"
                />
              </svg>
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
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Tìm kiếm với Teaching Me..."
              className={
                "px-2 py-1 w-full rounded-full text-sm text-bg  focus:border-0 focus:outline-none "
                // +(isSearchFocus ? " -translate-x-[20px] duration-700" : " ")
              }
              onFocus={() => setSearchFocus(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (searchValue.trim().length <= 0) {
                  } else {
                    console.log("navigate with", searchValue);
                    if (
                      searchValue.length === 0 ||
                      (searchValue === "" && searchValue.trim().length === 0)
                    ) {
                      toast.error("Search không được trống!!!");
                    } else {
                      navigate(`/search?q=${searchValue.trim()}&type=posts`);
                      // setSearchValue("");
                      e.currentTarget.blur();
                      setSearchFocus(false);
                    }
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
                    onClick={() => {
                      if (window.location.pathname === item.linkTo) navigate(0);
                    }}
                    className={
                      "relative px-12 py-4 tablet:px-8   phone:py-4 phone:px-4 text-black group transition-all " +
                      " hover:bg-hover " +
                      " phone:w-screen" +
                      " after:content-[''] after:border-b-2 after:absolute after:translate-y-[2px] after:w-full after:bottom-0 after:left-0 after:border-primary " +
                      (window.location.pathname.includes(item.linkTo) ||
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
                      {window.location.pathname.includes(item.linkTo) ||
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
                data-tip="Click để viết bài!"
                data-for="write"
                className="p-4  rounded-lg hover:bg-hover hover:cursor-pointer  "
                onClick={() => navigate("/new-post")}
              >
                <Write />
              </i>
              <ReactTooltip
                textColor="#FF4401"
                id="write"
                place="bottom"
                effect="solid"
              />
              <i
                id="showNotifyA"
                className="p-4  rounded-lg hover:bg-hover hover:cursor-pointer  "
                onClick={() => {
                  if (showRightNav === 2) setShowRightNav(0);
                  else setShowRightNav(2);
                }}
              >
                {showRightNav === 2 ? (
                  <BellFill />
                ) : 1 ? (
                  <BellAlert />
                ) : (
                  <Bell />
                )}
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
