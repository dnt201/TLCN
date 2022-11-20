import Tag, { iTagProp } from "@components/tag";
import React, { useState } from "react";
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
  filter: string;
  onChangeFilter: (filter: string) => void;
}

const LeftContent: React.FC<iProps> = (props) => {
  const { filter, onChangeFilter } = props;
  return (
    <div className={props.className + " "}>
      <div className="flex-1 visible">
        <div className="bg-bg2 rounded-lg p-2">
          {listChose.map((tag) => (
            <Tag
              key={tag.title}
              href={tag.href}
              icon={tag.icon}
              title={tag.title}
              subTitle={tag.subTitle}
              onChangeFilter={onChangeFilter}
              filter={filter}
              className="mb-1"
            />
          ))}
        </div>
        <div className="bg-bg2 rounded-lg p-2 mt-4">
          <h3 className="p-2 font-bold text-white">Popular Tags</h3>
          {listTags.map((tag) => (
            <Tag
              key={tag.tag}
              href={tag.href}
              icon={tag.icon}
              title={tag.tag}
              subTitle={tag.num}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftContent;

export const listChose: iTagProp[] = [
  {
    href: "?newest",
    icon: Newest,
    title: "Newest and Recent",
    subTitle: "Find the latest update",
  },
  {
    href: "?popular",
    icon: Popular,
    title: "Popular of the day",
    subTitle: "Shots featured today by curators",
  },
  {
    href: "?following",
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
