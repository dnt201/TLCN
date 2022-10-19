import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3,
  Book,
  BookFill,
  Home,
  HomeFill,
  List,
  ListFill,
  MagnifyingGlass,
} from "@icons/index";

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
  // const [isScrollUp, setIsScrollUp] = useState(false);
  const [selected, setSelected] = useState(listTabItem[0].title);

  return (
    <nav className="bg-white fixed top-0 w-full shadow-sm phone:py-2  dark:bg-black dark:border-white  ">
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
          <button className="flex bg-smoke h-8 w-8 rounded-full items-center justify-center ">
            <MagnifyingGlass />
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
              <>
                <li className="flex">
                  <Link
                    to={item.linkTo}
                    onClick={() => setSelected(item.title)}
                    className={
                      "relative px-10 py-3 tablet:px-8   phone:py-4 phone:px-4 text-black group transition-all " +
                      " hover:bg-smoke " +
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
                        "px-3 py-1 text-[10px] rounded-md group-hover:text-white  bg-primary  scale-0 absolute bottom-[-60%] left-[50%] translate-x-[-50%]  " +
                        (selected !== item.title && " group-hover:scale-100")
                      }
                    >
                      {item.title}
                    </span>
                    <i className=" w-full">
                      {selected === item.title ? (
                        <item.iconFill className="w-7 h-7 fill-primary" />
                      ) : (
                        <item.icon className="w-7 h-7 stroke-smokeDark " />
                      )}
                    </i>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </div>
        {/* End Center menu */}
        <div>
          <Link to={"/login"}>Login</Link>
        </div>
        {/* Right */}
      </div>
    </nav>
  );
};

export default Navbar;
