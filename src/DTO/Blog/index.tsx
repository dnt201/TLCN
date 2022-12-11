export interface iPostDetail {
  id: string;
  title: string;
  dateModified: string;
  content: string;
  owner: {
    id: string;
    username: string;
    avatarLink: string;
  };
  category: {
    id: string;
    categoryName: string;
  };
  tags: [
    {
      id: string;
      postTagName: string;
      displayName: string;
      colorCode: string;
      thumbnailId: string;
    }
  ];
  status: "Approve" | "Waiting";
  like: number;
  comment: number;
  view: number;
  isFollow: boolean;
  thumbnailLink: string;
  voteData?: "Upvote" | "DownVote";
}

export interface iComment {
  commentId: string;
  content: string;
  countReply: string;
  dateModified: string;
  sender: {
    id: string;
    username: string;
    avatarLink: string;
  };
  commentTag: string[];
}
export interface iCommentCreate {
  file?: File;
  commentContent: string;
  userTag: string[];
}

export interface iReply {
  replyId: string;
  content: string;
  dateModified: string;
  sender: {
    id: string;
    username: string;
    avatarLink: string;
  };
  replyTag: string[];
}
