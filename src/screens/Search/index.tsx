import BlogNotFound from "@screens/BlogDetail/NotFound";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MidContent from "./MidContent";
import NavTop from "./NavTop";
interface iProps {}
const Search: React.FC<iProps> = (props) => {
  const [searchParams] = useSearchParams();

  // console.log(searchParams.get("q"));
  // console.log(searchParams.get("type"));

  // if()
  const [lazyFalse, setLazyFalse] = useState(false);

  useEffect(() => {
    if (searchParams.get("q") === null || searchParams.get("type") === null)
      setLazyFalse(true);
  }, []);
  const {} = props;
  if (lazyFalse) return <BlogNotFound />;
  return (
    <div className="flex flex-col min-h-[calc(100vh-52px)] bg-bg">
      <NavTop
        setLazyFalse={setLazyFalse}
        className="p-4 pb-2 mt-12 w-[75%] mx-auto  "
      />
      <MidContent
        className="p-4 pt-0 w-[75%] mx-auto overflow-hidden "
        color="#FF4401"
      />
    </div>
  );
};

export default Search;
