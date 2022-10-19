import Tag, { iTagProp } from "@components/tag";
import React from "react";
import { ClassElement } from "typescript";
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

interface iProps extends React.HTMLProps<HTMLDivElement> {
  a?: string;
}

const LeftContent: React.FC<iProps> = (props) => {
  return (
    <div className={props.className}>
      <div className="bg-white rounded-lg p-2">
        {listChose.map((tag) => (
          <Tag
            href={tag.href}
            icon={tag.icon}
            title={tag.title}
            subTitle={tag.subTitle}
          />
        ))}
      </div>
      <div className="bg-white rounded-lg p-2 mt-4">
        <h3 className="p-2 font-bold">Popular Tags</h3>
        {listTags.map((tag) => (
          <Tag
            href={tag.href}
            icon={tag.icon}
            title={tag.tag}
            subTitle={tag.num}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftContent;

const listChose: iTagProp[] = [
  {
    href: "/details",
    icon: Newest,
    title: "Newest and Recent",
    subTitle: "Find the latest update",
  },
  {
    href: "/details",
    icon: Popular,
    title: "Popular of the day",
    subTitle: "Shots featured today by curators",
  },
  {
    href: "/details",
    icon: Following,
    title: "Following",
    subTitle: "Explore from your favorite person",
  },
];

const listTags: {
  href: string;
  icon: React.ElementType;
  tag: string;
  num: number;
  isTrend: boolean;
  bgColor: string;
}[] = [
  {
    href: "/details",
    icon: Javascript,
    tag: "#javascript",
    num: 82645,
    isTrend: false,
    bgColor: "#5A4F43",
  },
  {
    href: "/details",
    icon: BitCoin,
    tag: "#bitcoin",
    num: 65523,
    isTrend: true,
    bgColor: "#473E3B",
  },
  {
    href: "/details",
    icon: Design,
    tag: "#design",
    num: 51349,
    isTrend: true,
    bgColor: "#444F5F",
  },
  {
    href: "/details",
    icon: Innovation,
    tag: "#innovation",
    num: 48022,
    isTrend: false,
    bgColor: "#574D42",
  },
  {
    href: "/details",
    icon: Business,
    tag: "#business",
    num: 82415,
    isTrend: true,
    bgColor: "#46475B",
  },
];
