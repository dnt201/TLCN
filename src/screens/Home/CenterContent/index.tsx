import React from "react";
import BlogTag, { iBlogTag } from "@components/blogTag";
import img1 from "@images/1.png";
import img2 from "@images/2.png";
import img3 from "@images/3.png";
import img4 from "@images/1312.png";
import av1 from "@images/av1.png";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "@app/store";
import { useSelector } from "react-redux";
import { Write } from "@icons/index";
interface iProps extends React.HTMLProps<HTMLDivElement> {
  a?: string;
}

const CenterContent: React.FC<iProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.users);
  console.log(location);
  return (
    <div className={props.className} onClick={() => {}}>
      {accessToken && accessToken !== "" ? (
        <div className="flex items-center bg-bg2 p-4 mb-2 rounded-md">
          <img
            onClick={(e) => {
              navigate("/detail-user");
              e.stopPropagation();
            }}
            className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full mr-2 hover:cursor-pointer"
            src={av1}
            alt="user avatar"
          />
          <p
            className="flex items-center flex-1 h-8  md:h-9  lg:h-10  bg-hover text-s px-2 py-1 rounded-md hover:cursor-text"
            onClick={(e) => {
              navigate("/new-post");
              e.stopPropagation();
            }}
          >
            Let’s share what going on your mind...
          </p>
          <button
            className="bg-primary rounded-md px-2 py-1 text-s ml-2"
            onClick={(e) => {
              navigate("/new-post");
              e.stopPropagation();
            }}
          >
            Create Post
          </button>
        </div>
      ) : (
        <div
          className="flex-1 text-primary py-2 mb-4 hover:cursor-pointer flex items-center justify-center border-[1px] border-primary rounded-lg text-xs"
          onClick={() => {
            navigate("/login");
          }}
        >
          <Write className="stroke-primary w-5 h-5 mr-2 " />
          Đăng nhập để viết bài!
        </div>
      )}

      {listBlogTag.map((blog) => (
        <BlogTag
          key={blog.id}
          id={blog.id}
          title={blog.title}
          image={blog.image}
          listTag={blog.listTag}
          user={blog.user}
          isLike={blog.isLike}
          like={blog.like}
          view={blog.view}
          numCom={blog.numCom}
        />
      ))}
    </div>
  );
};

let listBlogTag: iBlogTag[] = [
  {
    id: "p1",
    title: "Blockchain developer best practices on innovationchain",
    listTag: ["#javascript", "#red", "#fillRule"],
    image: img1,
    user: {
      id: "us1",
      name: "Pavel Gvay",
      image: av1,
    },
    view: 1324,
    like: 365,
    isLike: false,
    numCom: 65821,
  },
  {
    id: "p2",
    title: "Blockchain developer best practices on innovationchain",
    listTag: ["#vertical", "#allRight", "#good"],
    image: img2,
    user: {
      id: "us1",
      name: "Pavel Gvay",
      image: av1,
    },
    view: 1212,
    like: 645,
    isLike: true,
    numCom: 3321,
  },
  {
    id: "p3",
    title: "Blockchain developer best practices on innovationchain",
    listTag: ["#leeSin", "#endRegion", "#React"],
    image: img3,
    user: {
      id: "us1",
      name: "Pavel Gvay",
      image: av1,
    },
    view: 32,
    like: 3615,
    isLike: false,
    numCom: 93215,
  },
  {
    id: "p4",
    title: "Blockchain developer best practices on innovationchain",
    listTag: ["#1", "#2", "#3"],
    image: img4,
    user: {
      id: "us1",
      name: "Pavel Gvay",
      image: av1,
    },
    view: 651324,
    like: 36645,
    isLike: true,
    numCom: 31,
  },
];

export default CenterContent;
