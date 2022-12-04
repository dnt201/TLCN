import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MidContent from "./MidContent";
import NavTop from "./NavTop";
interface iProps {}
const Search: React.FC<iProps> = (props) => {
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("q"));
  console.log(searchParams.get("type"));

  useEffect(() => {
    console.log(searchParams.get("q"));
  }, []);
  const {} = props;
  return (
    <div className="flex flex-col min-h-[calc(100vh-52px)] bg-bg">
      <NavTop className="p-4 mt-12 w-[75%] mx-auto  " />
      <MidContent
        className="p-4 w-[75%] mx-auto overflow-hidden "
        color="#FF4401"
      />
    </div>
  );
};

export default Search;
