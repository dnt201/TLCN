import Tag, { iTagProp } from "@components/tag";
import React, { useEffect, useState } from "react";
import { Following, Newest, Popular } from "@icons/index";
import postTagApi from "@api/postTagApi";
import categoryApi from "@api/categoryApi";
import { iTag } from "src/DTO";
import { iCategory } from "src/DTO/Category";
import Filter from "./Filter";
import SkeletonTag from "./SkeletonTag";
import SkeletonCategory from "./SkeletonCategory";

interface iProps extends React.HTMLProps<HTMLDivElement> {}

const LeftContent: React.FC<iProps> = (props) => {
  const [listTag, setListTag] = useState<iTag[] | null>(null);
  const [listCategory, setListCategory] = useState<iCategory[] | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    const [tags, categories] = await Promise.all([
      postTagApi.getTop5PostTagMostUsed(),
      categoryApi.getTop5CategoryMostUsed(),
    ]);

    if (tags && tags.status === 200) {
      setListTag(tags.data);
    }
    if (categories && categories.status === 200) {
      setListCategory(categories.data);
    }
    setLoading(false);
  };

  return (
    <div className={props.className + " "}>
      <div className="flex-1 visible">
        <div className="bg-bg2 rounded-lg p-2">
          {listChose.map((tag) => (
            <Filter
              key={tag.title}
              href={tag.href}
              icon={tag.icon}
              title={tag.title}
              subTitle={tag.subTitle}
              className="mb-1"
            />
          ))}
        </div>
        <div className="bg-bg2 rounded-lg p-2 mt-4">
          <h3 className="p-2 font-bold text-white">Popular Tags</h3>
          {listTag !== null && listTag.length > 0 ? (
            listTag.map((tag) => (
              <Tag
                key={tag.id}
                href={tag.id}
                img={tag.thumbnailLink}
                title={tag.postTagName}
                subTitle={tag.PostCount}
              />
            ))
          ) : loading ? (
            <SkeletonTag />
          ) : (
            <i className="px-2 text-xs "> Oops... No tag to show!</i>
          )}
        </div>
        <div className="bg-bg2 rounded-lg p-2 mt-4  ">
          <h3 className="p-2 font-bold text-white">Popular Categorys</h3>
          {listCategory && listCategory.length > 0 ? (
            listCategory.map((category) => (
              <Tag
                key={category.id}
                href={category.id}
                title={`#${category.categoryName}`}
                subTitle={category.PostCount}
                isCategory={true}
              />
            ))
          ) : loading ? (
            <SkeletonCategory />
          ) : (
            <i className="px-2 text-xs"> Oops... No category to show!</i>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftContent;

export const listChose: iTagProp[] = [
  {
    href: "/newest",
    icon: Newest,
    title: "Newest and Recent",
    subTitle: "Find the latest update",
  },
  {
    href: "/popular",
    icon: Popular,
    title: "Popular of the day",
    subTitle: "Shots featured today by curators",
  },
  {
    href: "/following",
    icon: Following,
    title: "Following",
    subTitle: "Explore from your favorite person",
  },
];
