import categoryApi from "@api/categoryApi";
import postApi from "@api/postApi";
import userApi from "@api/userApi";
import { iPostDetail } from "@DTO/Blog";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BeatLoader, CircleLoader } from "react-spinners";
import BlogSearchTag from "./blogTag";
import UserTag, { iUserTag } from "./userTag";

interface iProps extends React.HTMLProps<HTMLDivElement> {
  inputSearch: string;
  setInputSearch: (value: string) => void;
  setSearchFocus: (b: boolean) => void;
}

const SearchBox: React.FC<iProps> = (props) => {
  const { className, inputSearch, setSearchFocus, setInputSearch } = props;

  const [loading, setLoading] = useState(false);
  const [listUser, setListUser] = useState<iUserTag[] | null>(null);
  const [listPost, setListPost] = useState<iPostDetail[] | null>(null);
  const [listCategory, setListCategory] = useState<iUserTag[] | null>(null);
  const navigate = useNavigate();
  // console.log("show ne", listUser);

  const handleChange = async () => {
    const [users, posts, categories] = await Promise.all([
      userApi.findUserByDisplayName(inputSearch),
      postApi.getAllPost(inputSearch),
      categoryApi.getCategoryByName(inputSearch),
    ]);
    console.log(
      // "users ",
      // users,
      "posts",
      posts.data.result.data
      // "categories",
      // categories
    );
    // const result = await userApi.findUserByDisplayName(inputSearch);
    await setTimeout(() => {
      if (users.status === 200) {
        if (users.data.data.length >= 5) {
          let temp = users.data.data.slice(0, 5);
          setListUser(temp);
        } else setListUser(users.data.data);
      }
      if (posts.status === 201) {
        if (posts.data.result.data.length >= 5) {
          let temp = posts.data.result.data.slice(0, 5);
          console.log(temp, "```````````");
          setListPost(temp);
        } else setListPost(posts.data.result.data);
      }
      if (categories.status === 200) {
        if (categories.data.data.length >= 5) {
          let temp = categories.data.data.slice(0, 5);
          setListCategory(temp);
        } else setListCategory(categories.data.data);
      }
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const funcFake = async () => {
      setLoading(true);
      timer = setTimeout(() => {
        if (inputSearch.length > 0) {
          handleChange();
        }
      }, 1000);
    };
    funcFake();
    return () => {
      clearTimeout(timer);
    };
  }, [inputSearch]);
  return (
    <div className={className}>
      {inputSearch.length <= 0 ||
      (listUser === null && listPost === null && !loading) ? (
        <div className="flex pt-2 w-full justify-center">
          <i className="text-s">Không có gì để hiển thị</i>
        </div>
      ) : (
        <div className="mt-2">
          {loading ? (
            <div className="flex justify-center">
              <BeatLoader color="white" size={8} />
            </div>
          ) : (
            <div className="flex px-2 flex-col pb-4 visible">
              <div className="flex flex-col mb-2">
                <button
                  className=""
                  onClick={() => {
                    if (inputSearch.length <= 0) {
                      toast.error("Empty name search!!!");
                    } else {
                      navigate(`/search?q=${inputSearch}&type=posts`);
                      // setInputSearch("");
                      setSearchFocus(false);
                    }
                  }}
                >
                  <h5 className="bg-primary text-left px-2 py-[2px]">
                    Bài viết
                  </h5>
                </button>
                {listPost !== null && listPost.length > 0 ? (
                  <div className="mt-1">
                    {listPost.map((e) => (
                      <BlogSearchTag
                        key={e.id}
                        {...e}
                        setInputSearch={setInputSearch}
                        setShowSearchBox={setSearchFocus}
                      />
                    ))}
                  </div>
                ) : (
                  <i className="text-s text-center w-full py-2">
                    Không có bài viết tương ứng!
                  </i>
                )}
              </div>
              <div className="flex flex-col ">
                <button
                  onClick={() => {
                    if (inputSearch.length <= 0) {
                      toast.error("Empty name search!!!");
                    } else {
                      navigate(`/search?q=${inputSearch}&type=users`);
                      // setInputSearch("");
                      setSearchFocus(false);
                    }
                  }}
                >
                  <h5 className="bg-primary px-2 py-[2px] text-left">
                    Người dùng
                  </h5>
                </button>
                {listUser !== null && listUser.length > 0 ? (
                  <div className="mt-1">
                    {listUser.map((item) => (
                      <UserTag
                        key={item.id}
                        {...item}
                        setInputSearch={setInputSearch}
                        setShowSearchBox={setSearchFocus}
                      />
                    ))}
                  </div>
                ) : (
                  <i className="text-s text-center w-full py-2">
                    Không có người dùng tương ứng!
                  </i>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
