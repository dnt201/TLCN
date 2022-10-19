import React from "react";

interface iBlog {
  id: string;
  title: string;
  listTag: [string];
  img: React.ElementType;
  user: {
    id: string;
    name: string;
  };
  view: number;
}

const BlogTag = () => {
  return <div>BlogTag</div>;
};

export default BlogTag;
