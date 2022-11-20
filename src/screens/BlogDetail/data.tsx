import { iBlogTag } from "@components/blogTag";
import img1 from "@images/1.png";
import img2 from "@images/2.png";
import img3 from "@images/3.png";
import img4 from "@images/1312.png";
import av1 from "@images/av1.png";

let listBlog: iBlogTag[] = [
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

export function getBlogs() {
  return listBlog;
}

export function getBlogById(id: string) {
  return listBlog.find((i) => i.id === id);
}
