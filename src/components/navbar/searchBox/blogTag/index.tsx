import { RootState } from "@app/store";

import { iPostDetail } from "@DTO/Blog";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultPost from "@images/default-placeholder.png";
import { ChatBubbleBottomCenterText, Seen, Voted } from "@icons/index";
import ReactTooltip from "react-tooltip";
interface iProps extends iPostDetail {
  setShowSearchBox: (b: boolean) => void;
  setInputSearch: (value: string) => void;
}

const BlogSearchTag: React.FC<iProps> = (props) => {
  const {
    id,
    comment,
    view,
    like,
    title,
    thumbnailLink,
    setInputSearch,
    setShowSearchBox,
  } = props;
  const { userInfo } = useSelector((state: RootState) => state.users);
  return (
    <Link
      to={`/blog/${id}`}
      className="flex items-center p-2 overflow-hidden  hover:bg-hover"
      onClick={() => {
        setShowSearchBox(false);
        // setInputSearch("");
      }}
    >
      <img
        src={thumbnailLink || defaultPost}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col ml-2 flex-1">
        <span className="  text-sm font-semibold line-clamp-3">{title}</span>
        <div className="flex items-center justify-end gap-2  flex-1 mt-1">
          {/* <div className="flex items-center flex-1 gap-1"> */}
          <span
            className="flex  items-center gap-[3px] text-xs "
            data-tip={`Đã có ${view} xem bài viết`}
            data-for="seen"
          >
            <Seen className="w-3 h-3" /> {view}
            <ReactTooltip
              textColor="#FF4401"
              id="seen"
              place="bottom"
              effect="solid"
            />
          </span>
          <span
            className="flex  items-center gap-[3px] text-xs "
            data-tip={`Đã có ${comment} bình luận`}
            data-for="comment"
          >
            <ChatBubbleBottomCenterText className="w-3 h-3" /> {comment}
            <ReactTooltip
              textColor="#FF4401"
              id="comment"
              place="bottom"
              effect="solid"
            />
          </span>
          {/* </div> */}
          <span
            className="flex items-center  text-xs "
            data-tip={`Đã có ${like} rate bài viết`}
            data-for="like"
          >
            <Voted className="w-3 h-3" />
            {like}
            <ReactTooltip
              textColor="#FF4401"
              id="like"
              place="bottom"
              effect="solid"
            />
          </span>
          {/* <span
            className="flex  items-center gap-[1px] text-xs "
            data-tip={`Đã có ${view} xem bài viết`}
            data-for="seen"
          >
            <Seen className="w-3 h-3" />
            {view}
            <ReactTooltip
              textColor="#FF4401"
              id="seen"
              place="bottom"
              effect="solid"
            />
          </span> */}
        </div>
      </div>
    </Link>
  );
};
export default BlogSearchTag;
