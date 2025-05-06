import { UserInfoType } from "./UserInfoType";

export interface AnnouncementItemType {
  idx: number;
  user: UserInfoType;
  title: string;
  content: string;
  category: number;
  status: string;
  viewCount: number;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
