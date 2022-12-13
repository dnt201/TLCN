import categoryApi from "@api/categoryApi";
import postApi, { postCreate } from "@api/postApi";
import postTagApi from "@api/postTagApi";
import userApi from "@api/userApi";
import { RootState } from "@app/store";
import EditorText from "@components/EditorText";
import PublishConfirm from "@screens/BlogCreate/PublishConfirm";
import BlogNotFound from "@screens/BlogDetail/NotFound";
import DOMPurify from "dompurify";
import { UpImage, XMark } from "@icons/index";
import Select from "react-select";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Dropzone from "react-dropzone";
import { iPostDetail } from "@DTO/Blog";
import Skeleton from "react-loading-skeleton";
import EditPostSkeleton from "./EditPostSkeleton";

interface iTag {
  id: string;
  postTagName: string;
  displayName: string;
  colorCode: string;
  thumbnailLink: string;
}

interface iCategory {
  id: string;
  categoryName: string;
}
interface iOption {
  value: string;
  label: string;
}
const EditPost = () => {
  let params = useParams();
  const { postId } = params;
  const [postIdCur, setPostIdCur] = useState("");
  const { userInfo } = useSelector((state: RootState) => state.users);
  const [notFoundLazy, setNotFoundLazy] = useState(false);

  const getPostDetailById = async () => {
    let accessToken = localStorage.getItem("accessToken");

    if (accessToken !== null && postId !== undefined) {
      const user = await userApi.getMe();
      if (user.status === 200) {
        const result = await postApi.getPostDetailById(postId);
        if (result.status === 200 && user.data.id === result.data.owner.id) {
          setPostIdCur(postId);
          console.log(result.data);
          const curPost: iPostDetail = result.data;
          setTitle(curPost.title);
          if (curPost.thumbnailLink !== null) {
            let tempBlob = await fetch(result.data.thumbnailLink);
            if (tempBlob) {
              let blob = await tempBlob.blob();
              const file = new File([blob], "image.jpg", { type: blob.type });
              setThumbnail(file);
            } else setThumbnail(null);
          } else setThumbnail(null);
          setValue(curPost.content);

          const [tags, categories] = await Promise.all([
            postTagApi.getAllPostTag10000(),
            categoryApi.getAllCategory(),
          ]);
          if (tags.status === 201) {
            console.log(tags);
            // setListTag(tags.data.result.data);
            let tempListTagSelected: iOption[] = [];
            let tempListTag: iOption[] = [];
            let tempTagsForm: string[] = [];
            tags.data.result.data.forEach((element: iTag) => {
              // console.log(curPost.tags.findIndex((e) => e.id === element.id));
              let temp = {
                value: element.id,
                label: element.displayName,
              };
              if (curPost.tags.findIndex((e) => e.id === element.id) >= 0) {
                tempListTagSelected.push(temp);
                tempTagsForm.push(temp.value);
                console.log(temp);
              }
              tempListTag.push(temp);
            });
            setTagsOption(tempListTag);
            setSaveTag(tempListTagSelected);
            setTags(tempTagsForm);
          }
          if (categories.status === 201) {
            console.log(curPost.category);
            let tempListCategory: iOption[] = [];
            console.log(categories.data);
            categories.data.result.data.forEach((element: iCategory) => {
              // console.log(curPost.tags.findIndex((e) => e.id === element.id));
              let temp = {
                value: element.id,
                label: element.categoryName,
              };
              if (curPost.category.id === element.id) {
                setSaveCate([temp]);
                setCategory(temp.value);
              }
              tempListCategory.push(temp);
              // tempTagsForm.push(temp.value);
              console.log(temp);
            });
            setCategoriesOption(tempListCategory);
            // tempListTag.push(temp);
          }
          // console.log(categories.data.result.data);
          // setListCategory(categories.data.result.data);

          setCanNextStep(3);
          setLoading(false);
        } else {
          setLoading(false);

          console.log("asas sanot foutn nd");
          setNotFoundLazy(true);
        }
      } else {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } else {
      setLoading(false);
      setNotFoundLazy(true);
    }
  };

  const [canNextStep, setCanNextStep] = useState(1);
  const [dropOn, setDropOn] = useState(false);

  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // Start Form
  const [title, setTitle] = useState("");

  const [thumbnail, setThumbnail] = useState<File | null>();
  const [value, setValue] = useState("");

  const [category, setCategory] = useState<string | null>(null);
  const [saveCate, setSaveCate] = useState<iOption[] | null>(null);

  const [tags, setTags] = useState<string[] | null>(null);
  const [saveTag, setSaveTag] = useState<iOption[] | null>(null);

  // End Form

  // Handle popup
  const [isChange, setIsChange] = useState(false);
  const [isShowPublish, setIsShowPublish] = useState(false);

  //To choose
  const [tagsOption, setTagsOption] = useState<iOption[] | null>(null);
  const [categoriesOption, setCategoriesOption] = useState<iOption[] | null>(
    null
  );
  console.log(loading, "--------editipost");

  const editPost = async (postCreate: postCreate) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    // ...
    const result = await postApi.editPost(postIdCur, postCreate);
    await setTimeout(() => {
      if (result.status === 201 || result.status === 200) {
        toast.success("Change post success", {
          id: toastId,
          duration: 2500,
        });
        navigate(`/blog/${result.data.id}`);
      } else {
        console.log(result);
        toast.error(result.data.message || "Something went wrong", {
          id: toastId,
          duration: 2500,
        });

        setTimeout(() => {
          setIsChange(false);
        }, 2500);
      }
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    let temp: postCreate;
    if (isChange) {
      if (tags !== null) {
        temp = {
          title: title,
          content: value,
          tags: tags,
          category: category || "",
        };
        if (thumbnail !== null)
          temp = {
            title: title,
            content: value,
            tags: tags,
            category: category || "",
            file: thumbnail,
          };
        editPost(temp);
        setIsShowPublish(false);
      }
    }
    // createPost();
  }, [isChange]);

  useEffect(() => {
    console.log("change ne tagsOption: ", tagsOption);
    console.log("change ne categoriesOption: ", categoriesOption);

    if (
      title.length <= 0 ||
      category === null ||
      category.length <= 0 ||
      tags === null ||
      tags.length <= 0
    )
      setCanNextStep(1);
    else {
      if (value.length > 10) setCanNextStep(3);
      else setCanNextStep(2);
    }
  }, [title, tags, category, value]);

  useEffect(() => {
    getPostDetailById();
  }, []);
  if (loading) return <EditPostSkeleton />;

  if (notFoundLazy) return <BlogNotFound />;
  return (
    <>
      <div
        className={
          " relative flex flex-col bg-bg " +
          (step === 3 ? " h-fit min-h-screen" : " h-screen ")
        }
      >
        {isShowPublish ? (
          <PublishConfirm
            loading={loading}
            isShow={isShowPublish}
            setShow={setIsShowPublish}
            isConfirm={isChange}
            setConfirmed={setIsChange}
          />
        ) : null}
        {/* Start bar */}
        <div className="flex items-center justify-center mb-[2px] border-b-[1px] border-smokeDark">
          <div className="flex-1">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="p-2 hover:bg-smokeDark h-full text-sm mr-1"
            >
              Hủy
            </button>
          </div>

          {step === 1 ? (
            <div className="flex items-center">
              <button
                data-tip="Vui lòng nhập tiêu đề, chọn danh mục và tag cho bài viết!!!"
                data-for="buttonNextStep2"
                className={
                  "p-2 underline  text-sm " +
                  (canNextStep === 1
                    ? " hover:cursor-not-allowed "
                    : "hover:bg-smokeDark hover:cursor-pointer text-primary ")
                }
                onClick={() => {
                  if (canNextStep === 1) {
                  } else setStep(2);
                }}
              >
                Tiếp tục
              </button>
              {canNextStep === 1 ? (
                <ReactTooltip
                  textColor="#FF4401"
                  id="buttonNextStep2"
                  place="bottom"
                  effect="solid"
                  className="text-center "
                />
              ) : null}
            </div>
          ) : step === 2 ? (
            <div className="flex">
              <button
                className="p-2 underline  text-sm hover:cursor-pointer hover:bg-smokeDark"
                onClick={() => {
                  setStep(1);
                }}
              >
                Bước 1
              </button>
              <button
                className="p-2  underline   text-sm hover:cursor-pointer hover:bg-smokeDark"
                onClick={() => {
                  setStep(3);
                }}
              >
                Preview
              </button>
            </div>
          ) : step === 3 ? (
            <button
              className="p-2  underline   text-sm hover:cursor-pointer hover:bg-smokeDark"
              onClick={() => {
                setStep(2);
              }}
            >
              Quay lại
            </button>
          ) : (
            <div>null</div>
          )}

          <button
            className={
              "p-2 text-sm ml-1 " +
              (canNextStep === 3
                ? "bg-primary text-white"
                : " bg-smokeDark hover:cursor-not-allowed")
            }
            onClick={async () => {
              console.log(canNextStep);
              if (canNextStep === 3) {
                // console.log(isChange);
                // let temp: postCreate;
                // if (isChange) {
                //   console.log("call api create");
                //   if (tags !== null) {
                //     temp = {
                //       title: title,
                //       content: value,
                //       tags: tags,
                //       category: category || "",
                //     };
                //     if (thumbnail !== null)
                //       temp = {
                //         title: title,
                //         content: value,
                //         tags: tags,
                //         category: category || "",
                //         file: thumbnail,
                //       };
                //     createPost(temp);
                //   }
                // }
                // await createPost(temp);
                setIsShowPublish(true);
              }
            }}
          >
            Chỉnh sửa
          </button>
        </div>
        {/* End bar */}

        {step === 1 ? (
          <div className="flex-1 flex flex-col mt-[5%] mx-[5%]">
            <div className="flex-1 flex justify-center mt-4 ">
              <div className="flex-[3] flex flex-col items-center mr-4">
                <textarea
                  rows={2}
                  placeholder="Tiêu đề bài viết......."
                  className="bg-transparent focus:outline-none text-xl mb-2 border-bg2 resize-none w-full
        border-b-[1px] focus:border-white
        "
                  value={title}
                  onChange={(e) => {
                    if (e.target.value.trim().length === 0) setTitle("");
                    else setTitle(e.target.value);
                  }}
                />
                <Select
                  value={saveCate}
                  placeholder="Select post's category..."
                  className="text-primary mb-2 w-full"
                  isClearable
                  options={categoriesOption ? categoriesOption : []}
                  onChange={(e) => {
                    console.log(e);
                    if (e) {
                      setCategory(e.value);
                      let z: iOption[] = [];
                      z.push(e);
                      setSaveCate(z);
                    } else {
                      setCategory(null);
                      setSaveCate(null);
                    }
                  }}
                />
                <Select
                  isMulti
                  value={saveTag}
                  placeholder="Select least 1 post's tag..."
                  className="basic-multi-select text-primary w-full"
                  options={tagsOption ? tagsOption : []}
                  onChange={(e) => {
                    console.log(e);
                    let temp: string[] = [];
                    let z: iOption[] = [];
                    if (e) {
                      e.map((item) => {
                        temp.push(item.value);
                        z.push(item);
                      });
                    }
                    if (temp.length > 0) {
                      setTags(temp);
                      setSaveTag(z);
                    } else {
                      setTags(null);
                      setSaveTag(null);
                    }
                    // if (e) setTags(e);
                    // else setCategory(null);
                  }}
                />
              </div>

              <div className="flex-1 flex justify-center">
                {thumbnail ? (
                  <div className=" relative">
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      className=" w-[240px]  h-[240px]"
                      alt="Pumb"
                    />
                    <button
                      className="absolute top-0 right-0 translate-y-1/3 p-[2px] -translate-x-1/3 hover:bg-smoke bg-white text-bg rounded-full"
                      onClick={() => setThumbnail(null)}
                    >
                      <XMark className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Dropzone
                    accept={{ "image/jpeg": [".jpeg", ".png"] }}
                    onDragEnter={() => {
                      setDropOn(true);
                      console.log("onDragEnter");
                    }}
                    onDragLeave={() => {
                      setDropOn(false);
                      console.log("onDragLeave");
                    }}
                    onDrop={(files) => {
                      console.log(files);
                      if (files.length > 1)
                        toast.error('Vui lòng chọn duy nhất "1" ảnh!');
                      else if (files[0]) setThumbnail(files[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        className="flex flex-1 justify-center "
                        {...getRootProps()}
                      >
                        <label
                          htmlFor="dropzone-file"
                          className={
                            "flex flex-col items-center justify-center w-[240px]  h-[240px] z-[10003] p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer " +
                            (dropOn ? " opacity-50" : " ")
                          }
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                            <UpImage />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              or drag and drop thumbnail
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Only PNG or JPG
                            </p>
                          </div>
                        </label>
                      </div>
                    )}
                  </Dropzone>
                )}
              </div>
            </div>
          </div>
        ) : step === 2 ? (
          <EditorText valueHTML={value} setValue={setValue} />
        ) : step === 3 ? (
          <div className="bg-white text-bg2">
            <div
              className="max-w-[760px] w-2/3 flex-wrap flex   mx-auto min-h-[calc(100vh-52px)] "
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(value, {
                  ADD_TAGS: ["iframe"],
                  ADD_ATTR: [
                    "allow",
                    "allowfullscreen",
                    "frameborder",
                    "scrolling",
                  ],
                }),
              }}
            />
          </div>
        ) : (
          <div>
            Something went wrong <a> Click to reload </a>
          </div>
        )}
      </div>
    </>
  );
};

export default EditPost;
