import React from "react";
import NetworkLost from "@images/network-lost.gif";
import { Link } from "react-router-dom";

const NetWorkError = () => {
  return (
    <section className="flex bg-[#fff] w-full min-h-[calc(100vh-52px)] flex-col justify-center text-bg">
      <div className="row">
        <div className="flex items-center justify-center flex-col">
          <img className="w-[360px]" src={NetworkLost} />
          <h3 className="">Network error! Try again</h3>
          <Link
            to="/"
            className="py-3 bg-[#39ac31]  px-5  my-4  inline-block rounded-md"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NetWorkError;
