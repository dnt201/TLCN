import Tag, { iTagProp } from "@components/tag";
import React, { useEffect, useState } from "react";
import {
  Business,
  Design,
  Following,
  Javascript,
  Newest,
  Popular,
  BitCoin,
  Innovation,
} from "@icons/index";
import postTagApi from "@api/postTagApi";
import categoryApi from "@api/categoryApi";
import { iTag } from "src/DTO";
import { iCategory } from "src/DTO/Category";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";
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
          {listTag && listTag.length > 0 ? (
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
          <h3 className="p-2 font-bold text-white">Popular Category</h3>
          {listCategory && listCategory.length > 0 ? (
            listCategory.map((category) => (
              <Tag
                key={category.id}
                href={category.id}
                title={`#${category.categoryName}`}
                subTitle={category.PostCount}
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

// const listTags: {
//   href: string;
//   icon: React.ElementType;
//   tag: string;
//   num: number;
//   isTrend: boolean;
//   bgColor: string;
// }[] = [
//   {
//     href: "/details",
//     icon: Javascript,
//     tag: "#javascript",
//     num: 82645,
//     isTrend: false,
//     bgColor: "#5A4F43",
//   },
//   {
//     href: "/details",
//     icon: BitCoin,
//     tag: "#bitcoin",
//     num: 65523,
//     isTrend: true,
//     bgColor: "#473E3B",
//   },
//   {
//     href: "/details",
//     icon: Design,
//     tag: "#design",
//     num: 51349,
//     isTrend: true,
//     bgColor: "#444F5F",
//   },
//   {
//     href: "/details",
//     icon: Innovation,
//     tag: "#innovation",
//     num: 48022,
//     isTrend: false,
//     bgColor: "#574D42",
//   },
//   {
//     href: "/details",
//     icon: Business,
//     tag: "#business",
//     num: 82415,
//     isTrend: true,
//     bgColor: "#46475B",
//   },
// ];
