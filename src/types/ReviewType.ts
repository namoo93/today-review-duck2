export type ReviewType = {
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  bookmarkCount: number;
  shareCount: number;
  commentCount: number;
  isMyLike: boolean;
  isMyDislike: boolean;
  isMyBookmark: boolean;
  isMyShare: boolean;
  isMyBlock: boolean;
  idx: number;
  user: {
    idx: string;
    email: string;
    nickname: string;
    profileImg: string | null;
    interest1: string | null;
    interest2: string | null;
  };
  title: string;
  content: string;
  score: number;
  tags: string[];
  thumbnail: string | null;
  thumbnailContent: string | null;
  images: string[]; // 추측: 문자열 배열로 가정
  imgContent: string[]; // 추측: 문자열 배열로 가정
  createdAt: string; // ISO 8601 문자열
  updatedAt: string | null;
};
