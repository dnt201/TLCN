export interface iBlogTag {
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
  view: number;
  comment: number;
  isFollow: boolean;
}
