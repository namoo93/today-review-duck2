export type BlockedUserType = {
  isMyFollowing: boolean;
  isMyBlock: boolean;
  idx: string;
  email: string;
  profile: string | null;
  profileImg: string | null;
  nickname: string;
  interest1: string | null;
  interest2: string | null;
  isAdmin: boolean;
  serialNumber: number;
  suspensionCount: number;
  suspendExpireAt: string | null;
  reviewCount: number;
  createdAt: string;
  followingCount: number;
  followerCount: number;
};
