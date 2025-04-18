export type CommentType = {
  idx: number;
  content: string;
  createdAt: string;
  user: {
    idx: string;
    email: string;
    nickname: string;
    profileImg: string | null;
    interest1: string | null;
    interest2: string | null;
    isMyBlock: boolean;
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
