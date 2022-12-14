import categoryApi from "@api/categoryApi";
import postApi from "@api/postApi";
import { AppDispatch, RootState } from "@app/store";
import BlogTag from "@components/blogTag";
import Pagination from "@components/pagination";
import { iPostDetail } from "@DTO/Blog";
import { iCategory } from "@DTO/Category";
import { iPage } from "@DTO/Pagination";
import { getAllCategory } from "@redux/categorySlice";
import BlogNotFound from "@screens/BlogDetail/NotFound";
import CategoryItem from "@screens/Categories/CategoryItem";
import NoPost from "@screens/Home/CenterContent/NoPost";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ListPostByCategorySkeleton from "./ListPostByCategorySkeleton";

const ListPostByCategory = () => {
  const param = useParams();
  const { categoryId } = param;
  const [lazyFalse, setLazyFalse] = useState(false);
  const [curCategory, setCurCategory] = useState<iCategory>();
  const [listPost, setListPost] = useState<iPostDetail[]>();
  const [paging, setPaging] = useState<iPage>();
  const [curPage, setCurPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //   const getData = async (id: string) => {
  //     const result = await categoryApi.getAllCategory10000();
  //     if (result.status === 200) {
  //       return;
  //     } else result;
  //   };

  useEffect(() => {
    if (curPage === 1 && listPost === null) {
    } else if (categoryId !== undefined) {
      postApi.getAllPostByCategory(categoryId, curPage, 1).then((result) => {
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
    if (categoryId === undefined) {
      setLazyFalse(true);
    } else {
      //Get infor curCate + list post
      setLoading(true);
      categoryApi.getAllCategory10000().then((result) => {
        if (result.status === 200 || result.status === 201) {
          console.log(result.data.result.data, "-0=-0-");
          let listCategory: iCategory[] = result.data.result.data;
          let tempCategory: iCategory | null = null;
          let idCurCategory = "";
          listCategory.forEach((element) => {
            if (element.id === categoryId) {
              tempCategory = element;
              idCurCategory = element.id;
              return;
            }
          });
          if (tempCategory !== null && idCurCategory !== null) {
            setCurCategory(tempCategory);
            postApi
              .getAllPostByCategory(idCurCategory, curPage, 1)
              .then((result) => {
                if (result.status === 200 || result.status === 201) {
                  setListPost(result.data.result.data);
                  setPaging(result.data.result.page);
                } else {
                  toast.error(result.data + "có gì đó không đúng");
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
  if (loading || !curCategory) return <ListPostByCategorySkeleton />;
  return (
    <div className="flex  flex-col bg-bg min-h-[calc(100vh-52px)]  ">
      <div className="flex  items-center w-full max-w-[960px] mx-auto pb-[2px] mt-[10vh] border-b-2 border-hover">
        <div className=" flex items-center mr-2 flex-1">
          <div className=" bg-hover rounded-md p-2 mr-2 group-hover:bg-bg  transition-colors duration-300"></div>
          <h3> {curCategory?.categoryName}</h3>
        </div>

        <div className="flex flex-col items-center">
          <span>{curCategory?.PostCount}</span>
          <span>Bài viết</span>
        </div>
      </div>

      {curCategory.PostCount <= 0 ? (
        <div className="flex flex-1 justify-center items-start mt-[10vh]">
          <NoPost />
        </div>
      ) : (
        <div className="flex flex-1 h-full mt-4 w-full  max-w-[960px] mx-auto flex-col items-center">
          <div className=" flex flex-col w-full items-center flex-1 overflow-x-visible">
            {listPost?.map((result) => (
              <BlogTag {...result} key={result.id} />
            ))}
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
export default ListPostByCategory;
