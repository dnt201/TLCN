import React from "react";
import notFound from "@images/notFound.gif";
import { Link } from "react-router-dom";
const BlogNotFound = () => {
  return (
    <div className="flex items-center  flex-col justify-center text-bg bg-white min-h-[calc(100vh-52px)] ">
      <div className="  flex items-center flex-col h-fit mb-6 w-1/2">
        <img src={notFound} className="h-[250px]" alt="Not found image" />
        <h2>404 Not Found</h2>
        <i className="text-center">
          Có thể liên kết đã hỏng hoặc trang đã bị gỡ. Hãy kiểm tra xem liên kết
          mà bạn đang cố mở có chính xác không.
        </i>
        <Link
          to="/newest"
          className="px-6 py-2 font-bold mt-2 bg-primary rounded-md"
        >
          Đi tới bảng tin
        </Link>
      </div>
    </div>
  );
};

export default BlogNotFound;
