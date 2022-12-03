import postApi from "@api/postApi";
import BlogTag, { iBlogTag } from "@components/blogTag";
import { iPage } from "@DTO/Pagination";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import ListSkeleton from "../ListSkeleton";
import noPost from "@images/noPost.gif";
import ArrowUpTray from "@icons/ArrowUpTray";
const ListInfinityNewest = () => {
  const [loading, setLoading] = useState(false);

  const [listBlogTag, setListBlogTag] = useState<iBlogTag[] | null>(null);

  const [paging, setPaging] = useState<iPage | null>(null);

  const [page, setPage] = useState(1);
  const [maxRoiLazyQuaTroi, setMaxRoiLazyQuaTroi] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handlePageChange = async (pageNumber: number) => {
    if (listBlogTag !== null && listBlogTag.length > 0) {
      let temp = listBlogTag;
      await setTimeout(async () => {
        const result = await postApi.getAllPost("", pageNumber);
        if (result.status === 201) {
          setListBlogTag(result.data.result.data);
          setPaging(result.data.result.page);
          temp = [...temp, ...result.data.result.data];
          setListBlogTag(temp);
        }
        setLoading(false);
      }, 1250);
    } else {
      await setTimeout(async () => {
        const result = await postApi.getAllPost("", pageNumber);
        if (result.status === 201) {
          setListBlogTag(result.data.result.data);
          setPaging(result.data.result.page);
          // setPage(result.data.result.page);
        }
        setLoading(false);
      }, 1250);
    }
  };
  useEffect(() => {
    setLoading(true);
    if (page === -1) {
      setPage(1);
    } else handlePageChange(page);
  }, [page]);
  console.log(listBlogTag);
  useEffect(() => {
    if (
      document.documentElement.scrollHeight -
        window.pageYOffset -
        window.innerHeight <=
      1
    ) {
      if (paging === null) {
        setLoading(true);
        if (page !== 1) {
          setPage(1);
        }
      } else {
        if (page + 1 <= Math.ceil(paging.totalElement / paging.size)) {
          let pageNumber = page + 1;
          setPage(pageNumber);
        } else {
          setMaxRoiLazyQuaTroi(true);
        }
      }
    }
    const handleScrollLoad = async () => {
      if (
        document.documentElement.scrollHeight -
          window.pageYOffset -
          window.innerHeight <=
        1
      ) {
        setTimeout(() => {
          if (paging === null) {
            setLoading(true);
            if (page !== 1) {
              setPage(1);
            }
          } else {
            if (page + 1 <= Math.ceil(paging.totalElement / paging.size)) {
              let pageNumber = page + 1;
              setPage(pageNumber);
            } else {
              setMaxRoiLazyQuaTroi(true);
            }
          }
        }, 100);
      }
    };
    if (paging !== null) window.addEventListener("scroll", handleScrollLoad);
    return () => {
      setMaxRoiLazyQuaTroi(false);
      window.removeEventListener("scroll", handleScrollLoad);
    };
  }, [paging]);
  if (listBlogTag && listBlogTag.length === 0 && !loading) {
    return (
      <div className="flex  items-center justify-center mt-8">
        <img src={noPost} width={96} height={96} />
        <i className="text-sm font-medium mb-2">
          Không có bài viết nào phù hợp
        </i>
      </div>
    );
  }
  return (
    <div>
      {listBlogTag && listBlogTag.length > 0
        ? listBlogTag.map((blog) => (
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
        : null}
      {loading ? (
        <div>
          <ListSkeleton />
        </div>
      ) : maxRoiLazyQuaTroi ? (
        <div className="py-2 pb-6 flex items-center text-sm justify-center">
          Have no one!!!
          <button
            className="flex items-center p-2 text-primary font-semibold text-base"
            onClick={async () => {
              setPaging(null);
              setListBlogTag(null);
              setPage(-1);
              setMaxRoiLazyQuaTroi(false);
              window.scrollTo(0, 0);
            }}
          >
            Click to load
            <ArrowUpTray />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ListInfinityNewest;
