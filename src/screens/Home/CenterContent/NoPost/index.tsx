import noPost from "@images/noPost.gif";

const NoPost = () => {
  return (
    <div className="flex  items-center justify-center mt-8">
      <img src={noPost} width={96} height={96} />
      <i className="text-sm font-medium mb-2">Không có bài viết nào phù hợp</i>
    </div>
  );
};

export default NoPost;
