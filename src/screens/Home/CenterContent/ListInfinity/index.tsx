import postApi from "@api/postApi";
import BlogTag, { iBlogTag } from "@components/blogTag";
import { iPage } from "@DTO/Pagination";
import React, { useEffect, useState } from "react";

interface iListInfProps {
  listBlog: iBlogTag[];
  //   setListBlogTag: (list: iBlogTag[]) => void;
  pageP: number;
  paging: iPage | null;
  axiosAPI: () => void;
  // setPaging: (i: iPage) => void;
  // setListBlog: (list: iBlogTag[]) => void;
  // setPaging: (page: number) => void
}

const ListInfinity: React.FC<iListInfProps> = (props) => {
  const { listBlog, pageP, paging, axiosAPI } = props;

  const [loading, setLoading] = useState(false);

  const [listBlogTag, setListBlogTag] = useState<iBlogTag[] | null>(null);

  const [pagingI, setPagingI] = useState(1);

  const [page, setPage] = useState(1);
  console.log("rerender");
  // const handlePageChange = async (pageNumber: number) => {
  //   let temp = listBlogTag;

  //   const result = await postApi.getAllPost("", pageNumber);
  //   temp = [...temp, ...result.data.result.data];
  //   setListBlogTag(temp);
  // };
  useEffect(() => {
    console.log(page);
    // const result = axiosAPI(page);
    // if (page !== 1) handlePageChange(page);
  }, [page]);

  useEffect(() => {
    const handleScrollLoad = async () => {
      console.log(
        document.documentElement.scrollHeight -
          window.pageYOffset -
          window.innerHeight
      );

      if (
        document.documentElement.scrollHeight -
          window.pageYOffset -
          window.innerHeight <=
        1
      ) {
        // console.log("UnMounted");
        console.log("if", page);
        setLoading(true);
        let pageNumber = page + 1;
        console.log(pageNumber);
        setPage(pageNumber);

        // setListBlog(temp);
        // console.log(result);
      }
      // if(window.pageYOffset - document.documentElement.scrollTop)
      // if (

      //   //  +
      //   //   divListBlog.current.outerHeight() -
      //   //   window.innerHeight
      // ) {
      //   alert("You reached the end of the DIV");
      // }
    };
    window.addEventListener("scroll", handleScrollLoad);
    console.log(listBlogTag);
    return () => {
      console.log("remove");
      window.removeEventListener("scroll", handleScrollLoad);
    };
  }, []);
  return (
    <div>
      {listBlogTag && listBlogTag.length > 0 ? (
        listBlogTag.map((blog) => (
          <React.Fragment key={blog.id}>
            <BlogTag
              id={blog.id}
              title={blog.title}
              category={blog.category}
              // image={blog.image}
              tags={blog.tags}
              owner={blog.owner}
              isFollow={blog.isFollow}
              like={blog.like}
              view={blog.view}
              comment={blog.comment}
              dateModified={blog.dateModified}
              thumbnailLink={blog.thumbnailLink}
            />
          </React.Fragment>
        ))
      ) : (
        <h4 className="text-center pt-4">
          <i>Nothing to show... </i>
        </h4>
      )}
    </div>
  );
};

export default React.memo(ListInfinity);
