export interface iBlogDetail {
  id: string;
  title: string;
  dateModified: string;
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
  isFollow: false;
  thumbnailLink: string;
}
