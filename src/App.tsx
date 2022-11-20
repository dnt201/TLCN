import React from "react";
import "./App.css";
import Navbar from "@components/navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className="min-h-[calc(100vh-52px)] mt-[52px]  phone:pt-[56px]  bg-smoke">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
