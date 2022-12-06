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
  like: number;
  comment: number;
  view: number;
  isFollow: boolean;
  thumbnailLink: string;
}
