import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MidContent from "./MidContent";
import NavLeft from "./NavLeft";
interface iProps {}
const Search: React.FC<iProps> = (props) => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("q"));

  useEffect(() => {
    console.log(searchParams.get("q"));
  }, []);
  const {} = props;
  return (
    <div className="flex px-4 min-h-screen bg-bg">
      <div className="w-1/5  rounded-lg ">
        <NavLeft className="fixed  invisible overflow-y-auto hover:visible  mx-auto  mt-2  pt-4 w-[calc(20%-20px)] h-[calc(100vh-48px-16px)]  pb-6 group" />
      </div>
      <MidContent className="flex-1  mt-6   mx-2  rounded-lg overflow-y-hidden overflow-hidden    " />

      {/* <LeftContent
          className={
            " fixed  invisible overflow-y-auto hover:visible  mx-auto  mt-2  pt-4 w-[calc(20%-20px)] h-[calc(100vh-48px-16px)]  pb-6 group"
          }
          onChangeFilter={(filter: string) => setFilter(filter)}
          filter={filter}
        />
      </div>
      <CenterContent className="flex-1  mt-6   mx-2  rounded-lg overflow-y-hidden overflow-hidden   " /> */}
      {/* <RightContent className="w-1/4 pt-6 rounded-lg hover:overflow-y-scroll" /> */}
    </div>
  );
};

export default Search;
