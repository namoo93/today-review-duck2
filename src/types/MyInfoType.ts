export type MyInfoType = {
  idx: string;
  email: string;
  profile: string | null;
  provider: string;
  profileImg: string;
  nickname: string;
  interest1: string | null;
  interest2: string | null;
  isAdmin: boolean;
  createdAt: string;
  reviewCount: number;
  followingCount: number;
  followerCount: number;
  isMyFollowing: boolean;
  isMyBlock: boolean;
};
