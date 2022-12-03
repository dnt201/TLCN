import categoryApi from "@api/categoryApi";
import postApi from "@api/postApi";
import userApi from "@api/userApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BeatLoader, CircleLoader } from "react-spinners";
import { iBlogTag } from "./blogTag";
import UserTag, { iUserTag } from "./userTag";

interface iProps extends React.HTMLProps<HTMLDivElement> {
  inputSearch: string;
  setInputSearch: (value: string) => void;
  setSearchFocus: (b: boolean) => void;
}

const SearchBox: React.FC<iProps> = (props) => {
  const { className, inputSearch, setSearchFocus } = props;

  const [loading, setLoading] = useState(false);
  const [listUser, setListUser] = useState<iUserTag[] | null>(null);
  const [listPost, setListPost] = useState<iBlogTag[] | null>(null);
  const [listCategory, setListCategory] = useState<iUserTag[] | null>(null);
  // console.log("show ne", listUser);

  const handleChange = async () => {
    const [users, posts, categories] = await Promise.all([
      userApi.findUserByDisplayName(inputSearch),
      postApi.getAllPost(inputSearch),
      categoryApi.getCategoryByName(inputSearch),
    ]);
    console.log("users ", users, "posts", posts, "categories", categories);
    // const result = await userApi.findUserByDisplayName(inputSearch);
    await setTimeout(() => {
      if (users.status === 200) {
        if (users.data.data.length >= 5) {
          let temp = users.data.data.slice(0, 5);
          setListUser(temp);
        } else setListUser(users.data.data);
      }
      if (posts.status === 200) {
        if (posts.data.result.data.length >= 5) {
          let temp = posts.data.data.slice(0, 5);
          setListPost(temp);
        } else setListPost(posts.data.data);
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
    timer = setTimeout(() => {
      if (inputSearch.length > 0) {
        console.log("vo ne");
        setLoading(true);
        handleChange();
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [inputSearch]);
  return (
    <div className={className}>
      {(inputSearch.length <= 0 || listUser === null) && !loading ? (
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
                <h5 className="bg-primary px-2 py-[2px]">Bài viết</h5>
                {listPost !== null && listPost.length > 0 ? (
                  <div>List bài viết</div>
                ) : (
                  <i className="text-s text-center w-full py-2">
                    Không có bài viết tương ứng!
                  </i>
                )}
              </div>
              <div className="flex flex-col ">
                <h5 className="bg-primary px-2 py-[2px]">Người dùng</h5>
                {listUser !== null && listUser.length > 0 ? (
                  <div>
                    {listUser.map((item) => (
                      <UserTag
                        key={item.id}
                        {...item}
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
