import postApi from "@api/postApi";
import BlogTag from "@components/blogTag";
import { iPage } from "@DTO/Pagination";
import React, { useEffect, useRef, useState } from "react";
import ListSkeleton from "../ListSkeleton";
import ArrowUpTray from "@icons/ArrowUpTray";
import NoPost from "../NoPost";
import { iPostDetail } from "@DTO/Blog";
import { useSelector } from "react-redux";
import { RootState } from "@app/store";
const ListInfinityNewest = () => {
  const [loading, setLoading] = useState(false);

  const [listBlogTag, setListBlogTag] = useState<iPostDetail[] | null>(null);

  const [paging, setPaging] = useState<iPage | null>(null);

  const [page, setPage] = useState(1);
  const [maxRoiLazyQuaTroi, setMaxRoiLazyQuaTroi] = useState(false);
  const { accessToken } = useSelector((state: RootState) => state.users);
  const divListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setListBlogTag(null);
    setPaging(null);
    setPage(-1);
  }, [accessToken]);
  const handlePageChange = async (pageNumber: number) => {
    if (listBlogTag !== null && listBlogTag.length > 0) {
      let temp = listBlogTag;
      await setTimeout(async () => {
        const result = await postApi.getAllPost("", pageNumber, 3);
        if (result.status === 201) {
          setListBlogTag(result.data.result.data);
          setPaging(result.data.result.page);
          if (result.data.result.page.totalElement <= 3)
            setMaxRoiLazyQuaTroi(true);
          temp = [...temp, ...result.data.result.data];
          setListBlogTag(temp);
        }
        setLoading(false);
      }, 1250);
    } else {
      await setTimeout(async () => {
        const result = await postApi.getAllPost("", pageNumber, 3);
        if (result.status === 201) {
          if (result.data.result.page.totalElement <= 3)
            setMaxRoiLazyQuaTroi(true);
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
      // setMaxRoiLazyQuaTroi(false);
      window.removeEventListener("scroll", handleScrollLoad);
    };
  }, [paging]);

  if (listBlogTag && listBlogTag.length === 0 && !loading) {
    return <NoPost />;
  }
  return (
    <div ref={divListRef} id={"12345"}>
      {listBlogTag && listBlogTag.length > 0
        ? listBlogTag.map((blog) => (
            <React.Fragment key={blog.id}>
              <BlogTag
                id={blog.id}
                title={blog.title}
                category={blog.category}
                content={blog.content || ""}
                tags={blog.tags}
                owner={blog.owner}
                isFollow={blog.isFollow}
                like={blog.like}
                view={blog.view}
                status={blog.status || "Waiting"}
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
          Nothing to show!
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
            <ArrowUpTray />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ListInfinityNewest;
