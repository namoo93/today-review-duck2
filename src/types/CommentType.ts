export type CommentType = {
  idx: number;
  content: string;
  createdAt: string;
  user: {
    nickname: string;
    profileImg: string;
  };
  tagUsers: CommentUserType[];
};

export type CommentUserType = {
  idx: string;
  email: string;
  nickname: string;
  profileImg: null | string;
  interest1: null | string;
  interest2: null | string;
};
