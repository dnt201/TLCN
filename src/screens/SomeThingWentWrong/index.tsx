import React from "react";
import { Link } from "react-router-dom";

const SomeThingWentWrong = () => {
  return (
    <section className="flex bg-[#fff] w-full min-h-[calc(100vh-52px)] flex-col justify-center text-bg">
      <div className="row">
        <div className="col-sm-12 ">
          <div className="text-center">
            <div
              className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] 
            h-[360px]
            max-w-[720px]
            mx-[auto]
            bg-center
            bg-no-repeat
            "
            >
              <h1 className="text-[48px]">404</h1>
            </div>
            <div className="">
              <h3 className="">Look like you're lost</h3>
              <p>the page you are looking for not avaible!</p>
              <Link
                to="/"
                className="py-3 bg-[#39ac31]  px-5  my-4  inline-block rounded-md"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SomeThingWentWrong;
