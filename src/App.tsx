import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "@components/navbar";
import { Outlet } from "react-router-dom";
import { ArrowUpTray } from "./icons";

function App() {
  const [isShow, setShow] = useState(false);
  const handleShowScrollToTop = () => {
    if (window.pageYOffset > 180) setShow(true);
    else setShow(false);
  };
  useEffect(() => {
    document.addEventListener("scroll", handleShowScrollToTop);
  }, []);
  return (
    <>
      <div className="h-full flex flex-col">
        <Navbar />
        <div className="min-h-[calc(100vh-52px)] mt-[52px]  phone:pt-[56px]  bg-smoke">
          <Outlet />
        </div>
      </div>
      {isShow ? (
        <div
          className="fixed z-[10010] bg-primary p-2 rounded-md  bottom-8 right-8 hover:cursor-pointer"
          onClick={async () => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
          }}
        >
          <ArrowUpTray />
        </div>
      ) : null}
    </>
  );
}

export default App;
