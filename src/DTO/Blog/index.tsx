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

interface lazy {
  id: string;
  title: string;
  content: string;
  status: string;
  dateModified: string;
  owner: {
    id: string;
    username: string;
    avatarLink: null;
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
  like: 0;
  view: 1;
  comment: 0;
  isFollow: true;
  thumbnailLink: string;
}
