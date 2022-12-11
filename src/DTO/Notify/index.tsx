export interface iNotify {
  id: string;
  body: string;
  type: string;
  userId: string;
  timeOut: number;
  maxAttempt: number;
  lastSent: string;
  status: string;
  refType: string;
  refId: string;
  dateCreated: string;
  isClicked: boolean;
  extendData: {
    post: string;
    comment: string;
  } | null;

  userSend: {
    id: string;
    username: string;
    imageLink: string | null;
  };
}
