import postApi from "@api/postApi";
import postTagApi from "@api/postTagApi";
import BlogTag from "@components/blogTag";
import Pagination from "@components/pagination";
import { iPostDetail } from "@DTO/Blog";
import { iPage } from "@DTO/Pagination";
import { iTag } from "@DTO/Tag";
import BlogNotFound from "@screens/BlogDetail/NotFound";
import NoPost from "@screens/Home/CenterContent/NoPost";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import defaultIMG from "@images/default.jpg";
import { ClipLoader } from "react-spinners";
import ListPostByCategorySkeleton from "@screens/ListPostByCategory/ListPostByCategorySkeleton";

const ListPostByTag = () => {
  const param = useParams();
  const { tagId } = param;
  const [lazyFalse, setLazyFalse] = useState(false);
  const [curTag, setCurTag] = useState<iTag>();
  const [listPost, setListPost] = useState<iPostDetail[]>();
  const [paging, setPaging] = useState<iPage>();
  const [curPage, setCurPage] = useState(1);
  const [loading, setLoading] = useState(false);

  console.log(listPost);
  useEffect(() => {
    if (curPage === 1 && listPost === null) {
    } else if (tagId !== undefined) {
      let temp = JSON.parse(JSON.stringify([tagId]));
      postApi.getAllPostByPostTag(temp, curPage, 3).then((result) => {
        console.log(result);
        if (result.status === 200 || result.status === 201) {
          setListPost(result.data.result.data);
          setPaging(result.data.result.page);
        } else {
        }
      });
    }
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [curPage]);

  useEffect(() => {
    //Check param, thực ra là không bao giờ vào đây :))
    if (tagId === undefined) {
      setLazyFalse(true);
    } else {
      //Get infor curCate + list post
      setLoading(true);
      postTagApi.getAllPostTag10000().then((result) => {
        if (result.status === 200 || result.status === 201) {
          console.log(result.data.result.data, "-0=-0-");
          let listTag: iTag[] = result.data.result.data;
          let tempTag: iTag | null = null;
          let idCurTag = "";
          listTag.forEach((element) => {
            if (element.id === tagId) {
              tempTag = element;
              idCurTag = element.id;
              return;
            }
          });
          if (tempTag !== null && idCurTag !== null) {
            setCurTag(tempTag);
            postApi
              .getAllPostByPostTag([idCurTag], curPage, 3)
              .then((result) => {
                if (result.status === 200 || result.status === 201) {
                  setListPost(result.data.result.data);
                  setPaging(result.data.result.page);
                } else {
                  toast.error(result.data + "Có gì đó không đúng");
                }
              });
          } else {
            setLazyFalse(true);
          }
        } else {
          toast.error(result.status + " error");
        }
        setLoading(false);
      });
    }
  }, []);

  if (lazyFalse) return <BlogNotFound />;
  if (loading || !curTag) return <ListPostByCategorySkeleton />;
  return (
    <div className="flex  flex-col bg-bg min-h-[calc(100vh-52px)]  ">
      <div className="flex  items-center w-full max-w-[960px] mx-auto pb-[2px] mt-[10vh] border-b-2 border-hover">
        <div className=" flex items-center mr-2 flex-1">
          <div className=" bg-hover rounded-md p-1 mr-2 mb-1 group-hover:bg-bg  transition-colors duration-300">
            <img
              className="w-[96px] h-[96px]"
              src={curTag.thumbnailLink || defaultIMG}
            />
          </div>
          <h3> {curTag.displayName}</h3>
        </div>

        <div className="flex flex-col items-center">
          <span>{curTag.PostCount}</span>
          <span>Bài viết</span>
        </div>
      </div>

      {curTag.PostCount <= 0 ? (
        <div className="flex flex-1 justify-center items-start mt-[10vh]">
          <NoPost />
        </div>
      ) : (
        <div className="flex flex-1 h-full mt-4 w-full  max-w-[960px] mx-auto flex-col items-center">
          <div className=" flex flex-col w-full items-center flex-1 overflow-x-visible">
            {listPost?.map((result) =>
              result.status === "Approve" ? (
                <BlogTag {...result} key={result.id} />
              ) : (
                ""
              )
            )}
          </div>
          {paging && !loading ? (
            <Pagination
              {...paging}
              loading={loading}
              changePageNumber={setCurPage}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ListPostByTag;
